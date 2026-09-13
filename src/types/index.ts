export type Difficulty = 'beginner' | 'intermediate' | 'advanced'
export type CourseLevel = 1 | 2 | 3 | 4
export type ExerciseType =
  | 'multiple_choice'
  | 'fill_blank'
  | 'write_code'
  | 'fix_code'
  | 'predict_output'

export type Course = {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  level: CourseLevel
  difficulty: Difficulty
  estimatedHours: number
  color: string
  lessonIds: string[]
  lockedUntilCourseId?: string
}

export type LessonSectionType = 'text' | 'example' | 'tip' | 'mistake' | 'practice'

export type LessonSection = {
  id: string
  title: string
  type: LessonSectionType
  body: string
  code?: string
  displayMode?: boolean
}

export type Lesson = {
  id: string
  slug: string
  courseId: string
  number: number
  title: string
  description: string
  difficulty: Difficulty
  estimatedMinutes: number
  keywords: string[]
  sections: LessonSection[]
  exerciseIds: string[]
}

export type ExerciseOption = {
  id: string
  label: string
  text: string
}

export type Exercise = {
  id: string
  lessonId: string
  courseId: string
  title: string
  prompt: string
  type: ExerciseType
  options?: ExerciseOption[]
  acceptedAnswers: string[]
  starterCode?: string
  explanation: string
  difficulty: Difficulty
}

export type CommandCategory =
  | 'Text'
  | 'Sections'
  | 'Mathematics'
  | 'Tables'
  | 'Images'
  | 'References'
  | 'Lists'
  | 'Formatting'
  | 'Packages'
  | 'TikZ'

export type LatexCommand = {
  id: string
  command: string
  description: string
  category: CommandCategory
  example: string
  keywords: string[]
}

export type Achievement = {
  id: string
  title: string
  description: string
  icon: string
}

export type BookmarkType = 'lesson' | 'command' | 'example'

export type Bookmark = {
  id: string
  type: BookmarkType
  targetId: string
  title: string
  href: string
  createdAt: string
}

export type ActivityItem = {
  id: string
  label: string
  at: string
}

export type UserProgressState = {
  completedLessonIds: string[]
  completedExerciseIds: string[]
  exerciseAttempts: Record<string, number>
  bookmarks: Bookmark[]
  unlockedAchievementIds: string[]
  currentCourseId: string
  lastLessonId?: string
  streak: number
  lastActiveDate?: string
  totalSeconds: number
  activity: ActivityItem[]
}

export type ProfileSettings = {
  displayName: string
  bio: string
  email: string
  theme: 'light' | 'dark' | 'system'
}
