import { about } from "@/data/content"
import { Reveal } from "@/components/primitives/reveal"

/*
 * Editorial introduction, straight after the hero. Deliberately lighter
 * than the numbered sections: no header chrome, just three short
 * paragraphs at reading pace. Owns the #about anchor (old deep links).
 */
export function AboutSection() {
  return (
    <section id="about" aria-label="About" className="mb-(--spacing-section-sm) scroll-mt-24 lg:mb-(--spacing-section)">
      <div className="max-w-prose space-y-5">
        {about.map((paragraph, i) => (
          <Reveal key={paragraph} index={i}>
            <p className="text-base leading-relaxed text-foreground sm:text-lg">
              {paragraph}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
