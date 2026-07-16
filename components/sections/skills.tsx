import { skills } from "@/data/content"
import { Section } from "@/components/primitives/section"
import { Reveal } from "@/components/primitives/reveal"
import { Tag } from "@/components/primitives/tag"

/*
 * Identity in two registers, not a spreadsheet. Left: the toolbox as one
 * tight, bordered cluster (mono pills). Right: how the thinking happens,
 * set open and airy in the display face. Five items each, no lists of
 * keywords.
 */
export function SkillsSection() {
  return (
    <Section id="skills" index={2} title="Skills">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
            {skills.buildWith.heading}
          </h3>
          <div className="mt-5 rounded-xl border border-border bg-card/40 p-5">
            <div className="flex flex-wrap gap-2">
              {skills.buildWith.items.map((item) => (
                <Tag key={item} className="px-3 py-1 text-xs">
                  {item}
                </Tag>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal index={1} className="lg:col-span-6 lg:col-start-7">
          <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
            {skills.thinkIn.heading}
          </h3>
          <ul className="mt-5 space-y-3.5">
            {skills.thinkIn.items.map((item) => (
              <li
                key={item}
                className="font-display text-xl font-medium tracking-tight text-foreground sm:text-2xl"
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
