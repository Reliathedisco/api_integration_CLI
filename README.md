# API Integration Boilerplate Tool

A developer tool that generates production-ready API integrations for popular SaaS APIs (Stripe, Clerk, Resend, Liveblocks, Supabase) with a single command.

## 🚀 Quick Start

```bash
# Install the CLI
npx @api-integrations/cli init

# Or install globally
npm install -g @api-integrations/cli

# Initialize with specific integrations
npx @api-integrations/cli init --with stripe,clerk,resend

# Add a single integration
npx @api-integrations/cli add stripe
```

## 📦 What's Included

This project consists of:

1. **CLI Tool** (`packages/cli/`) - Generate integration templates
2. **Marketing Website** (Next.js app) - Purchase and manage access
3. **Integration Templates** (`packages/cli/templates/`) - Battle-tested code

## 🏗️ Project Structure

```
api-boilerplate-tool/
├── app/                          # Next.js marketing site
│   ├── page.tsx                 # Homepage
│   ├── pricing/                 # Pricing page
│   ├── docs/                    # Documentation
│   ├── integrations/            # Integration showcase
│   ├── dashboard/               # User dashboard
│   └── api/
│       └── stripe/              # Stripe checkout & webhooks
├── packages/
│   └── cli/                     # The CLI tool
│       ├── src/
│       │   ├── commands/        # CLI commands
│       │   └── utils/           # Utilities
│       └── templates/           # Integration templates
│           ├── stripe/
│           ├── clerk/
│           ├── resend/
│           ├── liveblocks/
│           └── supabase/
├── components/                  # React components
└── lib/                        # Shared utilities
```

## 🔌 Available Integrations

### Stripe
Complete payment processing with webhooks, checkout sessions, and subscription management.

**Includes:**
- Stripe client configuration
- Checkout session API route
- Webhook handler with signature verification
- Subscription management
- TypeScript types

### Clerk
Authentication and user management with middleware and webhooks.

**Includes:**
- Middleware for route protection
- ClerkProvider setup
- Webhook handler for user events
- User helper functions
- Protected page examples

### Resend
Email sending with React Email templates.

**Includes:**
- Resend client setup
- React Email templates
- Welcome email template
- Purchase confirmation template
- Send helper functions

### Liveblocks
Real-time collaboration with presence tracking and cursors.

**Includes:**
- Liveblocks client configuration
- Authentication endpoint
- React hooks setup
- Collaborative cursor component
- Presence tracking examples

### Supabase
Database and backend services with authentication.

**Includes:**
- Browser and server clients
- Middleware for session management
- Authentication helpers
- Real-time subscriptions
- CRUD operation examples

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Install Dependencies

```bash
# Install root dependencies
pnpm install

# Install CLI dependencies
cd packages/cli
pnpm install
```

### Run the Marketing Site

```bash
# From root directory
pnpm dev
```

Visit `http://localhost:3000`

### Develop the CLI

```bash
# From packages/cli directory
pnpm dev

# Or from root
pnpm cli:dev
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your keys:

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📊 Database Setup

Run the SQL schema in your Supabase project:

```bash
# Copy the schema to Supabase SQL Editor
cat lib/database/schema.sql
```

This creates:
- `users` table - User accounts
- `purchases` table - Purchase records
- `license_keys` table - License key management
- `subscriptions` table - Monthly subscriptions

## 🚢 Deployment

### Deploy Marketing Site (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Publish CLI (npm)

```bash
cd packages/cli

# Build
pnpm build

# Publish
npm publish --access public
```

## 💳 Stripe Setup

1. Create products in Stripe Dashboard
2. Create price IDs for monthly and lifetime plans
3. Add price IDs to environment variables
4. Set up webhook endpoint: `https://yourdomain.com/api/stripe/webhook`
5. Subscribe to events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

## 📝 License System

The platform uses license keys to grant access:

1. User purchases via Stripe checkout
2. Webhook creates purchase record
3. Trigger auto-generates license key
4. User can view key in dashboard
5. CLI validates key before generating templates

## 🎯 Roadmap

- [ ] Add more integrations (OpenAI, Vercel AI, Twilio)
- [ ] Support for other frameworks (SvelteKit, Remix)
- [ ] Team plans with multiple seats
- [ ] Custom integration requests
- [ ] VS Code extension

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines.

## 📄 License

MIT License - see LICENSE file for details

## 🔗 Links

- Website: [Your website URL]
- Documentation: [Your docs URL]
- Discord: [Your Discord URL]
- Twitter: [Your Twitter URL]

## ⚡ Built With

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Stripe](https://stripe.com/)
- [Clerk](https://clerk.com/)
- [Supabase](https://supabase.com/)
- [Commander.js](https://github.com/tj/commander.js)

## 💬 Support

- 📧 Email: support@yoursite.com
- 💬 Discord: [Join our community]
- 📚 Docs: [Read the documentation]

---

Made with ❤️ for developers who hate reading API docs

