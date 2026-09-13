import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import {
  Check,
  Copy,
  Download,
  Maximize2,
  Minimize2,
  Play,
  RotateCcw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LatexPreview } from '@/components/latex/LatexPreview'
import { DEFAULT_PLAYGROUND } from '@/data/catalog'
import { PLAYGROUND_SOURCE_KEY } from '@/features/playground/constants'
import { cn } from '@/lib/utils'

const LatexEditor = lazy(() =>
  import('@/features/playground/LatexEditor').then((mod) => ({ default: mod.LatexEditor })),
)

export function PlaygroundWorkspace({ initial }: { initial?: string }) {
  const seed = initial ?? sessionStorage.getItem(PLAYGROUND_SOURCE_KEY) ?? DEFAULT_PLAYGROUND
  const [source, setSource] = useState(seed)
  const [preview, setPreview] = useState(seed)
  const [live, setLive] = useState(true)
  const [copied, setCopied] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [split, setSplit] = useState(50)
  const dragging = useRef(false)

  useEffect(() => {
    if (!live) return
    const id = window.setTimeout(() => setPreview(source), 280)
    return () => window.clearTimeout(id)
  }, [source, live])

  function run() {
    setPreview(source)
  }

  function reset() {
    setSource(DEFAULT_PLAYGROUND)
    setPreview(DEFAULT_PLAYGROUND)
  }

  async function copy() {
    await navigator.clipboard.writeText(source)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  function download() {
    const blob = new Blob([source], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'document.tex'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className={cn('flex min-h-[70vh] flex-col rounded-xl border border-border bg-card', fullscreen && 'fixed inset-3 z-40 min-h-0')}>
      <div className="flex flex-wrap items-center gap-2 border-b border-border p-2">
        <Button size="sm" onClick={run}>
          <Play className="h-4 w-4" />
          Run
        </Button>
        <Button size="sm" variant="secondary" onClick={reset}>
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
        <Button size="sm" variant="ghost" onClick={() => void copy()}>
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          Copy
        </Button>
        <Button size="sm" variant="ghost" onClick={download}>
          <Download className="h-4 w-4" />
          Download
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setFullscreen((value) => !value)}>
          {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          Fullscreen
        </Button>
        <label className="ml-auto flex items-center gap-2 text-sm">
          <input type="checkbox" checked={live} onChange={(event) => setLive(event.target.checked)} />
          Live preview
        </label>
      </div>
      <div
        className="flex min-h-0 flex-1 flex-col md:flex-row"
        onMouseMove={(event) => {
          if (!dragging.current) return
          const rect = event.currentTarget.getBoundingClientRect()
          const next = ((event.clientX - rect.left) / rect.width) * 100
          setSplit(Math.min(75, Math.max(25, next)))
        }}
        onMouseUp={() => {
          dragging.current = false
        }}
        onMouseLeave={() => {
          dragging.current = false
        }}
      >
        <div className="min-h-[280px] md:min-h-0" style={{ flexBasis: `${split}%` }}>
          <Suspense fallback={<div className="p-4 text-sm text-muted-foreground">Loading editor…</div>}>
            <LatexEditor value={source} onChange={setSource} />
          </Suspense>
        </div>
        <button
          type="button"
          aria-label="Resize editor and preview"
          className="hidden h-auto w-1 cursor-col-resize bg-border md:block"
          onMouseDown={() => {
            dragging.current = true
          }}
        />
        <div className="min-h-[280px] flex-1 overflow-auto border-t border-border p-4 md:border-t-0">
          <LatexPreview source={preview} />
        </div>
      </div>
    </div>
  )
}
