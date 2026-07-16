import { about } from "@/data/content"
import { Reveal } from "@/components/primitives/reveal"

/*
 * Editorial pause after the hero: kicker, statement, two short beats,
 * then a signature sentence. Rhythm over paragraphs. Owns #about.
 */
export function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About"
      className="mb-(--spacing-section-sm) scroll-mt-24 lg:mb-(--spacing-section)"
    >
      <Reveal>
        <p className="font-mono text-[11px] text-muted-foreground">{about.kicker}</p>
        <p className="mt-5 max-w-[24ch] font-display text-[clamp(1.75rem,4.5vw,3rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-foreground">
          {about.statement}
        </p>
      </Reveal>

      <div className="mt-10 max-w-prose space-y-4 lg:ml-[25%]">
        {about.body.map((beat, i) => (
          <Reveal key={beat} index={i + 1}>
            <p className="text-base leading-relaxed text-muted-foreground">{beat}</p>
          </Reveal>
        ))}
      </div>

      <Reveal index={3} className="mt-10 lg:ml-[25%]">
        <p className="max-w-[44ch] border-l-2 border-foreground/25 pl-4 font-display text-lg font-medium leading-snug tracking-tight text-foreground">
          {about.signature}
        </p>
      </Reveal>
    </section>
  )
}
