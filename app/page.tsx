import { homeFontVariables } from "@/components/home/fonts"
import { Nav } from "@/components/home/nav"
import { Hero } from "@/components/home/hero"
import { HowIWork } from "@/components/home/how-i-work"
import { WorkSection } from "@/components/home/work/work-section"
import { Bench } from "@/components/home/bench/bench"
import { Journey } from "@/components/home/journey"
import { Writing } from "@/components/home/writing"
import { Contact } from "@/components/home/contact"
import "@/components/home/home.css"

/*
 * Homepage: "Work First". Geist, Geist Mono and Caveat are scoped to the
 * .home root, so article pages keep the site-wide typography.
 */
export default function Home() {
  return (
    <div className={`home ${homeFontVariables}`}>
      <a
        href="#main"
        className="sr-only z-50 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <HowIWork />
        <WorkSection />
        <Bench />
        <Journey />
        <Writing />
        <Contact />
      </main>
    </div>
  )
}
