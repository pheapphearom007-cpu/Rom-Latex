import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EXERCISES } from '@/data/exercises'
import { getLessonById } from '@/data/lessons'
import { useProgressStore } from '@/stores/progress-store'

export function ExercisesPage() {
  const done = useProgressStore((s) => s.completedExerciseIds)
  return (
    <div className="space-y-6">
      <Seo title="Exercises — Learn LaTeX" description="Practice LaTeX with mixed exercise types." />
      <div>
        <h1 className="font-serif text-3xl">Exercises</h1>
        <p className="mt-2 text-muted-foreground">
          {done.length} of {EXERCISES.length} completed
        </p>
      </div>
      <div className="grid gap-3">
        {EXERCISES.map((exercise) => {
          const lesson = getLessonById(exercise.lessonId)
          return (
            <Card key={exercise.id}>
              <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0 p-4">
                <div>
                  <CardTitle className="text-base">{exercise.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{lesson?.title}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{exercise.type.replaceAll('_', ' ')}</Badge>
                  {done.includes(exercise.id) ? <Badge variant="success">Done</Badge> : null}
                  <Link className="text-sm underline" to={`/exercises/${exercise.id}`}>
                    Open
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 text-sm text-muted-foreground">{exercise.prompt.slice(0, 140)}</CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
