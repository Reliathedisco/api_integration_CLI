import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DocsPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1 bg-background pt-16">
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-24 max-w-7xl">
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
              Documentation
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl text-pretty">
              Everything you need to get started with API Integrations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <Card className="bg-card border-2 border-border hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all h-full">
              <CardHeader>
                <CardTitle className="text-foreground">🚀 Getting Started</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Install the CLI and create your first integration
                </CardDescription>
              </CardHeader>
              <div className="p-6 pt-0">
                <p className="text-sm text-muted-foreground mb-4">Run this command to get started:</p>
                <div className="rounded-md p-3 bg-secondary">
                  <code className="text-sm text-foreground font-mono">
                    npx @integrateapi/cli init
                  </code>
                </div>
              </div>
            </Card>

            <Card className="bg-card border-2 border-border hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all h-full">
              <CardHeader>
                <CardTitle className="text-foreground">📖 CLI Reference</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Complete guide to all CLI commands
                </CardDescription>
              </CardHeader>
              <div className="p-6 pt-0">
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <code className="inline-block bg-secondary text-foreground px-2 py-1 rounded font-mono text-xs">
                      init
                    </code>
                    <span>- Initialize project</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <code className="inline-block bg-secondary text-foreground px-2 py-1 rounded font-mono text-xs">
                      add
                    </code>
                    <span>- Add integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <code className="inline-block bg-secondary text-foreground px-2 py-1 rounded font-mono text-xs">
                      list
                    </code>
                    <span>- List integrations</span>
                  </li>
                </ul>
              </div>
            </Card>

            <Link href="/docs/stripe" className="block">
              <Card className="bg-card border-2 border-border hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all h-full">
                <CardHeader>
                  <CardTitle className="text-foreground">⚡ Integrations</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Detailed docs for each integration
                  </CardDescription>
                </CardHeader>
                <div className="p-6 pt-0">
                  <p className="text-sm text-muted-foreground">Click to view integration guides →</p>
                </div>
              </Card>
            </Link>

            <Card className="bg-card border-2 border-border hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all h-full">
              <CardHeader>
                <CardTitle className="text-foreground">🔧 Troubleshooting</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Common issues and solutions
                </CardDescription>
              </CardHeader>
              <div className="p-6 pt-0">
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Webhook not firing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Environment variables missing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Dependency conflicts</span>
                  </li>
                </ul>
              </div>
            </Card>

            <Card className="bg-card border-2 border-border hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all h-full">
              <CardHeader>
                <CardTitle className="text-foreground">💡 Examples</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Real-world usage examples
                </CardDescription>
              </CardHeader>
              <div className="p-6 pt-0">
                <p className="text-sm text-muted-foreground">
                  Check the README files in each integration template for complete examples
                </p>
              </div>
            </Card>

            <Card className="bg-card border-2 border-border hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all h-full">
              <CardHeader>
                <CardTitle className="text-foreground">❓ FAQ</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Frequently asked questions
                </CardDescription>
              </CardHeader>
              <div className="p-6 pt-0">
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>How do I get a license?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Can I use in multiple projects?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Do I get updates?</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-2 gap-8 pt-12 mt-12 border-t-2 border-border">
            <Card className="bg-card border-2 border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-foreground">Quick Start</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">1. Install the CLI</h3>
                  <div className="rounded-md p-3 bg-secondary">
                    <code className="text-sm font-mono text-foreground">
                      npx @integrateapi/cli init
                    </code>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">2. Select integrations</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose from Stripe, Clerk, Resend, Liveblocks, and Supabase
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">3. Configure and run</h3>
                  <p className="text-sm text-muted-foreground">
                    Add your API keys to .env.local and start building
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-2 border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-foreground">Integration Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li>
                    <Link 
                      href="/docs/stripe" 
                      className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                      Stripe Payment Processing →
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/docs/clerk" 
                      className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                      Clerk Authentication →
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/docs/resend" 
                      className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                      Resend Email Sending →
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/docs/liveblocks" 
                      className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                      Liveblocks Collaboration →
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/docs/supabase" 
                      className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                      Supabase Database →
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/docs/openai" 
                      className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                      OpenAI Integration →
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
