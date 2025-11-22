import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const integrationDocs: Record<string, { title: string; content: string; setup: string[]; examples: string[] }> = {
  stripe: {
    title: "Stripe Integration",
    content: "Complete payment processing with webhooks, checkout sessions, and subscription management.",
    setup: [
      "Install the CLI: npx @integrateapi/cli add stripe",
      "Get your Stripe API keys from dashboard.stripe.com/apikeys",
      "Add keys to .env.local: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
      "Create products in Stripe Dashboard and add price IDs to config",
      "Set up webhook endpoint in Stripe Dashboard pointing to /api/stripe/webhook"
    ],
    examples: [
      "Create checkout sessions for one-time or recurring payments",
      "Handle webhooks for payment confirmation",
      "Manage customer subscriptions",
      "Process refunds and disputes"
    ]
  },
  clerk: {
    title: "Clerk Authentication",
    content: "User authentication and management with middleware, sign-in/up pages, and webhooks.",
    setup: [
      "Install the CLI: npx @integrateapi/cli add clerk",
      "Create a Clerk application at clerk.com",
      "Add API keys to .env.local: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY",
      "Middleware is automatically configured to protect routes",
      "Customize public routes in middleware.ts"
    ],
    examples: [
      "Protect routes with authentication middleware",
      "Get current user in server components",
      "Handle user webhooks (created, updated, deleted)",
      "Manage user metadata and roles"
    ]
  },
  resend: {
    title: "Resend Email",
    content: "Email sending with React Email templates for transactional emails.",
    setup: [
      "Install the CLI: npx @integrateapi/cli add resend",
      "Create a Resend account at resend.com",
      "Add API key to .env.local: RESEND_API_KEY",
      "Add and verify your domain in Resend dashboard",
      "Customize email templates in lib/resend/emails/"
    ],
    examples: [
      "Send welcome emails to new users",
      "Send password reset emails",
      "Send purchase confirmation emails",
      "Create custom React Email templates"
    ]
  },
  liveblocks: {
    title: "Liveblocks Collaboration",
    content: "Real-time collaboration features with presence, cursors, and shared state.",
    setup: [
      "Install the CLI: npx @integrateapi/cli add liveblocks",
      "Create a Liveblocks account at liveblocks.io",
      "Add API keys to .env.local: LIVEBLOCKS_SECRET_KEY, NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY",
      "Wrap collaborative components with RoomProvider",
      "Customize presence types in lib/liveblocks/client.ts"
    ],
    examples: [
      "Show real-time cursors of other users",
      "Display online user presence",
      "Sync shared state across users",
      "Build collaborative text editors"
    ]
  },
  supabase: {
    title: "Supabase Database",
    content: "PostgreSQL database with authentication, real-time subscriptions, and Row Level Security.",
    setup: [
      "Install the CLI: npx @integrateapi/cli add supabase",
      "Create a Supabase project at supabase.com",
      "Add keys to .env.local: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY",
      "Run your database migrations in Supabase SQL Editor",
      "Set up Row Level Security policies"
    ],
    examples: [
      "Query data in server components",
      "Subscribe to real-time database changes",
      "Implement authentication flows",
      "Use server and client Supabase clients"
    ]
  },
  openai: {
    title: "OpenAI Integration",
    content: "AI completions, chat, embeddings, and image generation with OpenAI.",
    setup: [
      "Install the CLI: npx @integrateapi/cli add openai",
      "Get your API key from platform.openai.com/api-keys",
      "Add key to .env.local: OPENAI_API_KEY",
      "Choose your model (gpt-4, gpt-3.5-turbo, etc.)",
      "Implement streaming for better UX"
    ],
    examples: [
      "Build AI chat interfaces with streaming",
      "Generate text completions",
      "Create embeddings for semantic search",
      "Generate images with DALL-E"
    ]
  }
};

export default function IntegrationDocPage({ params }: { params: { integration: string } }) {
  const doc = integrationDocs[params.integration];
  
  if (!doc) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <main className="flex-1 bg-background pt-16">
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-24 max-w-7xl">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
                {doc.title}
              </h1>
              <p className="text-xl text-muted-foreground">{doc.content}</p>
            </div>

            {/* Quick Setup */}
            <Card className="mb-12 p-8 bg-card border-2 border-border">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Quick Setup</h2>
              <div className="space-y-4">
                {doc.setup.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-muted-foreground leading-relaxed">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* What You Can Build */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">What You Can Build</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {doc.examples.map((example, index) => (
                  <Card key={index} className="flex items-start gap-3 p-6 bg-card border-2 border-border hover:border-primary transition-colors">
                    <span className="text-primary font-bold text-lg">✓</span>
                    <p className="text-foreground">{example}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Installation Command */}
            <Card className="bg-secondary/50 border-2 border-border p-8 mb-12">
              <h3 className="font-bold text-xl mb-4 text-foreground">Installation Command</h3>
              <div className="bg-card rounded-lg p-4 border border-border">
                <code className="text-sm font-mono text-foreground">
                  npx @integrateapi/cli add {params.integration}
                </code>
              </div>
            </Card>

            {/* Next Steps */}
            <div className="border-t-2 border-border pt-12">
              <h2 className="text-3xl font-bold mb-8 text-foreground">Next Steps</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/pricing">
                  <Card className="p-6 border-2 border-border hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all text-center h-full bg-card">
                    <div className="text-4xl mb-3">💳</div>
                    <div className="font-bold text-lg mb-2 text-foreground">Get Access</div>
                    <div className="text-sm text-muted-foreground">Purchase to use this integration</div>
                  </Card>
                </Link>
                <Link href="/integrations">
                  <Card className="p-6 border-2 border-border hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all text-center h-full bg-card">
                    <div className="text-4xl mb-3">🔌</div>
                    <div className="font-bold text-lg mb-2 text-foreground">All Integrations</div>
                    <div className="text-sm text-muted-foreground">Browse all available integrations</div>
                  </Card>
                </Link>
                <Link href="/dashboard">
                  <Card className="p-6 border-2 border-border hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all text-center h-full bg-card">
                    <div className="text-4xl mb-3">🎯</div>
                    <div className="font-bold text-lg mb-2 text-foreground">Dashboard</div>
                    <div className="text-sm text-muted-foreground">View your license key</div>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  return [
    { integration: 'stripe' },
    { integration: 'clerk' },
    { integration: 'resend' },
    { integration: 'liveblocks' },
    { integration: 'supabase' },
    { integration: 'openai' },
  ];
}

