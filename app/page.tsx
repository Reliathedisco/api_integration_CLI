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
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 text-sm font-semibold">
              🚀 Launch Special: Save $200 - First 50 Buyers Only
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              API Integrations in{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">5 Minutes</span>
              <br />
              <span className="text-3xl md:text-4xl">+ Instant Webhook Discovery</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Complete developer toolkit: Production-ready API templates + Chrome extension to find endpoints & keys instantly
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link href="/pricing">Get the Bundle - $297</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                <Link href="#features">See What's Included</Link>
              </Button>
            </div>
            <div className="pt-4 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                CLI Tool
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Chrome Extension
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                6 Integrations
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Lifetime Updates
              </div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section id="features" className="container mx-auto px-4 md:px-6 lg:px-8 py-24 bg-muted/50">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              The Complete Developer Toolkit
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build and debug API integrations faster
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
              Pre-built templates, not auto-generated code. Drop into any Next.js project.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* CLI Tool */}
            <Card className="border-2">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">⌨️</span>
                </div>
                <CardTitle className="text-2xl">IntegrateAPI CLI</CardTitle>
                <CardDescription className="text-base">
                  Production-ready integration templates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-black text-green-400 rounded-lg p-4 mb-4 font-mono text-sm">
                  $ npx @api-integrations/cli init<br/>
                  <span className="text-gray-400">✓ Select integrations: Stripe, Clerk, Resend</span><br/>
                  <span className="text-gray-400">✓ Copied 24 files</span><br/>
                  <span className="text-blue-400">✨ Done in 30s</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    6 battle-tested integrations
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Stripe, Clerk, Resend, Liveblocks, Supabase, OpenAI
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    TypeScript + error handling
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Webhook signature verification
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Chrome Extension */}
            <Card className="border-2 border-purple-500">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <CardTitle className="text-2xl">DevFinder Extension</CardTitle>
                <CardDescription className="text-base">
                  Visually locate endpoints, webhooks & keys
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold mb-2">Instantly Find:</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      API Endpoints
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      Webhooks
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      API Keys
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      Auth Tokens
                    </div>
                  </div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Color-coded visual highlights
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Click to copy any value
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Keyboard shortcut (Cmd+Shift+F)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Works on any website
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Bundle Value Proposition */}
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Why This Bundle?</h2>
              <p className="text-xl text-muted-foreground">
                Pre-built templates + Visual API finder = Complete toolkit
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-bold mb-2">10x Faster Setup</h3>
                <p className="text-sm text-muted-foreground">
                  Skip reading docs. Access production-ready templates via CLI. Copy into your project in seconds. No boilerplate to write.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="font-bold mb-2">Production Ready</h3>
                <p className="text-sm text-muted-foreground">
                  Battle-tested code with proper error handling, webhook verification, and security best practices
                </p>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="font-bold mb-2">ROI in 1 Project</h3>
                <p className="text-sm text-muted-foreground">
                  Save 20+ hours per integration. At $100/hr developer rate, that's $2,000+ value
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof / Stats */}
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-24 bg-muted/50">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold mb-2">6</div>
                <div className="text-muted-foreground">Production Integrations</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">20+</div>
                <div className="text-muted-foreground">Hours Saved Per Project</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">∞</div>
                <div className="text-muted-foreground">Unlimited Projects</div>
              </div>
            </div>
          </div>
        </section>

        {/* Integration Showcase */}
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              6 Production-Ready Integrations
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              All the APIs you need to build a modern SaaS
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
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-24 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-3xl">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold">
              Ready to Ship 10x Faster?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join developers building SaaS products in days, not months
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link href="/pricing">Get Started - $297 (Save $200)</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                <Link href="/docs">Read the Docs</Link>
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              ⏰ Launch price ends in 48 hours • 💳 30-day money-back guarantee
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
  {
    id: "openai",
    name: "OpenAI",
    icon: "🤖",
    description: "AI completions and chat",
    features: ["Streaming chat", "Completions", "Embeddings"],
  },
];
