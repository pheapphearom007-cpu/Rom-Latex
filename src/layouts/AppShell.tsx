import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  Bookmark,
  BookOpen,
  GraduationCap,
  Menu,
  Moon,
  Search,
  SquarePlay,
  Sun,
  UserRound,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/features/auth/use-auth'
import { useProgressStore } from '@/stores/progress-store'
import { useThemeStore } from '@/stores/theme-store'
import { cn } from '@/lib/utils'

const links = [
  { to: '/learn', label: 'Learn', icon: GraduationCap },
  { to: '/playground', label: 'Playground', icon: SquarePlay },
  { to: '/exercises', label: 'Exercises', icon: BookOpen },
  { to: '/reference', label: 'Reference', icon: BookOpen },
  { to: '/search', label: 'Search', icon: Search },
  { to: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
  { to: '/progress', label: 'Progress', icon: GraduationCap },
]

export function AppShell() {
  const [open, setOpen] = useState(false)
  const { user, guest, signOut } = useAuth()
  const preference = useThemeStore((s) => s.preference)
  const setPreference = useThemeStore((s) => s.setPreference)
  const location = useLocation()
  const completed = useProgressStore((s) => s.completedLessonIds.length)

  return (
    <div className="min-h-screen bg-background">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2">
        Skip to content
      </a>
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4">
          <Link to="/" className="font-serif text-lg font-semibold tracking-tight">
            Learn LaTeX
          </Link>
          <nav className="ml-6 hidden items-center gap-1 lg:flex" aria-label="Primary">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn('rounded-md px-3 py-2 text-sm hover:bg-muted', isActive && 'bg-muted font-medium')
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden text-xs text-muted-foreground sm:inline">{completed}/40 lessons</span>
            <Button
              size="icon"
              variant="ghost"
              aria-label="Toggle theme"
              onClick={() => setPreference(preference === 'dark' ? 'light' : 'dark')}
            >
              {preference === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            {user || guest ? (
              <>
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/profile" aria-label="Profile">
                    <UserRound className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="sm" onClick={() => void signOut()}>
                  Log out
                </Button>
              </>
            ) : (
              <Button size="sm" asChild>
                <Link to="/login">Log in</Link>
              </Button>
            )}
            <Button className="lg:hidden" size="icon" variant="ghost" aria-label="Open menu" onClick={() => setOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button className="absolute inset-0 bg-black/40" aria-label="Close menu" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-72 flex-col bg-card p-4 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-serif text-lg">Menu</p>
              <Button size="icon" variant="ghost" onClick={() => setOpen(false)} aria-label="Close">
                <X className="h-4 w-4" />
              </Button>
            </div>
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={cn('rounded-md px-3 py-3 text-sm hover:bg-muted', location.pathname.startsWith(link.to) && 'bg-muted')}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <main id="main" className="mx-auto max-w-7xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export function MarketingShell() {
  const preference = useThemeStore((s) => s.preference)
  const setPreference = useThemeStore((s) => s.setPreference)

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link to="/" className="font-serif text-lg font-bold tracking-tight">
            Learn LaTeX
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/learn" className="hidden sm:inline hover:text-accent transition-colors">
              Curriculum
            </Link>
            <Link to="/playground" className="hidden sm:inline hover:text-accent transition-colors">
              Playground
            </Link>
            <Link to="/reference" className="hidden md:inline hover:text-accent transition-colors">
              Reference
            </Link>
            <Link to="/about" className="hover:text-accent transition-colors">
              About
            </Link>
            <Button
              size="icon"
              variant="ghost"
              aria-label="Toggle theme"
              onClick={() => setPreference(preference === 'dark' ? 'light' : 'dark')}
            >
              {preference === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button asChild size="sm">
              <Link to="/learn">Start Learning</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-card/50 py-12 text-sm text-muted-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:flex-row">
          <div className="flex items-center gap-2 font-serif text-base font-semibold text-foreground">
            Learn LaTeX
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-xs">
            <Link to="/learn" className="hover:underline">Curriculum</Link>
            <Link to="/playground" className="hover:underline">Playground</Link>
            <Link to="/reference" className="hover:underline">Reference</Link>
            <Link to="/search" className="hover:underline">Search</Link>
            <Link to="/about" className="hover:underline">About</Link>
          </div>
          <p className="text-xs">
            Built with React, KaTeX, and Monaco. Free and open for scholars.
          </p>
        </div>
      </footer>
    </div>
  )
}
