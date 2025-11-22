import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Pro Bundle",
    price: "$297",
    originalPrice: "$497",
    period: "one-time",
    description: "1 year of updates included",
    popular: true,
    features: [
      "All 16 integration templates",
      "DevFinder Chrome Extension",
      "Unlimited projects",
      "Commercial license",
      "1 year of updates",
      "Priority email support",
      "Private Discord community",
    ],
  },
  {
    name: "Pro Monthly",
    price: "$49",
    period: "per month",
    description: "Lifetime updates included",
    popular: false,
    features: [
      "All 16 integration templates",
      "DevFinder Chrome Extension",
      "Unlimited projects",
      "Commercial license",
      "Lifetime updates",
      "Priority email support",
      "Private Discord community",
      "First access to new integrations",
    ],
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-border bg-muted/30 py-24">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">Choose the plan that works best for you</p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative border p-8 ${plan.popular ? "border-primary shadow-lg" : "border-border bg-card"}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                  Black Friday Sale
                </Badge>
              )}

              <div className="mb-6">
                <h3 className="mb-2 text-2xl font-bold text-card-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  {plan.originalPrice && (
                    <span className="text-2xl font-medium text-muted-foreground line-through">
                      {plan.originalPrice}
                    </span>
                  )}
                  <span className="text-5xl font-bold tracking-tight text-card-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                {plan.popular && (
                  <p className="mt-2 text-sm font-medium text-primary">Use code BLACKFRIDAY50 at checkout</p>
                )}
              </div>

              <Button
                size="lg"
                className={`mb-6 w-full ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                Get Started
              </Button>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm leading-relaxed text-muted-foreground">{feature}</span>
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
