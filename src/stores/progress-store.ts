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

let syncTimeout: number | undefined

export function schedulePushRemoteProgress() {
  if (!supabase) return
  if (syncTimeout) window.clearTimeout(syncTimeout)
  syncTimeout = window.setTimeout(() => {
    void pushRemoteProgress()
  }, 400)
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
          activity: [
            { id: crypto.randomUUID(), label: `Completed lesson: ${title}`, at: new Date().toISOString() },
            ...state.activity,
          ].slice(0, 15),
        }
        next.unlockedAchievementIds = deriveAchievements(next)
        set(next)
        void syncLesson(lessonId)
        schedulePushRemoteProgress()
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
          activity: [
            { id: crypto.randomUUID(), label: `Solved exercise: ${title}`, at: new Date().toISOString() },
            ...state.activity,
          ].slice(0, 15),
        }
        next.unlockedAchievementIds = deriveAchievements(next)
        set(next)
        void syncAttempt(exerciseId, true)
        schedulePushRemoteProgress()
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
        schedulePushRemoteProgress()
      },
      addSeconds: (seconds) => {
        set({ totalSeconds: get().totalSeconds + seconds })
        schedulePushRemoteProgress()
      },
      toggleBookmark: (bookmark) => {
        const state = get()
        const existing = state.bookmarks.find(
          (item) => item.type === bookmark.type && item.targetId === bookmark.targetId,
        )
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
        schedulePushRemoteProgress()
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
        schedulePushRemoteProgress()
      },
      setCurrentCourse: (courseId) => {
        set({ currentCourseId: courseId })
        schedulePushRemoteProgress()
      },
      setLastLesson: (lessonId) => {
        set({ lastLessonId: lessonId })
        schedulePushRemoteProgress()
      },
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
          exerciseAttempts:
            p.exerciseAttempts && typeof p.exerciseAttempts === 'object' ? p.exerciseAttempts : {},
          bookmarks: Array.isArray(p.bookmarks) ? p.bookmarks : [],
          unlockedAchievementIds: Array.isArray(p.unlockedAchievementIds) ? p.unlockedAchievementIds : [],
          activity: Array.isArray(p.activity) ? p.activity : [],
        }
      },
    },
  ),
)

export async function pushRemoteProgress() {
  if (!supabase) return
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const state = useProgressStore.getState()
    const { error } = await supabase.from('user_progress_summary').upsert({
      user_id: user.id,
      completed_lesson_ids: state.completedLessonIds,
      completed_exercise_ids: state.completedExerciseIds,
      exercise_attempts: state.exerciseAttempts,
      bookmarks: state.bookmarks,
      unlocked_achievement_ids: state.unlockedAchievementIds,
      current_course_id: state.currentCourseId,
      last_lesson_id: state.lastLessonId ?? 'l01',
      streak: state.streak,
      last_active_date: state.lastActiveDate ?? null,
      total_seconds: state.totalSeconds,
      activity: state.activity,
      updated_at: new Date().toISOString(),
    })

    if (error) {
      console.warn('Supabase summary upsert warning:', error.message)
    }
  } catch (err) {
    console.warn('Supabase push error:', err)
  }
}

