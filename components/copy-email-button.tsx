"use client"

import { useEffect, useState } from "react"
import { Check, Copy } from "lucide-react"

interface CopyEmailButtonProps {
  email: string
  idleLabel: string
  copiedLabel: string
}

/*
 * The closing CTA: a large tactile ink button that copies the email.
 * Copy beats mailto — nobody has a default mail client configured — and
 * the state change is announced politely for screen readers.
 */
export function CopyEmailButton({ email, idleLabel, copiedLabel }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2500)
    return () => clearTimeout(timer)
  }, [copied])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
    } catch {
      // Clipboard unavailable (permissions/http): fall back to mailto
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        className="cta-tactile inline-flex items-center gap-3 rounded-2xl bg-foreground px-8 py-5 font-display text-lg font-semibold tracking-tight text-background sm:px-10 sm:py-6 sm:text-xl"
      >
        {copied ? (
          <Check className="size-5" aria-hidden="true" />
        ) : (
          <Copy className="size-5" aria-hidden="true" />
        )}
        {copied ? copiedLabel : idleLabel}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? `Email address copied: ${email}` : ""}
      </span>
    </>
  )
}
