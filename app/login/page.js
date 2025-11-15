'use client'
import { useEffect, useState } from 'react'
import { createClientBrowser } from '@/lib/supabaseClient'

export default function LoginPage() {
  const supabase = createClientBrowser()
  const [mode, setMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)

  // UI state: who am I?
  const [sessionUser, setSessionUser] = useState(null)
  const [isEditor, setIsEditor] = useState(false)

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSessionUser(session?.user ?? null)

      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()
        setIsEditor(profile?.role === 'editor')
      }
      setChecking(false)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function onSignIn(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    // check role then route once
    const { data: { user } } = await supabase.auth.getUser()
    const { data: profile } = await supabase
      .from('profiles').select('role').eq('id', user.id).single()

    setLoading(false)
    if (profile?.role === 'editor') window.location.href = '/addNewsletter'
    else window.location.href = '/'
  }

  async function onSignUp(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (error) return setError(error.message)
    alert('Check your email to confirm your account, then sign in.')
    setMode('signin')
  }

  async function onForgotPassword() {
    setError('')
    if (!email) return setError('Enter your email first.')
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    })
    if (error) return setError(error.message)
    alert('Password reset email sent.')
  }

  if (checking) {
    return (
      <main style={{ maxWidth: 420, margin: '60px auto', fontFamily: 'system-ui' }}>
        <p>Loading…</p>
      </main>
    )
  }

  return (
    <main style={{ maxWidth: 420, margin: '60px auto', fontFamily: 'system-ui' }}>
      <h1 style={{ marginBottom: 6 }}>Newsletter Admin</h1>

      {sessionUser && (
        <div style={{ margin: '8px 0 16px', fontSize: 14 }}>
          Signed in as <strong>{sessionUser.email}</strong>{' '}
          {isEditor ? (
            <>
              — <a href="/addNewsletter" style={{ color:'#0a66c2' }}>Continue to editor</a>
            </>
          ) : (
            <>— not an editor</>
          )}
        </div>
      )}

      {!sessionUser && (
        <>
          <div style={{ display:'flex', gap:8, margin:'12px 0' }}>
            <button
              onClick={() => setMode('signin')}
              style={{ padding:'6px 10px', border: mode==='signin'?'2px solid #333':'1px solid #ccc',
                      borderRadius:8, background:'white' }}
            >
              Sign in
            </button>

          </div>

          <form onSubmit={mode==='signin' ? onSignIn : onSignUp} style={{ display:'grid', gap:12 }}>
            <input type="email" placeholder="Email" value={email}
                   onChange={e=>setEmail(e.target.value)} required />
            <input type="password" placeholder={mode==='signin' ? 'Password' : 'Create a password'}
                   value={password} onChange={e=>setPassword(e.target.value)} required />
            <button type="submit" disabled={loading}>
              {loading ? 'Please wait…' : (mode==='signin' ? 'Sign in' : 'Sign up')}
            </button>
            {mode === 'signin' && (
              <button type="button" onClick={onForgotPassword}
                      style={{ textAlign:'left', color:'#0a66c2', background:'transparent', border:'none', padding:0 }}>
                Forgot password?
              </button>
            )}
            {error && <p style={{ color:'crimson' }}>{error}</p>}
          </form>
        </>
      )}
    </main>
  )
}
