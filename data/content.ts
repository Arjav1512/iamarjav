export const siteConfig = {
  name: "Arjav Jain",
  role: "Full Stack Dev Intern, AI Enthusiast",
  tagline: "I build things, break things, and ship a lot.",
  description:
    "Computer Science student at Bennett University with hands-on experience building AI/ML tools, full stack apps, and a genuine curiosity for what makes people tick. I ship real products -- from Chrome extensions to AI coaches -- and I've co-founded ventures along the way.",
  email: "arjav.jain1512@icloud.com",
  location: "Greater Noida, India",
  social: {
    github: "https://github.com/Arjav1512",
    linkedin: "https://www.linkedin.com/in/arjav-jain-75ab712b7/",
    twitter: "https://x.com/arjav_15",
  },
  resumeUrl: "#",
}

export const hero = {
  greeting: "hey — i'm arjav jain",
  headlineLines: ["I build things,", "break things,", "and ship a lot."],
  status: [
    "now building Torch — design-to-docs automation",
    "intern @ ElevenX",
    "CS/AI @ Bennett '29",
  ],
  availability: "open to internships & founding-team roles",
}

export const techStack = [
  "Python",
  "Java",
  "JavaScript",
  "TypeScript",
  "HTML/CSS",
  "React",
]

export const aboutParagraphs = [
  "I'm a B.Tech Computer Science (AI/ML) student at Bennett University with a deep interest in AI, machine learning, and how humans interact with technology. I've built real tools -- from Chrome extensions that nudge mindful browsing to AI chess coaches that adapt to your play style.",
  "Beyond code, I'm drawn to the intersection of technology and human psychology. I've co-founded a digital marketing agency, launched a clothing brand, and contributed to open-source projects. I believe the best products come from understanding people first, then engineering solutions.",
  "I'm actively seeking opportunities where I can contribute to real-world products, collaborate with experienced engineers, and grow as a full stack developer -- whether it's AI tooling, web platforms, or anything in between.",
]

export const coreStrengths = [
  "AI/ML",
  "Product Thinking",
  "Entrepreneurship",
  "UX Research",
  "Design Thinking",
  "Open Source",
]

export type Project = {
  title: string
  /** One-line thesis shown under the title. */
  tagline: string
  /** What it is / what makes the build interesting. */
  description: string
  /** Why it exists — the problem that made it worth building (featured only). */
  problem?: string
  /** Short verifiable fact shown next to the status, e.g. "live in production". */
  context?: string
  tech: string[]
  github: string
  demo: string
  featured?: boolean
  inProgress?: boolean
  /** Real screenshot/GIF for the browser frame; the typographic cover renders until this exists. */
  media?: { src: string; alt: string }
}

export const projects: Project[] = [
  {
    title: "Mirror",
    tagline: "An AI journal that catches your cognitive biases before you do.",
    problem:
      "Journaling apps are good at storing thoughts and bad at revealing patterns. Your own cognitive biases are, by definition, the ones you can't see — so writing alone rarely turns into self-awareness.",
    description:
      "An AI-powered self-reflection journal that detects cognitive biases in what you write, tracks emotional patterns over time, and turns daily entries into genuine self-awareness.",
    context: "live in production",
    tech: ["React", "Supabase", "Tailwind CSS", "Sentiment Analysis", "Edge Functions"],
    github: "https://github.com/Arjav1512/Mirror",
    demo: "https://usemirror.dev",
    featured: true,
  },
  {
    title: "ChessMate",
    tagline: "Chess improvement with an engine that explains, not just evaluates.",
    problem:
      "Chess engines tell you the best move, not why yours was worse. Evaluation without explanation makes you dependent on the engine instead of better at the game.",
    description:
      "A web-based improvement platform that pairs Stockfish evaluation with an AI mentor chat — analyse your games, understand your mistakes, and train the weaknesses it finds.",
    context: "open source",
    tech: ["React", "TypeScript", "Supabase", "Stockfish", "Tailwind CSS"],
    github: "https://github.com/Arjav1512/ChessMate-Tool",
    demo: "#",
    featured: true,
  },
  {
    title: "Daily Digital Diary",
    tagline: "A Chrome extension that turns your browsing history into mindful insight.",
    problem:
      "Browsing history is a log, not a mirror — it records where your attention went without ever making you notice. Most screen-time tools also ship that data to someone else's server.",
    description:
      "A Chrome extension that tracks browsing locally, categorises the sites you visit, and uses Gemini to summarise what you actually consumed — a daily nudge toward more mindful behaviour.",
    context: "CS50 final project",
    tech: ["JavaScript", "Chrome APIs", "Gemini API", "HTML/CSS"],
    github: "https://github.com/Arjav1512/CS50-FinalProject",
    demo: "https://youtu.be/ZR7ZmUQUYdw",
    featured: true,
  },
  {
    title: "Torch",
    tagline: "Watches Figma files and writes developer-ready docs automatically.",
    description:
      "Monitors your Figma files, detects changes and generates developer-ready documentation automatically. No meetings, no manual spec writing, no back-and-forth. Currently in progress.",
    tech: ["TypeScript", "Figma API", "Automation"],
    github: "#",
    demo: "#",
    inProgress: true,
  },
  {
    title: "SwachSarthi",
    tagline: "Waste collection and compliance tracking for citizens and government bodies.",
    description:
      "A waste management system built during the Smart India Hackathon, designed for users and government bodies to streamline waste collection, reporting, and compliance tracking.",
    tech: ["Web Development", "API Integration", "Hackathon"],
    github: "#",
    demo: "#",
    context: "Smart India Hackathon",
  },
  {
    title: "Stackit",
    tagline: "A realistic 3D LEGO-building experience in the browser.",
    description:
      "A web-based interactive platform built in Java that delivers a realistic 3D LEGO-building experience in the browser, replicating the logic and structural accuracy of real-world LEGO sets.",
    tech: ["Java", "3D Rendering", "Web Platform"],
    github: "#",
    demo: "#",
  },
]

