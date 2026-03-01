"use client"

import { useState, useEffect } from "react"
import { Github, Linkedin } from "lucide-react"
import { siteConfig } from "@/data/content"
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
          <h2 className="text-lg font-semibold text-muted-foreground mb-4">
            {siteConfig.role}
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            {siteConfig.tagline}
          </p>
        </div>

        {/* Navigation - desktop only */}
        <nav className="mt-16 hidden lg:block" aria-label="In-page navigation">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "")
              const isActive = activeSection === id
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`group flex items-center gap-4 py-3 transition-all ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <span
                      className={`inline-block h-px transition-all ${
                        isActive
                          ? "w-16 bg-foreground"
                          : "w-8 bg-muted-foreground/40 group-hover:w-16 group-hover:bg-foreground"
                      }`}
                    />
                    <span
                      className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      {/* Social links + theme toggle */}
      <div className="mt-8 flex items-center gap-4 lg:mt-0">
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
    </header>
  )
}
