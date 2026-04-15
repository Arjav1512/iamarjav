"use client"

import { useState, useEffect } from "react"
import { Github, Linkedin, ArrowUpRight } from "lucide-react"
import { siteConfig, techStack } from "@/data/content"
import { EmailPopup } from "@/components/email-popup"

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
]

export function LeftColumn() {
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""))
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { rootMargin: "-40% 0px -60% 0px" }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24">
      <div>
        {/* Name and role */}
        <div className="mb-8">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tighter text-foreground leading-tight mb-3">
            <a href="/" className="hover:text-primary transition-colors">
              {siteConfig.name}
            </a>
          </h1>
          <h2 className="text-lg font-semibold text-muted-foreground mb-3">
            {siteConfig.role}
          </h2>
          <p className="max-w-sm text-[0.9375rem] leading-relaxed text-muted-foreground">
            {siteConfig.tagline}
          </p>

          {/* Tech stack pills */}
          <div className="mt-5 flex flex-wrap gap-1.5" aria-label="Core technologies">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border/80 bg-muted/60 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Navigation - desktop only */}
        <nav className="mt-14 hidden lg:block" aria-label="In-page navigation">
          <ul className="flex flex-col gap-0.5">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "")
              const isActive = activeSection === id
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`group flex items-center gap-4 py-2.5 px-2 -mx-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`inline-block h-px flex-shrink-0 transition-all duration-200 ${
                        isActive
                          ? "w-10 bg-primary"
                          : "w-6 bg-muted-foreground/30 group-hover:w-10 group-hover:bg-foreground/50"
                      }`}
                    />
                    <span
                      className={`text-xs font-semibold uppercase tracking-widest transition-colors ${
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground/70 group-hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </span>
                    {isActive && (
                      <span
                        className="ml-auto size-1.5 flex-shrink-0 rounded-full bg-primary"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      {/* Bottom: resume CTA + social links */}
      <div className="mt-8 lg:mt-0 space-y-4">
        {/* Resume CTA */}
        <div>
          <a
            href={siteConfig.resumeUrl}
            className="group inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
            aria-label="View résumé"
          >
            View Résumé
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-4">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="GitHub"
          >
            <Github className="size-5" />
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="LinkedIn"
          >
            <Linkedin className="size-5" />
          </a>
          <a
            href={siteConfig.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="X (Twitter)"
          >
            <XIcon className="size-5" />
          </a>
          <EmailPopup email={siteConfig.email} />
        </div>
      </div>
    </header>
  )
}
