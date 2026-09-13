import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { COURSES, ROADMAP } from '@/data/catalog'
import { LESSONS, getCourseLessons } from '@/data/lessons'
import { useProgressStore } from '@/stores/progress-store'
import { formatMinutes } from '@/lib/utils'

export function LearnDashboard() {
  const completed = useProgressStore((s) => s.completedLessonIds)
  const lastLessonId = useProgressStore((s) => s.lastLessonId)
  const last = LESSONS.find((lesson) => lesson.id === lastLessonId) ?? LESSONS[0]
  const lastCourse = COURSES.find((course) => course.id === last.courseId)

  return (
    <div className="space-y-10">
      <Seo title="Learn dashboard — Learn LaTeX" description="Choose a LaTeX course and continue your learning path." />
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl">Learn dashboard</h1>
          <p className="mt-2 text-muted-foreground">Follow the path from fundamentals to professional projects.</p>
        </div>
        <Button asChild>
          <Link to={`/learn/${lastCourse?.slug}/${last.slug}`}>Continue learning</Link>
        </Button>
      </div>

      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {ROADMAP.map((step, index) => (
          <li key={step.id} className="flex items-center gap-2">
            <span className="rounded-full bg-secondary px-3 py-1">{step.label}</span>
            {index < ROADMAP.length - 1 ? <span className="text-muted-foreground">↓</span> : null}
          </li>
        ))}
      </ol>

      <div className="grid gap-4 lg:grid-cols-2">
        {COURSES.map((course, index) => {
          const lessons = getCourseLessons(course.id)
          const done = lessons.filter((lesson) => completed.includes(lesson.id)).length
          const percent = Math.round((done / lessons.length) * 100)
          const previous = COURSES[index - 1]
          const prevDone = previous
            ? Math.round(
                (getCourseLessons(previous.id).filter((lesson) => completed.includes(lesson.id)).length /
                  previous.lessonIds.length) *
                  100,
              )
            : 100
          const locked = Boolean(previous) && prevDone < 40
          const minutes = lessons.reduce((sum, lesson) => sum + lesson.estimatedMinutes, 0)
          return (
            <Card key={course.id} className={locked ? 'opacity-70' : undefined}>
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle>{course.title}</CardTitle>
                  <Badge variant="secondary">{course.difficulty}</Badge>
                </div>
                <CardDescription>
                  {lessons.length} lessons · {formatMinutes(minutes)} · {done} completed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{course.description}</p>
                <Progress value={percent} />
                <p className="text-sm">{percent}% complete</p>
                {locked ? (
                  <p className="text-sm text-muted-foreground">
                    Unlocks after 40% of {previous?.title}. You can still read the overview.
                  </p>
                ) : null}
                <Button asChild variant={locked ? 'outline' : 'default'}>
                  <Link to={`/learn/${course.slug}`}>{percent > 0 ? 'Continue learning' : 'Start course'}</Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
