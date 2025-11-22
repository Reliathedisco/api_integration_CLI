import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="container mx-auto max-w-7xl px-6 py-24 md:py-32 pt-32 md:pt-40">
      <div className="mx-auto max-w-3xl text-center">
        <Badge variant="secondary" className="mb-6 gap-1.5 px-3 py-1.5">
          <Sparkles className="h-3.5 w-3.5" />
          <span className="text-xs font-medium">Save 50% with code BLACKFRIDAY50</span>
        </Badge>

        <h1 className="mb-6 text-balance font-sans text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Ship integrations faster with ready-to-use code
        </h1>

        <p className="mb-10 text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          Complete developer toolkit for Next.js. Get production-ready TypeScript templates and a Chrome extension that
          highlights API endpoints, webhooks, and auth tokens in documentation.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/pricing">
            <Button size="lg" className="h-12 gap-2 bg-primary px-8 text-primary-foreground hover:bg-primary/90">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/integrations">
            <Button size="lg" variant="outline" className="h-12 px-8 bg-transparent">
              View Integrations
            </Button>
          </Link>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Save 80–160 hours per project • Production-ready code • Commercial license included
        </p>
      </div>
    </section>
  )
}
