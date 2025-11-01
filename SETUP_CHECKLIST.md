# Setup Checklist

Use this checklist to get your API Integration Boilerplate Tool up and running.

## 📋 Pre-Launch Checklist

### Development Setup

- [ ] **Install Dependencies**
  ```bash
  pnpm install
  ```

- [ ] **Create Environment File**
  ```bash
  cp .env.example .env.local
  ```

- [ ] **Test Development Server**
  ```bash
  pnpm dev
  ```
  Visit http://localhost:3000

### Stripe Setup

- [ ] **Create Stripe Account**
  - Sign up at https://stripe.com
  - Verify your email

- [ ] **Get API Keys**
  - Go to Dashboard > Developers > API keys
  - Copy Secret key → `STRIPE_SECRET_KEY`
  - Copy Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

- [ ] **Create Products**
  - Go to Dashboard > Products
  - Create "Pro Monthly" product
    - Price: $49/month (recurring)
    - Copy price ID → `STRIPE_PRO_MONTHLY_PRICE_ID`
  - Create "Pro Lifetime" product
    - Price: $199 (one-time)
    - Copy price ID → `STRIPE_PRO_LIFETIME_PRICE_ID`

- [ ] **Set Up Webhooks (Development)**
  ```bash
  # Install Stripe CLI
  brew install stripe/stripe-cli/stripe
  
  # Login
  stripe login
  
  # Forward webhooks
  stripe listen --forward-to localhost:3000/api/stripe/webhook
  
  # Copy webhook secret to .env.local
  ```

### Supabase Setup

- [ ] **Create Supabase Project**
  - Sign up at https://supabase.com
  - Create new project
  - Wait for database to provision

- [ ] **Get API Keys**
  - Go to Project Settings > API
  - Copy URL → `NEXT_PUBLIC_SUPABASE_URL`
  - Copy anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - Copy service_role key → `SUPABASE_SERVICE_ROLE_KEY`

- [ ] **Run Database Schema**
  - Go to SQL Editor
  - Copy contents of `lib/database/schema.sql`
  - Paste and run
  - Verify tables created in Table Editor

- [ ] **Test Database Connection**
  - Try creating a test record in Supabase dashboard
  - Verify RLS policies are working

### Clerk Setup (Optional)

- [ ] **Create Clerk Application**
  - Sign up at https://clerk.com
  - Create new application
  - Choose authentication methods

- [ ] **Get API Keys**
  - Copy Publishable key → `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - Copy Secret key → `CLERK_SECRET_KEY`

- [ ] **Configure URLs**
  ```env
  NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
  NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
  ```

### Test End-to-End

- [ ] **Test Homepage**
  - Visit http://localhost:3000
  - Check all links work
  - Verify responsive design

- [ ] **Test Pricing Page**
  - Visit http://localhost:3000/pricing
  - Click "Subscribe Now"
  - Should redirect to Stripe checkout
  - Use test card: 4242 4242 4242 4242

- [ ] **Test Webhook**
  - Complete test checkout
  - Check terminal for webhook event
  - Verify purchase in Supabase
  - Verify license key generated

- [ ] **Test CLI Locally**
  ```bash
  cd packages/cli
  pnpm dev init
  ```

## 🚀 Production Deployment Checklist

### Vercel Setup

- [ ] **Create Vercel Account**
  - Sign up at https://vercel.com
  - Connect GitHub account

- [ ] **Deploy Project**
  - Import repository
  - Configure build settings
  - Add environment variables (all from .env.local)

- [ ] **Configure Domain**
  - Add custom domain (optional)
  - Verify DNS settings
  - Enable HTTPS (automatic)

### Stripe Production

- [ ] **Switch to Live Mode**
  - Get live API keys from Stripe
  - Update environment variables in Vercel
  - Create live products and prices

- [ ] **Set Up Production Webhooks**
  - Go to Stripe Dashboard > Webhooks
  - Add endpoint: `https://your-domain.com/api/stripe/webhook`
  - Select events:
    - `checkout.session.completed`
    - `customer.subscription.updated`
    - `customer.subscription.deleted`
  - Copy signing secret → Update in Vercel

