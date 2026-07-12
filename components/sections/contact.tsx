import { ArrowUpRight } from "lucide-react"
import { contact, hero, siteConfig } from "@/data/content"
import { Section } from "@/components/primitives/section"
import { Reveal } from "@/components/primitives/reveal"
import { CopyEmailButton } from "@/components/copy-email-button"

/*
 * The closing experience — the emotional conclusion, in three layers:
 *   1. an oversized editorial statement (identity),
 *   2. a conversational invitation + one tactile magnetic action,
 *   3. a designed communication surface.
 * Bookends the hero (same pulsing availability dot) and absorbs the old
 * Skills section as a single quiet toolbox line.
 */
export function ContactSection() {
  return (
    <Section id="contact" index={3} title="Contact" className="mb-0 pb-8">
      {/* availability — the hero's dot, returning at the end */}
      <Reveal>
        <p className="font-mono text-xs text-muted-foreground">
          <span className="status-dot mr-2.5" aria-hidden="true" />
          {hero.availability}
        </p>
      </Reveal>

      {/* Layer 1 — the statement */}
      <Reveal index={1}>
        <h3 className="mt-8 max-w-[16ch] font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.98] tracking-[-0.03em] text-foreground">
          {contact.statement.lead}{" "}
          <span className="text-muted-foreground/50">{contact.statement.trail}</span>
        </h3>
      </Reveal>

      {/* Layer 2 — the invitation + tactile action */}
      <Reveal index={2} className="mt-14 sm:mt-16">
        <p className="max-w-prose font-display text-xl font-medium tracking-tight text-foreground sm:text-2xl">
          {contact.invite.headline}
        </p>
        <p className="mt-4 max-w-prose text-base leading-relaxed text-muted-foreground">
          {contact.invite.sub}
        </p>

        <div className="mt-10">
          <CopyEmailButton
            email={siteConfig.email}
            idleLabel={contact.cta.idle}
            copiedLabel={contact.cta.copied}
          />
        </div>
      </Reveal>

      {/* Layer 3 — the communication surface */}
      <Reveal index={3} className="mt-16 sm:mt-20">
        <h4 className="mb-4 font-mono text-xs text-muted-foreground">or find me here</h4>
        <ul className="overflow-hidden rounded-2xl border border-border">
          {contact.channels.map((channel, i) => (
            <li key={channel.label}>
              <a
                href={channel.href}
                {...(channel.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={`group flex items-baseline justify-between gap-4 px-5 py-4 transition-colors duration-(--duration-hover) hover:bg-secondary/60 ${
                  i > 0 ? "border-t border-border" : ""
                }`}
              >
                <span className="font-mono text-xs text-muted-foreground transition-colors duration-(--duration-hover) group-hover:text-foreground">
                  {channel.label}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                  {channel.handle}
                  <ArrowUpRight
                    className="size-3.5 text-muted-foreground transition-all duration-(--duration-hover) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Toolbox — the Skills section, absorbed into one honest line */}
      <Reveal index={4} className="mt-10 border-t border-dashed border-border pt-8">
        <p className="font-mono text-xs leading-relaxed text-muted-foreground">
          <span className="text-muted-foreground/60">usually reaching for — </span>
          {contact.toolbox.join(" · ")}
        </p>
      </Reveal>
    </Section>
  )
}
