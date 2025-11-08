import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/copy-button";
import { sql } from "@/lib/neon/client";

export default async function DashboardPage() {
  // Fetch user's license from Neon
  const licenses = await sql`
    SELECT key, status, plan_type, created_at 
    FROM license_keys 
    WHERE status = 'active' 
    ORDER BY created_at DESC 
    LIMIT 1
  `;
  
  const license = licenses[0];
  const hasLicense = !!license;
  
  return (
    <>
      <Navigation />
      <main className="flex-1">
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-24">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              {hasLicense 
                ? "Manage your API integrations and access your license key"
                : "Purchase a plan to get access to IntegrateAPI Pro"
              }
            </p>
          </div>

          {!hasLicense ? (
            // No License - Show Upsell
            <div className="max-w-2xl mx-auto">
              <Card className="border-2 border-blue-500">
                <CardHeader>
                  <CardTitle>Get Started with IntegrateAPI Pro</CardTitle>
                  <CardDescription>
                    Purchase a plan to unlock all integrations and the Chrome extension
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-6 text-muted-foreground">
                    You don't have an active license yet. Get the Pro Bundle to access:
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      CLI with 6 integrations
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      DevFinder Chrome Extension
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      1 year of updates
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      Priority support
                    </li>
                  </ul>
                  <Button className="w-full" size="lg" asChild>
                    <a href="/pricing">View Pricing</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            // Has License - Show Dashboard
            <div className="grid gap-8 max-w-5xl mx-auto">
              {/* License Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Your License</CardTitle>
                  <CardDescription>
                    Use this license key when running the CLI
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">License Key</label>
                    <div className="flex gap-2">
                      <div className="flex-1 rounded-md bg-muted p-3 font-mono text-sm break-all">
                        {license.key}
                      </div>
                      <CopyButton text={license.key} />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">Plan</p>
                      <p className="font-semibold capitalize">
                        {license.plan_type.replace('_', ' ')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-semibold text-green-600">
                        {license.status === 'active' ? 'Active' : license.status}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Projects</p>
                      <p className="font-semibold">Unlimited</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Download Extension */}
              <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
                <CardHeader>
                  <CardTitle>🔍 DevFinder Chrome Extension</CardTitle>
                  <CardDescription>
                    Download your visual element locator extension
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    The DevFinder extension helps you instantly find API endpoints, webhooks, and keys on any website.
                  </p>
                  <div className="space-y-3">
                    <Button className="w-full" asChild>
                      <a href="/devfinder-extension.zip" download>
                        📥 Download Extension
                      </a>
                    </Button>
                    <Button className="w-full" variant="outline" asChild>
                      <a href="https://github.com/Reliathedisco/api_integration_CLI/tree/main/public/devfinder-extension" target="_blank">
                        📖 Installation Guide
                      </a>
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p className="font-semibold mb-2">How to install:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Download and extract the ZIP file</li>
                      <li>Go to chrome://extensions in Chrome</li>
                      <li>Enable "Developer mode"</li>
                      <li>Click "Load unpacked" and select the folder</li>
                      <li>Press Cmd+Shift+F on any page to activate!</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Start */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Start</CardTitle>
                  <CardDescription>
                    Get started with your first integration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">1. Install the CLI globally</p>
                    <div className="rounded-md bg-muted p-3 font-mono text-sm">
                      npm install -g @integrateapi/cli
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">2. Initialize your project</p>
                    <div className="rounded-md bg-muted p-3 font-mono text-sm">
                      npx @integrateapi/cli init --with stripe,clerk
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">3. Set up environment variables</p>
                    <div className="rounded-md bg-muted p-3 font-mono text-sm">
                      cp .env.example .env.local
                    </div>
                  </div>
                  <Button className="w-full" variant="outline" asChild>
                    <a href="/docs">View Full Documentation</a>
                  </Button>
                </CardContent>
              </Card>

              {/* Available Integrations */}
              <Card>
                <CardHeader>
                  <CardTitle>Available Integrations</CardTitle>
                  <CardDescription>
                    All integrations included in your plan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {['Stripe', 'Clerk', 'Resend', 'Liveblocks', 'Supabase', 'OpenAI'].map((name) => (
                      <div key={name} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">{name}</span>
                        <span className="text-xs text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
                          Available
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Support */}
              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                  <CardDescription>
                    Get support and connect with the community
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/docs">📚 Read Documentation</a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="mailto:hello@integrateapi.io">📧 Email Support</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
