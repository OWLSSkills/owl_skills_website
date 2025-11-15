import Head from 'next/head'
import { getOrigin } from '../../lib/supabaseClient'

export async function getServerSideProps({ params, req }) {
  const base = getOrigin(req)
  const r = await fetch(`${base}/api/newsletters/${params.id}`)
  if (r.status !== 200) return { notFound: true }
  const item = await r.json()
  return { props: { item } }
}

export default function Newsletter({ item }) {
  const blocks = item.blocks || []
  return (
    <main style={{ maxWidth: 860, margin: '40px auto', padding: '0 16px', fontFamily: 'system-ui' }}>
      <Head><title>{item.title}</title></Head>
      <article>
        <h1>{item.title}</h1>
        {item.published_on && <div style={{ color:'#666', marginTop:4 }}>{item.published_on}</div>}
        {item.hero_url && <img src={item.hero_url} alt="" style={{ width:'100%', height:'auto', margin:'16px 0', borderRadius:8 }} />}
        {item.summary && <p style={{ fontSize:18 }}>{item.summary}</p>}

        {blocks.map((b, i) => {
          if (b.type === 'subheading') return <h2 key={i}>{b.text}</h2>
          if (b.type === 'paragraph') return <p key={i}>{b.text}</p>
          if (b.type === 'image') {
            const align = b.position === 'left' ? 'left' : b.position === 'right' ? 'right' : 'center'
            return (
              <figure key={i} style={{ margin:'16px 0', textAlign: align }}>
                <img src={b.url} alt={b.caption || ''} style={{ maxWidth:'100%', height:'auto', borderRadius:8 }} />
                {b.caption && <figcaption style={{ color:'#666', fontSize:13 }}>{b.caption}</figcaption>}
              </figure>
            )
          }
          return null
        })}
      </article>
    </main>
  )
}
