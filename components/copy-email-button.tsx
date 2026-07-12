"use client"

import { useEffect, useRef, useState } from "react"
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
 *
 * On pointer-fine devices (motion allowed) the button is magnetic: it
 * drifts a few px toward the cursor and springs back on leave. The effect
 * is purely cosmetic and never gates the action, so touch, keyboard, and
 * reduced-motion users get an identical, fully-functional button.
 */
const MAX_PULL = 10 // px
const STRENGTH = 0.25

export function CopyEmailButton({ email, idleLabel, copiedLabel }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false)
  const wrapRef = useRef<HTMLSpanElement>(null)
  const magneticRef = useRef(false)

  useEffect(() => {
    magneticRef.current =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  }, [])

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
      // Clipboard unavailable (permissions/insecure origin): fall back to mailto
      window.location.href = `mailto:${email}`
    }
  }

  const clamp = (v: number) => Math.max(-MAX_PULL, Math.min(MAX_PULL, v))

  const handlePointerMove = (e: React.PointerEvent) => {
    const el = wrapRef.current
    if (!el || !magneticRef.current) return
    const rect = el.getBoundingClientRect()
    const dx = clamp((e.clientX - (rect.left + rect.width / 2)) * STRENGTH)
    const dy = clamp((e.clientY - (rect.top + rect.height / 2)) * STRENGTH)
    el.style.setProperty("--mx", `${dx}px`)
    el.style.setProperty("--my", `${dy}px`)
  }

  const resetPull = () => {
    const el = wrapRef.current
    if (!el) return
    el.style.setProperty("--mx", "0px")
    el.style.setProperty("--my", "0px")
  }

  return (
    <>
      <span
        ref={wrapRef}
        className="cta-magnetic block w-full sm:inline-block sm:w-auto"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPull}
      >
        <button
          type="button"
          onClick={handleCopy}
          className="cta-tactile inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-foreground px-8 py-5 font-display text-lg font-semibold tracking-tight text-background sm:w-auto sm:px-10 sm:py-6 sm:text-xl"
        >
          {copied ? (
            <Check className="size-5" aria-hidden="true" />
          ) : (
            <Copy className="size-5" aria-hidden="true" />
          )}
          {copied ? copiedLabel : idleLabel}
        </button>
      </span>
      <span aria-live="polite" className="sr-only">
        {copied ? `Email address copied: ${email}` : ""}
      </span>
    </>
  )
}
