import { Card } from "@/components/ui/card"

const stats = [
  {
    value: "80-160",
    label: "Hours Saved",
    sublabel: "Per project on average",
  },
  {
    value: "$8,000",
    label: "Value Generated",
    sublabel: "At $100/hr developer rate",
  },
  {
    value: "$7,703",
    label: "Net Savings",
    sublabel: "After $297 investment",
  },
]

export function ROI() {
  return (
    <section className="py-24">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            The math is simple
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Stop wasting time on boilerplate and documentation
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.label} className="border border-border bg-card p-8 text-center">
              <div className="mb-2 text-5xl font-bold tracking-tight text-card-foreground">{stat.value}</div>
              <div className="mb-1 text-lg font-semibold text-card-foreground">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
            </Card>
          ))}
        </div>

        <Card className="mt-12 border border-border bg-muted/50 p-8">
          <h3 className="mb-4 text-center text-xl font-semibold text-card-foreground">
            Why developers choose Integrate API
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <p className="font-mono text-sm text-muted-foreground">Skip reading docs</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Get straight to implementation with code that actually works
              </p>
            </div>
            <div className="text-center">
              <p className="font-mono text-sm text-muted-foreground">Production-ready</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Security-hardened with proper error handling and validation
              </p>
            </div>
            <div className="text-center">
              <p className="font-mono text-sm text-muted-foreground">Find endpoints faster</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Chrome extension highlights everything you need in docs
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
