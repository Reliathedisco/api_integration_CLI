/**
 * Stripe product and price configuration
 * 
 * Update these values with your actual Stripe product/price IDs
 * You can find these in your Stripe Dashboard under Products
 */

export const STRIPE_PRODUCTS = {
  PRO_MONTHLY: {
    priceId: process.env.STRIPE_PRO_MONTHLY_PRICE_ID || 'price_xxx',
    name: 'Pro Plan - Monthly',
    amount: 4900, // $49.00
  },
  PRO_ONE_TIME: {
    priceId: process.env.STRIPE_PRO_ONE_TIME_PRICE_ID || 'price_xxx',
    name: 'Pro Plan - Lifetime',
    amount: 19900, // $199.00
  },
} as const;

/**
 * Currency for all transactions
 */
export const CURRENCY = 'usd';

/**
 * Allowed payment methods
 */
export const PAYMENT_METHODS: Stripe.Checkout.SessionCreateParams.PaymentMethodType[] = [
  'card',
  'link',
];

