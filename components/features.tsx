import { Card } from "@/components/ui/card"
import { Terminal, Chrome, Shield, Zap } from "lucide-react"

const features = [
  {
    icon: Terminal,
    title: "Integration Templates",
    description:
      "TypeScript implementations with webhook handlers, signature verification, error handling, and environment setup. Built for Next.js 14 App Router.",
  },
  {
    icon: Chrome,
    title: "DevFinder Extension",
    description:
      "Highlights API endpoints in blue, webhooks in green, API keys in purple, and auth tokens in orange. Click-to-copy with Cmd+Shift+F shortcut.",
  },
  {
    icon: Shield,
    title: "Production Ready",
    description:
      "Security-hardened code with proper validation, error boundaries, and loading states. Skip the docs and boilerplate.",
  },
  {
    icon: Zap,
    title: "Fast Integration",
    description:
      "Real-world examples with server and client component patterns. Get up and running in minutes, not days.",
  },
]

export function Features() {
  return (
    <section id="features" className="border-t border-border bg-muted/30 py-24">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Everything you need to integrate faster
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Two powerful products bundled together for maximum productivity
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="border border-border bg-card p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-card-foreground">{feature.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
