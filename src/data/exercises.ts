import { LESSONS } from '@/data/lessons'
import type { Exercise } from '@/types'

const extra: Exercise[] = [
  {
    id: 'ex-l01b',
    lessonId: 'l01',
    courseId: 'fundamentals',
    title: 'What LaTeX is',
    prompt: 'LaTeX is best described as:',
    type: 'multiple_choice',
    options: [
      { id: 'a', label: 'A', text: 'A what-you-see-is-what-you-get word processor' },
      { id: 'b', label: 'B', text: 'A document preparation system that typesets markup source' },
      { id: 'c', label: 'C', text: 'A spreadsheet engine' },
      { id: 'd', label: 'D', text: 'A bitmap image editor' },
    ],
    acceptedAnswers: ['b', 'B'],
    explanation: 'You write source, then an engine produces a typeset document.',
    difficulty: 'beginner',
  },
  {
    id: 'ex-l05b',
    lessonId: 'l05',
    courseId: 'fundamentals',
    title: 'Reserved percent',
    prompt: 'How do you print a percent sign in LaTeX text?',
    type: 'multiple_choice',
    options: [
      { id: 'a', label: 'A', text: '%' },
      { id: 'b', label: 'B', text: '\\%' },
      { id: 'c', label: 'C', text: '%%' },
      { id: 'd', label: 'D', text: 'percent()' },
    ],
    acceptedAnswers: ['b', 'B', '\\%'],
    explanation: '% starts a comment. The printable character is \\%.',
    difficulty: 'beginner',
  },
  {
    id: 'ex-l06b',
    lessonId: 'l06',
    courseId: 'fundamentals',
    title: 'Create a section',
    prompt: 'How do you create a section in LaTeX?',
    type: 'multiple_choice',
    options: [
      { id: 'a', label: 'A', text: '<section>' },
      { id: 'b', label: 'B', text: '\\section{}' },
      { id: 'c', label: 'C', text: '#section' },
      { id: 'd', label: 'D', text: 'section()' },
    ],
    acceptedAnswers: ['b', 'B', '\\section{}'],
    explanation: 'Sectioning commands start with a backslash and take the title in braces.',
    difficulty: 'beginner',
  },
  {
    id: 'ex-l09b',
    lessonId: 'l09',
    courseId: 'fundamentals',
    title: 'Predict a table row',
    prompt: 'What does this source produce as the first row of cells?\nA & B \\\\',
    type: 'predict_output',
    acceptedAnswers: ['A B', 'A | B', 'A    B', 'a b'],
    explanation: '& separates columns and \\\\ ends the row, so the cells are A and B.',
    difficulty: 'beginner',
  },
  {
    id: 'ex-l11b',
    lessonId: 'l11',
    courseId: 'mathematics',
    title: 'Fix the math delimiters',
    prompt: 'This inline math never closes. Repair it so it typesets E = mc^2.',
    type: 'fix_code',
    starterCode: 'Einstein wrote $E = mc^2 in 1905.',
    acceptedAnswers: [
      'Einstein wrote $E = mc^2$ in 1905.',
      'Einstein wrote \\( E = mc^2 \\) in 1905.',
      'Einstein wrote \\(E = mc^2\\) in 1905.',
    ],
    explanation: 'Inline math needs a matching closer: $ ... $ or \\( ... \\).',
    difficulty: 'intermediate',
  },
  {
    id: 'ex-l13b',
    lessonId: 'l13',
    courseId: 'mathematics',
    title: 'Write a fraction',
    prompt: 'Write LaTeX that produces a stacked fraction a over b in display math.',
    type: 'write_code',
    starterCode: '$$  $$',
    acceptedAnswers: ['$$\\frac{a}{b}$$', '\\frac{a}{b}', '$$\\frac{a}{b}$$'],
    explanation: '\\frac{numerator}{denominator} builds the stacked fraction.',
    difficulty: 'intermediate',
  },
]

function normalize(value: string) {
  return value.replace(/\s+/g, ' ').trim()
}