export const skills = {
  languages: {
    label: "Languages",
    items: ["Python", "Java", "JavaScript", "TypeScript", "C", "SQL", "HTML/CSS"],
  },
  frameworks: {
    label: "Frameworks & Tools",
    items: ["React", "Next.js", "Tailwind CSS", "Supabase", "MongoDB"],
  },
  aiml: {
    label: "AI / ML",
    items: ["ML Fundamentals", "Scikit-learn", "NumPy", "Pandas", "Matplotlib", "Sentiment Analysis"],
  },
  product: {
    label: "Product & Design",
    items: ["Product Management", "UX Research", "Design Thinking", "Wireframing", "Prototyping"],
  },
}

export const workExperience = [
  {
    date: "Oct 2025 -- Present",
    role: "Intern",
    company: "ElevenX",
    description:
      "Contributing to ElevenX's sales and marketing team with a focus on leads, outreach, strategy and growth.",
    highlights: [
      "Leading outreach initiatives and lead generation campaigns",
      "Developing strategy for growth and engagement",
      "Collaborating across teams on product-market positioning",
    ],
  },
  {
    date: "Ongoing",
    role: "Operations & Management",
    company: "Makana Express",
    description:
      "Contributing to an import-export business handling management, operations, and social media.",
    highlights: [
      "Managing day-to-day operations and logistics",
      "Running social media presence and outreach",
      "Streamlining internal processes and workflows",
    ],
  },
]

export const voluntaryExperience = [
  {
    date: "2025 -- Present",
    role: "Tech Member (Junior Core)",
    company: "GFG Club, Bennett University",
    description:
      "Active member of the GeeksforGeeks student chapter, contributing to technical events and community engagement.",
    highlights: [
      "Organizing coding events and workshops",
      "Contributing to club's technical initiatives",
      "Mentoring peers on programming fundamentals",
    ],
  },
  {
    date: "Jan 2024 -- Mar 2024",
    role: "Co-Founder",
    company: "DigiArc",
    description:
      "Founded a digital marketing agency that developed brand identity and social media strategy for SMBs, building websites and managing marketplaces.",
    highlights: [
      "Built websites and managed marketplace listings for clients",
      "Developed social media growth strategies for small businesses",
      "Drove end-to-end brand identity creation and digital presence",
    ],
  },
  {
    date: "Dec 2024 -- Apr 2025",
    role: "Co-Founder",
    company: "Cult Notice",
    description:
      "Launched a Gen Z-focused clothing brand offering versatile designs that blend cultural elements with modern aesthetics.",
    highlights: [
      "Built brand identity from scratch targeting Gen Z audience",
      "Managed end-to-end product design and marketing",
      "Developed social media strategy and brand positioning",
    ],
  },
]

export const certifications = [
  "CS50: Introduction to Computer Science",
  "CS50: Introduction to Programming with Python",
  "IBM Enterprise Design Thinking Co-Creator",
]

export const education = {
  university: "Bennett University",
  degree: "B.Tech in Computer Science and Engineering (AI/ML)",
  period: "Aug 2025 -- 2029",
}
