import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const integrationCategories = [
  {
    category: "Payments & Billing",
    integrations: ["Stripe", "Lemon Squeezy"],
  },
  {
    category: "Authentication",
    integrations: ["Clerk", "Auth0"],
  },
  {
    category: "Email",
    integrations: ["Resend", "SendGrid"],
  },
  {
    category: "Real-time",
    integrations: ["Liveblocks", "Ably"],
  },
  {
    category: "Database & Backend",
    integrations: ["Supabase", "PlanetScale"],
  },
  {
    category: "AI",
    integrations: ["OpenAI", "Anthropic Claude"],
  },
  {
    category: "Analytics & Content",
    integrations: ["PostHog", "Sanity"],
  },
  {
    category: "File Storage & Search",
    integrations: ["Uploadthing", "Meilisearch"],
  },
]

export function Integrations() {
  return (
    <section id="integrations" className="py-24">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <Badge variant="secondary" className="mb-4">
            16 Integrations
          </Badge>
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            All the tools you already use
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Production-ready templates for the most popular services
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {integrationCategories.map((category) => (
            <Card key={category.category} className="border border-border bg-card p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {category.category}
              </h3>
              <ul className="space-y-3">
                {category.integrations.map((integration) => (
                  <li key={integration} className="flex items-center gap-2 text-card-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {integration}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
