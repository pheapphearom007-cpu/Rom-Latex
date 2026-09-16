import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import { pullRemoteProgress, useProgressStore } from '@/stores/progress-store'
import { AuthContext, type AuthContextValue } from './auth-context-definition'

const GUEST_KEY = 'learn-latex-guest'
const LOCAL_SESSION_KEY = 'learn-latex-local-session'
const LOCAL_ACCOUNTS_KEY = 'learn-latex-local-accounts'

interface LocalAccount {
  id: string
  email: string
  password?: string
  displayName: string
  bio: string
  createdAt: string
  updatedAt: string
}

function getLocalAccounts(): LocalAccount[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(LOCAL_ACCOUNTS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveLocalAccounts(accounts: LocalAccount[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(LOCAL_ACCOUNTS_KEY, JSON.stringify(accounts))
  } catch (err) {
    console.warn('Failed to save local accounts to localStorage:', err)
  }
}

function buildUserFromAccount(account: LocalAccount): User {
  return {
    id: account.id,
    aud: 'authenticated',
    role: 'authenticated',
    email: account.email,
    created_at: account.createdAt,
    updated_at: account.updatedAt,
    app_metadata: { provider: 'local' },
    user_metadata: {
      display_name: account.displayName,
      bio: account.bio || '',
    },
  }
}

function buildSession(user: User): Session {
  return {
    access_token: `local-token-${user.id}`,
    refresh_token: `local-refresh-${user.id}`,
    expires_in: 31536000,
    token_type: 'bearer',
    user,
  }
}

function getStoredLocalSession(): { user: User; session: Session } | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(LOCAL_SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed?.user && parsed?.session) {
      return parsed
    }
  } catch {
    // Ignore invalid JSON
  }
  return null
}

function persistLocalSession(user: User, session: Session) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify({ user, session }))
  } catch (err) {
    console.warn('Failed to persist local session:', err)
  }
}