export async function pullRemoteProgress() {
  if (!supabase) return
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from('user_progress_summary')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle()

    if (error) {
      console.warn('Supabase pull warning:', error.message)
      return
    }

    if (data) {
      const local = useProgressStore.getState()
      const mergedCompletedLessons = Array.from(
        new Set([...(data.completed_lesson_ids || []), ...(local.completedLessonIds || [])]),
      )
      const mergedCompletedExercises = Array.from(
        new Set([...(data.completed_exercise_ids || []), ...(local.completedExerciseIds || [])]),
      )
      const mergedAchievements = Array.from(
        new Set([...(data.unlocked_achievement_ids || []), ...(local.unlockedAchievementIds || [])]),
      )

      // Merge bookmarks
      const remoteBookmarks: Bookmark[] = Array.isArray(data.bookmarks) ? data.bookmarks : []
      const bookmarkMap = new Map<string, Bookmark>()
      for (const b of remoteBookmarks) bookmarkMap.set(`${b.type}:${b.targetId}`, b)
      for (const b of local.bookmarks) bookmarkMap.set(`${b.type}:${b.targetId}`, b)

      const nextState: Partial<UserProgressState> = {
        completedLessonIds: mergedCompletedLessons,
        completedExerciseIds: mergedCompletedExercises,
        unlockedAchievementIds: mergedAchievements,
        bookmarks: Array.from(bookmarkMap.values()),
        exerciseAttempts: { ...(data.exercise_attempts || {}), ...(local.exerciseAttempts || {}) },
        streak: Math.max(data.streak || 0, local.streak || 0),
        totalSeconds: Math.max(data.total_seconds || 0, local.totalSeconds || 0),
        currentCourseId: local.currentCourseId || data.current_course_id || 'fundamentals',
        lastLessonId: local.lastLessonId || data.last_lesson_id || 'l01',
        lastActiveDate: local.lastActiveDate || data.last_active_date,
        activity: (local.activity.length > 0 ? local.activity : data.activity) || [],
      }

      useProgressStore.getState().hydrateRemote(nextState)
      void pushRemoteProgress()
    } else {
      // First sign-in: push current local state to cloud
      void pushRemoteProgress()
    }
  } catch (err) {
    console.warn('Supabase pull error:', err)
  }
}

async function syncLesson(lessonId: string) {
  if (!supabase) return
  try {
    const user = (await supabase.auth.getUser())?.data.user
    if (!user) return
    await supabase.from('user_progress').upsert({
      user_id: user.id,
      lesson_id: lessonId,
      completed: true,
      completed_at: new Date().toISOString(),
    })
  } catch (err) {
    console.warn('syncLesson error:', err)
  }
}

async function syncAttempt(exerciseId: string, correct: boolean) {
  if (!supabase) return
  try {
    const user = (await supabase.auth.getUser())?.data.user
    if (!user) return
    await supabase.from('exercise_attempts').insert({
      user_id: user.id,
      exercise_id: exerciseId,
      correct,
      attempted_at: new Date().toISOString(),
    })
  } catch (err) {
    console.warn('syncAttempt error:', err)
  }
}

async function syncBookmark(
  bookmark: Omit<Bookmark, 'id' | 'createdAt'>,
  add: boolean,
) {
  if (!supabase) return
  try {
    const user = (await supabase.auth.getUser())?.data.user
    if (!user) return
    if (add) {
      await supabase.from('bookmarks').upsert({
        user_id: user.id,
        target_type: bookmark.type,
        target_id: bookmark.targetId,
        title: bookmark.title,
        href: bookmark.href,
        created_at: new Date().toISOString(),
      })
      return
    }
    await supabase.from('bookmarks').delete().match({
      user_id: user.id,
      target_type: bookmark.type,
      target_id: bookmark.targetId,
    })
  } catch (err) {
    console.warn('syncBookmark error:', err)
  }
}

export function courseProgress(courseId: string) {
  const { completedLessonIds } = useProgressStore.getState()
  const course = COURSES.find((item) => item.id === courseId)
  if (!course) return 0
  const done = course.lessonIds.filter((id) => completedLessonIds?.includes(id)).length
  return Math.round((done / course.lessonIds.length) * 100)
}

export function overallProgress() {
  const { completedLessonIds, completedExerciseIds } = useProgressStore.getState()
  const lessonShare = (completedLessonIds?.length || 0) / LESSONS.length
  const exerciseShare = (completedExerciseIds?.length || 0) / EXERCISES.length
  return Math.round(((lessonShare + exerciseShare) / 2) * 100)
}

export { ACHIEVEMENTS }
