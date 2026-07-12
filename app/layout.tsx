import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { siteConfig } from '@/data/content'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const SITE_URL = "https://iamarjav.me"
const description =
  "CS/AI student who builds and ships real products, from an AI journaling app that catches cognitive biases to a chess-coaching platform. Open to internships and founding-team roles."

// icon.svg, apple-icon.png, and opengraph-image.png in /app are wired up
// automatically by Next's file-based metadata; no manual config needed.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Arjav Jain, AI & product builder",
    template: "%s · Arjav Jain",
  },
  description,
  applicationName: "Arjav Jain",
  authors: [{ name: "Arjav Jain", url: SITE_URL }],
  creator: "Arjav Jain",
  keywords: [
    "Arjav Jain",
    "product builder",
    "AI engineer",
    "full stack developer",
    "founding engineer",
    "Bennett University",
    "portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Arjav Jain",
    title: "Arjav Jain, AI & product builder",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arjav Jain, AI & product builder",
    description,
    creator: "@arjav_15",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
}

export const viewport: Viewport = {
  themeColor: "#faf9f5",
  colorScheme: "light",
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: SITE_URL,
  jobTitle: "Full-stack & AI product builder",
  email: `mailto:${siteConfig.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Greater Noida",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Bennett University",
  },
  sameAs: [
    siteConfig.social.github,
    siteConfig.social.linkedin,
    siteConfig.social.twitter,
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        {children}
        <script
          type="application/ld+json"
          // Person structured data for rich search results
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Analytics />
      </body>
    </html>
  )
}
