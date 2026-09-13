import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpen,
  Check,
  Code2,
  Download,
  Edit3,
  ExternalLink,
  FileText,
  Plus,
  Search,
  StickyNote,
  Trash2,
  X,
} from 'lucide-react'
import { Seo } from '@/components/Seo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useProgressStore } from '@/stores/progress-store'
import type { Bookmark, BookmarkType } from '@/types'

export function BookmarksPage() {
  const bookmarks = useProgressStore((s) => s.bookmarks)
  const updateNote = useProgressStore((s) => s.updateBookmarkNote)
  const addCustomNote = useProgressStore((s) => s.addCustomNote)
  const removeById = useProgressStore((s) => s.removeBookmarkById)

  // Local state
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<'all' | BookmarkType>('all')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingText, setEditingText] = useState('')
  const [isNewNoteOpen, setIsNewNoteOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')

  // Filtered and searched list
  const filteredItems = useMemo(() => {
    return bookmarks.filter((item) => {
      const matchesFilter = activeFilter === 'all' ? true : item.type === activeFilter
      if (!matchesFilter) return false

      if (!searchQuery.trim()) return true
      const query = searchQuery.toLowerCase()
      const titleMatch = item.title.toLowerCase().includes(query)
      const noteMatch = item.note ? item.note.toLowerCase().includes(query) : false
      const typeMatch = item.type.toLowerCase().includes(query)
      return titleMatch || noteMatch || typeMatch
    })
  }, [bookmarks, activeFilter, searchQuery])

  // Stats
  const noteCount = useMemo(() => bookmarks.filter((b) => b.type === 'note' || Boolean(b.note)).length, [bookmarks])
  const lessonCount = useMemo(() => bookmarks.filter((b) => b.type === 'lesson').length, [bookmarks])
  const commandCount = useMemo(() => bookmarks.filter((b) => b.type === 'command').length, [bookmarks])

  function handleStartEdit(item: Bookmark) {
    setEditingId(item.id)
    setEditingText(item.note || '')
  }

  function handleSaveNote(id: string) {
    updateNote(id, editingText.trim())
    setEditingId(null)
    setEditingText('')
  }

  function handleCancelEdit() {
    setEditingId(null)
    setEditingText('')
  }

  function handleCreateNote(e: React.FormEvent) {
    e.preventDefault()
    if (!newTitle.trim() && !newContent.trim()) return
    addCustomNote(newTitle.trim() || 'Study Note', newContent.trim())
    setNewTitle('')
    setNewContent('')
    setIsNewNoteOpen(false)
  }

  function exportNotesAsMarkdown() {
    if (bookmarks.length === 0) return

    let md = `# ROM LATEX — My Study Notes & Bookmarks\n`
    md += `*Exported on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}*\n\n---\n\n`

    bookmarks.forEach((item, index) => {
      md += `## ${index + 1}. ${item.title}\n`
      md += `- **Type**: ${item.type.toUpperCase()}\n`
      md += `- **Saved on**: ${new Date(item.createdAt).toLocaleDateString()}\n`
      if (item.href && item.href !== '/bookmarks') {
        md += `- **Link**: ${item.href}\n`
      }
      if (item.note) {
        md += `\n### Personal Notes:\n${item.note}\n`
      }
      md += `\n---\n\n`
    })

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `rom-latex-study-notes-${new Date().toISOString().slice(0, 10)}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  function getTypeBadge(type: BookmarkType) {
    switch (type) {
      case 'note':
        return (
          <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30">
            <StickyNote className="mr-1 h-3 w-3" /> Study Note
          </Badge>
        )
      case 'lesson':
        return (
          <Badge className="bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30">
            <BookOpen className="mr-1 h-3 w-3" /> Lesson
          </Badge>
        )
      case 'command':
        return (
          <Badge className="bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30">
            <Code2 className="mr-1 h-3 w-3" /> Command
          </Badge>
        )
      default:
        return (
          <Badge variant="outline">
            <FileText className="mr-1 h-3 w-3" /> {type}
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6">
      <Seo title="Bookmarks & Notes — ROM LATEX" description="Saved lessons, commands, and your personal revision notes." />

      {/* Header section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">Bookmarks & Study Notes</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Save key lessons, commands, and jot down personal revision notes as you learn.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Dialog open={isNewNoteOpen} onOpenChange={setIsNewNoteOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-1.5 h-4 w-4" />
                New Note
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <StickyNote className="h-5 w-5 text-accent" />
                  Create New Study Note
                </DialogTitle>
                <DialogDescription>
                  Write revision notes, key formulas, or reminders to reference anytime.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleCreateNote} className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <Label htmlFor="note-title">Title / Topic</Label>
                  <Input
                    id="note-title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Mathematics Preamble Shortcuts"
                    maxLength={100}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="note-content">Note Content</Label>
                  <Textarea
                    id="note-content"
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Write your note here... (You can include code snippets, shortcuts, and ideas)"
                    rows={6}
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <DialogClose asChild>
                    <Button variant="outline" size="sm" type="button">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button size="sm" type="submit">
                    <Check className="mr-1.5 h-4 w-4" />
                    Save Note
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {bookmarks.length > 0 && (
            <Button size="sm" variant="outline" onClick={exportNotesAsMarkdown}>
              <Download className="mr-1.5 h-4 w-4" />
              Export Notes (.md)
            </Button>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      {bookmarks.length > 0 && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bookmarks and notes..."
              className="pl-9"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            <Button
              size="sm"
              variant={activeFilter === 'all' ? 'default' : 'outline'}
              className="h-8 text-xs"
              onClick={() => setActiveFilter('all')}
            >
              All ({bookmarks.length})
            </Button>
            <Button
              size="sm"
              variant={activeFilter === 'note' ? 'default' : 'outline'}
              className="h-8 text-xs"
              onClick={() => setActiveFilter('note')}
            >
              <StickyNote className="mr-1 h-3 w-3" />
              Notes ({noteCount})
            </Button>
            <Button
              size="sm"
              variant={activeFilter === 'lesson' ? 'default' : 'outline'}
              className="h-8 text-xs"
              onClick={() => setActiveFilter('lesson')}
            >
              <BookOpen className="mr-1 h-3 w-3" />
              Lessons ({lessonCount})
            </Button>
            <Button
              size="sm"
              variant={activeFilter === 'command' ? 'default' : 'outline'}
              className="h-8 text-xs"
              onClick={() => setActiveFilter('command')}
            >
              <Code2 className="mr-1 h-3 w-3" />
              Commands ({commandCount})
            </Button>
          </div>
        </div>
      )}

      {/* Bookmarks & Notes List */}
      {bookmarks.length === 0 ? (
        <Card className="border-dashed p-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
            <StickyNote className="h-7 w-7" />
          </div>
          <h2 className="mt-4 font-serif text-xl font-semibold">Your Notebook is Empty</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Bookmark lessons or LaTeX commands while studying, or create personal study notes to review anytime.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button size="sm" onClick={() => setIsNewNoteOpen(true)}>
              <Plus className="mr-1.5 h-4 w-4" /> Create Your First Note
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link to="/learn">Browse Lessons</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link to="/reference">Command Reference</Link>
            </Button>
          </div>
        </Card>
      ) : filteredItems.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No bookmarks or notes found matching &ldquo;{searchQuery}&rdquo;.</p>
          <Button variant="ghost" size="sm" onClick={() => setSearchQuery('')} className="mt-2">
            Clear search filter
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredItems.map((item) => {
            const isEditing = editingId === item.id
            const hasExternalLink = item.href && item.href !== '/bookmarks'

            return (
              <Card key={item.id} className="transition-all hover:shadow-sm">
                <CardHeader className="p-4 pb-2">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {getTypeBadge(item.type)}
                        <span className="text-xs text-muted-foreground">
                          Saved {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <CardTitle className="text-lg font-semibold">
                        {hasExternalLink ? (
                          <Link to={item.href} className="hover:text-accent hover:underline inline-flex items-center gap-1.5">
                            {item.title}
                            <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                          </Link>
                        ) : (
                          item.title
                        )}
                      </CardTitle>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {hasExternalLink && (
                        <Button asChild size="sm" variant="outline" className="h-8 px-2.5 text-xs">
                          <Link to={item.href}>
                            Open
                          </Link>
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        title="Delete note / bookmark"
                        onClick={() => removeById(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-4 pt-2">
                  {/* Note editing area */}
                  {isEditing ? (
                    <div className="space-y-2.5 rounded-lg border border-border bg-muted/30 p-3">
                      <Label htmlFor={`edit-note-${item.id}`} className="text-xs font-medium text-foreground">
                        Edit Study Note
                      </Label>
                      <Textarea
                        id={`edit-note-${item.id}`}
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        placeholder="Write your revision note, shortcuts, or summary here..."
                        rows={4}
                        className="bg-card text-sm"
                        autoFocus
                      />
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs text-muted-foreground">
                          {editingText.length} characters
                        </span>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={handleCancelEdit}>
                            Cancel
                          </Button>
                          <Button size="sm" className="h-7 text-xs" onClick={() => handleSaveNote(item.id)}>
                            <Check className="mr-1 h-3.5 w-3.5" />
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : item.note ? (
                    /* Display existing note */
                    <div className="group relative rounded-lg border border-border/80 bg-muted/30 p-3.5 text-sm transition-colors hover:border-accent/40">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-accent">
                          <StickyNote className="h-3.5 w-3.5" />
                          <span>Note</span>
                          {item.updatedAt && (
                            <span className="text-[11px] text-muted-foreground font-normal">
                              (updated {new Date(item.updatedAt).toLocaleDateString()})
                            </span>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground opacity-80 group-hover:opacity-100"
                          onClick={() => handleStartEdit(item)}
                        >
                          <Edit3 className="mr-1 h-3 w-3" />
                          Edit Note
                        </Button>
                      </div>
                      <div className="mt-1.5 whitespace-pre-wrap font-sans text-sm text-foreground/90 leading-relaxed">
                        {item.note}
                      </div>
                    </div>
                  ) : (
                    /* Prompt to add a note */
                    <button
                      type="button"
                      onClick={() => handleStartEdit(item)}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add a study note for this {item.type}...</span>
                    </button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
