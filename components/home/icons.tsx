import { siteConfig } from "@/data/content"

/* GitHub, LinkedIn and Mail are Lucide paths; X is the filled brand mark. */

function GitHubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
      <rect x="2" y="4" width="20" height="16" rx="2" />
    </svg>
  )
}

const external = { target: "_blank", rel: "noopener noreferrer" } as const

/** The icon-only social links (`.soc`: 10px padding around a 20px icon = 40px target). */
export function SocialLinks({ withEmail = false }: { withEmail?: boolean }) {
  return (
    <>
      <a className="soc" href={siteConfig.social.github} {...external} aria-label="GitHub">
        <GitHubIcon />
      </a>
      <a className="soc" href={siteConfig.social.linkedin} {...external} aria-label="LinkedIn">
        <LinkedInIcon />
      </a>
      <a className="soc" href={siteConfig.social.twitter} {...external} aria-label="X (Twitter)">
        <XIcon />
      </a>
      {withEmail && (
        <a className="soc" href={`mailto:${siteConfig.email}`} aria-label="Email">
          <MailIcon />
        </a>
      )}
    </>
  )
}

/** Hand-drawn pen arrow used beside the carousel's pen notes. */
export function PenArrow() {
  return (
    <svg aria-hidden="true" width="40" height="44" viewBox="0 0 40 44" fill="none" stroke="#D9381E" strokeWidth="2.2" strokeLinecap="round">
      <path d="M6 4 C30 8, 34 24, 22 40" />
      <path d="M14 34 L22 41 L28 32" />
    </svg>
  )
}
