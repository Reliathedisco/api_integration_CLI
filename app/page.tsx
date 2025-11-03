import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Production-Ready Templates
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              API Integrations in{" "}
              <span className="text-primary">5 Minutes</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Skip the docs. Skip the boilerplate. Get battle-tested integrations for Stripe, Clerk,
              Resend, and more with a single command.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/pricing">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/docs">View Documentation</Link>
              </Button>
            </div>
            <div className="pt-4">
              <div className="rounded-lg border bg-muted/50 p-4">
                <code className="text-sm">
                  npx @api-integrations/cli init --with stripe,clerk,resend
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-24 border-t">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Why API Integrations?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stop copying code from docs. Get production-ready integrations maintained by experts.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>⚡ Lightning Fast</CardTitle>
                <CardDescription>
                  Generate complete integrations in seconds, not hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  One command to scaffold complete API integrations with webhooks, error handling,
                  and TypeScript types.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>🔒 Production Ready</CardTitle>
                <CardDescription>
                  Battle-tested code with security best practices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Every integration includes webhook signature verification, error handling, and
                  security best practices out of the box.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>📚 Fully Documented</CardTitle>
                <CardDescription>
                  Clear documentation and examples for every integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Each integration includes detailed setup instructions, usage examples, and
                  troubleshooting guides.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Integrations Preview */}
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-24 border-t">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Available Integrations
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Production-ready templates for the most popular APIs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration) => (
              <Card key={integration.id} className="hover:border-primary transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {integration.icon}
                    {integration.name}
                  </CardTitle>
                  <CardDescription>{integration.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    {integration.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-primary">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/integrations">View All Integrations</Link>
            </Button>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-24 border-t">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to ship faster?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join developers who saved hours of integration work
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/pricing">Get Started for $49</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/docs">Read the Docs</Link>
              </Button>
            </div>
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
    description: "Payment processing with webhooks",
    features: ["Checkout sessions", "Webhook handlers", "Subscription management"],
  },
  {
    id: "clerk",
    name: "Clerk",
    icon: "🔐",
    description: "Authentication and user management",
    features: ["Middleware setup", "User helpers", "Webhook integration"],
  },
  {
    id: "resend",
    name: "Resend",
    icon: "📧",
    description: "Email sending with React Email",
    features: ["Email templates", "Send helpers", "Production setup"],
  },
  {
    id: "liveblocks",
    name: "Liveblocks",
    icon: "👥",
    description: "Real-time collaboration",
    features: ["Presence tracking", "Cursors", "Shared state"],
  },
  {
    id: "supabase",
    name: "Supabase",
    icon: "🗄️",
    description: "Database and backend services",
    features: ["Auth helpers", "Client setup", "Real-time subscriptions"],
  },
];

