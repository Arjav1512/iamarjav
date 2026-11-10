import type { MetadataRoute } from "next"
import { siteConfig, siteMeta } from "@/data/content"

/*
 * Web app manifest, served at /manifest.webmanifest. The icons live in
 * public/. They are "any" only: the artwork runs too close to the edge for
 * the maskable safe zone. #faf8f5 is the sRGB value of --background in
 * globals.css.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteMeta.title,
    short_name: siteConfig.name,
    description: siteMeta.description,
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f5",
    theme_color: "#faf8f5",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  }
}
