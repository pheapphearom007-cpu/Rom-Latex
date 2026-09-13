import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider } from '@/features/auth/auth-context'
import { AppShell, MarketingShell } from '@/layouts/AppShell'
import { useProgressStore } from '@/stores/progress-store'
import { initTheme } from '@/stores/theme-store'

const LandingPage = lazy(() => import('@/pages/LandingPage').then((m) => ({ default: m.LandingPage })))
const AboutPage = lazy(() => import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const LearnDashboard = lazy(() => import('@/pages/LearnDashboard').then((m) => ({ default: m.LearnDashboard })))
const CourseOverviewPage = lazy(() => import('@/pages/CourseOverviewPage').then((m) => ({ default: m.CourseOverviewPage })))
const LessonPage = lazy(() => import('@/pages/LessonPage').then((m) => ({ default: m.LessonPage })))
const PlaygroundPage = lazy(() => import('@/pages/PlaygroundPage').then((m) => ({ default: m.PlaygroundPage })))
const ExercisesPage = lazy(() => import('@/pages/ExercisesPage').then((m) => ({ default: m.ExercisesPage })))
const ExerciseDetailPage = lazy(() => import('@/pages/ExerciseDetailPage').then((m) => ({ default: m.ExerciseDetailPage })))
const ReferencePage = lazy(() => import('@/pages/ReferencePage').then((m) => ({ default: m.ReferencePage })))
const SearchPage = lazy(() => import('@/pages/SearchPage').then((m) => ({ default: m.SearchPage })))
const BookmarksPage = lazy(() => import('@/pages/BookmarksPage').then((m) => ({ default: m.BookmarksPage })))
const ProgressPage = lazy(() => import('@/pages/ProgressPage').then((m) => ({ default: m.ProgressPage })))
const ProfilePage = lazy(() => import('@/pages/ProfilePage').then((m) => ({ default: m.ProfilePage })))
const LoginPage = lazy(() => import('@/pages/LoginPage').then((m) => ({ default: m.LoginPage })))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))

function PageLoading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center p-8">
      <div className="flex items-center gap-3 text-sm text-muted-foreground font-serif">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        <span>Loading LaTeX module…</span>
      </div>
    </div>
  )
}

export function App() {
  useEffect(() => {
    initTheme()
    useProgressStore.getState().touchStreak()
  }, [])

  return (
    <ErrorBoundary>
      <AuthProvider>
        <TooltipProvider>
          <BrowserRouter>
            <Suspense fallback={<PageLoading />}>
              <Routes>
                {/* Marketing routes */}
                <Route element={<MarketingShell />}>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/about" element={<AboutPage />} />
                </Route>

                {/* Core application routes */}
                <Route element={<AppShell />}>
                  <Route path="/learn" element={<LearnDashboard />} />
                  <Route path="/learn/:courseSlug" element={<CourseOverviewPage />} />
                  <Route path="/learn/:courseSlug/:lessonSlug" element={<LessonPage />} />
                  <Route path="/playground" element={<PlaygroundPage />} />
                  <Route path="/exercises" element={<ExercisesPage />} />
                  <Route path="/exercises/:exerciseId" element={<ExerciseDetailPage />} />
                  <Route path="/reference" element={<ReferencePage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/bookmarks" element={<BookmarksPage />} />
                  <Route path="/progress" element={<ProgressPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
