import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-10-28.acacia',
});

/**
 * Stripe webhook handler for the API Integrations platform
 * 
 * This handles purchase events and creates license keys
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 400 }
      );
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not defined');
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Webhook signature verification failed:', errorMessage);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }

    console.log(`Received webhook: ${event.type}`);

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { error: 'Webhook processing failed', details: errorMessage },
      { status: 500 }
    );
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log('✅ Checkout completed:', session.id);

  const supabase = await createClient();
  
  const customerId = session.customer as string;
  const customerEmail = session.customer_details?.email;
  const planType = session.metadata?.planType || 'pro_lifetime';
  const amount = session.amount_total || 0;

  // Find or create user (you'll integrate with Clerk here)
  // For now, we'll use email as identifier
  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('email', customerEmail)
    .single();

  let userId = existingUser?.id;

  if (!userId) {
    // Create user if doesn't exist
    const { data: newUser, error: userError } = await supabase
      .from('users')
      .insert({
        email: customerEmail,
        clerk_id: customerId, // Temporary, should be actual Clerk ID
      })
      .select('id')
      .single();

    if (userError) {
      console.error('Error creating user:', userError);
      return;
    }

    userId = newUser?.id;
  }

  // Create purchase record
  const { error: purchaseError } = await supabase
    .from('purchases')
    .insert({
      user_id: userId,
      stripe_customer_id: customerId,
      stripe_session_id: session.id,
      stripe_subscription_id: session.subscription as string | null,
      plan_type: planType,
      amount: amount,
      status: 'completed',
    });

  if (purchaseError) {
    console.error('Error creating purchase:', purchaseError);
    return;
  }

  console.log('Purchase created successfully');

  // TODO: Send confirmation email via Resend
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log('🔄 Subscription updated:', subscription.id);

  const supabase = await createClient();

  // Update subscription status
  const { error } = await supabase
    .from('subscriptions')
    .upsert({
      stripe_subscription_id: subscription.id,
      stripe_customer_id: subscription.customer as string,
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000),
      current_period_end: new Date(subscription.current_period_end * 1000),
      cancel_at_period_end: subscription.cancel_at_period_end,
    });

  if (error) {
    console.error('Error updating subscription:', error);
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('❌ Subscription deleted:', subscription.id);

  const supabase = await createClient();

  // Mark subscription as canceled
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'canceled',
    })
    .eq('stripe_subscription_id', subscription.id);

  if (error) {
    console.error('Error updating subscription:', error);
  }

  // Revoke associated license keys
  const { error: licenseError } = await supabase
    .from('license_keys')
    .update({
      status: 'revoked',
    })
    .eq('user_id', (
      await supabase
        .from('subscriptions')
        .select('user_id')
        .eq('stripe_subscription_id', subscription.id)
        .single()
    ).data?.user_id);

  if (licenseError) {
    console.error('Error revoking license:', licenseError);
  }
}

