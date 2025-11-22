import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <section className="border-t border-border bg-muted/30 py-24">
      <div className="container mx-auto max-w-4xl px-6 text-center">
        <h2 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Start shipping integrations today
        </h2>
        <p className="mb-10 text-pretty text-lg leading-relaxed text-muted-foreground">
          Join developers who are saving hundreds of hours and shipping faster with production-ready integration
          templates.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/pricing">
            <Button size="lg" className="h-12 gap-2 bg-primary px-8 text-primary-foreground hover:bg-primary/90">
              Get 50% Off Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/integrations">
            <Button size="lg" variant="outline" className="h-12 px-8 bg-transparent">
              View All Integrations
            </Button>
          </Link>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Use code <span className="font-mono font-semibold text-foreground">BLACKFRIDAY50</span> at checkout
        </p>
      </div>
    </section>
  )
}
