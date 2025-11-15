'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientBrowser } from '@/lib/supabaseClient'

export default function LogoutPage() {
  const supabase = createClientBrowser()
  const router = useRouter()

  useEffect(() => {
    async function doLogout() {
      await supabase.auth.signOut()
      router.push('/login')
    }
    doLogout()
  }, [supabase, router])

  return <p style={{ textAlign: 'center', marginTop: '3rem' }}>Logging out…</p>
}
