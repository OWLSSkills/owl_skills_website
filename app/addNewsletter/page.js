import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClientServer } from '@/lib/supabaseClient'
import Editor from './Editor'

export default async function AddNewsletterPage() {
  const supabase = createClientServer(cookies())
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
const { data: me } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (!me || me.role !== 'editor') redirect('/login')


  return <Editor />
}
