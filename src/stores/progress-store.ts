import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ACHIEVEMENTS, COURSES } from '@/data/catalog'
import { EXERCISES } from '@/data/exercises'
import { LESSONS } from '@/data/lessons'
import { supabase } from '@/lib/supabase'
import type { Bookmark, BookmarkType, UserProgressState } from '@/types'

const empty: UserProgressState = {
  completedLessonIds: [],
  completedExerciseIds: [],
  exerciseAttempts: {},
  bookmarks: [],
  unlockedAchievementIds: [],
  currentCourseId: 'fundamentals',
  streak: 0,
  totalSeconds: 0,
  activity: [],
}

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

function deriveAchievements(state: UserProgressState) {
  const unlocked = new Set(state.unlockedAchievementIds)
  const complete = (id: string) => unlocked.add(id)
  if (state.completedLessonIds.length >= 1) complete('first-lesson')
  if (state.completedExerciseIds.length >= 1) complete('first-exercise')
  if (state.completedLessonIds.length >= 10) complete('ten-lessons')
  if (state.completedLessonIds.length >= 25) complete('twenty-five-lessons')
  for (const course of COURSES) {
    const done = course.lessonIds.every((id) => state.completedLessonIds.includes(id))
    if (done) {
      complete('course-completed')
      if (course.id === 'fundamentals') complete('latex-beginner')
      if (course.id === 'mathematics') complete('math-master')
      if (course.id === 'academic') complete('academic-writer')
    }
  }
  return [...unlocked]
}

type ProgressStore = UserProgressState & {
  markLessonComplete: (lessonId: string, title: string) => void
  markExerciseComplete: (exerciseId: string, title: string) => void
  registerAttempt: (exerciseId: string) => void
  addSeconds: (seconds: number) => void
  toggleBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt'> & { type: BookmarkType }) => void
  isBookmarked: (type: BookmarkType, targetId: string) => boolean
  touchStreak: () => void
  setCurrentCourse: (courseId: string) => void
  setLastLesson: (lessonId: string) => void
  resetLocal: () => void
  hydrateRemote: (partial: Partial<UserProgressState>) => void
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      ...empty,
      markLessonComplete: (lessonId, title) => {
        const state = get()
        if (state.completedLessonIds.includes(lessonId)) return
        const next: UserProgressState = {
          ...state,
          completedLessonIds: [...state.completedLessonIds, lessonId],
          lastLessonId: lessonId,
          activity: [{ id: crypto.randomUUID(), label: `Completed lesson: ${title}`, at: new Date().toISOString() }, ...state.activity].slice(0, 12),
        }
        next.unlockedAchievementIds = deriveAchievements(next)
        set(next)
        void syncLesson(lessonId)
      },
      markExerciseComplete: (exerciseId, title) => {
        const state = get()
        if (state.completedExerciseIds.includes(exerciseId)) {
          get().registerAttempt(exerciseId)
          return
        }
        const next: UserProgressState = {
          ...state,
          completedExerciseIds: [...state.completedExerciseIds, exerciseId],
          exerciseAttempts: {
            ...state.exerciseAttempts,
            [exerciseId]: (state.exerciseAttempts[exerciseId] ?? 0) + 1,
          },
          activity: [{ id: crypto.randomUUID(), label: `Solved exercise: ${title}`, at: new Date().toISOString() }, ...state.activity].slice(0, 12),
        }
        next.unlockedAchievementIds = deriveAchievements(next)
        set(next)
        void syncAttempt(exerciseId, true)
      },
      registerAttempt: (exerciseId) => {
        const state = get()
        set({
          exerciseAttempts: {
            ...state.exerciseAttempts,
            [exerciseId]: (state.exerciseAttempts[exerciseId] ?? 0) + 1,
          },
        })
        void syncAttempt(exerciseId, false)
      },
      addSeconds: (seconds) => set({ totalSeconds: get().totalSeconds + seconds }),
      toggleBookmark: (bookmark) => {
        const state = get()
        const existing = state.bookmarks.find((item) => item.type === bookmark.type && item.targetId === bookmark.targetId)
        const bookmarks = existing
          ? state.bookmarks.filter((item) => item.id !== existing.id)
          : [
              {
                ...bookmark,
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString(),
              },
              ...state.bookmarks,
            ]
        set({ bookmarks })
        void syncBookmark(bookmark, !existing)
      },
      isBookmarked: (type, targetId) =>
        get().bookmarks.some((item) => item.type === type && item.targetId === targetId),
      touchStreak: () => {
        const state = get()
        const today = todayKey()
        if (state.lastActiveDate === today) return
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
        const streak = state.lastActiveDate === yesterday ? state.streak + 1 : 1
        set({ streak, lastActiveDate: today })
      },
      setCurrentCourse: (courseId) => set({ currentCourseId: courseId }),
      setLastLesson: (lessonId) => set({ lastLessonId: lessonId }),
      resetLocal: () => set(empty),
      hydrateRemote: (partial) => set({ ...get(), ...partial }),
    }),
    {
      name: 'learn-latex-progress',
      merge: (persistedState, currentState) => {
        const p = (persistedState as Partial<UserProgressState>) || {}
        return {
          ...currentState,
          ...p,
          completedLessonIds: Array.isArray(p.completedLessonIds) ? p.completedLessonIds : [],
          completedExerciseIds: Array.isArray(p.completedExerciseIds) ? p.completedExerciseIds : [],
          exerciseAttempts: p.exerciseAttempts && typeof p.exerciseAttempts === 'object' ? p.exerciseAttempts : {},
          bookmarks: Array.isArray(p.bookmarks) ? p.bookmarks : [],
          unlockedAchievementIds: Array.isArray(p.unlockedAchievementIds) ? p.unlockedAchievementIds : [],
          activity: Array.isArray(p.activity) ? p.activity : [],
        }
      },
    },
  ),
)

