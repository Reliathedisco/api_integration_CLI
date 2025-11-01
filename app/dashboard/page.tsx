import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  // TODO: Integrate with Clerk for authentication
  // TODO: Fetch user's purchase status from Supabase
  
  return (
    <>
      <Navigation />
      <main className="flex-1">
        <section className="container py-24">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your API integrations and access your license key
            </p>
          </div>

          <div className="grid gap-8 max-w-5xl">
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
                    <div className="flex-1 rounded-md bg-muted p-3 font-mono text-sm">
                      api-lic-xxxxxxxxxxxxxxxxxxxx
                    </div>
                    <Button variant="outline">Copy</Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Plan</p>
                    <p className="font-semibold">Pro Lifetime</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="font-semibold text-green-600">Active</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Projects</p>
                    <p className="font-semibold">Unlimited</p>
                  </div>
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
                  <p className="text-sm font-medium mb-2">1. Install the CLI</p>
                  <div className="rounded-md bg-muted p-3 font-mono text-sm">
                    npm install -g @api-integrations/cli
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">2. Initialize your project</p>
                  <div className="rounded-md bg-muted p-3 font-mono text-sm">
                    npx @api-integrations/cli init --with stripe,clerk
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">3. Set up environment variables</p>
                  <div className="rounded-md bg-muted p-3 font-mono text-sm">
                    cp .env.example .env.local
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  View Full Documentation
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
                  {['Stripe', 'Clerk', 'Resend', 'Liveblocks', 'Supabase'].map((name) => (
                    <div key={name} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">{name}</span>
                      <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
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
                <Button variant="outline" className="w-full justify-start">
                  📚 Read Documentation
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  💬 Join Discord Community
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📧 Email Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

