import { CopyEmailButton } from "./copy-email-button"
import { Footer } from "./footer"
import { SocialLinks } from "./icons"

/*
 * Contact. As designed, the footer sits inside this centred column
 * (DESIGN_SPEC §9.1). The design's fixed height is applied as a minimum so
 * the column can never overflow the section: its content is taller than
 * 751px at every width, and the overflow would otherwise show the body's
 * warm-paper background beneath the footer.
 */
export function Contact() {
  return (
    <section id="contact" className="min-h-[751px]">
      <div className="max-w-[1280px] mx-auto box-border py-[120px] px-[32px] flex flex-col items-center gap-[32px] text-center">
        <span className="inline-flex gap-[10px] items-center py-[8px] px-[14px] rounded-[999px] border border-[#EAEAEA] f-mono text-[12px]">
          <span className="pulse w-[7px] h-[7px] rounded-[50%] bg-[#0A0A0A]" />
          open to internships &amp; founding-team roles
        </span>
        <h2 className="m-0 max-w-[1000px] font-semibold text-[length:clamp(42px,7vw,104px)] leading-[0.96] tracking-[-0.05em]">
          Good products start with people, <span className="text-[#A3A3A3]">not code.</span>
        </h2>
        <p className="m-0 text-[17px] text-[#6B6B6B]">Ideas, collaborations, AI problems, startups. Say hi.</p>
        <div className="flex flex-wrap gap-[10px] justify-center items-center">
          <CopyEmailButton />
          <span className="inline-flex items-center ml-[10px]">
            <SocialLinks />
          </span>
        </div>
        <Footer />
      </div>
    </section>
  )
}
