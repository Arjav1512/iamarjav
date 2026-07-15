import { journey } from "@/data/content"
import { Section } from "@/components/primitives/section"
import { Reveal } from "@/components/primitives/reveal"
import { JourneyTimeline } from "@/components/motion/journey-timeline"

/*
 * Journey as a horizontal timeline, 2024 to now: scroll pans the track,
 * the progress line fills, the current milestone activates. Closes on the
 * README pull-quote. The old #experience anchor lives on as an alias.
 */
export function JourneySection() {
  return (
    <Section id="journey" index={3} title="Journey" aliasIds={["experience"]}>
      <JourneyTimeline milestones={journey.milestones} />

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
