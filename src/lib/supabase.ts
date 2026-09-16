import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export const SUPABASE_URL_STORAGE_KEY = 'learn-latex-supabase-url'
export const SUPABASE_KEY_STORAGE_KEY = 'learn-latex-supabase-key'

function getSupabaseConfig(): { url: string; anonKey: string; isConfigured: boolean } {
  const envUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim() || ''
  const envKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim() || ''

  const localUrl = (typeof window !== 'undefined' ? localStorage.getItem(SUPABASE_URL_STORAGE_KEY) : null)?.trim() || ''
  const localKey = (typeof window !== 'undefined' ? localStorage.getItem(SUPABASE_KEY_STORAGE_KEY) : null)?.trim() || ''

  const finalUrl = localUrl || envUrl
  const finalKey = localKey || envKey

  const isConfigured = Boolean(
    finalUrl &&
      finalKey &&
      !finalUrl.includes('your-project') &&
      !finalKey.includes('your-anon-key') &&
      (finalUrl.startsWith('https://') || finalUrl.startsWith('http://')),
  )

  return { url: finalUrl, anonKey: finalKey, isConfigured }
}

const config = getSupabaseConfig()

export const isSupabaseConfigured = config.isConfigured

let client: SupabaseClient | null = null
if (isSupabaseConfigured) {
  try {
    client = createClient(config.url, config.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err)
    client = null
  }
}

export const supabase: SupabaseClient | null = client

export function saveSupabaseConfig(url: string, key: string) {
  if (typeof window === 'undefined') return
  localStorage.setItem(SUPABASE_URL_STORAGE_KEY, url.trim())
  localStorage.setItem(SUPABASE_KEY_STORAGE_KEY, key.trim())
  window.location.reload()
}

export function clearSupabaseConfig() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(SUPABASE_URL_STORAGE_KEY)
  localStorage.removeItem(SUPABASE_KEY_STORAGE_KEY)
  window.location.reload()
}