const generated: Exercise[] = LESSONS.map((lesson) => {
  const typeByNumber: Exercise['type'][] = [
    'multiple_choice',
    'fill_blank',
    'write_code',
    'fix_code',
    'predict_output',
  ]
  const type = typeByNumber[lesson.number % typeByNumber.length]
  const sample = lesson.sections.find((section) => section.code)?.code ?? '\\section{Practice}'

  if (type === 'multiple_choice') {
    return {
      id: `ex-${lesson.id}`,
      lessonId: lesson.id,
      courseId: lesson.courseId,
      title: `${lesson.title} check`,
      prompt: `Which statement best matches this lesson: ${lesson.title}?`,
      type,
      options: [
        { id: 'a', label: 'A', text: lesson.description },
        { id: 'b', label: 'B', text: 'LaTeX cannot typeset mathematics.' },
        { id: 'c', label: 'C', text: 'Documents are edited as binary .docx files only.' },
        { id: 'd', label: 'D', text: 'Backslash commands are illegal in LaTeX.' },
      ],
      acceptedAnswers: ['a', 'A'],
      explanation: lesson.description,
      difficulty: lesson.difficulty,
    }
  }

  if (type === 'fill_blank') {
    return {
      id: `ex-${lesson.id}`,
      lessonId: lesson.id,
      courseId: lesson.courseId,
      title: `${lesson.title} command`,
      prompt: `Fill in the command discussed in “${lesson.title}”. The lesson keywords include: ${lesson.keywords.slice(0, 3).join(', ')}.`,
      type,
      acceptedAnswers: lesson.keywords.slice(0, 2),
      explanation: `Core terms: ${lesson.keywords.join(', ')}.`,
      difficulty: lesson.difficulty,
    }
  }

  if (type === 'fix_code') {
    return {
      id: `ex-${lesson.id}`,
      lessonId: lesson.id,
      courseId: lesson.courseId,
      title: `Repair a ${lesson.title} snippet`,
      prompt: 'Fix the broken snippet so braces are balanced and the command is valid.',
      type,
      starterCode: sample.replace('}', '') || '\\section{Title',
      acceptedAnswers: [normalize(sample), sample.trim()],
      explanation: 'Restore the missing brace or delimiter from the lesson example.',
      difficulty: lesson.difficulty,
    }
  }

  if (type === 'predict_output') {
    return {
      id: `ex-${lesson.id}`,
      lessonId: lesson.id,
      courseId: lesson.courseId,
      title: `Predict: ${lesson.title}`,
      prompt: `In one short phrase, what does this lesson teach you to produce?\nHint: ${lesson.description}`,
      type,
      acceptedAnswers: [lesson.title, ...lesson.keywords],
      explanation: lesson.description,
      difficulty: lesson.difficulty,
    }
  }

  return {
    id: `ex-${lesson.id}`,
    lessonId: lesson.id,
    courseId: lesson.courseId,
    title: `Write: ${lesson.title}`,
    prompt: `Write a short LaTeX fragment that demonstrates ${lesson.title.toLowerCase()}.`,
    type: 'write_code',
    starterCode: sample.split('\n')[0] ?? '',
    acceptedAnswers: lesson.keywords,
    explanation: 'Any fragment that uses the lesson’s core command is accepted. Compare with the worked example.',
    difficulty: lesson.difficulty,
  }
})

export const EXERCISES: Exercise[] = [...generated, ...extra]

export function getExercise(id: string) {
  return EXERCISES.find((exercise) => exercise.id === id)
}

export function getExercisesForLesson(lessonId: string) {
  return EXERCISES.filter((exercise) => exercise.lessonId === lessonId)
}

export function answersMatch(exercise: Exercise, value: string) {
  const normalized = normalize(value).toLowerCase()
  return exercise.acceptedAnswers.some((answer) => {
    const target = normalize(answer).toLowerCase()
    if (normalized === target) return true
    if (exercise.type === 'write_code' || exercise.type === 'fix_code') {
      return normalized.includes(target) || target.includes(normalized)
    }
    return false
  })
}
