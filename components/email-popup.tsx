"use client"

import { useState, useEffect } from "react"
import { Copy, Mail, Check } from "lucide-react"

interface EmailPopupProps {
  email: string
}

export function EmailPopup({ email }: EmailPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [isCopied])

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setIsCopied(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          handleClose()
        }
      }
      window.addEventListener("keydown", handleEscape)
      return () => window.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  return (
    <>
      {/* Email Icon Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-muted-foreground transition-colors hover:text-foreground focus:outline-none"
        aria-label="Email"
      >
        <Mail className="size-5" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 animate-fade-in"
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      {/* Dynamic Island-style Popup */}
      {isOpen && (
        <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2 animate-island-expand">
          <div className="rounded-3xl bg-foreground px-6 py-4 shadow-lg">
            <div className="flex items-center gap-3">
              <Mail className="size-4 text-background flex-shrink-0" />
              <div className="flex flex-col gap-2">
                <p className="text-xs font-medium text-background">
                  {email}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-background/20 px-3 py-1 text-[11px] font-medium text-background transition-all hover:bg-background/30 active:scale-95"
                  >
                    {isCopied ? (
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
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
