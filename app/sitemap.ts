import type { MetadataRoute } from "next"
import { siteMeta } from "@/data/content"

export default function sitemap(): MetadataRoute.Sitemap {
  // No lastModified: without a maintained content-update timestamp, emitting
  // the generation time would falsely claim a change on every deploy.
  return [
    {
      url: siteMeta.url,
      changeFrequency: "monthly",
      priority: 1,
    },
  ]
}
