import { SiteNav } from "@/components/site-nav"
import { Hero } from "@/components/hero"
import { AboutSection } from "@/components/sections/about"
import { WorkSection } from "@/components/sections/work"
import { SkillsSection } from "@/components/sections/skills"
import { ExperimentsSection } from "@/components/sections/experiments"
import { JourneySection } from "@/components/sections/journey"
import { WritingSection } from "@/components/sections/writing"
import { ArticlesSection } from "@/components/sections/articles"
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
      {/* The builder's story: intro, proof, tools/thinking, side quests,
          the journey, philosophy, writing, then the invitation. */}
      <main id="main" className="mx-auto max-w-5xl px-6 pt-(--spacing-section-sm) md:px-12 lg:pt-(--spacing-section)">
        <AboutSection />
        <WorkSection />
        <SkillsSection />
        <ExperimentsSection />
        <JourneySection />
        <WritingSection />
        <ArticlesSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
