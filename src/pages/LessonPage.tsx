import { Link, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { Bookmark, BookmarkCheck, CheckCircle2, Circle, Clock, Menu } from 'lucide-react'
import { Seo } from '@/components/Seo'
import { CodeExample } from '@/components/latex/CodeExample'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { getExercisesForLesson } from '@/data/exercises'
import { COURSES } from '@/data/catalog'
import { getAdjacentLessons, getCourse, getCourseLessons, getLesson } from '@/data/lessons'
import { ExercisePlayer } from '@/features/exercises/ExercisePlayer'
import { Unavailable } from '@/pages/CourseOverviewPage'
import { useProgressStore } from '@/stores/progress-store'
import { cn } from '@/lib/utils'
export function LessonPage() {
  const { courseSlug, lessonSlug } = useParams()
  const lesson = courseSlug && lessonSlug ? getLesson(courseSlug, lessonSlug) : undefined
  const completed = useProgressStore((s) => s.completedLessonIds)
  const mark = useProgressStore((s) => s.markLessonComplete)
  const setLast = useProgressStore((s) => s.setLastLesson)
  const addSeconds = useProgressStore((s) => s.addSeconds)
  const toggleBookmark = useProgressStore((s) => s.toggleBookmark)
  const bookmarked = useProgressStore((s) =>
    lesson ? s.bookmarks.some((item) => item.type === 'lesson' && item.targetId === lesson.id) : false,
  )
  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => {
    if (!lesson) return
    setLast(lesson.id)
    const started = Date.now()
    return () => addSeconds(Math.round((Date.now() - started) / 1000))
  }, [lesson, addSeconds, setLast])

  const adjacent = lesson ? getAdjacentLessons(lesson) : undefined
  const course = courseSlug ? getCourse(courseSlug) : undefined
  const lessons = course ? getCourseLessons(course.id) : []
  const exercises = lesson ? getExercisesForLesson(lesson.id) : []
  const toc = useMemo(() => lesson?.sections.map((section) => ({ id: section.id, title: section.title })) ?? [], [lesson])
  const doneCount = lessons.filter((item) => completed.includes(item.id)).length

  if (!lesson || !course) return <Unavailable title="Lesson unavailable" />

  const href = `/learn/${course.slug}/${lesson.slug}`

  return (
    <div className="lg:grid lg:grid-cols-[16rem_minmax(0,1fr)_14rem] lg:gap-8">
      <Seo title={`${lesson.title} — Learn LaTeX`} description={lesson.description} />
      <Button className="mb-4 lg:hidden" variant="outline" onClick={() => setNavOpen((v) => !v)}>
        <Menu className="h-4 w-4" /> Course navigation
      </Button>
      <aside className={cn('mb-8 lg:mb-0', navOpen ? 'block' : 'hidden lg:block')}>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{course.title}</p>
        <Progress className="mt-2" value={(doneCount / lessons.length) * 100} />
        <nav className="mt-4 space-y-1" aria-label="Lessons">
          {lessons.map((item) => {
            const active = item.id === lesson.id
            const done = completed.includes(item.id)
            return (
              <Link
                key={item.id}
                to={`/learn/${course.slug}/${item.slug}`}
                className={cn(
                  'flex items-start gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted',
                  active && 'bg-muted font-medium',
                )}
              >
                {done ? <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" /> : <Circle className="mt-0.5 h-4 w-4" />}
                <span>{item.title}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      <article>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{lesson.difficulty}</Badge>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" /> {lesson.estimatedMinutes} min
          </span>
        </div>
        <h1 className="mt-3 font-serif text-3xl">{lesson.title}</h1>
        <p className="mt-2 text-muted-foreground">{lesson.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toggleBookmark({
                type: 'lesson',
                targetId: lesson.id,
                title: lesson.title,
                href,
              })
            }
          >
            {bookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
            {bookmarked ? 'Bookmarked' : 'Bookmark'}
          </Button>
        </div>

        <div className="mt-8 space-y-10">
          {lesson.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="font-serif text-2xl">{section.title}</h2>
              {section.type === 'tip' && (
                <p className="mt-2 rounded-lg border border-accent/30 bg-accent/10 px-3 py-2 text-sm">{section.body}</p>
              )}
              {section.type === 'mistake' && (
                <p className="mt-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm">{section.body}</p>
              )}
              {section.type !== 'tip' && section.type !== 'mistake' && (
                <p className="mt-3 whitespace-pre-wrap leading-7">{section.body}</p>
              )}
              {section.code ? <div className="mt-4"><CodeExample code={section.code} /></div> : null}
            </section>
          ))}

          <section id="exercises">
            <h2 className="font-serif text-2xl">Exercise</h2>
            <div className="mt-4 space-y-8">
              {exercises.map((exercise) => (
                <div key={exercise.id} className="rounded-xl border border-border p-4">
                  <ExercisePlayer exercise={exercise} />
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-10 flex flex-wrap justify-between gap-3 border-t border-border pt-6">
          {adjacent?.prev && course ? (
            <Button variant="outline" asChild>
              <Link to={`/learn/${course.slug}/${adjacent.prev.slug}`}>Previous</Link>
            </Button>
          ) : (
            <span />
          )}
          <Button onClick={() => mark(lesson.id, lesson.title)}>Mark lesson complete</Button>
          {adjacent?.next && course ? (
            <Button asChild>
              <Link to={`/learn/${course.slug}/${adjacent.next.slug}`} onClick={() => mark(lesson.id, lesson.title)}>
                Next lesson
              </Link>
            </Button>
          ) : adjacent?.course && COURSES[COURSES.findIndex((c) => c.id === course.id) + 1] ? (
            <Button asChild>
              <Link
                to={`/learn/${COURSES[COURSES.findIndex((c) => c.id === course.id) + 1].slug}`}
                onClick={() => mark(lesson.id, lesson.title)}
              >
                Next course
              </Link>
            </Button>
          ) : null}
        </div>
      </article>

      <aside className="mt-10 hidden lg:block">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">On this page</p>
        <nav className="mt-3 space-y-2 text-sm">
          {toc.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="block text-muted-foreground hover:text-foreground">
              {item.title}
            </a>
          ))}
          <a href="#exercises" className="block text-muted-foreground hover:text-foreground">
            Exercise
          </a>
        </nav>
        <p className="mt-6 text-sm text-muted-foreground">
          Lesson {lessons.findIndex((item) => item.id === lesson.id) + 1} of {lessons.length}
        </p>
      </aside>
    </div>
  )
}
