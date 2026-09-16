import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertTriangle,
  Award,
  Bookmark,
  Check,
  Clock,
  Cloud,
  Download,
  Flame,
  GraduationCap,
  Loader2,
  LogOut,
  Moon,
  RefreshCw,
  RotateCcw,
  Save,
  Sun,
  Upload,
  UserCheck,
  UserRound,
} from 'lucide-react'
import { Seo } from '@/components/Seo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { EXERCISES } from '@/data/exercises'
import { LESSONS } from '@/data/lessons'
import { SupabaseConfigModal } from '@/components/SupabaseConfigModal'
import { useAuth } from '@/features/auth/use-auth'
import { supabase } from '@/lib/supabase'
import { formatMinutes } from '@/lib/utils'
import { pullRemoteProgress, pushRemoteProgress, useProgressStore } from '@/stores/progress-store'
import { useThemeStore } from '@/stores/theme-store'

export function ProfilePage() {
  const { user, signOut, configured, updateProfile } = useAuth()
  const preference = useThemeStore((s) => s.preference)
  const setPreference = useThemeStore((s) => s.setPreference)

  const completedLessons = useProgressStore((s) => s.completedLessonIds)
  const completedExercises = useProgressStore((s) => s.completedExerciseIds)
  const bookmarks = useProgressStore((s) => s.bookmarks)
  const streak = useProgressStore((s) => s.streak)
  const totalSeconds = useProgressStore((s) => s.totalSeconds)
  const unlocked = useProgressStore((s) => s.unlockedAchievementIds)
  const resetLocal = useProgressStore((s) => s.resetLocal)
  const hydrateRemote = useProgressStore((s) => s.hydrateRemote)

  const [resetDialogOpen, setResetDialogOpen] = useState(false)
  const [importNotice, setImportNotice] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Profile form state
  const [displayName, setDisplayName] = useState(
    () => (user?.user_metadata?.display_name as string | undefined) || user?.email?.split('@')[0] || '',
  )
  const [bio, setBio] = useState(
    () => (user?.user_metadata?.bio as string | undefined) || '',
  )
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [profileMessage, setProfileMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  // Cloud sync state
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncNotice, setSyncNotice] = useState<string | null>(null)

  useEffect(() => {
    if (!user || !supabase) return
    let active = true
    void supabase
      .from('profiles')
      .select('display_name, bio')
      .eq('id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!active) return
        if (data) {
          setDisplayName(data.display_name || user.user_metadata?.display_name || '')
          setBio(data.bio || '')
        } else {
          setDisplayName(user.user_metadata?.display_name || user.email?.split('@')[0] || '')
        }
      })
    return () => {
      active = false
    }
  }, [user])

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return
    setIsSavingProfile(true)
    setProfileMessage(null)
    try {
      const trimmedName = displayName.trim()
      const trimmedBio = bio.trim()

      const res = await updateProfile({ displayName: trimmedName, bio: trimmedBio })
      if (res.error) throw new Error(res.error)

      setProfileMessage({ text: 'Profile updated successfully!', type: 'success' })
      window.setTimeout(() => setProfileMessage(null), 3000)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save profile'
      setProfileMessage({ text: msg, type: 'error' })
    } finally {
      setIsSavingProfile(false)
    }
  }

  async function handleManualSync() {
    if (!user) return
    setIsSyncing(true)
    setSyncNotice(null)
    try {
      if (configured && supabase) {
        await pullRemoteProgress()
        await pushRemoteProgress()
        setSyncNotice('Progress successfully synced with cloud!')
      } else {
        setSyncNotice('All progress and notes are saved securely in local storage. Connect Supabase to sync across devices.')
      }
      window.setTimeout(() => setSyncNotice(null), 3500)
    } catch {
      setSyncNotice('Failed to sync. Please check your internet connection.')
      window.setTimeout(() => setSyncNotice(null), 4000)
    } finally {
      setIsSyncing(false)
    }
  }


  function handleThemeChange(key: 'system' | 'light' | 'dark') {
    setPreference(key)
    if (supabase && user) {
      void supabase
        .from('profiles')
        .update({ theme: key, updated_at: new Date().toISOString() })
        .eq('id', user.id)
    }
  }

  function exportData() {
    const state = useProgressStore.getState()
    const dataStr = JSON.stringify(state, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `rom-latex-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string)
        if (typeof json === 'object' && json !== null) {
          hydrateRemote(json)
          setImportNotice('Progress successfully imported!')
          window.setTimeout(() => setImportNotice(null), 3000)
        }
      } catch {
        setImportNotice('Failed to parse backup file. Please ensure it is valid JSON.')
        window.setTimeout(() => setImportNotice(null), 4000)
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <Seo title="User Profile & Settings — ROM LATEX" description="Manage your account, preferences, and learning progress." />

      <div>
        <h1 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">Profile & Settings</h1>
        <p className="mt-2 text-muted-foreground">
          View your learning statistics, configure theme settings, and manage your progress data.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                {user ? <UserCheck className="h-6 w-6" /> : <UserRound className="h-6 w-6" />}
              </div>
              <div className="min-w-0 flex-1">
                <CardTitle className="truncate text-xl font-semibold">
                  {displayName || (user ? user.email?.split('@')[0] : 'Guest Learner')}
                </CardTitle>
                <CardDescription className="truncate">
                  {user ? user.email : 'Local Storage Mode · Progress is saved in this browser'}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={user ? 'success' : 'secondary'}>
                {user ? (user.app_metadata?.provider === 'local' ? 'Local Account' : 'Cloud Synced') : 'Guest Account'}
              </Badge>
              {configured ? (
                <Badge variant="outline">Supabase Connected</Badge>
              ) : (
                <Badge variant="outline">Offline / Local Storage</Badge>
              )}
              <SupabaseConfigModal />
            </div>

            {user ? (
              <div className="space-y-5">
                {/* Cloud Sync Status & Action */}
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-muted/30 p-3.5 text-sm">
                  <div className="flex items-center gap-2.5">
                    <Cloud className="h-4 w-4 text-accent" />
                    <div>
                      <p className="font-medium">Cloud Progress Sync</p>
                      <p className="text-xs text-muted-foreground">
                        Your lessons, exercises, streak, and bookmarks sync automatically.
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => void handleManualSync()}
                    disabled={isSyncing}
                  >
                    <RefreshCw className={`mr-1.5 h-3.5 w-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                    {isSyncing ? 'Syncing...' : 'Sync Now'}
                  </Button>
                </div>
                {syncNotice && (
                  <div className="rounded-md border border-accent/40 bg-accent/10 px-3 py-2 text-xs font-medium text-foreground">
                    {syncNotice}
                  </div>
                )}

                {/* Profile Edit Form */}
                <form onSubmit={(e) => void handleSaveProfile(e)} className="space-y-4 rounded-lg border border-border p-4">
                  <h3 className="font-serif text-base font-semibold">Profile Details</h3>

                  {profileMessage && (
                    <div
                      className={`rounded-md border px-3 py-2 text-xs font-medium ${
                        profileMessage.type === 'success'
                          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'border-destructive/40 bg-destructive/10 text-destructive'
                      }`}
                    >
                      {profileMessage.text}
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <Label htmlFor="display-name">Display Name</Label>
                    <Input
                      id="display-name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Your display name"
                      maxLength={60}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="bio">Bio & Learning Goals</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="E.g., Learning LaTeX for writing research papers and thesis..."
                      rows={3}
                      maxLength={300}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <Button type="submit" size="sm" disabled={isSavingProfile}>
                      {isSavingProfile ? (
                        <>
                          <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-1.5 h-4 w-4" />
                          Save Profile
                        </>
                      )}
                    </Button>

                    <Button variant="ghost" size="sm" type="button" onClick={() => void signOut()}>
                      <LogOut className="mr-1.5 h-4 w-4 text-muted-foreground" />
                      Sign Out
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm">
                <p className="font-medium">Want to sync your progress across devices?</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  You are currently using local storage. All your lessons, bookmarks, and exercises are safely saved here.
                  You can create a local account or sign in to personalize your profile, or configure Supabase for cloud sync.
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <Button asChild size="sm">
                    <Link to="/login">Sign in or Create account</Link>
                  </Button>
                  <SupabaseConfigModal />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Appearance</CardTitle>
            <CardDescription>Select your preferred color theme</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {(
              [
                ['system', 'System Default'],
                ['light', 'Light Mode', Sun],
                ['dark', 'Dark Mode', Moon],
              ] as const
            ).map(([key, label, Icon]) => (
              <button
                key={key}
                type="button"
                onClick={() => handleThemeChange(key)}
                className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm transition-colors ${
                  preference === key
                    ? 'border-accent bg-accent/10 font-medium text-foreground'
                    : 'border-border hover:bg-muted text-muted-foreground'
                }`}
              >
                <span className="flex items-center gap-2">
                  {Icon && <Icon className="h-4 w-4" />}
                  {label}
                </span>
                {preference === key && <Check className="h-4 w-4 text-accent" />}
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="font-serif text-2xl font-semibold">Learning Snapshot</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <GraduationCap className="h-8 w-8 text-accent" />
              <div>
                <p className="text-xs uppercase text-muted-foreground">Lessons Completed</p>
                <p className="font-serif text-2xl font-bold">
                  {completedLessons.length} <span className="text-sm font-normal text-muted-foreground">/ {LESSONS.length}</span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Award className="h-8 w-8 text-accent" />
              <div>
                <p className="text-xs uppercase text-muted-foreground">Exercises Solved</p>
                <p className="font-serif text-2xl font-bold">
                  {completedExercises.length} <span className="text-sm font-normal text-muted-foreground">/ {EXERCISES.length}</span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Flame className="h-8 w-8 text-amber-500" />
              <div>
                <p className="text-xs uppercase text-muted-foreground">Current Streak</p>
                <p className="font-serif text-2xl font-bold">
                  {streak} <span className="text-sm font-normal text-muted-foreground">{streak === 1 ? 'day' : 'days'}</span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Clock className="h-8 w-8 text-accent" />
              <div>
                <p className="text-xs uppercase text-muted-foreground">Time Invested</p>
                <p className="font-serif text-2xl font-bold">
                  {formatMinutes(Math.round(totalSeconds / 60))}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild variant="outline" size="sm">
            <Link to="/progress">
              <Award className="mr-1.5 h-4 w-4" /> View Full Progress & Achievements ({unlocked.length})
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/bookmarks">
              <Bookmark className="mr-1.5 h-4 w-4" /> View Bookmarks ({bookmarks.length})
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Backup & Data Management</CardTitle>
          <CardDescription>
            Export a JSON copy of your progress or restore from a previous backup file.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {importNotice && (
            <div className="rounded-md border border-accent/40 bg-accent/10 px-3 py-2 text-sm text-foreground">
              {importNotice}
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <Button size="sm" variant="outline" onClick={exportData}>
              <Download className="mr-1.5 h-4 w-4" />
              Export Progress (JSON)
            </Button>

            <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="mr-1.5 h-4 w-4" />
              Import Backup
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              className="hidden"
              onChange={handleImport}
            />

            <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="destructive">
                  <RotateCcw className="mr-1.5 h-4 w-4" />
                  Reset All Progress
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-5 w-5" />
                    Reset All Progress?
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    Are you sure you want to reset all your learning progress, completed exercises, and bookmarks?
                  </p>
                  <p className="text-xs">
                    This action cannot be undone unless you export a backup first.
                  </p>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <DialogClose asChild>
                    <Button variant="outline" size="sm">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      resetLocal()
                      setResetDialogOpen(false)
                    }}
                  >
                    Confirm Reset
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
