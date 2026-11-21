"use client"

import { useEffect, useRef, useState } from "react"
import { siteConfig } from "@/data/content"

/**
 * "Copy my email": copies the address, confirms for 2.2s, and falls back to
 * mailto: when the Clipboard API is missing or refuses.
 */
export function CopyEmailButton() {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = () => {
    const email = siteConfig.email
    const fallback = () => {
      window.location.href = `mailto:${email}`
    }
    if (!navigator.clipboard?.writeText) return fallback()
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2200)
    }, fallback)
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className="min-h-[52px] py-0 px-[26px] rounded-[999px] border-0 bg-[#0A0A0A] text-[#FFFFFF] cursor-pointer text-[15px] font-medium inline-flex gap-[10px] items-center"
    >
      {copied && (
        <span className="inline-flex">
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#FFFFFF" strokeWidth="1.8">
            <path d="M3 8.5 L6.5 12 L13 4.5" />
          </svg>
        </span>
      )}
      <span>{copied ? "Copied. Talk soon." : "Copy my email"}</span>
    </button>
  )
}
