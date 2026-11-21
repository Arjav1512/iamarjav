const links = [
  { label: "work", href: "#work" },
  { label: "journey", href: "#journey" },
  { label: "writing", href: "#writing" },
  { label: "contact", href: "#contact" },
]

export function Nav() {
  return (
    <header className="sticky top-0 z-[20] bg-[rgba(255,255,255,0.86)] backdrop-blur-[12px] border-b border-[#F0F0EF]">
      <div className="max-w-[1280px] mx-auto box-border py-[14px] px-[32px] flex flex-wrap gap-y-[12px] gap-x-[24px] justify-between items-center">
        <a href="#top" className="flex gap-[10px] items-center min-h-[44px] no-underline font-semibold text-[15px] tracking-[-0.01em]">
          {/* Folded-A mark: same shape as app/icon.svg */}
          <svg aria-hidden="true" width="28" height="28" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="14" fill="#0A0A0A" />
            <path d="M32 12 L42 12 L54 52 L44 52 Z" fill="#8C8C8C" />
            <path d="M32 12 L42 12 L24 52 L10 52 Z" fill="#FFFFFF" />
          </svg>
          <span>arjav jain</span>
        </a>
        <nav aria-label="Primary" className="flex flex-wrap gap-y-[4px] gap-x-[26px] f-mono text-[13px]">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="no-underline py-[12px]">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
