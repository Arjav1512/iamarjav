import { skills } from "@/data/content"
import { Section } from "@/components/primitives/section"
import { Reveal } from "@/components/primitives/reveal"

/*
 * Two deliberately contrasting columns. Tools read as an inventory
 * (mono, hairline rows, tight); thinking reads as prose-adjacent
 * (display face, larger, airy). Same section, different registers.
 */
export function SkillsSection() {
  return (
    <Section id="skills" index={2} title="Skills">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
            {skills.buildWith.heading}
          </h3>
          <ul className="mt-6">
            {skills.buildWith.items.map((item, i) => (
              <li
                key={item}
                className={
                  "flex items-baseline gap-3 border-b border-border py-2.5 font-mono text-sm text-muted-foreground" +
                  (i === 0 ? " border-t" : "")
                }
              >
                <span className="text-[11px] text-muted-foreground/70" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal index={1}>
          <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
            {skills.thinkIn.heading}
          </h3>
          <ul className="mt-6 space-y-4">
            {skills.thinkIn.items.map((item) => (
              <li
                key={item}
                className="font-display text-lg font-medium tracking-tight text-foreground sm:text-xl"
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