- [ ] **Test Live Checkout**
  - Visit production site
  - Complete real purchase
  - Verify webhook delivery
  - Check Supabase for purchase record

### Supabase Production

- [ ] **Production Database**
  - Verify RLS policies are enabled
  - Check connection pooling settings
  - Enable point-in-time recovery (recommended)

- [ ] **Security**
  - Rotate service role key if needed
  - Review database policies
  - Set up database backups

### CLI Publication

- [ ] **Update Package Info**
  - Edit `packages/cli/package.json`
  - Update name, version, author
  - Add repository URL

- [ ] **Build CLI**
  ```bash
  cd packages/cli
  pnpm build
  ```

- [ ] **Test Build**
  ```bash
  node dist/index.js --version
  node dist/index.js list
  ```

- [ ] **Publish to npm**
  ```bash
  npm login
  npm publish --access public
  ```

- [ ] **Test Installation**
  ```bash
  npx @your-org/api-integrations --version
  npx @your-org/api-integrations list
  ```

## 🎨 Customization Checklist

### Branding

- [ ] **Update Site Name**
  - `app/layout.tsx` - Update metadata
  - `components/navigation.tsx` - Update logo/name
  - `README.md` - Update project name

- [ ] **Add Logo**
  - Create logo file in `public/`
  - Update navigation component
  - Add favicon

- [ ] **Customize Colors**
  - Edit `app/globals.css` - Update CSS variables
  - Match your brand colors

### Content

- [ ] **Homepage Copy**
  - Update hero section
  - Customize feature descriptions
  - Add testimonials (if any)

- [ ] **Pricing**
  - Adjust pricing tiers
  - Update feature lists
  - Add FAQ items

- [ ] **Documentation**
  - Add your contact info
  - Update support links
  - Add company information

### Legal

- [ ] **Privacy Policy**
  - Create privacy policy page
  - Link in footer

- [ ] **Terms of Service**
  - Create terms page
  - Link in footer

- [ ] **Cookie Notice**
  - Add if required in your jurisdiction

## 📊 Post-Launch Checklist

### Monitoring

- [ ] **Set Up Analytics**
  - Enable Vercel Analytics
  - Add custom events
  - Track conversions

- [ ] **Monitor Webhooks**
  - Check Stripe webhook dashboard daily
  - Set up failure alerts

- [ ] **Database Monitoring**
  - Check Supabase logs
  - Monitor query performance
  - Review API usage

### Marketing

- [ ] **Create Landing Page**
  - Optimize for SEO
  - Add meta tags
  - Create og:image

- [ ] **Social Media**
  - Create Twitter account
  - Share on ProductHunt
  - Join relevant communities

- [ ] **Documentation**
  - Create video tutorials
  - Write blog posts
  - Create examples repository

### Support

- [ ] **Set Up Support Channels**
  - Email support address
  - Discord community
  - GitHub Discussions

- [ ] **Create Knowledge Base**
  - Common issues
  - Integration guides
  - Troubleshooting tips

## ✅ Launch Day

- [ ] Final smoke test of all features
- [ ] Verify all environment variables are set
- [ ] Test payment flow end-to-end
- [ ] Check mobile responsiveness
- [ ] Verify all links work
- [ ] Test on different browsers
- [ ] Announce launch! 🎉

## 🎯 Success Metrics

Track these metrics:

- [ ] **Technical**
  - Uptime %
  - Average response time
  - Error rate
  - Webhook success rate

- [ ] **Business**
  - Sign-ups
  - Conversion rate
  - MRR (Monthly Recurring Revenue)
  - Churn rate
  - Customer acquisition cost

- [ ] **Product**
  - CLI installations
  - Integration usage
  - Support tickets
  - Feature requests

---

## Need Help?

- 📧 Email: support@yoursite.com
- 💬 Discord: [Your invite link]
- 📚 Docs: [Your docs URL]
- 🐛 Issues: [GitHub Issues]

Good luck with your launch! 🚀

