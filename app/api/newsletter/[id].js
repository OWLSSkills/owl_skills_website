import { createBrowserClient, createServerClient } from '@supabase/ssr'

export function createClientBrowser() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

export function createClientServer(cookies) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookies.get(name)?.value
        },
        set(name, value, options) {
          try { cookies.set({ name, value, ...options }) } catch {}
        },
        remove(name, options) {
          try { cookies.set({ name, value: '', ...options }) } catch {}
        }
      }
    }
  )
}
