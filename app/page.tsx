import { SiteNav } from "@/components/site-nav"
import { Hero } from "@/components/hero"
import { WorkSection } from "@/components/sections/work"
import { JourneySection } from "@/components/sections/journey"
import { ContactSection } from "@/components/sections/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <SiteNav />
      <Hero />
      <main id="main" className="mx-auto max-w-3xl px-6 pt-(--spacing-section-sm) md:px-12 lg:pt-(--spacing-section)">
        <WorkSection />
        <JourneySection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
