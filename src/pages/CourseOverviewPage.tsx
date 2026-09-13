import { Link, useParams } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { COURSES } from '@/data/catalog'
import { getCourse, getCourseLessons } from '@/data/lessons'
import { useProgressStore } from '@/stores/progress-store'
import { CheckCircle2, Circle, Lock } from 'lucide-react'

export function CourseOverviewPage() {
  const { courseSlug } = useParams()
  const course = courseSlug ? getCourse(courseSlug) : undefined
  const completed = useProgressStore((s) => s.completedLessonIds)
  const setCurrent = useProgressStore((s) => s.setCurrentCourse)

  if (!course) {
    return <Unavailable title="Course unavailable" />
  }

  const lessons = getCourseLessons(course.id)
  const done = lessons.filter((lesson) => completed.includes(lesson.id)).length
  const percent = Math.round((done / lessons.length) * 100)
  const next = lessons.find((lesson) => !completed.includes(lesson.id)) ?? lessons[0]
  const courseIndex = COURSES.findIndex((item) => item.id === course.id)
  const previous = COURSES[courseIndex - 1]
  const prevPercent = previous
    ? Math.round(
        (getCourseLessons(previous.id).filter((lesson) => completed.includes(lesson.id)).length / previous.lessonIds.length) *
          100,
      )
    : 100

  return (
    <div className="space-y-8">
      <Seo title={`${course.title} — Learn LaTeX`} description={course.description} />
      <div>
        <p className="text-sm text-muted-foreground">Level {course.level}</p>
        <h1 className="font-serif text-3xl">{course.title}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{course.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge>{lessons.length} lessons</Badge>
          <Badge variant="secondary">{course.difficulty}</Badge>
          <Badge variant="outline">{course.estimatedHours} hours</Badge>
        </div>
        <div className="mt-6 max-w-md space-y-2">
          <Progress value={percent} />
          <p className="text-sm">{percent}% · {done} completed</p>
        </div>
        {next && (
          <Button className="mt-4" asChild onClick={() => setCurrent(course.id)}>
            <Link to={`/learn/${course.slug}/${next.slug}`}>Continue learning</Link>
          </Button>
        )}
      </div>
      <div className="space-y-3">
        {lessons.map((lesson, index) => {
          const isDone = completed.includes(lesson.id)
          const locked = prevPercent < 40 && courseIndex > 0 && index > 0 && !isDone && !completed.includes(lessons[0].id)
          return (
            <Card key={lesson.id}>
              <CardContent className="flex items-center gap-4 p-4">
                {isDone ? <CheckCircle2 className="h-5 w-5 text-success" /> : locked ? <Lock className="h-5 w-5" /> : <Circle className="h-5 w-5 text-muted-foreground" />}
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">Lesson {lesson.number}</p>
                  <h2 className="font-medium">{lesson.title}</h2>
                  <p className="truncate text-sm text-muted-foreground">{lesson.description}</p>
                </div>
                <Button asChild size="sm" variant="outline">
                  <Link to={`/learn/${course.slug}/${lesson.slug}`}>{isDone ? 'Review' : 'Open'}</Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export function Unavailable({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-lg py-20 text-center">
      <h1 className="font-serif text-3xl">{title}</h1>
      <p className="mt-2 text-muted-foreground">This item is missing or not published yet.</p>
      <Button asChild className="mt-6">
        <Link to="/learn">Back to dashboard</Link>
      </Button>
    </div>
  )
}
