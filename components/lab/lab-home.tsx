import { SiteNav } from "@/components/site-nav"
import { Hero } from "@/components/hero"
import { AboutSection } from "@/components/sections/about"
import { WorkSection } from "@/components/sections/work"
import { SkillsSection } from "@/components/sections/skills"
import { ExperimentsSection } from "@/components/sections/experiments"
import { JourneySection } from "@/components/sections/journey"
import { ArticlesSection } from "@/components/sections/articles"
import { ContactSection } from "@/components/sections/contact"
import { Footer } from "@/components/footer"
import { renderLabPreview } from "@/components/lab/featured-previews"
import { cn } from "@/lib/utils"

type LabView = "previews"

const VIEWS: { key: LabView | "original"; label: string; href: string }[] = [
  { key: "original", label: "original", href: "/#projects" },
  { key: "previews", label: "previews", href: "/lab/work#projects" },
]

/*
 * LAB (dev only): the home page composition, identical to app/page.tsx
 * except Featured Work renders the experimental previews. Kept separate
 * from app/page.tsx so the public page stays untouched. Delete components/lab/ and
 * app/lab/ to remove every experiment.
 */
export function LabHome({ view }: { view: LabView }) {
  return (
    <>
      <SiteNav />
      <Hero />
      <main id="main" className="mx-auto max-w-5xl px-6 pt-(--spacing-section-sm) md:px-12 lg:pt-(--spacing-section)">
        <AboutSection />
        <WorkSection renderPreview={(project) => renderLabPreview(project)} />
        <SkillsSection />
        <ExperimentsSection />
        <JourneySection />
        <ArticlesSection />
        <ContactSection />
        <Footer />
      </main>
      <nav
        aria-label="Lab views"
        className="lab-switch fixed bottom-4 right-4 z-50 flex items-center gap-0.5 rounded-full border border-border bg-background/90 p-1 font-mono text-[11px] shadow-sm backdrop-blur"
      >
        <span className="px-2 text-muted-foreground/70">lab</span>
        {VIEWS.map((v) => (
          <a
            key={v.key}
            href={v.href}
            aria-current={v.key === view ? "page" : undefined}
            className={cn(
              "rounded-full px-2.5 py-1 transition-colors",
              v.key === view
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {v.label}
          </a>
        ))}
      </nav>
    </>
  )
}
