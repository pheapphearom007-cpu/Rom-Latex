import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import { pullRemoteProgress, useProgressStore } from '@/stores/progress-store'
import { AuthContext, type AuthContextValue } from './auth-context-definition'

const GUEST_KEY = 'learn-latex-guest'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(() => Boolean(supabase))
  const [guest, setGuest] = useState(() => localStorage.getItem(GUEST_KEY) === '1')

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
        localStorage.setItem(GUEST_KEY, '1')
        setGuest(true)
      },
      signUp: async (email, password, displayName) => {
        if (!supabase) return { error: 'Supabase is not configured. You can continue as a guest.' }
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { display_name: displayName } },
        })
        return { error: error?.message }
      },
      signIn: async (email, password) => {
        if (!supabase) return { error: 'Supabase is not configured. You can continue as a guest.' }
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        return { error: error?.message }
      },
      signOut: async () => {
        await supabase?.auth.signOut()
        localStorage.removeItem(GUEST_KEY)
        setGuest(false)
        useProgressStore.getState().resetLocal()
      },
      resetPassword: async (email) => {
        if (!supabase) return { error: 'Supabase is not configured.' }
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/settings`,
        })
        return { error: error?.message }
      },
    }),
    [user, session, loading, guest],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
