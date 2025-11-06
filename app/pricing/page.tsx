import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CheckoutButton } from "@/components/checkout-button";

export default function PricingPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-20">
          
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-semibold">
              🔥 LAUNCH SPECIAL: $200 OFF - 47 Licenses Left
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              The Complete Developer Toolkit
            </h1>
            <p className="text-xl text-muted-foreground">
              CLI Tool + Chrome Extension + 6 Integrations + Lifetime Updates
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-20 max-w-5xl mx-auto">
            
            {/* ONE-TIME PURCHASE - FEATURED */}
            <div className="border-2 border-blue-500 rounded-2xl p-8 bg-white dark:bg-gray-900 relative shadow-2xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                🔥 BEST VALUE - $200 OFF
              </div>

              <div className="mb-6 mt-4">
                <h3 className="text-2xl font-bold mb-2">IntegrateAPI Pro</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">$297</span>
                  <span className="text-gray-400 line-through text-xl">$497</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">one-time payment • lifetime access</p>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-6 font-medium">
                Complete toolkit for professional developers
              </p>

              <CheckoutButton
                priceId={process.env.NEXT_PUBLIC_STRIPE_PRO_ONE_TIME_PRICE_ID || 'price_1SOurP6355Ofpl9vVpapyJij'}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50 text-lg"
              >
                Get Pro Bundle - $297
              </CheckoutButton>

              <div className="mt-8 space-y-4">
                <div className="border-b pb-4">
                  <p className="font-semibold mb-2">🛠️ IntegrateAPI CLI</p>
                  <ul className="space-y-2 text-sm ml-6">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>All 6 integrations (Stripe, Clerk, Resend, Liveblocks, Supabase, OpenAI)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Production-ready code with error handling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Webhook signature verification included</span>
                    </li>
                  </ul>
                </div>

                <div className="border-b pb-4">
                  <p className="font-semibold mb-2">🔍 DevFinder Chrome Extension</p>
                  <ul className="space-y-2 text-sm ml-6">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">✓</span>
                      <span>Instantly find API endpoints on any website</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">✓</span>
                      <span>Locate webhooks, keys & tokens visually</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">✓</span>
                      <span>Click to copy any value to clipboard</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span className="text-sm"><strong>1 year of updates</strong></span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span className="text-sm">Priority email support</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span className="text-sm">Private Discord community</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span className="text-sm">Commercial license</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span className="text-sm">Unlimited projects</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                <p className="text-sm text-center font-semibold">
                  ⏰ <strong>47 licenses left</strong> at launch price
                </p>
                <p className="text-xs text-center text-gray-600 dark:text-gray-400 mt-1">
                  Price increases to $497 after launch special ends
                </p>
              </div>
            </div>

            {/* MONTHLY SUBSCRIPTION */}
            <div className="border-2 rounded-2xl p-8 bg-white dark:bg-gray-900">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Pro Monthly</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">$49</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  cancel anytime • great for agencies
                </p>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-6">
                For teams shipping multiple products
              </p>

              <CheckoutButton
                priceId={process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID || 'price_1SOurD6355Ofpl9vOVoDfhdC'}
                className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition disabled:opacity-50"
              >
                Subscribe for $49/month
              </CheckoutButton>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-sm"><strong>Everything in Pro Bundle</strong></span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span className="text-sm"><strong>Lifetime updates</strong> (as long as subscribed)</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span className="text-sm"><strong>New integrations</strong> added monthly</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span className="text-sm">API breaking changes fixed immediately</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span className="text-sm">Early access to new features</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span className="text-sm">Vote on integration requests</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span className="text-sm">Priority support (&lt; 12h response)</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span className="text-sm">Cancel anytime, no questions asked</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-xs text-center text-gray-600 dark:text-gray-400">
                  💡 <strong>Best for agencies:</strong> Use across all client projects
                </p>
              </div>
            </div>
          </div>

          {/* What's Included Details */}
          <div className="max-w-5xl mx-auto mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">What's Included in the Bundle</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* CLI Details */}
              <div className="border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span>⌨️</span>
                  IntegrateAPI CLI
                </h3>
                <p className="text-muted-foreground mb-4">
                  Generate production-ready API integrations with one command
                </p>
                <div className="bg-black text-green-400 rounded-lg p-4 mb-4 font-mono text-sm">
                  $ npx @api-integrations/cli init<br/>
                  <span className="text-gray-400">✓ Copied 24 files</span><br/>
                  <span className="text-blue-400">✨ Done in 30s</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2"><span className="text-blue-500">→</span> Stripe payment processing</li>
                  <li className="flex gap-2"><span className="text-blue-500">→</span> Clerk authentication</li>
                  <li className="flex gap-2"><span className="text-blue-500">→</span> Resend email templates</li>
                  <li className="flex gap-2"><span className="text-blue-500">→</span> Liveblocks real-time</li>
                  <li className="flex gap-2"><span className="text-blue-500">→</span> Supabase database</li>
                  <li className="flex gap-2"><span className="text-blue-500">→</span> OpenAI integration</li>
                </ul>
              </div>

              {/* Extension Details */}
              <div className="border rounded-xl p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span>🔍</span>
                  DevFinder Extension
                </h3>
                <p className="text-muted-foreground mb-4">
                  Visual overlay to find API endpoints, webhooks & keys on any website
                </p>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold mb-3">Instantly Highlights:</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span>API Endpoints (/api/, /v1/, /graphql)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Webhooks (/webhook, /hooks, /callback)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      <span>API Keys (sk_, pk_, data-key)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span>Auth Tokens (Bearer, access_token)</span>
                    </div>
                  </div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2"><span className="text-purple-500">→</span> Works on ANY website</li>
                  <li className="flex gap-2"><span className="text-purple-500">→</span> Click to copy values</li>
                  <li className="flex gap-2"><span className="text-purple-500">→</span> Keyboard shortcut (Cmd+Shift+F)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* ROI Calculator */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-12 mb-20 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Your ROI on First Project
            </h2>
            
            <div className="max-w-2xl mx-auto">
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Your hourly rate</p>
                  <p className="text-4xl font-bold">$100</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Time saved per project</p>
                  <p className="text-4xl font-bold">20 hrs</p>
                </div>
              </div>

              <div className="border-t-2 border-dashed border-gray-300 pt-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg">Value of time saved:</span>
                  <span className="text-2xl font-bold">$2,000</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg">Cost of Pro Bundle:</span>
                  <span className="text-2xl font-bold text-gray-500">-$297</span>
                </div>
                <div className="flex justify-between items-center text-green-600 text-xl font-bold pt-4 border-t-2 border-gray-900 dark:border-white">
                  <span>Your profit:</span>
                  <span className="text-3xl">$1,703</span>
                </div>
              </div>

              <p className="text-center text-sm text-gray-600 mt-8">
                That's <strong>6.7x ROI</strong> on your first project. Every project after is pure profit.
              </p>
            </div>
          </div>

          {/* Comparison */}
          <div className="max-w-4xl mx-auto mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">
              One-Time vs Monthly
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2">
                    <th className="text-left py-4 px-4">Feature</th>
                    <th className="text-center py-4 px-4 bg-blue-50 dark:bg-blue-900/20">Pro Bundle<br/>$297</th>
                    <th className="text-center py-4 px-4">Monthly<br/>$49/mo</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-3 px-4">CLI Tool</td>
                    <td className="text-center py-3 px-4 bg-blue-50 dark:bg-blue-900/20">✅</td>
                    <td className="text-center py-3 px-4">✅</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Chrome Extension</td>
                    <td className="text-center py-3 px-4 bg-blue-50 dark:bg-blue-900/20">✅</td>
                    <td className="text-center py-3 px-4">✅</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">All 6 Integrations</td>
                    <td className="text-center py-3 px-4 bg-blue-50 dark:bg-blue-900/20">✅</td>
                    <td className="text-center py-3 px-4">✅</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Updates Included</td>
                    <td className="text-center py-3 px-4 bg-blue-50 dark:bg-blue-900/20">1 year</td>
                    <td className="text-center py-3 px-4">Lifetime</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">New Integrations</td>
                    <td className="text-center py-3 px-4 bg-blue-50 dark:bg-blue-900/20">❌</td>
                    <td className="text-center py-3 px-4">✅</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Total Cost (Year 1)</td>
                    <td className="text-center py-3 px-4 bg-blue-50 dark:bg-blue-900/20 font-bold">$297</td>
                    <td className="text-center py-3 px-4 font-bold">$588</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              💡 Pro Bundle saves you $291 in the first year alone
            </p>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <details className="border rounded-lg p-6">
                <summary className="font-semibold cursor-pointer">
                  What's the Chrome extension do?
                </summary>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  <strong>DevFinder</strong> visually highlights API endpoints, webhooks, keys, and tokens on ANY website. 
                  It's like "inspect element" but specifically for developers integrating APIs. Just press Cmd+Shift+F 
                  on any docs page and instantly see all the important stuff highlighted in color.
                </p>
              </details>

              <details className="border rounded-lg p-6">
                <summary className="font-semibold cursor-pointer">
                  Can I use this for multiple projects?
                </summary>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  Yes! Both plans allow <strong>unlimited projects</strong>. Use the CLI and extension for all your 
                  client work, personal projects, and commercial products.
                </p>
              </details>

              <details className="border rounded-lg p-6">
                <summary className="font-semibold cursor-pointer">
                  What if I only want the CLI, not the extension?
                </summary>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  The bundle includes both because they work better together, but you can absolutely use just the CLI. 
                  The extension is a bonus tool to speed up your workflow.
                </p>
              </details>

              <details className="border rounded-lg p-6">
                <summary className="font-semibold cursor-pointer">
                  Do I get updates?
                </summary>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  <strong>Pro Bundle ($297):</strong> 1 year of updates and bug fixes.<br/><br/>
                  <strong>Monthly ($49/mo):</strong> Lifetime updates + new integrations as long as you're subscribed.
                </p>
              </details>

              <details className="border rounded-lg p-6">
                <summary className="font-semibold cursor-pointer">
                  Is this worth $297?
                </summary>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  Each integration saves you 3-5 hours of setup time. At $100/hr rate:<br/>
                  • 6 integrations × 4 hours = 24 hours saved<br/>
                  • 24 hours × $100 = <strong>$2,400 value</strong><br/>
                  • You're paying $297 for $2,400 worth of your time<br/><br/>
                  
                  Plus you get the Chrome extension (worth $50+ standalone) and can reuse everything across unlimited projects.
                </p>
              </details>

              <details className="border rounded-lg p-6">
                <summary className="font-semibold cursor-pointer">
                  What if I'm not satisfied?
                </summary>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  <strong>30-day money-back guarantee.</strong> If the integrations don't save you time or the 
                  extension doesn't help, email us and we'll refund you immediately. No questions asked.
                </p>
              </details>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center mt-20">
            <h2 className="text-4xl font-bold mb-6">
              Ready to ship 10x faster?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Join developers building production apps in days, not months
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <CheckoutButton
                priceId={process.env.NEXT_PUBLIC_STRIPE_PRO_ONE_TIME_PRICE_ID || 'price_1SOurP6355Ofpl9vVpapyJij'}
                className="px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition"
              >
                Get Pro Bundle - $297
              </CheckoutButton>
            </div>
            <p className="text-sm text-gray-500">
              🔒 Secure checkout • 💳 30-day guarantee • ⏰ Launch price ends in 48 hours
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
