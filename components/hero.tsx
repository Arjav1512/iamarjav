import { Github, Linkedin, ArrowDown } from "lucide-react"
import { hero, siteConfig } from "@/data/content"
import { EmailPopup } from "@/components/email-popup"
import { XIcon } from "@/components/icons"

/*
 * The emotional anchor of the site: one enormous statement, one live
 * status line, nothing else competing. The pulsing dot is the single
 * accent element in this viewport.
 */
export function Hero() {
  return (
    <header
      id="top"
      className="relative flex min-h-svh flex-col justify-center px-6 md:px-12"
    >
      <div className="mx-auto w-full max-w-[1120px]">
        <p
          className="animate-rise-in mb-6 font-mono text-sm text-muted-foreground"
          style={{ "--rise-delay": "0ms" } as React.CSSProperties}
        >
          {hero.greeting}
        </p>

        <h1 className="font-display text-[clamp(2.75rem,9vw,7.5rem)] font-bold leading-[0.98] tracking-[-0.03em] text-foreground">
          {hero.headlineLines.map((line, i) => (
            <span
              key={line}
              className="animate-rise-in block"
              style={{ "--rise-delay": `${80 * (i + 1)}ms` } as React.CSSProperties}
            >
              {line}
            </span>
          ))}
        </h1>

        <div
          className="animate-rise-in mt-10 space-y-2.5"
          style={{ "--rise-delay": "420ms" } as React.CSSProperties}
        >
          <p className="font-mono text-xs leading-relaxed text-muted-foreground sm:text-sm">
            <span className="status-dot mr-2.5" aria-hidden="true" />
            {hero.status.join(" · ")}
          </p>
          <p className="pl-[18px] font-mono text-xs text-muted-foreground/80">
            {hero.availability}
          </p>
        </div>

        <div
          className="animate-rise-in mt-12 flex items-center gap-5"
          style={{ "--rise-delay": "540ms" } as React.CSSProperties}
        >
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

      <a
        href="#projects"
        className="animate-rise-in group absolute bottom-8 left-1/2 hidden -translate-x-1/2 p-3 font-mono text-[11px] text-muted-foreground/70 transition-colors duration-(--duration-hover) hover:text-foreground md:block"
        style={{ "--rise-delay": "700ms" } as React.CSSProperties}
      >
        scroll
        <ArrowDown
          className="ml-1.5 inline size-3 transition-transform duration-(--duration-hover) group-hover:translate-y-0.5 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </a>
    </header>
  )
}
