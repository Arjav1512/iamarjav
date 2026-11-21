import { Caveat, Geist, Geist_Mono } from "next/font/google"

/*
 * Homepage-only typefaces. They are applied as CSS variables on the .home
 * root (see app/page.tsx), so article pages keep the site-wide Inter /
 * JetBrains Mono / Space Grotesk setup from app/layout.tsx.
 */
export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
})

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

/* The "red pen": hand-written annotations only. */
export const caveat = Caveat({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-caveat",
  display: "swap",
})

export const homeFontVariables = `${geist.variable} ${geistMono.variable} ${caveat.variable}`
