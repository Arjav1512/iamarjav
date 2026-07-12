import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { siteConfig, siteMeta } from '@/data/content'
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

// icon.svg, apple-icon.png, and opengraph-image.png in /app are wired up
// automatically by Next's file-based metadata; no manual config needed.
export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.url),
  title: {
    default: siteMeta.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteMeta.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteMeta.url }],
  creator: siteConfig.name,
  keywords: siteMeta.keywords,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteMeta.url,
    siteName: siteConfig.name,
    title: siteMeta.title,
    description: siteMeta.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description,
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
  url: siteMeta.url,
  jobTitle: siteMeta.jobTitle,
  email: `mailto:${siteConfig.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteMeta.addressLocality,
    addressCountry: siteMeta.addressCountry,
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: siteMeta.university,
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
