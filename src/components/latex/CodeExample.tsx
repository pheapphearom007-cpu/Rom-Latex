import { Check, Copy, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { LatexPreview } from '@/components/latex/LatexPreview'
import { PLAYGROUND_SOURCE_KEY } from '@/features/playground/constants'

export function CodeExample({ code, title }: { code: string; title?: string }) {
  const [copied, setCopied] = useState(false)
  const navigate = useNavigate()

  async function copy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  function openPlayground() {
    sessionStorage.setItem(PLAYGROUND_SOURCE_KEY, code)
    navigate('/playground')
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      {title ? <div className="border-b border-border px-4 py-2 text-sm font-medium">{title}</div> : null}
      <div className="grid gap-0 lg:grid-cols-2">
        <div className="border-b border-border lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">LaTeX source</span>
            <div className="flex gap-1">
              <Button size="sm" variant="ghost" onClick={() => void copy()} aria-label="Copy example">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                Copy
              </Button>
              <Button size="sm" variant="ghost" onClick={openPlayground}>
                <ExternalLink className="h-4 w-4" />
                Open in Playground
              </Button>
            </div>
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-6">{code}</pre>
        </div>
        <div className="bg-muted/40 p-4">
          <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">Rendered result</p>
          <LatexPreview source={code} />
        </div>
      </div>
    </div>
  )
}
