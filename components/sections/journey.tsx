import { journey } from "@/data/content"
import { Section } from "@/components/primitives/section"
import { Reveal } from "@/components/primitives/reveal"

/*
 * Journey — a magazine feature, not a résumé. Four chapters of evolution:
 * mono stage kicker, statement headline, one narrative paragraph, the
 * verifiable facts behind it, and the "what changed" takeaway. Absorbs the
 * old About and Experience sections (their anchors live on as aliases).
 */
export function JourneySection() {
  return (
    <Section id="journey" index={2} title="Journey" aliasIds={["about", "experience"]}>
      <Reveal>
        <p className="max-w-prose font-display text-lg font-medium leading-relaxed tracking-tight text-foreground sm:text-xl">
          {journey.lede}
        </p>
      </Reveal>

      <div className="mt-16 flex flex-col gap-16 lg:mt-20 lg:gap-24">
        {journey.chapters.map((chapter, i) => (
          <Reveal key={chapter.stage} index={i}>
            <article className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-3">
                <p className="font-mono text-xs text-muted-foreground lg:pt-2">
                  {chapter.stage}
                </p>
              </div>
              <div className="mt-3 lg:col-span-9 lg:mt-0">
                <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {chapter.headline}
                </h3>
                <p className="mt-4 max-w-prose text-base leading-relaxed text-muted-foreground">
                  {chapter.narrative}
                </p>
                <ul className="mt-6 space-y-2">
                  {chapter.facts.map((fact) => (
                    <li
                      key={fact}
                      className="flex gap-2.5 font-mono text-xs leading-relaxed text-muted-foreground"
                    >
                      <span aria-hidden="true" className="text-border">
                        -
                      </span>
                      {fact}
                    </li>
                  ))}
                </ul>
                {chapter.outcome && (
                  <p className="mt-6 text-sm font-medium text-foreground">
                    {chapter.outcome}
                  </p>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-20 border-t border-border pt-10 lg:mt-24 lg:pt-12">
        <blockquote className="max-w-2xl">
          <p className="font-display text-xl font-medium leading-snug tracking-tight text-foreground sm:text-2xl">
            &ldquo;{journey.closing.quote}&rdquo;
          </p>
          <footer className="mt-4 font-mono text-xs text-muted-foreground">
            {journey.closing.note}
          </footer>
        </blockquote>
      </Reveal>
    </Section>
  )
}
