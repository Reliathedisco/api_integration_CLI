# Deployment Guide

This guide covers deploying the API Integration Boilerplate Tool to production.

## 🚀 Deploy Marketing Site (Vercel)

### Prerequisites
- Vercel account
- GitHub repository
- Supabase project
- Stripe account
- Clerk account (optional)

### Step 1: Prepare Environment Variables

Create these environment variables in Vercel:

```env
# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_PRO_MONTHLY_PRICE_ID=price_...
STRIPE_PRO_LIFETIME_PRICE_ID=price_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Application
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Optional: Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
```

### Step 2: Deploy to Vercel

#### Option 1: Via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `next build`
   - Output Directory: `.next`
5. Add environment variables
6. Click "Deploy"

#### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Step 3: Set Up Stripe Webhooks

1. Go to [Stripe Dashboard > Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Enter webhook URL: `https://your-domain.com/api/stripe/webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
5. Copy webhook signing secret
6. Add to Vercel environment variables as `STRIPE_WEBHOOK_SECRET`

### Step 4: Configure Supabase

1. Run the SQL schema in Supabase SQL Editor:
   ```bash
   # Copy content from lib/database/schema.sql
   ```

2. Set up Row Level Security policies (already in schema)

3. Configure Authentication (if using Supabase Auth):
   - Enable Email provider
   - Configure redirect URLs
   - Set up email templates

### Step 5: Test Production

1. Visit your production URL
2. Test checkout flow:
   - Go to /pricing
   - Click "Subscribe Now" or "Buy Lifetime"
   - Complete test payment (use test card: 4242 4242 4242 4242)
3. Verify webhook is working:
   - Check Stripe Dashboard > Webhooks for successful deliveries
   - Check Supabase database for purchase records

## 📦 Publish CLI to npm

### Prerequisites
- npm account
- Organization (optional, for scoped packages)

### Step 1: Prepare Package

```bash
cd packages/cli

# Update version
npm version patch  # or minor, or major

# Build
pnpm build
```

### Step 2: Publish

```bash
# Login to npm
npm login

# Publish (public package)
npm publish --access public

# Or for scoped package
npm publish --access public --scope=@your-org
```

### Step 3: Verify

```bash
# Test installation
npx @your-org/api-integrations --version

# Test commands
npx @your-org/api-integrations list
```

## 🔒 Security Checklist

Before going live:

- [ ] All API keys are in environment variables (never committed)
- [ ] Stripe webhook signature verification is enabled
- [ ] HTTPS is enforced (automatic on Vercel)
- [ ] Row Level Security is enabled on all Supabase tables
- [ ] CORS is properly configured
- [ ] Rate limiting is implemented (optional)
- [ ] Error messages don't expose sensitive information

## 📊 Monitoring

### Vercel Analytics

Enable in Vercel Dashboard:
- Web Analytics for page views
- Speed Insights for performance

### Stripe Dashboard

Monitor:
- Successful payments
- Failed payments
- Webhook deliveries
- Disputes and refunds

### Supabase Dashboard

Monitor:
- Database queries
- API usage
- Storage usage
- Auth metrics

## 🐛 Troubleshooting

### Webhook Not Receiving Events

1. Check webhook URL is correct
2. Verify webhook secret matches
3. Check Vercel function logs
4. Test with Stripe CLI:
   ```bash
   stripe listen --forward-to https://your-domain.com/api/stripe/webhook
   ```

### Build Failures

1. Check Node.js version (should be 18+)
2. Verify all dependencies are in package.json
3. Check TypeScript errors:
   ```bash
   pnpm tsc --noEmit
   ```

### Environment Variables Not Working

1. Redeploy after adding new variables
2. Check variable names match exactly
3. For `NEXT_PUBLIC_*` vars, rebuild is required

## 🔄 Updates and Maintenance

### Update Dependencies

```bash
# Check for outdated packages
pnpm outdated

# Update all dependencies
pnpm update

# Update specific package
pnpm update next
```

### Deploy Updates

```bash
# Commit changes
git add .
git commit -m "Update dependencies"
git push

# Vercel will auto-deploy from main branch
```

## 📈 Scaling

### Database
- Enable connection pooling in Supabase
- Add database indexes for frequently queried columns
- Consider read replicas for high traffic

### API Routes
- Use Vercel Edge Functions for better performance
- Implement caching where appropriate
- Consider CDN for static assets

### CLI
- Publish updates regularly
- Use semantic versioning
- Maintain backward compatibility

## 💰 Cost Estimates

### Free Tier (Starting Out)
- Vercel: Free (Hobby plan)
- Supabase: Free (Up to 500MB database)
- Stripe: Free (pay-as-you-go on transactions)
- **Total**: $0/month + payment processing fees

### Growing Business (100 customers/month)
- Vercel: $20/month (Pro plan)
- Supabase: $25/month (Pro plan)
- Stripe: ~$150/month in processing fees (2.9% + 30¢)
- **Total**: ~$195/month

## 🎯 Performance Optimization

1. Enable Next.js Image Optimization
2. Use ISR (Incremental Static Regeneration) for docs
3. Implement caching headers
4. Optimize bundle size
5. Use dynamic imports for heavy components

## 📞 Support

Need help with deployment?
- 📧 Email: support@yoursite.com
- 💬 Discord: [Join our community]
- 📚 Docs: [Read the documentation]

