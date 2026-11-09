import type { MetadataRoute } from "next"
import { articles, siteMeta } from "@/data/content"

export default function sitemap(): MetadataRoute.Sitemap {
  // No lastModified: without a maintained content-update timestamp, emitting
  // the generation time would falsely claim a change on every deploy.
  return [
    {
      url: siteMeta.url,
      changeFrequency: "monthly",
      priority: 1,
    },
    // Published essays only; drafts are noindex placeholders.
    ...articles
      .filter((article) => article.status === "published")
      .map((article) => ({
        url: `${siteMeta.url}/articles/${article.slug}`,
        changeFrequency: "yearly" as const,
        priority: 0.7,
      })),
  ]
}
