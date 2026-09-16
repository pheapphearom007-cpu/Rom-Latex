import { useState } from 'react'
import { CheckCircle2, Cloud, Database, KeyRound, Lock, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  clearSupabaseConfig,
  isSupabaseConfigured,
  saveSupabaseConfig,
  SUPABASE_KEY_STORAGE_KEY,
  SUPABASE_URL_STORAGE_KEY,
} from '@/lib/supabase'

interface SupabaseConfigModalProps {
  trigger?: React.ReactNode
}

export function SupabaseConfigModal({ trigger }: SupabaseConfigModalProps) {
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState(() => {
    if (typeof window === 'undefined') return ''
    return (
      localStorage.getItem(SUPABASE_URL_STORAGE_KEY) ||
      (import.meta.env.VITE_SUPABASE_URL as string | undefined) ||
      ''
    )
  })
  const [anonKey, setAnonKey] = useState(() => {
    if (typeof window === 'undefined') return ''
    return (
      localStorage.getItem(SUPABASE_KEY_STORAGE_KEY) ||
      (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ||
      ''
    )
  })
  const [error, setError] = useState<string | null>(null)

  const hasCustomConfig =
    typeof window !== 'undefined' && Boolean(localStorage.getItem(SUPABASE_URL_STORAGE_KEY))

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const trimmedUrl = url.trim()
    const trimmedKey = anonKey.trim()

    if (!trimmedUrl.startsWith('https://') && !trimmedUrl.startsWith('http://')) {
      setError('Project URL must start with https:// (e.g. https://xyz.supabase.co)')
      return
    }
    if (trimmedKey.length < 20) {
      setError('Anon key appears invalid (must be at least 20 characters)')
      return
    }

    saveSupabaseConfig(trimmedUrl, trimmedKey)
  }

  function handleDisconnect() {
    clearSupabaseConfig()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2">
            <Cloud className="h-4 w-4 text-accent" />
            <span>{isSupabaseConfigured ? 'Supabase Connected' : 'Configure Supabase'}</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2 text-primary">
            <Database className="h-5 w-5" />
            <DialogTitle>Supabase Cloud Connection</DialogTitle>
          </div>
          <DialogDescription>
            Connect your own Supabase project for real-time cloud sync across devices. If left unconfigured,
            ROM LATEX works completely offline with persistent local storage.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 p-3 text-xs">
            <div>
              <span className="font-semibold text-foreground">Current Status:</span>{' '}
              {isSupabaseConfigured ? (
                <span className="inline-flex items-center font-medium text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                  Cloud Connected
                </span>
              ) : (
                <span className="font-medium text-muted-foreground">
                  Offline / Local Storage Active
                </span>
              )}
            </div>
            {hasCustomConfig && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs text-destructive hover:bg-destructive/10"
                onClick={handleDisconnect}
              >
                <Trash2 className="mr-1 h-3.5 w-3.5" />
                Reset
              </Button>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-3.5">
            <div className="space-y-1.5">
              <Label htmlFor="supabase-url" className="text-xs">Project URL</Label>
              <div className="relative">
                <Cloud className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="supabase-url"
                  type="url"
                  placeholder="https://your-project.supabase.co"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="pl-8 text-xs font-mono"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="supabase-key" className="text-xs">Anon Public API Key</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="supabase-key"
                  type="password"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                  value={anonKey}
                  onChange={(e) => setAnonKey(e.target.value)}
                  className="pl-8 text-xs font-mono"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md border border-destructive/30 bg-destructive/10 p-2.5 text-xs text-destructive">
                {error}
              </div>
            )}

            <div className="rounded-md border border-border bg-muted/20 p-2.5 text-[11px] text-muted-foreground space-y-1">
              <div className="flex items-center gap-1 font-medium text-foreground">
                <Lock className="h-3 w-3 text-accent" />
                <span>Developer Note:</span>
              </div>
              <p>
                Credentials entered here are saved securely in your browser session. Alternatively, you can create a{' '}
                <code className="rounded bg-muted px-1 py-0.5 font-mono">.env</code> file with{' '}
                <code className="rounded bg-muted px-1 py-0.5 font-mono">VITE_SUPABASE_URL</code> and{' '}
                <code className="rounded bg-muted px-1 py-0.5 font-mono">VITE_SUPABASE_ANON_KEY</code>.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <DialogClose asChild>
                <Button type="button" variant="outline" size="sm">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" size="sm">
                Save & Connect
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
