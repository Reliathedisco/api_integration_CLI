import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { sql } from '@/lib/neon/client';

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
  
  const customerId = session.customer as string;
  const customerEmail = session.customer_details?.email;
  const planType = 'pro_lifetime';
  const amount = session.amount_total || 0;

  try {
    // Find or create user
    const existingUsers = await sql`
      SELECT id FROM users WHERE email = ${customerEmail} LIMIT 1
    `;

    let userId;

    if (existingUsers.length > 0) {
      userId = existingUsers[0].id;
    } else {
      // Create new user
      const newUsers = await sql`
        INSERT INTO users (clerk_id, email)
        VALUES (${customerId}, ${customerEmail})
        RETURNING id
      `;
      userId = newUsers[0].id;
    }

    // Create purchase record (trigger will auto-create license key)
    await sql`
      INSERT INTO purchases (
        user_id,
        stripe_customer_id,
        stripe_session_id,
        stripe_subscription_id,
        plan_type,
        amount,
        status
      ) VALUES (
        ${userId},
        ${customerId},
        ${session.id},
        ${session.subscription as string | null},
        ${planType},
        ${amount},
        'completed'
      )
    `;

    console.log('✅ Purchase and license key created successfully');

    // TODO: Send confirmation email via Resend
  } catch (error) {
    console.error('Error processing checkout:', error);
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log('🔄 Subscription updated:', subscription.id);

  try {
    await sql`
      INSERT INTO subscriptions (
        stripe_subscription_id,
        stripe_customer_id,
        status,
        current_period_start,
        current_period_end,
        cancel_at_period_end
      ) VALUES (
        ${subscription.id},
        ${subscription.customer as string},
        ${subscription.status},
        ${new Date(subscription.current_period_start * 1000).toISOString()},
        ${new Date(subscription.current_period_end * 1000).toISOString()},
        ${subscription.cancel_at_period_end}
      )
      ON CONFLICT (stripe_subscription_id) 
      DO UPDATE SET
        status = EXCLUDED.status,
        current_period_start = EXCLUDED.current_period_start,
        current_period_end = EXCLUDED.current_period_end,
        cancel_at_period_end = EXCLUDED.cancel_at_period_end
    `;
  } catch (error) {
    console.error('Error updating subscription:', error);
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('❌ Subscription deleted:', subscription.id);

  try {
    // Mark subscription as canceled
    await sql`
      UPDATE subscriptions
      SET status = 'canceled'
      WHERE stripe_subscription_id = ${subscription.id}
    `;

    // Revoke associated license keys
    await sql`
      UPDATE license_keys
      SET status = 'revoked'
      WHERE user_id IN (
        SELECT user_id FROM subscriptions
        WHERE stripe_subscription_id = ${subscription.id}
      )
    `;
  } catch (error) {
    console.error('Error handling subscription deletion:', error);
  }
}

