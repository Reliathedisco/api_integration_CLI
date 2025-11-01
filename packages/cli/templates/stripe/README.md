# Stripe Integration

Production-ready Stripe integration for Next.js with webhooks, checkout, and subscription management.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install stripe
# or
pnpm add stripe
# or
yarn add stripe
```

### 2. Set Up Environment Variables

Copy the variables from `.env.example` to your `.env.local`:

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

Get your API keys from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys).

### 3. Create Products in Stripe

1. Go to [Products](https://dashboard.stripe.com/products) in your Stripe Dashboard
2. Create your products and prices
3. Update the price IDs in `lib/stripe/config.ts`

### 4. Set Up Webhook Endpoint

1. Go to [Webhooks](https://dashboard.stripe.com/webhooks) in your Stripe Dashboard
2. Click "Add endpoint"
3. Enter your webhook URL: `https://yourdomain.com/api/stripe/webhook`
4. Select events to listen to:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
5. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

### 5. Test Locally with Stripe CLI

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to your local server
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## 📁 Files Included

- `lib/stripe/client.ts` - Stripe client configuration
- `lib/stripe/config.ts` - Product and pricing configuration
- `lib/stripe/webhooks.ts` - Webhook event handlers
- `app/api/stripe/checkout/route.ts` - Create checkout session
- `app/api/stripe/webhook/route.ts` - Webhook endpoint

## 🎯 Usage Examples

### Create a Checkout Session

```typescript
// From a client component or server action
const response = await fetch('/api/stripe/checkout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    priceId: 'price_xxx', // Your price ID
    metadata: {
      userId: 'user_123',
    },
  }),
});

const { url } = await response.json();
window.location.href = url; // Redirect to Stripe Checkout
```

### Handle Successful Payment

Edit `lib/stripe/webhooks.ts` and implement your business logic in `handleCheckoutSessionCompleted`:

```typescript
export async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
): Promise<void> {
  // Your custom logic here
  // Example: Grant access, send email, create user account
  
  await db.user.update({
    where: { email: session.customer_details?.email },
    data: { isPro: true },
  });
}
```

## 🔐 Security Best Practices

✅ **DO:**
- Always verify webhook signatures
- Use environment variables for API keys
- Handle errors gracefully
- Log important events
- Test with Stripe test mode first

❌ **DON'T:**
- Expose secret keys in client-side code
- Skip webhook signature verification
- Trust client-side data for payments
- Use production keys in development

## 🧪 Testing

Use [Stripe Test Cards](https://stripe.com/docs/testing):

- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Requires authentication: `4000 0025 0000 3155`

## 📚 Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Webhook Events](https://stripe.com/docs/api/events)
- [Testing](https://stripe.com/docs/testing)

## 🐛 Troubleshooting

### Webhook not receiving events

- Check your webhook URL is correct
- Verify the webhook secret matches
- Use `stripe listen` for local testing
- Check Stripe Dashboard > Developers > Webhooks for errors

### Checkout session fails

- Verify price ID is correct
- Check environment variables are set
- Look for errors in server logs
- Test with Stripe test mode first

## 💡 Next Steps

1. Customize the product configuration in `lib/stripe/config.ts`
2. Implement your business logic in webhook handlers
3. Add database integration for storing purchases
4. Create a customer portal for subscription management
5. Set up email notifications with Resend

