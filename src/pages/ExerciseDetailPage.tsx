import { Link, useParams } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { Button } from '@/components/ui/button'
import { getExercise } from '@/data/exercises'
import { COURSES } from '@/data/catalog'
import { getLessonById } from '@/data/lessons'
import { ExercisePlayer } from '@/features/exercises/ExercisePlayer'
import { Unavailable } from '@/pages/CourseOverviewPage'

export function ExerciseDetailPage() {
  const { exerciseId } = useParams()
  const exercise = exerciseId ? getExercise(exerciseId) : undefined
  const lesson = exercise ? getLessonById(exercise.lessonId) : undefined
  const course = COURSES.find((item) => item.id === lesson?.courseId)

  if (!exercise) return <Unavailable title="Exercise unavailable" />

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Seo title={`${exercise.title} — Learn LaTeX`} description={exercise.prompt} />
      {lesson && course ? (
        <Button variant="ghost" asChild>
          <Link to={`/learn/${course.slug}/${lesson.slug}`}>Back to lesson</Link>
        </Button>
      ) : null}
      <ExercisePlayer exercise={exercise} compact />
    </div>
  )
}
