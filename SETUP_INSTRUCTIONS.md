# Setup Instructions - Next Steps

Great! Your environment is configured with Stripe and Supabase credentials.

## ✅ What's Already Done

1. ✅ Stripe API keys configured in `.env.local`
2. ✅ Supabase URL and anon key configured
3. ✅ Pricing page updated with your design

## 🚀 Next Steps to Get Running

### 1. Set Up Supabase Database

Run the SQL schema in your Supabase project:

1. Go to https://jslifvophokyvmojcdgy.supabase.co (your project)
2. Navigate to SQL Editor
3. Copy the entire contents of `lib/database/schema.sql`
4. Paste and run it
5. Verify tables were created in the Table Editor

### 2. Get Supabase Service Role Key

You need to add the service role key to `.env.local`:

1. Go to Supabase Dashboard
2. Settings > API
3. Copy the `service_role` key (secret!)
4. Update `.env.local`:
   ```env
   SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key_here
   ```

### 3. Create Stripe Products

Create two products in your Stripe Dashboard:

**Product 1: Pro Lifetime**
1. Go to https://dashboard.stripe.com/test/products
2. Click "Add product"
3. Name: "Pro Plan - Lifetime"
4. Price: $149 (one-time payment)
5. Copy the price ID and update `.env.local`:
   ```env
   STRIPE_PRO_ONE_TIME_PRICE_ID=price_xxxxx
   ```

**Product 2: Pro Monthly**
1. Create another product
2. Name: "Pro Plan - Monthly"
3. Price: $29/month (recurring)
4. Copy the price ID and update `.env.local`:
   ```env
   STRIPE_PRO_MONTHLY_PRICE_ID=price_xxxxx
   ```

### 4. Set Up Stripe Webhook (For Local Testing)

Install and run Stripe CLI:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to your local server
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

The CLI will output a webhook secret starting with `whsec_`. You already have one in your `.env.local`, so you're good!

### 5. Install Dependencies and Run

```bash
# Install dependencies
pnpm install

# Run the development server
pnpm dev
```

Visit http://localhost:3000

### 6. Test the Flow

1. **Visit Homepage**: http://localhost:3000
2. **Go to Pricing**: Click "Pricing" in navigation
3. **Click "Get Lifetime Access"** or "Subscribe Now"
4. **Use Test Card**: 
   - Card: 4242 4242 4242 4242
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits
5. **Complete Checkout**
6. **Check Terminal**: You should see webhook event logged
7. **Check Supabase**: Verify purchase record created

## 🐛 Troubleshooting

### If checkout button doesn't work:
- Make sure you've created the products in Stripe
- Make sure the price IDs are correct in `.env.local`
- Restart your dev server after updating `.env.local`

### If webhook doesn't fire:
- Make sure Stripe CLI is running: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
- Check the terminal for errors
- Verify webhook secret matches in `.env.local`

### If database errors occur:
- Make sure you ran the SQL schema in Supabase
- Verify all tables were created (users, purchases, license_keys, subscriptions)
- Check that RLS policies are enabled

## 📚 What You Can Do Now

Once everything is running:

1. ✅ Test complete checkout flow
2. ✅ Verify purchase records in Supabase
3. ✅ Check license key generation works
4. ✅ Test the CLI tool locally
5. ✅ Customize the homepage and branding
6. ✅ Add your own content

## 🎨 Customization

Want to update branding?

- **Site Name**: Edit `components/navigation.tsx`
- **Homepage Content**: Edit `app/page.tsx`
- **Pricing**: Already customized! (`app/pricing/page.tsx`)
- **Colors**: Edit `app/globals.css` CSS variables

## 📞 Need Help?

Check these files for detailed instructions:
- `QUICKSTART.md` - 5-minute setup guide
- `SETUP_CHECKLIST.md` - Complete setup checklist
- `DEPLOYMENT.md` - How to deploy to production
- `README.md` - Full project documentation

## 🚀 Ready to Launch?

Once local testing works:
1. Push to GitHub
2. Deploy to Vercel
3. Set up production Stripe products
4. Configure production webhooks
5. Go live!

---

You're almost there! Run `pnpm dev` and test the checkout flow. 🎉

