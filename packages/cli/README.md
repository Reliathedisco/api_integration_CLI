# @api-integrations/cli

Production-ready API integration templates for Next.js. Get Stripe, Clerk, Resend, and more set up in minutes.

## 🚀 Quick Start

```bash
# Run without installing
npx @api-integrations/cli init

# Or install globally
npm install -g @api-integrations/cli
api-integrations init
```

## 📦 Commands

### `init`

Initialize a new project with API integrations.

```bash
# Interactive mode
api-integrations init

# Specify integrations
api-integrations init --with stripe,clerk,resend
```

### `add`

Add a single integration to your existing project.

```bash
api-integrations add stripe
api-integrations add clerk
api-integrations add resend
```

### `list`

List all available integrations.

```bash
api-integrations list
```

## 🔌 Available Integrations

| Integration | Description | Package |
|------------|-------------|---------|
| **Stripe** | Payment processing with webhooks | `stripe` |
| **Clerk** | Authentication and user management | `@clerk/nextjs` |
| **Resend** | Email sending with React Email | `resend`, `react-email` |
| **Liveblocks** | Real-time collaboration | `@liveblocks/client`, `@liveblocks/react` |
| **Supabase** | Database and backend services | `@supabase/supabase-js` |

## 📁 What Gets Installed

Each integration includes:

- ✅ Production-ready TypeScript code
- ✅ Error handling and validation
- ✅ Environment variable documentation
- ✅ Usage examples
- ✅ Comprehensive README
- ✅ Webhook handlers (where applicable)

### Example: Stripe Integration

```
lib/
  stripe/
    ├── client.ts          # Stripe client setup
    ├── config.ts          # Product configuration
    └── webhooks.ts        # Webhook handlers

app/
  api/
    stripe/
      ├── checkout/
      │   └── route.ts     # Create checkout session
      └── webhook/
          └── route.ts     # Handle webhooks

.env.example              # Required environment variables
README.md                 # Setup instructions
```

## 🛠️ Requirements

- Node.js 18 or higher
- A Next.js 14+ project (App Router)
- TypeScript (recommended)

## 🔑 Environment Variables

After running the CLI, add your API keys to `.env.local`:

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Clerk
CLERK_SECRET_KEY=sk_test_...

# Add other keys as needed
```

## 💡 Usage Examples

### After Installing Stripe

```typescript
// Create a checkout session
import { stripe } from '@/lib/stripe/client';

const session = await stripe.checkout.sessions.create({
  // ... configuration
});
```

### After Installing Clerk

```typescript
// Protect a route
import { auth } from '@clerk/nextjs/server';

export default async function ProtectedPage() {
  const { userId } = await auth();
  // ... your code
}
```

## 📚 Documentation

For detailed setup instructions for each integration, see the README.md file created in your project after installation.

## 🐛 Troubleshooting

### Command not found

If you installed globally and get "command not found":

```bash
npm install -g @api-integrations/cli
```

### Permission errors

On macOS/Linux, you might need sudo:

```bash
sudo npm install -g @api-integrations/cli
```

Or configure npm to install globally without sudo:

```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

### Files not copying

Make sure you're in a Next.js project directory and have write permissions.

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

## 📄 License

MIT - see [LICENSE](./LICENSE) for details

## 🔗 Links

- [Documentation](https://yoursite.com/docs)
- [Website](https://yoursite.com)
- [GitHub](https://github.com/yourusername/api-integrations)
- [Discord](https://discord.gg/yourserver)

## ⭐ Support

If you find this useful, please consider:
- Starring the repo on GitHub
- Sharing with other developers
- Contributing new integrations

---

Made with ❤️ for developers who value their time

