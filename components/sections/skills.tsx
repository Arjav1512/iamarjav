import { skills } from "@/data/content"
import { Section } from "@/components/primitives/section"
import { Reveal } from "@/components/primitives/reveal"
import { Tag } from "@/components/primitives/tag"

/*
 * Two curated groups in different registers. The toolbox is one bordered
 * mono cluster, quiet and tight; the thinking column is five words set
 * large in the display face. Typography carries the hierarchy.
 */
export function SkillsSection() {
  return (
    <Section id="skills" index={2} title="Skills">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <h3 className="font-mono text-[11px] font-medium tracking-wide text-foreground/60">
            {skills.buildWith.heading}
          </h3>
          <div className="mt-4 rounded-xl border border-border bg-card/40 p-5">
            <div className="flex flex-wrap gap-2">
              {skills.buildWith.items.map((item) => (
                <Tag key={item} className="px-3.5 py-1.5 text-xs">
                  {item}
                </Tag>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal index={1} className="lg:col-span-6 lg:col-start-7">
          <h3 className="font-mono text-[11px] font-medium tracking-wide text-foreground/60">
            {skills.thinkIn.heading}
          </h3>
          <ul className="mt-4 space-y-2.5">
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
