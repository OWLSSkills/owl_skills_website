import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClientServer } from '@/lib/supabaseClient'

export async function POST(_req, { params }) {
  const supabase = createClientServer(cookies())
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // RLS ensures only editors can modify
  const { error } = await supabase
    .from('newsletters')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', params.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  // Redirect back to the list
  return NextResponse.redirect(new URL('/drafts', _req.url))
}
