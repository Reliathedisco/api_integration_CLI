import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DocsPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-24">
          <div className="mb-16">
            <h1 className="text-4xl font-bold mb-4">Documentation</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Everything you need to get started with API Integrations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <Card className="hover:border-primary transition-colors h-full">
              <CardHeader>
                <CardTitle>🚀 Getting Started</CardTitle>
                <CardDescription>
                  Install the CLI and create your first integration
                </CardDescription>
              </CardHeader>
              <div className="p-6 pt-0">
                <p className="text-sm mb-4">Run this command to get started:</p>
                <div className="bg-muted rounded-md p-3">
                  <code className="text-sm">npx @api-integrations/cli init</code>
                </div>
              </div>
            </Card>

            <Card className="hover:border-primary transition-colors h-full">
              <CardHeader>
                <CardTitle>⌨️ CLI Reference</CardTitle>
                <CardDescription>
                  Complete guide to all CLI commands
                </CardDescription>
              </CardHeader>
              <div className="p-6 pt-0">
                <ul className="text-sm space-y-2">
                  <li><code className="bg-muted px-2 py-1 rounded">init</code> - Initialize project</li>
                  <li><code className="bg-muted px-2 py-1 rounded">add</code> - Add integration</li>
                  <li><code className="bg-muted px-2 py-1 rounded">list</code> - List integrations</li>
                </ul>
              </div>
            </Card>

            <Link href="/docs/stripe" className="block">
              <Card className="hover:border-primary transition-colors h-full">
                <CardHeader>
                  <CardTitle>🔌 Integrations</CardTitle>
                  <CardDescription>
                    Detailed docs for each integration
                  </CardDescription>
                </CardHeader>
                <div className="p-6 pt-0">
                  <p className="text-sm">Click to view integration guides →</p>
                </div>
              </Card>
            </Link>

            <Card className="hover:border-primary transition-colors h-full">
              <CardHeader>
                <CardTitle>🔧 Troubleshooting</CardTitle>
                <CardDescription>
                  Common issues and solutions
                </CardDescription>
              </CardHeader>
              <div className="p-6 pt-0">
                <ul className="text-sm space-y-2">
                  <li>• Webhook not firing</li>
                  <li>• Environment variables missing</li>
                  <li>• Dependency conflicts</li>
                </ul>
              </div>
            </Card>

            <Card className="hover:border-primary transition-colors h-full">
              <CardHeader>
                <CardTitle>💡 Examples</CardTitle>
                <CardDescription>
                  Real-world usage examples
                </CardDescription>
              </CardHeader>
              <div className="p-6 pt-0">
                <p className="text-sm">Check the README files in each integration template for complete examples</p>
              </div>
            </Card>

            <Card className="hover:border-primary transition-colors h-full">
              <CardHeader>
                <CardTitle>❓ FAQ</CardTitle>
                <CardDescription>
                  Frequently asked questions
                </CardDescription>
              </CardHeader>
              <div className="p-6 pt-0">
                <ul className="text-sm space-y-2">
                  <li>• How do I get a license?</li>
                  <li>• Can I use in multiple projects?</li>
                  <li>• Do I get updates?</li>
                </ul>
              </div>
            </Card>
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick Start</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">1. Install the CLI</h3>
                  <div className="rounded-md bg-muted p-3 font-mono text-sm">
                    npx @api-integrations/cli init
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">2. Select integrations</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose from Stripe, Clerk, Resend, Liveblocks, and Supabase
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">3. Configure and run</h3>
                  <p className="text-sm text-muted-foreground">
                    Add your API keys to .env.local and start building
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Integration Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li>
                    <Link href="/docs/stripe" className="text-primary hover:underline">
                      Stripe Payment Processing →
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/clerk" className="text-primary hover:underline">
                      Clerk Authentication →
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/resend" className="text-primary hover:underline">
                      Resend Email Sending →
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/liveblocks" className="text-primary hover:underline">
                      Liveblocks Collaboration →
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/supabase" className="text-primary hover:underline">
                      Supabase Database →
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/openai" className="text-primary hover:underline">
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

