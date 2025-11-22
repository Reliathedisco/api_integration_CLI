import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Integrations } from "@/components/integrations"
import { Pricing } from "@/components/pricing"
import { ROI } from "@/components/roi"
import { CTA } from "@/components/cta"

export default function Page() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <Features />
        <Integrations />
        <Pricing />
        <ROI />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
