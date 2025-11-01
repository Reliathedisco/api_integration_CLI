import Stripe from 'stripe';
import { stripe } from './client';

/**
 * Verify the Stripe webhook signature
 * This ensures the webhook actually came from Stripe
 */
export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET is not defined');
  }

  try {
    return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    throw new Error(`Webhook signature verification failed: ${errorMessage}`);
  }
}

/**
 * Handle checkout.session.completed event
 * Called when a customer successfully completes a checkout
 */
export async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
): Promise<void> {
  console.log('✅ Checkout completed:', session.id);

  // TODO: Implement your business logic here
  // Examples:
  // - Create user account in your database
  // - Grant access to premium features
  // - Send confirmation email
  // - Generate license key

  const customerId = session.customer as string;
  const customerEmail = session.customer_details?.email;
  const subscriptionId = session.subscription as string | null;

  console.log({
    customerId,
    customerEmail,
    subscriptionId,
    metadata: session.metadata,
  });

  // Example: Save to database
  // await db.purchase.create({
  //   data: {
  //     customerId,
  //     email: customerEmail,
  //     sessionId: session.id,
  //     subscriptionId,
  //     status: 'completed',
  //   },
  // });
}

/**
 * Handle customer.subscription.updated event
 * Called when a subscription is updated (e.g., plan change, cancellation)
 */
export async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription
): Promise<void> {
  console.log('🔄 Subscription updated:', subscription.id);

  // TODO: Update subscription status in your database
  // Example:
  // await db.subscription.update({
  //   where: { stripeSubscriptionId: subscription.id },
  //   data: {
  //     status: subscription.status,
  //     currentPeriodEnd: new Date(subscription.current_period_end * 1000),
  //   },
  // });
}

/**
 * Handle customer.subscription.deleted event
 * Called when a subscription is canceled or deleted
 */
export async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription
): Promise<void> {
  console.log('❌ Subscription deleted:', subscription.id);

  // TODO: Revoke access in your database
  // Example:
  // await db.subscription.update({
  //   where: { stripeSubscriptionId: subscription.id },
  //   data: {
  //     status: 'canceled',
  //     canceledAt: new Date(),
  //   },
  // });
}

/**
 * Handle invoice.payment_failed event
 * Called when a payment fails (e.g., card declined)
 */
export async function handlePaymentFailed(
  invoice: Stripe.Invoice
): Promise<void> {
  console.log('💳 Payment failed:', invoice.id);

  // TODO: Notify customer and handle failed payment
  // Example:
  // - Send email notification
  // - Update payment status
  // - Trigger retry logic
}

