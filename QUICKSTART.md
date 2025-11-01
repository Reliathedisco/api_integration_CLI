# Quick Start Guide

Get your API Integration Boilerplate Tool running in 5 minutes.

## 🚀 For End Users (Using the CLI)

### Install and Use

```bash
# Run directly (no install needed)
npx @api-integrations/cli init

# Select integrations interactively
# OR specify them:
npx @api-integrations/cli init --with stripe,clerk,resend

# Add environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Start developing!
npm run dev
```

That's it! Check the README files in `lib/[integration]/` for setup instructions.

## 💻 For Developers (Running the Platform)

### Prerequisites
- Node.js 18+
- pnpm (or npm)
- Git

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/api-integration-boilerplate-tool.git
cd api-integration-boilerplate-tool

# Install dependencies
pnpm install
```

### 2. Set Up Environment

```bash
# Copy environment example
cp .env.example .env.local

# Edit .env.local and add your keys
```

### 3. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Copy the SQL from `lib/database/schema.sql`
3. Run it in Supabase SQL Editor
4. Add Supabase URL and keys to `.env.local`

### 4. Set Up Stripe

1. Create account at [stripe.com](https://stripe.com)
2. Get API keys from Dashboard
3. Create products and prices
4. Add to `.env.local`:
   ```env
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

### 5. Run Development Server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 6. Test the CLI Locally

```bash
cd packages/cli

# Run CLI in development
pnpm dev

# Test commands
pnpm dev init
pnpm dev list
```

## 🧪 Testing the Full Flow

### 1. Test Stripe Checkout (Local)

Use Stripe CLI for local webhook testing:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

### 2. Test Checkout Flow

1. Go to `http://localhost:3000/pricing`
2. Click "Subscribe Now"
3. Use test card: `4242 4242 4242 4242`
4. Check terminal for webhook events
5. Verify purchase in Supabase dashboard

### 3. Test CLI

```bash
# Create a test Next.js project
npx create-next-app@latest test-project
cd test-project

# Run your local CLI
npx ../api-integration-boilerplate-tool/packages/cli/dist/index.js add stripe

# Check if files were created
ls -la lib/stripe/
```

## 📁 Project Structure Overview

```
api-integration-boilerplate-tool/
├── app/                      # Next.js app (marketing site)
│   ├── page.tsx             # Homepage
│   ├── pricing/             # Pricing page
│   ├── dashboard/           # User dashboard
│   └── api/                 # API routes
│       └── stripe/          # Stripe endpoints
├── packages/
│   └── cli/                 # CLI tool
│       ├── src/             # CLI source code
│       └── templates/       # Integration templates
├── components/              # React components
└── lib/                    # Utilities
```

## 🎯 Next Steps

### As a Developer

1. ✅ Customize branding and copy
2. ✅ Set up production Stripe products
3. ✅ Configure custom domain
4. ✅ Deploy to Vercel
5. ✅ Publish CLI to npm

### As a User

1. ✅ Purchase a plan
2. ✅ Get your license key
3. ✅ Run CLI in your project
4. ✅ Add API keys to `.env.local`
5. ✅ Start building!

## 🐛 Common Issues

### Port 3000 already in use

```bash
# Kill the process
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 pnpm dev
```

### Module not found errors

```bash
# Clear cache and reinstall
rm -rf node_modules .next
pnpm install
```

### Stripe webhook not working locally

Make sure you're running:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

And use the webhook secret from Stripe CLI in `.env.local`

### TypeScript errors

```bash
# Check for errors
pnpm tsc --noEmit

# Fix formatting
pnpm prettier --write .
```

## 📚 Learn More

- [Full Documentation](./README.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Contributing Guide](./CONTRIBUTING.md)
- [API Reference](./docs)

## 💬 Get Help

- 📧 Email: support@yoursite.com
- 💬 Discord: [Join our community]
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/api-integrations/issues)

---

Happy coding! 🎉

