'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/copy-button";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function DashboardContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  
  const [license, setLicense] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchLicense() {
      // First check localStorage for saved license
      const savedLicense = localStorage.getItem('integrateapi_license');
      if (savedLicense) {
        try {
          setLicense(JSON.parse(savedLicense));
          setLoading(false);
          return;
        } catch (e) {
          localStorage.removeItem('integrateapi_license');
        }
      }

      // If we have a session_id from Stripe, fetch license
      if (sessionId) {
        try {
          const res = await fetch(`/api/get-license?session_id=${sessionId}`);
          const data = await res.json();
          
          if (data.license) {
            setLicense(data.license);
            // Save to localStorage for future visits
            localStorage.setItem('integrateapi_license', JSON.stringify(data.license));
          } else {
            setError(data.error || 'License not found');
          }
        } catch (err) {
          setError('Failed to fetch license');
        }
      }
      
      setLoading(false);
    }

    fetchLicense();
  }, [sessionId]);

  const hasLicense = !!license;

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your license...</p>
        </div>
      </div>
    );
  }

  if (!hasLicense) {
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <Card className="border-2 border-blue-500">
          <CardHeader>
            <CardTitle>Get Started with IntegrateAPI Pro</CardTitle>
            <CardDescription>
              {error || "Purchase a plan to unlock all integrations and the Chrome extension"}
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

        {/* Email Retrieval Form */}
        <Card>
          <CardHeader>
            <CardTitle>Already Purchased?</CardTitle>
            <CardDescription>
              Enter your email to retrieve your license key
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const email = formData.get('email') as string;
              
              setLoading(true);
              setError('');
              
              try {
                const res = await fetch('/api/get-license-by-email', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email }),
                });
                
                const data = await res.json();
                
                if (data.license) {
                  setLicense(data.license);
                  localStorage.setItem('integrateapi_license', JSON.stringify(data.license));
                  setError('');
                } else {
                  setError(data.error || 'No license found for this email. Make sure you use the email from your purchase.');
                }
              } catch (err) {
                setError('Failed to retrieve license. Please try again.');
              } finally {
                setLoading(false);
              }
            }} className="space-y-4">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}
              <input
                type="email"
                name="email"
                placeholder="email@you-used-to-purchase.com"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Searching...' : 'Retrieve My License'}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Enter the email you used when purchasing on Stripe
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-8 max-w-5xl mx-auto">
      {/* Success Message */}
      <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg p-6 text-center">
        <div className="text-4xl mb-2">🎉</div>
        <h2 className="text-2xl font-bold mb-2">Welcome to IntegrateAPI Pro!</h2>
        <p className="text-muted-foreground">
          Your purchase was successful. Here's everything you need to get started.
        </p>
      </div>

      {/* License Key */}
      <Card>
        <CardHeader>
          <CardTitle>Your License Key</CardTitle>
          <CardDescription>
            Use this when accessing the templates repository
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
                {license.plan_type?.replace('_', ' ') || 'Pro Lifetime'}
              </p>
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

      {/* Download Extension */}
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
        <CardHeader>
          <CardTitle>🔍 DevFinder Chrome Extension</CardTitle>
          <CardDescription>Download your visual element locator</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">
            Find API endpoints, webhooks, and keys on any website instantly.
          </p>
          <Button className="w-full" asChild>
            <a href="https://github.com/Reliathedisco/api_integration_CLI/archive/refs/heads/main.zip" download>
              📥 Download Templates & Extension
            </a>
          </Button>
          <div className="text-xs text-muted-foreground pt-4 border-t">
            <p className="font-semibold mb-2">Installation:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Extract ZIP → Navigate to public/devfinder-extension</li>
              <li>Chrome → chrome://extensions → Enable "Developer mode"</li>
              <li>Click "Load unpacked" → Select devfinder-extension folder</li>
              <li>Press Cmd+Shift+F on any page to activate!</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Rest of cards... */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Start</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">Download the ZIP above and copy templates to your Next.js project:</p>
          <div className="rounded-md bg-muted p-3 font-mono text-sm">
            cp -r packages/cli/templates/stripe/* ~/your-project/
          </div>
          <Button className="w-full" variant="outline" asChild>
            <a href="/docs">View Documentation</a>
          </Button>
        </CardContent>
      </Card>

      {/* Integrations */}
      <Card>
        <CardHeader>
          <CardTitle>Available Integrations</CardTitle>
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
    </div>
  );
}

