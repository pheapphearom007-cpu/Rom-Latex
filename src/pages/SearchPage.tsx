import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpen,
  Code2,
  Dumbbell,
  GraduationCap,
  Search as SearchIcon,
  X,
} from 'lucide-react'
import { Seo } from '@/components/Seo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { COMMANDS, COURSES } from '@/data/catalog'
import { EXERCISES } from '@/data/exercises'
import { LESSONS } from '@/data/lessons'
import { cn } from '@/lib/utils'

type ResultType = 'all' | 'lesson' | 'command' | 'exercise'

const SUGGESTIONS = [
  'fraction',
  'matrix',
  'table',
  'figure',
  'align',
  'bibtex',
  'citation',
  'tikz',
  'beamer',
  'label & ref',
]

export function SearchPage() {
  const [query, setQuery] = useState('')
  const [filterType, setFilterType] = useState<ResultType>('all')
  const [selectedCourse, setSelectedCourse] = useState<string>('all')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return { lessons: [], commands: [], exercises: [], total: 0 }

    const matchedLessons = LESSONS.filter((lesson) => {
      if (selectedCourse !== 'all' && lesson.courseId !== selectedCourse) return false
      return (
        lesson.title.toLowerCase().includes(q) ||
        lesson.description.toLowerCase().includes(q) ||
        lesson.keywords.some((k) => k.toLowerCase().includes(q)) ||
        lesson.sections.some(
          (s) => s.title.toLowerCase().includes(q) || s.body.toLowerCase().includes(q),
        )
      )
    })

    const matchedCommands = COMMANDS.filter((cmd) => {
      return (
        cmd.command.toLowerCase().includes(q) ||
        cmd.description.toLowerCase().includes(q) ||
        cmd.category.toLowerCase().includes(q) ||
        cmd.keywords.some((k) => k.toLowerCase().includes(q))
      )
    })

    const matchedExercises = EXERCISES.filter((ex) => {
      if (selectedCourse !== 'all' && ex.courseId !== selectedCourse) return false
      return (
        ex.title.toLowerCase().includes(q) ||
        ex.prompt.toLowerCase().includes(q) ||
        ex.explanation.toLowerCase().includes(q)
      )
    })

    const total =
      (filterType === 'all' || filterType === 'lesson' ? matchedLessons.length : 0) +
      (filterType === 'all' || filterType === 'command' ? matchedCommands.length : 0) +
      (filterType === 'all' || filterType === 'exercise' ? matchedExercises.length : 0)

    return {
      lessons: matchedLessons,
      commands: matchedCommands,
      exercises: matchedExercises,
      total,
    }
  }, [query, filterType, selectedCourse])

  return (
    <div className="space-y-8">
      <Seo
        title="Search — Learn LaTeX"
        description="Search lessons, LaTeX commands, syntax examples, and practice exercises across the curriculum."
      />

      <div>
        <h1 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">Search LaTeX</h1>
        <p className="mt-2 text-muted-foreground">
          Find topics, mathematical symbols, syntax commands, and exercises across the complete curriculum.
        </p>
      </div>

      <div className="space-y-3">
        <div className="relative max-w-2xl">
          <SearchIcon className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type anything (e.g. matrix, integral, \\cite, tabular, theorem)..."
            className="h-12 pl-11 pr-10 text-base"
            autoFocus
            aria-label="Search curriculum"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
              aria-label="Clear query"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs text-muted-foreground">Quick suggestions:</span>
          {SUGGESTIONS.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => setQuery(term)}
              className="rounded-md border border-border bg-card px-2 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {term}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <div className="flex items-center gap-1 rounded-lg bg-muted p-1 text-xs font-medium">
            {(
              [
                ['all', 'All'],
                ['lesson', 'Lessons'],
                ['command', 'Commands'],
                ['exercise', 'Exercises'],
              ] as const
            ).map(([type, label]) => (
              <button
                key={type}
                type="button"
                onClick={() => setFilterType(type)}
                className={cn(
                  'rounded-md px-3 py-1.5 transition-colors',
                  filterType === type ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>Course:</span>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="rounded-md border border-border bg-card px-2.5 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="all">All Courses</option>
              {COURSES.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        {!query.trim() ? (
          <div className="rounded-xl border border-dashed border-border py-16 text-center">
            <GraduationCap className="mx-auto h-10 w-10 text-muted-foreground/60" />
            <h2 className="mt-3 font-serif text-xl font-medium">Start typing to search</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              We index 40 lessons, over 25 commands, and all interactive exercises.
            </p>
          </div>
        ) : results.total === 0 ? (
          <Card className="py-12 text-center">
            <CardContent className="space-y-3">
              <p className="text-lg font-medium">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-sm text-muted-foreground">
                Try searching for related keywords like &ldquo;equation&rdquo;, &ldquo;font&rdquo;, or &ldquo;document&rdquo;.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setQuery('')
                  setFilterType('all')
                  setSelectedCourse('all')
                }}
              >
                Reset search
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            <p className="text-sm text-muted-foreground">
              Found <strong className="font-semibold text-foreground">{results.total}</strong> results
            </p>

            {(filterType === 'all' || filterType === 'lesson') && results.lessons.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-accent" />
                  <h2 className="font-serif text-xl font-semibold">
                    Lessons ({results.lessons.length})
                  </h2>
                </div>
                <div className="grid gap-3">
                  {results.lessons.map((lesson) => {
                    const course = COURSES.find((c) => c.id === lesson.courseId)
                    return (
                      <Card key={lesson.id} className="transition-colors hover:border-accent/50">
                        <CardHeader className="p-4 pb-2">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-xs uppercase tracking-wide text-muted-foreground">
                              {course?.title} · Lesson {lesson.number}
                            </span>
                            <Badge variant="secondary">{lesson.difficulty}</Badge>
                          </div>
                          <CardTitle className="text-base font-semibold">
                            <Link
                              to={`/learn/${course?.slug ?? lesson.courseId}/${lesson.slug}`}
                              className="hover:underline"
                            >
                              {lesson.title}
                            </Link>
                          </CardTitle>
                          <CardDescription>{lesson.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between p-4 pt-1">
                          <div className="flex flex-wrap gap-1">
                            {lesson.keywords.map((kw) => (
                              <span key={kw} className="rounded bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground">
                                #{kw}
                              </span>
                            ))}
                          </div>
                          <Button asChild size="sm" variant="outline">
                            <Link to={`/learn/${course?.slug ?? lesson.courseId}/${lesson.slug}`}>
                              Open lesson
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </section>
            )}

            {(filterType === 'all' || filterType === 'command') && results.commands.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-accent" />
                  <h2 className="font-serif text-xl font-semibold">
                    Commands & Syntax ({results.commands.length})
                  </h2>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {results.commands.map((cmd) => (
                    <Card key={cmd.id} className="flex flex-col justify-between p-4">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <code className="rounded bg-muted px-2 py-0.5 font-mono text-sm font-semibold">
                            {cmd.command}
                          </code>
                          <Badge variant="secondary">{cmd.category}</Badge>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{cmd.description}</p>
                        <pre className="mt-2 overflow-x-auto rounded bg-muted/60 p-2 font-mono text-xs">
                          {cmd.example}
                        </pre>
                      </div>
                      <div className="mt-3 flex items-center justify-end pt-1">
                        <Button asChild size="sm" variant="ghost">
                          <Link to={`/reference#${cmd.id}`}>View in Reference</Link>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {(filterType === 'all' || filterType === 'exercise') && results.exercises.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-center gap-2">
                  <Dumbbell className="h-4 w-4 text-accent" />
                  <h2 className="font-serif text-xl font-semibold">
                    Exercises ({results.exercises.length})
                  </h2>
                </div>
                <div className="grid gap-3">
                  {results.exercises.map((ex) => {
                    const course = COURSES.find((c) => c.id === ex.courseId)
                    return (
                      <Card key={ex.id} className="p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{ex.type.replaceAll('_', ' ')}</Badge>
                            <span className="text-xs text-muted-foreground">{course?.title}</span>
                          </div>
                          <Button asChild size="sm" variant="outline">
                            <Link to={`/exercises/${ex.id}`}>Solve drill</Link>
                          </Button>
                        </div>
                        <h3 className="mt-2 text-base font-semibold">{ex.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{ex.prompt}</p>
                      </Card>
                    )
                  })}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