function clearLocalSession() {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(LOCAL_SESSION_KEY)
  } catch {
    // Ignore
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (supabase) return null
    return getStoredLocalSession()?.user ?? null
  })
  const [session, setSession] = useState<Session | null>(() => {
    if (supabase) return null
    return getStoredLocalSession()?.session ?? null
  })
  const [loading, setLoading] = useState(() => Boolean(supabase))
  const [guest, setGuest] = useState(() => {
    if (typeof window === 'undefined') return false
    if (!supabase && getStoredLocalSession()?.user) return false
    return localStorage.getItem(GUEST_KEY) === '1'
  })

  useEffect(() => {
    if (!supabase) {
      return
    }

    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setUser(data.session?.user ?? null)
      setLoading(false)
      if (data.session?.user) {
        void pullRemoteProgress()
      }
    })

    const { data } = supabase.auth.onAuthStateChange((event, next) => {
      setSession(next)
      setUser(next?.user ?? null)
      if (next?.user) {
        localStorage.removeItem(GUEST_KEY)
        setGuest(false)
        void pullRemoteProgress()
      } else if (event === 'SIGNED_OUT') {
        useProgressStore.getState().resetLocal()
      }
    })

    return () => data.subscription.unsubscribe()
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      loading,
      configured: isSupabaseConfigured,
      guest,
      continueAsGuest: () => {
        clearLocalSession()
        setUser(null)
        setSession(null)
        localStorage.setItem(GUEST_KEY, '1')
        setGuest(true)
      },
      signUp: async (email, password, displayName) => {
        const trimmedEmail = email.trim().toLowerCase()
        if (!trimmedEmail || !trimmedEmail.includes('@')) {
          return { error: 'Please enter a valid email address.' }
        }
        if (!password || password.length < 6) {
          return { error: 'Password must be at least 6 characters.' }
        }

        if (supabase) {
          const { error } = await supabase.auth.signUp({
            email: trimmedEmail,
            password,
            options: { data: { display_name: displayName } },
          })
          return { error: error?.message }
        }

        // Local mode sign up
        const accounts = getLocalAccounts()
        const existing = accounts.find((a) => a.email === trimmedEmail)
        if (existing) {
          return { error: 'An account with this email already exists. Please sign in.' }
        }

        const cleanName = displayName.trim() || trimmedEmail.split('@')[0]
        const now = new Date().toISOString()
        const newAccount: LocalAccount = {
          id: `local-user-${crypto.randomUUID().slice(0, 8)}`,
          email: trimmedEmail,
          password,
          displayName: cleanName,
          bio: '',
          createdAt: now,
          updatedAt: now,
        }
        accounts.push(newAccount)
        saveLocalAccounts(accounts)

        const localUser = buildUserFromAccount(newAccount)
        const localSession = buildSession(localUser)
        persistLocalSession(localUser, localSession)

        localStorage.removeItem(GUEST_KEY)
        setGuest(false)
        setUser(localUser)
        setSession(localSession)
        return {}
      },
      signIn: async (email, password) => {
        const trimmedEmail = email.trim().toLowerCase()
        if (!trimmedEmail) {
          return { error: 'Please enter your email.' }
        }
        if (!password) {
          return { error: 'Please enter your password.' }
        }

        if (supabase) {
          const { error } = await supabase.auth.signInWithPassword({ email: trimmedEmail, password })
          return { error: error?.message }
        }

        // Local mode sign in
        const accounts = getLocalAccounts()
        let account = accounts.find((a) => a.email === trimmedEmail)

        if (account) {
          if (account.password && account.password !== password) {
            return { error: 'Incorrect password for this local account.' }
          }
        } else {
          // In local mode, smoothly create local account on first sign in
          const now = new Date().toISOString()
          const rawName = trimmedEmail.split('@')[0].replace(/[._-]/g, ' ')
          const displayName = rawName.charAt(0).toUpperCase() + rawName.slice(1)
          account = {
            id: `local-user-${crypto.randomUUID().slice(0, 8)}`,
            email: trimmedEmail,
            password,
            displayName: displayName || 'Scholar',
            bio: '',
            createdAt: now,
            updatedAt: now,
          }
          accounts.push(account)
          saveLocalAccounts(accounts)
        }

        const localUser = buildUserFromAccount(account)
        const localSession = buildSession(localUser)
        persistLocalSession(localUser, localSession)

        localStorage.removeItem(GUEST_KEY)
        setGuest(false)
        setUser(localUser)
        setSession(localSession)
        return {}
      },
      signInAsDemo: async () => {
        const demoEmail = 'ada.lovelace@latex.edu'
        const accounts = getLocalAccounts()
        let account = accounts.find((a) => a.email === demoEmail)

        if (!account) {
          const now = new Date().toISOString()
          account = {
            id: 'local-demo-scholar',
            email: demoEmail,
            password: 'demo-password-123',
            displayName: 'Ada Lovelace',
            bio: 'Mathematician, computer science pioneer, and LaTeX enthusiast.',
            createdAt: now,
            updatedAt: now,
          }
          accounts.push(account)
          saveLocalAccounts(accounts)
        }

        const localUser = buildUserFromAccount(account)
        const localSession = buildSession(localUser)
        persistLocalSession(localUser, localSession)

        localStorage.removeItem(GUEST_KEY)
        setGuest(false)
        setUser(localUser)
        setSession(localSession)
        return {}
      },
      signOut: async () => {
        if (supabase) {
          await supabase.auth.signOut()
        }
        clearLocalSession()
        localStorage.removeItem(GUEST_KEY)
        setUser(null)
        setSession(null)
        setGuest(false)
      },
      resetPassword: async (email) => {
        const trimmedEmail = email.trim().toLowerCase()
        if (supabase) {
          const { error } = await supabase.auth.resetPasswordForEmail(trimmedEmail, {
            redirectTo: `${window.location.origin}/profile`,
          })
          return { error: error?.message }
        }

        const accounts = getLocalAccounts()
        const account = accounts.find((a) => a.email === trimmedEmail)
        if (!account) {
          return { error: 'No account found with this email in local storage.' }
        }
        return {}
      },
      updateProfile: async (updates) => {
        const trimmedName = updates.displayName !== undefined ? updates.displayName.trim() : undefined
        const trimmedBio = updates.bio !== undefined ? updates.bio.trim() : undefined

        if (supabase && user) {
          const newName = trimmedName ?? ((user.user_metadata?.display_name as string) || '')
          const newBio = trimmedBio ?? ((user.user_metadata?.bio as string) || '')

          const { error: profileError } = await supabase.from('profiles').upsert({
            id: user.id,
            display_name: newName,
            bio: newBio,
            updated_at: new Date().toISOString(),
          })
          if (profileError) return { error: profileError.message }

          const { data, error: authError } = await supabase.auth.updateUser({
            data: { display_name: newName, bio: newBio },
          })
          if (authError) return { error: authError.message }
          if (data.user) {
            setUser(data.user)
          }
          return {}
        }

        if (user) {
          const newName = trimmedName ?? ((user.user_metadata?.display_name as string) || '')
          const newBio = trimmedBio ?? ((user.user_metadata?.bio as string) || '')

          const accounts = getLocalAccounts()
          const idx = accounts.findIndex((a) => a.id === user.id || a.email === user.email)
          const now = new Date().toISOString()
          if (idx !== -1) {
            accounts[idx].displayName = newName
            accounts[idx].bio = newBio
            accounts[idx].updatedAt = now
            saveLocalAccounts(accounts)
          }

          const updatedUser: User = {
            ...user,
            updated_at: now,
            user_metadata: {
              ...user.user_metadata,
              display_name: newName,
              bio: newBio,
            },
          }
          const updatedSession = buildSession(updatedUser)
          persistLocalSession(updatedUser, updatedSession)
          setUser(updatedUser)
          setSession(updatedSession)
          return {}
        }

        return { error: 'No active session' }
      },
    }),
    [user, session, loading, guest],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

