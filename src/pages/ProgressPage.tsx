import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ACHIEVEMENTS, COURSES } from '@/data/catalog'
import { EXERCISES } from '@/data/exercises'
import { LESSONS } from '@/data/lessons'
import { useProgressStore } from '@/stores/progress-store'
import { Award, BookOpen, Flame, Timer } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

export function ProgressPage() {
  const completedLessons = useProgressStore((s) => s.completedLessonIds)
  const completedExercises = useProgressStore((s) => s.completedExerciseIds)
  const streak = useProgressStore((s) => s.streak)
  const totalSeconds = useProgressStore((s) => s.totalSeconds)
  const currentCourseId = useProgressStore((s) => s.currentCourseId)
  const activity = useProgressStore((s) => s.activity)
  const unlocked = useProgressStore((s) => s.unlockedAchievementIds)
  const lastLessonId = useProgressStore((s) => s.lastLessonId)
  const course = COURSES.find((item) => item.id === currentCourseId) ?? COURSES[0]
  const last = LESSONS.find((item) => item.id === lastLessonId) ?? LESSONS[0]
  const overall = Math.round(
    ((completedLessons.length / LESSONS.length + completedExercises.length / EXERCISES.length) / 2) * 100,
  )
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)

  return (
    <div className="space-y-8">
      <Seo title="Your progress — Learn LaTeX" description="Track lessons, exercises, streak, and achievements." />
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl">Your progress</h1>
          <p className="text-muted-foreground">Overall {overall}%</p>
        </div>
        <Button asChild>
          <Link to={`/learn/${course.slug}/${last.slug}`}>Continue learning</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Stat label="Overall" value={`${overall}%`} icon={Award} />
        <Stat label="Lessons" value={`${completedLessons.length} / ${LESSONS.length}`} icon={BookOpen} />
        <Stat label="Exercises" value={`${completedExercises.length} / ${EXERCISES.length}`} icon={BookOpen} />
        <Stat label="Learning time" value={hours ? `${hours}h ${minutes}m` : `${minutes}m`} icon={Timer} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current course</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{course.title}</p>
            <Progress
              className="mt-3"
              value={Math.round(
                (course.lessonIds.filter((id) => completedLessons.includes(id)).length / course.lessonIds.length) * 100,
              )}
            />
            <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Flame className="h-4 w-4" /> {streak}-day learning streak
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Completion split</CardTitle>
          </CardHeader>
          <CardContent className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Lessons', value: completedLessons.length || 0.01 },
                    { name: 'Remaining', value: Math.max(LESSONS.length - completedLessons.length, 0.01) },
                  ]}
                  dataKey="value"
                  innerRadius={50}
                  outerRadius={80}
                >
                  <Cell fill="#0f766e" />
                  <Cell fill="#e7e0d4" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          {activity.length === 0 ? (
            <p className="text-muted-foreground">Complete a lesson to see activity here.</p>
          ) : (
            activity.map((item) => (
              <p key={item.id}>
                {item.label}{' '}
                <span className="text-muted-foreground">{new Date(item.at).toLocaleString()}</span>
              </p>
            ))
          )}
        </CardContent>
      </Card>

      <div>
        <h2 className="font-serif text-2xl">Achievements</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {ACHIEVEMENTS.map((item) => (
            <Card key={item.id} className={unlocked.includes(item.id) ? '' : 'opacity-50'}>
              <CardHeader>
                <CardTitle className="text-base">{item.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value, icon: Icon }: { label: string; value: string; icon: typeof Award }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-5">
        <Icon className="h-5 w-5 text-accent" />
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
          <p className="font-serif text-2xl">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}
