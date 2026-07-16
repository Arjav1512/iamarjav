import { about } from "@/data/content"
import { Reveal } from "@/components/primitives/reveal"

/*
 * Editorial introduction: one statement carrying the hero's energy
 * forward, one supporting paragraph. An introduction, not a README.
 * Owns the #about anchor (old deep links).
 */
export function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About"
      className="mb-(--spacing-section-sm) scroll-mt-24 lg:mb-(--spacing-section)"
    >
      <Reveal>
        <p className="max-w-[24ch] font-display text-[clamp(1.75rem,4.5vw,3rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-foreground">
          {about.statement}
        </p>
      </Reveal>
      <Reveal index={1}>
        <p className="mt-8 max-w-prose text-base leading-relaxed text-muted-foreground lg:ml-[25%]">
          {about.body}
        </p>
      </Reveal>
    </section>
  )
}
