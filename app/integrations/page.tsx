import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function IntegrationsPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              Available Integrations
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Production-ready templates for the most popular APIs. Just run one command and start building.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {integrations.map((integration) => (
              <Card key={integration.id} className="hover:border-primary transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{integration.icon}</span>
                    <CardTitle className="text-2xl">{integration.name}</CardTitle>
                  </div>
                  <CardDescription className="text-base">{integration.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Includes:</h4>
                    <ul className="space-y-1">
                      {integration.includes.map((item, i) => (
                        <li key={i} className="text-sm flex items-center gap-2">
                          <span className="text-primary">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Install:</h4>
                    <div className="rounded-md bg-muted p-3">
                      <code className="text-sm">
                        npx @api-integrations/cli add {integration.id}
                      </code>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/docs/${integration.id}`}>View Documentation</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Coming Soon */}
          <div className="mt-24 max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Coming Soon</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {comingSoon.map((integration) => (
                <Card key={integration.name} className="opacity-75">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{integration.icon}</span>
                      <CardTitle>{integration.name}</CardTitle>
                    </div>
                    <CardDescription>{integration.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-4">
              More integrations added regularly. Have a request?
            </p>
            <p className="text-sm text-muted-foreground">
              Email us at: hello@integrateapi.io
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const integrations = [
  {
    id: "stripe",
    name: "Stripe",
    icon: "💳",
    description: "Complete payment processing with webhooks, checkout sessions, and subscription management",
    includes: [
      "Stripe client configuration",
      "Checkout session API route",
      "Webhook handler with signature verification",
      "Subscription management helpers",
      "TypeScript types and error handling",
      "Production-ready examples",
    ],
  },
  {
    id: "clerk",
    name: "Clerk",
    icon: "🔐",
    description: "Authentication and user management with middleware, webhooks, and helper functions",
    includes: [
      "Middleware setup for route protection",
      "ClerkProvider configuration",
      "Webhook handler for user events",
      "User helper functions",
      "Example protected pages",
      "User metadata management",
    ],
  },
  {
    id: "resend",
    name: "Resend",
    icon: "📧",
    description: "Email sending with React Email templates and transactional email helpers",
    includes: [
      "Resend client setup",
      "React Email templates",
      "Email sending helper functions",
      "Welcome email template",
      "Purchase confirmation template",
      "Custom template examples",
    ],
  },
  {
    id: "liveblocks",
    name: "Liveblocks",
    icon: "👥",
    description: "Real-time collaboration with presence tracking, cursors, and shared state",
    includes: [
      "Liveblocks client configuration",
      "Authentication endpoint",
      "React hooks setup",
      "Collaborative cursor component",
      "Presence tracking examples",
      "Storage and mutations",
    ],
  },
  {
    id: "supabase",
    name: "Supabase",
    icon: "🗄️",
    description: "Database and backend services with authentication, real-time, and storage",
    includes: [
      "Browser and server clients",
      "Middleware for session management",
      "Authentication helpers",
      "Real-time subscriptions",
      "CRUD operation examples",
      "Type generation guide",
    ],
  },
];

const comingSoon = [
  {
    name: "OpenAI",
    icon: "🤖",
    description: "AI completions and embeddings",
  },
  {
    name: "Vercel AI SDK",
    icon: "✨",
    description: "AI-powered chat and streaming",
  },
  {
    name: "Twilio",
    icon: "📱",
    description: "SMS and phone verification",
  },
  {
    name: "Sentry",
    icon: "🐛",
    description: "Error tracking and monitoring",
  },
  {
    name: "PostHog",
    icon: "📊",
    description: "Product analytics",
  },
  {
    name: "Uploadthing",
    icon: "📁",
    description: "File uploads",
  },
];

