import { ArrowUpRight } from "lucide-react"
import { contact, hero, siteConfig } from "@/data/content"
import { Section } from "@/components/primitives/section"
import { Reveal } from "@/components/primitives/reveal"
import { CopyEmailButton } from "@/components/copy-email-button"

/*
 * The emotional close: an invitation, not a form. Bookends the hero —
 * same pulsing status dot, same display-type confidence — and funnels
 * everything into one tactile action. Absorbs the old Skills section as
 * a single quiet toolbox line.
 */
export function ContactSection() {
  return (
    <Section id="contact" index={3} title="Contact" className="mb-0 pb-8">
      <Reveal>
        <p className="font-mono text-xs text-muted-foreground">
          <span className="status-dot mr-2.5" aria-hidden="true" />
          {hero.availability}
        </p>
        <h3 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-6xl">
          {contact.headlineLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h3>
        <p className="mt-6 max-w-prose text-base leading-relaxed text-muted-foreground">
          {contact.sub}
        </p>
      </Reveal>

      <Reveal index={1} className="mt-10 sm:mt-12">
        <CopyEmailButton
          email={siteConfig.email}
          idleLabel={contact.cta.idle}
          copiedLabel={contact.cta.copied}
        />
        <p className="mt-4 font-mono text-xs text-muted-foreground">
          or write directly:{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="link-underline text-foreground"
          >
            {siteConfig.email}
          </a>
        </p>
      </Reveal>

      {/* Channels — the social area as part of the experience, not a footer utility */}
      <Reveal index={2} className="mt-16 sm:mt-20">
        <ul className="grid gap-x-10 sm:grid-cols-2">
          {contact.channels.map((channel) => (
            <li key={channel.label} className="border-t border-border">
              <a
                href={channel.href}
                {...(channel.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex items-baseline justify-between gap-4 py-4 transition-colors duration-(--duration-hover)"
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
      <Reveal index={3} className="mt-14">
        <p className="font-mono text-xs leading-relaxed text-muted-foreground">
          <span className="text-muted-foreground/60">usually reaching for — </span>
          {contact.toolbox.join(" · ")}
        </p>
      </Reveal>
    </Section>
  )
}
