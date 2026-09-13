import { Seo } from '@/components/Seo'
import { PlaygroundWorkspace } from '@/features/playground/PlaygroundWorkspace'

export function PlaygroundPage() {
  return (
    <div className="space-y-4">
      <Seo
        title="LaTeX Playground — Learn LaTeX"
        description="Edit LaTeX with a real editor and preview mathematics and document structure."
      />
      <div>
        <h1 className="font-serif text-3xl">LaTeX Playground</h1>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          This is a real editor (Monaco) with live HTML/KaTeX preview. It is not a hidden pdfLaTeX server. TikZ, raw PDF
          inclusion, and some packages are reported as unsupported rather than silently faked. Download a <code>.tex</code> file
          to compile locally or on Overleaf.
        </p>
      </div>
      <PlaygroundWorkspace />
    </div>
  )
}
