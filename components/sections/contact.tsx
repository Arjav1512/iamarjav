"use client"

import { useRef, useState } from "react"
import { siteConfig } from "@/data/content"
import { useParallax } from "@/hooks/use-parallax"
import { ArrowUpRight, Copy, Check, Mail, MapPin, Sparkles } from "lucide-react"

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [emailCopied, setEmailCopied] = useState(false)

  const sectionOffset = useParallax(sectionRef, { speed: 0.015, maxOffset: 10 })
  const cardsOffset = useParallax(cardsRef, { speed: 0.02, maxOffset: 10 })

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email)
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
  }

  return (
    <section
      id="contact"
      className="mb-8 scroll-mt-16 md:mb-12 lg:mb-16 lg:scroll-mt-24"
      aria-label="Get in touch"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 bg-background/75 px-6 py-5 backdrop-blur-sm md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-0 lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground lg:sr-only">
          Contact
        </h2>
      </div>

      {/* Intro block */}
      <div
        ref={sectionRef}
        className="mb-10 will-change-transform"
        style={{ transform: `translateY(${sectionOffset}px)` }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="size-4 text-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            {"Let's talk"}
          </span>
        </div>
        <h3 className="text-2xl font-bold tracking-tight text-foreground mb-3 text-balance">
          {"Got an idea, a project, or just want to say hi?"}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground max-w-md">
          {"I'm always up for a good conversation -- whether it's a potential collaboration, a cool AI problem, a startup you're thinking about, or just swapping ideas over coffee. Drop me a line and let's see where it goes."}
        </p>
      </div>

      {/* Contact card */}
      <div
        ref={cardsRef}
        className="will-change-transform"
        style={{ transform: `translateY(${cardsOffset}px)` }}
      >
        {/* Email card -- primary action */}
        <div className="group relative mb-4 rounded-xl border border-border bg-card/50 p-5 transition-all duration-300 hover:border-primary/30 hover:bg-card">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Mail className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Email</p>
                <p className="text-xs text-muted-foreground mt-0.5">{siteConfig.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-foreground/20 hover:text-foreground active:scale-95"
                aria-label="Copy email address"
              >
                {emailCopied ? (
                  <>
                    <Check className="size-3" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="size-3" />
                    Copy
                  </>
                )}
              </button>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95"
              >
                Send
                <ArrowUpRight className="size-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Location indicator */}
        <div className="flex items-center gap-2 px-1">
          <MapPin className="size-3.5 text-muted-foreground/60" />
          <span className="text-xs text-muted-foreground/60">{siteConfig.location}</span>
        </div>
      </div>
    </section>
  )
}
