/* Site identity: name, contact email and social profiles (layout JSON-LD,
   homepage contact links, article back links). */
export const siteConfig = {
  name: "Arjav Jain",
  email: "arjav.jain1512@icloud.com",
  social: {
    github: "https://github.com/Arjav1512",
    linkedin: "https://www.linkedin.com/in/arjav-jain-75ab712b7/",
    twitter: "https://x.com/arjav_15",
  },
}

/* SEO / metadata content — single source for titles, description, and the
   structured-data fields, consumed by app/layout.tsx, sitemap, and robots. */
export const siteMeta = {
  url: "https://www.iamarjav.me",
  title: "Arjav Jain, AI & product builder",
  description:
    "CS/AI student who builds and ships real products, from an AI journaling app that catches cognitive biases to a chess-coaching platform. Open to internships and founding-team roles.",
  jobTitle: "Full-stack & AI product builder",
  keywords: [
    "Arjav Jain",
    "product builder",
    "AI engineer",
    "full stack developer",
    "founding engineer",
    "Bennett University",
    "portfolio",
  ],
  university: "Bennett University",
  addressLocality: "Greater Noida",
  addressCountry: "IN",
}
