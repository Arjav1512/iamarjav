"use client"

import { ArrowUpRight } from "lucide-react"
import { siteConfig } from "@/data/content"
import { useScrollSpy } from "@/hooks/use-scroll-spy"
import { useHideOnScroll } from "@/hooks/use-hide-on-scroll"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Work", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
]

const sectionIds = navLinks.map((l) => l.href.slice(1))

export function SiteNav() {
  const active = useScrollSpy(sectionIds)
  const hidden = useHideOnScroll()
  const hasResume = siteConfig.resumeUrl && siteConfig.resumeUrl !== "#"

  return (
    <>
      {/* Desktop: floating pill, top center */}
      <nav
        aria-label="Primary"
        className="animate-rise-in fixed left-1/2 top-5 z-40 hidden -translate-x-1/2 md:block"
        style={{ "--rise-delay": "650ms" } as React.CSSProperties}
      >
        <div className="flex items-center gap-0.5 rounded-full border border-border/70 bg-background/80 px-1.5 py-1.5 shadow-[0_2px_16px_oklch(0_0_0/0.05)] backdrop-blur-md">
          <a
            href="#top"
            className="px-3 py-1 font-mono text-xs text-foreground transition-colors duration-(--duration-hover) hover:text-accent"
          >
            arjav jain
          </a>
          <span className="mx-0.5 h-4 w-px bg-border" aria-hidden="true" />
          {navLinks.map((link) => {
            const id = link.href.slice(1)
            const isActive = active === id
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "relative px-3 py-1.5 text-xs font-medium transition-colors duration-(--duration-hover)",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute inset-x-3 -bottom-0.5 h-px bg-accent transition-opacity duration-(--duration-hover)",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                  aria-hidden="true"
                />
              </a>
            )
          })}
          {hasResume && (
            <>
              <span className="mx-0.5 h-4 w-px bg-border" aria-hidden="true" />
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-foreground transition-colors duration-(--duration-hover) hover:text-accent"
              >
                Résumé
                <ArrowUpRight
                  className="size-3 transition-transform duration-(--duration-hover) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </a>
            </>
          )}
        </div>
      </nav>

      {/* Mobile: dot capsule, bottom center, tucks away while scrolling down */}
      <nav
        aria-label="Section navigation"
        className={cn(
          "fixed bottom-5 left-1/2 z-40 -translate-x-1/2 transition-all duration-(--duration-reveal) motion-reduce:transition-none md:hidden",
          hidden && "pointer-events-none translate-y-24 opacity-0"
        )}
      >
        <div className="flex items-center rounded-full border border-border/70 bg-background/85 px-1.5 shadow-[0_2px_16px_oklch(0_0_0/0.08)] backdrop-blur-md">
          {navLinks.map((link) => {
            const id = link.href.slice(1)
            const isActive = active === id
            return (
              <a
                key={link.href}
                href={link.href}
                aria-label={link.label}
                aria-current={isActive ? "location" : undefined}
                className="flex min-h-11 items-center gap-1.5 px-2.5"
              >
                <span
                  className={cn(
                    "size-1.5 rounded-full transition-colors duration-(--duration-hover)",
                    isActive ? "bg-accent" : "bg-muted-foreground/40"
                  )}
                  aria-hidden="true"
                />
                {isActive && (
                  <span className="font-mono text-[10px] text-foreground">
                    {link.label.toLowerCase()}
                  </span>
                )}
              </a>
            )
          })}
        </div>
      </nav>
    </>
  )
}