async function syncLesson(lessonId: string) {
  const user = (await supabase?.auth.getUser())?.data.user
  if (!supabase || !user) return
  await supabase.from('user_progress').upsert({
    user_id: user.id,
    lesson_id: lessonId,
    completed: true,
    completed_at: new Date().toISOString(),
  })
}

async function syncAttempt(exerciseId: string, correct: boolean) {
  const user = (await supabase?.auth.getUser())?.data.user
  if (!supabase || !user) return
  await supabase.from('exercise_attempts').insert({
    user_id: user.id,
    exercise_id: exerciseId,
    correct,
  })
}

async function syncBookmark(
  bookmark: Omit<Bookmark, 'id' | 'createdAt'>,
  add: boolean,
) {
  const user = (await supabase?.auth.getUser())?.data.user
  if (!supabase || !user) return
  if (add) {
    await supabase.from('bookmarks').insert({
      user_id: user.id,
      target_type: bookmark.type,
      target_id: bookmark.targetId,
      title: bookmark.title,
      href: bookmark.href,
    })
    return
  }
  await supabase.from('bookmarks').delete().match({
    user_id: user.id,
    target_type: bookmark.type,
    target_id: bookmark.targetId,
  })
}

export function courseProgress(courseId: string) {
  const { completedLessonIds } = useProgressStore.getState()
  const course = COURSES.find((item) => item.id === courseId)
  if (!course) return 0
  const done = course.lessonIds.filter((id) => completedLessonIds.includes(id)).length
  return Math.round((done / course.lessonIds.length) * 100)
}

export function overallProgress() {
  const { completedLessonIds, completedExerciseIds } = useProgressStore.getState()
  const lessonShare = completedLessonIds.length / LESSONS.length
  const exerciseShare = completedExerciseIds.length / EXERCISES.length
  return Math.round(((lessonShare + exerciseShare) / 2) * 100)
}

export { ACHIEVEMENTS }
