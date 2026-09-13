import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Bookmark,
  BookmarkCheck,
  Check,
  Code2,
  Copy,
  ExternalLink,
  Search,
  SlidersHorizontal,
} from 'lucide-react'
import { Seo } from '@/components/Seo'
import { LatexPreview } from '@/components/latex/LatexPreview'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { COMMANDS } from '@/data/catalog'
import { PLAYGROUND_SOURCE_KEY } from '@/features/playground/constants'
import { useProgressStore } from '@/stores/progress-store'
import type { CommandCategory, LatexCommand } from '@/types'
import { cn } from '@/lib/utils'

const CATEGORIES: Array<'All' | CommandCategory> = [
  'All',
  'Mathematics',
  'Text',
  'Sections',
  'Tables',
  'Images',
  'References',
  'Lists',
  'Formatting',
  'Packages',
  'TikZ',
]

export function ReferencePage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<'All' | CommandCategory>('All')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const bookmarks = useProgressStore((s) => s.bookmarks)
  const toggleBookmark = useProgressStore((s) => s.toggleBookmark)
  const navigate = useNavigate()

  const filteredCommands = useMemo(() => {
    const q = query.trim().toLowerCase()
    return COMMANDS.filter((item) => {
      const matchCategory = activeCategory === 'All' || item.category === activeCategory
      if (!matchCategory) return false
      if (!q) return true
      return (
        item.command.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.toLowerCase().includes(q))
      )
    })
  }, [query, activeCategory])

  async function copyCommand(command: LatexCommand) {
    await navigator.clipboard.writeText(command.example || command.command)
    setCopiedId(command.id)
    window.setTimeout(() => setCopiedId(null), 1600)
  }

  function tryInPlayground(command: LatexCommand) {
    const code = command.example.includes('\\begin{document}')
      ? command.example
      : `\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n\n% Example for: ${command.command}\n${command.example}\n\n\\end{document}`
    sessionStorage.setItem(PLAYGROUND_SOURCE_KEY, code)
    navigate('/playground')
  }

  return (
    <div className="space-y-8">
      <Seo
        title="LaTeX Command Reference & Cheat Sheet — Learn LaTeX"
        description="Quick reference for LaTeX mathematics, typography, tables, document structure, and syntax."
      />

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-accent">
            <Code2 className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Cheat Sheet & Syntax</span>
          </div>
          <h1 className="mt-1 font-serif text-3xl font-bold tracking-tight md:text-4xl">LaTeX Reference</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Search essential LaTeX commands, see rendered previews, copy examples, and open any snippet directly in the
            interactive playground.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commands, e.g. frac, matrix, bold, bibtex..."
            className="pl-9 pr-4"
            aria-label="Search LaTeX reference commands"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Command categories">
          <span className="mr-1 flex items-center gap-1 text-xs text-muted-foreground">
            <SlidersHorizontal className="h-3.5 w-3.5" /> Filter:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-secondary text-secondary-foreground hover:bg-muted',
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Showing {filteredCommands.length} of {COMMANDS.length} commands
            {activeCategory !== 'All' && ` in ${activeCategory}`}
          </span>
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-accent underline-offset-4 hover:underline"
            >
              Clear search
            </button>
          )}
        </div>

        {filteredCommands.length === 0 ? (
          <Card className="py-12 text-center">
            <CardContent className="space-y-3">
              <p className="text-lg font-medium">No commands found for &ldquo;{query}&rdquo;</p>
              <p className="text-sm text-muted-foreground">
                Try a different keyword or switch the category filter to &ldquo;All&rdquo;.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setQuery('')
                  setActiveCategory('All')
                }}
              >
                Reset filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredCommands.map((command) => {
              const isBookmarked = bookmarks.some(
                (b) => b.type === 'command' && b.targetId === command.id,
              )
              const isCopied = copiedId === command.id

              return (
                <Card key={command.id} id={command.id} className="flex flex-col justify-between scroll-mt-24">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <code className="rounded bg-muted px-2 py-0.5 font-mono text-sm font-semibold text-foreground">
                            {command.command}
                          </code>
                          <Badge variant="secondary" className="text-[10px]">
                            {command.category}
                          </Badge>
                        </div>
                        <CardDescription className="mt-2 text-sm text-foreground/80">
                          {command.description}
                        </CardDescription>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
                        title={isBookmarked ? 'Remove bookmark' : 'Bookmark command'}
                        aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark command'}
                        onClick={() =>
                          toggleBookmark({
                            type: 'command',
                            targetId: command.id,
                            title: command.command,
                            href: `/reference#${command.id}`,
                          })
                        }
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="h-4 w-4 text-accent" />
                        ) : (
                          <Bookmark className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3 pt-0">
                    <div className="rounded-lg border border-border bg-muted/40 p-3">
                      <div className="mb-1.5 flex items-center justify-between text-[11px] text-muted-foreground">
                        <span className="font-mono">Example:</span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => void copyCommand(command)}
                            className="flex items-center gap-1 rounded px-1.5 py-0.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
                            title="Copy example"
                          >
                            {isCopied ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
                            <span>{isCopied ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                      </div>
                      <pre className="overflow-x-auto font-mono text-xs text-foreground/90">{command.example}</pre>
                    </div>

                    <div className="rounded-lg border border-border/60 bg-card p-3">
                      <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                        Typeset Output
                      </p>
                      <LatexPreview source={command.example} />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex flex-wrap gap-1">
                        {command.keywords.map((kw) => (
                          <button
                            key={kw}
                            type="button"
                            onClick={() => setQuery(kw)}
                            className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground hover:text-foreground"
                          >
                            #{kw}
                          </button>
                        ))}
                      </div>

                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-xs text-accent hover:text-accent/90"
                        onClick={() => tryInPlayground(command)}
                      >
                        <ExternalLink className="mr-1 h-3.5 w-3.5" />
                        Playground
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
