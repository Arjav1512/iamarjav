import { AboutSection } from "@/components/sections/about"
import { ExperienceSection } from "@/components/sections/experience"
import { ProjectsSection } from "@/components/sections/projects"
import { SkillsSection } from "@/components/sections/skills"
import { ContactSection } from "@/components/sections/contact"
import { Footer } from "@/components/footer"

export function RightColumn() {
  return (
    <main className="pt-24 lg:w-[52%] lg:py-24">
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
