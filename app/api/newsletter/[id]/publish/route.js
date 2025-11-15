import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClientServer } from '@/lib/supabaseClient'

export async function POST(req, { params }) {
  const supabase = createClientServer(cookies())
  const { id } = params

  // 1) Check auth
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 2) Check role
  const { data: me, error: roleError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (roleError || !me || me.role !== 'editor') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // 3) Update newsletter
  const { error } = await supabase
    .from('newsletters')
    .update({
      is_published: true,
      published_on: new Date().toISOString()
    })
    .eq('id', id)

  if (error) {
    console.error('Publish error:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // 4) Redirect back to /drafts
  return NextResponse.redirect(new URL('/drafts', req.url))
}
