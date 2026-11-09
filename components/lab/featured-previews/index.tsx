/*
 * LAB · Featured Work preview experiment (not wired into the public page).
 *
 * Rendered only by the dev-only route app/lab/work/page.tsx, which passes
 * renderLabPreview to <WorkSection renderPreview>. To discard the
 * experiment: delete components/lab/ and app/lab/, and drop the optional
 * renderPreview prop from components/sections/work.tsx.
 */
import type { Project } from "@/data/content"
import { BrowserFrame } from "@/components/browser-frame"
import { ChessMatePreview } from "./chessmate-preview"
import { MirrorPreview } from "./mirror-preview"
import { TorchPreview } from "./torch-preview"

const liveUrl = (p: Project) => (p.demo && p.demo !== "#" ? p.demo : undefined)

export function renderLabPreview(project: Project) {
  const url = liveUrl(project)
  switch (project.title) {
    case "ChessMate":
      return <ChessMatePreview url={url} />
    case "Mirror":
      return <MirrorPreview url={url} />
    case "Torch":
      return <TorchPreview url={url} />
    default:
      return (
        <BrowserFrame
          title={project.title}
          tagline={project.tagline}
          badge={project.badge}
          url={url}
          media={project.media}
        />
      )
  }
}
