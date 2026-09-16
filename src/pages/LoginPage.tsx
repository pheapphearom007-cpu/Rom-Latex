import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  CheckCircle2,
  Cloud,
  GraduationCap,
  Lock,
  Mail,
  Sparkles,
  User,
  UserCheck,
} from 'lucide-react'
import { Seo } from '@/components/Seo'
import { SupabaseConfigModal } from '@/components/SupabaseConfigModal'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/features/auth/use-auth'

export function LoginPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const { user, signIn, signUp, signInAsDemo, continueAsGuest, signOut, configured } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setSubmitting(true)

    try {
      if (mode === 'signin') {
        const res = await signIn(email, password)
        if (res.error) {
          setError(res.error)
        } else {
          navigate('/learn')
        }
      } else {
        const res = await signUp(email, password, displayName)
        if (res.error) {
          setError(res.error)
        } else {
          if (configured) {
            setSuccess('Account created! Please check your email to verify.')
          } else {
            navigate('/learn')
          }
        }
      }
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDemo() {
    setError(null)
    setSuccess(null)
    setSubmitting(true)
    try {
      const res = await signInAsDemo()
      if (res.error) {
        setError(res.error)
      } else {
        navigate('/learn')
      }
    } finally {
      setSubmitting(false)
    }
  }

  function handleGuest() {
    continueAsGuest()
    navigate('/learn')
  }

  if (user) {
    const userDisplay =
      (user.user_metadata?.display_name as string | undefined) || user.email || 'Scholar'

    return (
      <div className="mx-auto max-w-md py-8">
        <Seo title="Account — ROM LATEX" description="Your ROM LATEX learning account." />

        <div className="mb-6">
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              Back to home
            </Link>
          </Button>
        </div>

        <Card className="border-border shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <UserCheck className="h-6 w-6" />
            </div>
            <CardTitle className="font-serif text-2xl font-bold">You are signed in</CardTitle>
            <CardDescription>
              Logged in as <span className="font-semibold text-foreground">{userDisplay}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-border bg-muted/30 p-3.5 text-xs text-muted-foreground">
              <p className="font-medium text-foreground">
                {configured ? 'Cloud Synced Account' : 'Local Offline Profile'}
              </p>
              <p className="mt-0.5">
                {user.email ? `Email: ${user.email}` : 'Local Account'}
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <Button asChild className="w-full">
                <Link to="/learn">Continue to Curriculum</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/profile">View Profile & Settings</Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full text-muted-foreground hover:text-destructive"
                onClick={() => void signOut()}
              >
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md py-8">
      <Seo title="Sign In — ROM LATEX" description="Sign in or continue as guest to track your LaTeX learning journey." />

      <div className="mb-6">
        <Button asChild variant="ghost" size="sm">
          <Link to="/">
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Back to home
          </Link>
        </Button>
      </div>

      <Card className="border-border shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <GraduationCap className="h-6 w-6" />
          </div>
          <CardTitle className="font-serif text-2xl font-bold">
            {mode === 'signin' ? 'Welcome Back' : 'Create your account'}
          </CardTitle>
          <CardDescription>
            {mode === 'signin'
              ? 'Sign in to track your LaTeX lessons, drills, and notes'
              : 'Join to track progress, save bookmarks, and solve exercises'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {!configured && (
            <div className="rounded-lg border border-accent/30 bg-accent/5 p-3.5 text-xs">
              <div className="flex items-start gap-2.5">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">Local Mode Active</p>
                  <p className="text-muted-foreground leading-relaxed">
                    ROM LATEX works completely offline! You can sign in, register a local profile,
                    use the one-click demo, or continue as guest.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Quick 1-Click Demo Login */}
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border-accent/40 bg-accent/5 hover:bg-accent/15"
            onClick={handleDemo}
            disabled={submitting}
          >
            <Sparkles className="h-4 w-4 text-accent" />
            <span>Quick Demo Sign In (Scholar Ada)</span>
          </Button>

          <div className="relative my-2 text-center text-xs uppercase text-muted-foreground">
            <span className="bg-card px-2">or with email credentials</span>
            <div className="absolute inset-x-0 top-1/2 -z-10 h-px bg-border" />
          </div>

          {error && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {success && (
            <div className="flex items-start gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-800 dark:text-emerald-300">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <div className="flex rounded-lg bg-muted p-1 text-sm font-medium">
            <button
              type="button"
              onClick={() => {
                setMode('signin')
                setError(null)
              }}
              className={`flex-1 rounded-md py-1.5 transition-colors ${
                mode === 'signin' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup')
                setError(null)
              }}
              className={`flex-1 rounded-md py-1.5 transition-colors ${
                mode === 'signup' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <Label htmlFor="displayName">Display Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="displayName"
                    type="text"
                    required
                    placeholder="Ada Lovelace"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="scholar@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="relative my-4 text-center text-xs uppercase text-muted-foreground">
            <span className="bg-card px-2">or</span>
            <div className="absolute inset-x-0 top-1/2 -z-10 h-px bg-border" />
          </div>

          <Button type="button" variant="outline" className="w-full" onClick={handleGuest}>
            Continue as Guest (No signup required)
          </Button>

          <div className="pt-2 text-center">
            <SupabaseConfigModal
              trigger={
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Cloud className="h-3.5 w-3.5 text-accent" />
                  <span>{configured ? 'Supabase Connected' : 'Configure Supabase Cloud Sync (Optional)'}</span>
                </button>
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

