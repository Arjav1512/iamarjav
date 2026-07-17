import { skills } from "@/data/content"
import { Section } from "@/components/primitives/section"
import { Reveal } from "@/components/primitives/reveal"

/*
 * Two registers of the same typographic system: the toolbox is a quiet
 * mono manifest (one tool per hairline row), the thinking column is five
 * words set large in the display face. Five rows against five words keeps
 * the columns in balance; no boxes, no pills, just type.
 */
export function SkillsSection() {
  return (
    <Section id="skills" index={2} title="Skills">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <h3 className="font-mono text-[11px] font-medium tracking-wide text-foreground/60">
            {skills.buildWith.heading}
          </h3>
          <ul className="mt-5">
            {skills.buildWith.items.map((item) => (
              <li
                key={item}
                className="border-b border-border py-2.5 font-mono text-sm text-foreground last:border-b-0"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal index={1} className="lg:col-span-6 lg:col-start-7">
          <h3 className="font-mono text-[11px] font-medium tracking-wide text-foreground/60">
            {skills.thinkIn.heading}
          </h3>
          <ul className="mt-5 space-y-2.5">
            {skills.thinkIn.items.map((item) => (
              <li
                key={item}
                className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
