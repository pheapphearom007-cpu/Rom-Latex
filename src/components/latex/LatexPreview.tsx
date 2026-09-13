import { useMemo } from 'react'
import { previewLatex } from '@/lib/latex-preview'
import { cn } from '@/lib/utils'

export function LatexPreview({
  source,
  className,
}: {
  source: string
  className?: string
}) {
  const result = useMemo(() => previewLatex(source), [source])
  return (
    <div className={cn('space-y-3', className)}>
      {result.errors.length > 0 && (
        <div role="alert" className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm">
          <p className="font-medium">Compilation issue</p>
          {result.errors.map((error) => (
            <p key={error.message} className="mt-1">
              {error.message}
              {error.hint ? <span className="block text-muted-foreground">{error.hint}</span> : null}
            </p>
          ))}
        </div>
      )}
      {result.warnings.map((warning) => (
        <p key={warning} className="text-xs text-warning">
          {warning}
        </p>
      ))}
      <div className="latex-preview" dangerouslySetInnerHTML={{ __html: result.html }} />
    </div>
  )
}
