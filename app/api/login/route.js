'use client'
import { useState } from 'react'
import { createClientBrowser } from '@/lib/supabaseClient'

export default function LoginPage() {
  const supabase = createClientBrowser()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return setError(error.message)
    window.location.href = '/addNewsletter'
  }

  return (
    <main style={{ maxWidth: 400, margin: '60px auto', fontFamily:'system-ui' }}>
      <h1>Login</h1>
      <form onSubmit={onSubmit} style={{ display:'grid', gap:12 }}>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit">Login</button>
        {error && <p style={{ color:'crimson' }}>{error}</p>}
      </form>
    </main>
  )
}
