import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClientServer } from '@/lib/supabaseClient'
import Link from 'next/link'

function firstImageFromBlocks(blocks = []) {
  const imgBlock = blocks.find(b => b?.type === 'image' && b?.url)
  if (imgBlock) return imgBlock.url
  for (const b of blocks) {
    if (b?.type === 'text' && b?.html) {
      const m = b.html.match(/<img[^>]+src=["']([^"']+)["']/i)
      if (m?.[1]) return m[1]
    }
  }
  return null
}

function formatDate(iso) {
  if (!iso) return ''
  try {
    return new Date(iso).toISOString().slice(0, 10)
  } catch {
    return ''
  }
}

export default async function DraftsPage() {

    
  const supabase = createClientServer(cookies())

  // Gate: editors only
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: me } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (!me || me.role !== 'editor') redirect('/login')

  // Load newsletters (both published + unpublished, skip deleted)
  const { data: drafts, error } = await supabase
    .from('newsletters')
    .select('id, title, subtitle, summary, published_on, created_at, blocks, is_published, deleted_at')
    .is('deleted_at', null)
    .order('created_at', { ascending: false })

  if (error) {
    return <main style={{ padding: 40 }}>Error: {error.message}</main>
  }

  return (
    <main style={{ maxWidth: 980, margin: '40px auto', padding: '0 16px', fontFamily: 'system-ui' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>Newsletters (Drafts & Published)</h1>
        <nav style={{ display:'flex', gap:12 }}>
          <Link href="/addNewsletter" style={{ color:'#0a66c2' }}>+ New</Link>
          <Link href="/logout" style={{ color:'#0a66c2' }}>Logout</Link>
        </nav>
      </header>

      {(!drafts || drafts.length === 0) ? (
        <p style={{ color: '#666' }}>No newsletters yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 16 }}>
          {drafts.map(n => {
            const cover = firstImageFromBlocks(n.blocks)
            const when = n.published_on || n.created_at
            return (
              <li
                key={n.id}
                style={{
                  border: '1px solid #e5e5e5',
                  borderRadius: 12,
                  padding: 16,
                  display:'grid',
                  gridTemplateColumns: cover ? '160px 1fr' : '1fr',
                  gap:16
                }}
              >
                {cover && (
                  <div>
                    <img
                      src={cover}
                      alt=""
                      style={{ width:'100%', height: '120px', objectFit: 'cover', borderRadius: 8 }}
                    />
                  </div>
                )}
                <div>
                  <div style={{ display:'flex', alignItems:'baseline', gap:8, flexWrap:'wrap' }}>
                    <h2 style={{ margin: '0 0 4px 0', fontSize: 20 }}>{n.title}</h2>
                    {n.subtitle && <span style={{ color:'#666' }}>— {n.subtitle}</span>}
                  </div>
                  <div style={{ color:'#666', fontSize: 14, marginBottom: 8 }}>
                    {formatDate(when)} — {n.is_published ? '✅ Published' : '📝 Draft'}
                  </div>
                  {n.summary && <p style={{ margin: 0 }}>{n.summary}</p>}

                  <div style={{ marginTop: 10, display:'flex', gap:12 }}>
                    {!n.is_published && (
                      <form
                        action={`/api/newsletter/${n.id}/publish`}
                        method="post"
                      >
                        <button
                          type="submit"
                          style={{
                            color: '#0a66c2',
                            border: '1px solid #0a66c2',
                            background: 'transparent',
                            borderRadius: 8,
                            padding: '6px 12px',
                            cursor: 'pointer'
                          }}
                        >
                          Publish
                        </button>
                      </form>
                    )}
                    <form
                      action={`/api/newsletter/${n.id}/delete`}
                      method="post"
                    >
                      <button
                        type="submit"
                        style={{
                          color: '#b00020',
                          border: '1px solid #ffcdd2',
                          background: 'transparent',
                          borderRadius: 8,
                          padding: '6px 12px',
                          cursor: 'pointer'
                        }}
                      >
                        Delete
                      </button>
                    </form>
                    <Link
  href={`/addNewsletter?id=${n.id}`}
  style={{
    color:'#0a66c2',
    border:'1px solid #0a66c2',
    background:'transparent',
    borderRadius:8,
    padding:'6px 12px',
    textDecoration:'none'
  }}
>
  Edit
</Link>

                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </main>
  )
}
