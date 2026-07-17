import { Github, Linkedin } from "lucide-react"
import { hero, siteConfig } from "@/data/content"
import { EmailPopup } from "@/components/email-popup"
import { XIcon } from "@/components/icons"
import { HeroMotion } from "@/components/motion/hero-motion"

/*
 * The emotional anchor of the site: one enormous statement, one live
 * status line, nothing else competing. The pulsing dot is the single
 * accent element in this viewport. HeroMotion plays the entrance timeline
 * over the [data-hero] elements; this stays a server component (static text).
 */
export function Hero() {
  return (
    <header
      id="top"
      className="relative flex min-h-svh flex-col justify-center px-6 md:px-12"
    >
      <HeroMotion>
        <div className="mx-auto w-full max-w-[1120px]">
          <p data-hero className="mb-6 font-mono text-sm text-muted-foreground">
            {hero.greeting}
          </p>

          <h1 className="font-display text-[clamp(2.75rem,9vw,7.5rem)] font-bold leading-[0.98] tracking-[-0.03em] text-foreground">
            {hero.headlineLines.map((line) => (
              <span key={line} data-hero className="block">
                {line}
              </span>
            ))}
          </h1>

          <div data-hero className="mt-10 space-y-2">
            <p className="font-mono text-xs leading-relaxed text-muted-foreground sm:text-sm">
              <span className="status-dot mr-2.5" aria-hidden="true" />
              {hero.status.now}
            </p>
            <p className="pl-[18px] font-mono text-xs text-muted-foreground">
              {hero.status.context}
            </p>
          </div>

          <div data-hero className="mt-12 flex items-center gap-5">
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors duration-(--duration-hover) hover:text-foreground"
              aria-label="GitHub"
            >
              <Github className="size-5" />
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors duration-(--duration-hover) hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin className="size-5" />
            </a>
            <a
              href={siteConfig.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors duration-(--duration-hover) hover:text-foreground"
              aria-label="X (Twitter)"
            >
              <XIcon className="size-5" />
            </a>
            <EmailPopup email={siteConfig.email} />
          </div>
        </div>
      </HeroMotion>
    </header>
  )
}
