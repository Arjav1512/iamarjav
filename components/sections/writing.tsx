import { writingStatements } from "@/data/content"
import { Reveal } from "@/components/primitives/reveal"

/*
 * Philosophy at poster scale: oversized statements, no supporting copy,
 * alternating ink/muted so the rhythm reads down the page. No header
 * chrome; the statements are the section.
 */
export function WritingSection() {
  return (
    <section
      id="writing"
      aria-label="Beliefs about building"
      className="mb-(--spacing-section-sm) scroll-mt-24 lg:mb-(--spacing-section)"
    >
      <ul className="space-y-6 sm:space-y-8">
        {writingStatements.map((statement, i) => (
          <Reveal key={statement} index={i}>
            <li
              className={
                "font-display text-[clamp(1.9rem,5.5vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em] " +
                (i % 2 === 0 ? "text-foreground" : "text-muted-foreground/50")
              }
            >
              {statement}
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
