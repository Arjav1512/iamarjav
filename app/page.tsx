import { SiteNav } from "@/components/site-nav"
import { Hero } from "@/components/hero"
import { AboutSection } from "@/components/sections/about"
import { ExperienceSection } from "@/components/sections/experience"
import { ProjectsSection } from "@/components/sections/projects"
import { SkillsSection } from "@/components/sections/skills"
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
      {/* Sections below keep their pre-redesign layouts until their phases */}
      <main id="main" className="mx-auto max-w-3xl px-6 pt-(--spacing-section-sm) md:px-12 lg:pt-(--spacing-section)">
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
