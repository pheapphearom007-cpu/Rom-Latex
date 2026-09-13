import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { answersMatch } from '@/data/exercises'
import { useProgressStore } from '@/stores/progress-store'
import type { Exercise } from '@/types'
import { cn } from '@/lib/utils'

export function ExercisePlayer({ exercise, compact = false }: { exercise: Exercise; compact?: boolean }) {
  const [value, setValue] = useState(exercise.starterCode ?? '')
  const [choice, setChoice] = useState<string>()
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle')
  const mark = useProgressStore((state) => state.markExerciseComplete)
  const attempt = useProgressStore((state) => state.registerAttempt)
  const navigate = useNavigate()

  function submit() {
    const answer = exercise.type === 'multiple_choice' ? (choice ?? '') : value
    if (answersMatch(exercise, answer)) {
      setStatus('correct')
      mark(exercise.id, exercise.title)
      return
    }
    setStatus('wrong')
    attempt(exercise.id)
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{exercise.type.replaceAll('_', ' ')}</p>
        <h2 className="font-serif text-xl">{exercise.title}</h2>
        <p className="mt-2 whitespace-pre-wrap text-sm leading-6">{exercise.prompt}</p>
      </div>

      {exercise.type === 'multiple_choice' && exercise.options ? (
        <div className="grid gap-2" role="radiogroup" aria-label="Answers">
          {exercise.options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setChoice(option.id)}
              className={cn(
                'rounded-lg border border-border px-3 py-2 text-left text-sm hover:bg-muted',
                choice === option.id && 'border-accent bg-accent/10',
              )}
            >
              <span className="mr-2 font-semibold">{option.label}.</span>
              {option.text}
            </button>
          ))}
        </div>
      ) : exercise.type === 'fill_blank' || exercise.type === 'predict_output' ? (
        <Input value={value} onChange={(event) => setValue(event.target.value)} aria-label="Answer" />
      ) : (
        <Textarea
          className="min-h-32 font-mono"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          aria-label="LaTeX answer"
        />
      )}

      <div className="flex flex-wrap gap-2">
        <Button onClick={submit}>Check answer</Button>
        {!compact && (
          <Button variant="outline" onClick={() => navigate(`/exercises/${exercise.id}`)}>
            Open exercise page
          </Button>
        )}
      </div>

      {status === 'correct' && (
        <p className="rounded-lg bg-emerald-700/10 px-3 py-2 text-sm text-emerald-800 dark:text-emerald-300">
          ✓ Correct. {exercise.explanation}
        </p>
      )}
      {status === 'wrong' && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm">
          ✗ Try again. Re-read the lesson example, then submit a new answer.
        </p>
      )}
    </div>
  )
}
