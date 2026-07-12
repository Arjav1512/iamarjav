"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Copy, Mail, Check } from "lucide-react"

interface EmailPopupProps {
  email: string
}

export function EmailPopup({ email }: EmailPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const copyRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isCopied) return
    const timer = setTimeout(() => setIsCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [isCopied])

  const close = useCallback(() => {
    setIsOpen(false)
    triggerRef.current?.focus() // return focus to the trigger
  }, [])

  // Move focus into the dialog on open; close on Escape.
  useEffect(() => {
    if (!isOpen) return
    copyRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen, close])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setIsCopied(true)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  // The dialog has a single focusable control, so trapping is just keeping
  // Tab/Shift+Tab on it while the dialog is open.
  const trapFocus = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault()
      copyRef.current?.focus()
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-muted-foreground transition-colors duration-(--duration-hover) hover:text-foreground"
        aria-label="Show email address"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <Mail className="size-5" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 animate-fade-in"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Dynamic Island-style popup */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Email address"
          onKeyDown={trapFocus}
          className="fixed left-1/2 top-6 z-50 -translate-x-1/2 animate-island-expand md:top-20"
        >
          <div className="rounded-3xl bg-foreground px-6 py-4 shadow-lg">
            <div className="flex items-center gap-3">
              <Mail className="size-4 flex-shrink-0 text-background" aria-hidden="true" />
              <div className="flex flex-col gap-2">
                <p className="text-xs font-medium text-background">{email}</p>
                <div className="flex gap-2">
                  <button
                    ref={copyRef}
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-background/20 px-3 py-1 text-[11px] font-medium text-background transition-all hover:bg-background/30 active:scale-95"
                  >
                    {isCopied ? (
                      <>
                        <Check className="size-3" aria-hidden="true" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" aria-hidden="true" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <span aria-live="polite" className="sr-only">
            {isCopied ? `Copied email address ${email}` : ""}
          </span>
        </div>
      )}
    </>
  )
}
