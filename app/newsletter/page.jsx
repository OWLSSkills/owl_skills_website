import Link from 'next/link'
import { cookies } from 'next/headers'
import { createClientServer } from '@/lib/supabaseClient'
import styles from './Newsletter.module.css'

// Safe Markdown renderer (works in Server Components)
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'

function formatDate(iso) {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    })
  } catch {
    return ''
  }
}

// keep multiple blank lines visible in Markdown rendering
function preserveExtraBlankLines(src = '') {
  return (src || '').replace(/\n{2,}/g, (m) => {
    const extra = m.length - 1
    return '\n' + Array.from({ length: extra }, () => '\n\u00A0').join('')
  })
}

export default async function NewsletterPage() {
  const supabase = createClientServer(cookies())

  const { data, error } = await supabase
    .from('newsletters')
    .select('*')
    .eq('is_published', true)
    .is('deleted_at', null)
    .order('published_on', { ascending: false })
    .limit(1)

  if (error) {
    return <main className={styles.main}><p>Error: {error.message}</p></main>
  }

  const n = data?.[0]
  if (!n) {
    return (
      <main className={styles.main}>
        <article className={styles.article}>
          <h1 className={styles.emptyTitle}>No newsletters yet</h1>
          <p className={styles.emptyText}>
            Check back soon. When a newsletter is published, it will appear here.
          </p>
        </article>
      </main>
    )
  }

  return (
    <main className={styles.main}>
      {/* Optional hero */}
      {n.hero_url && (
        <div className={styles.heroWrap}>
          <img src={n.hero_url} alt="" className={styles.heroImg} />
        </div>
      )}

      <article className={styles.article}>
        {/* Big date title like your screenshot */}
        {n.published_on && (
          <h1 className={styles.dateTitle}>
            {formatDate(n.published_on).toUpperCase()} NEWSLETTER!
          </h1>
        )}

        {/* Summary supports Markdown + extra spacing */}
        {!!n.summary && (
          <div className={styles.summary}>
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
              {preserveExtraBlankLines(n.summary)}
            </ReactMarkdown>
          </div>
        )}

        {/* Body blocks */}
        {Array.isArray(n.blocks) && n.blocks.map((b, i) => {
          if (b.type === 'text') {
            // Render stored markdown (NOT b.html), with spacing preserved
            return (
              <div key={i} className={styles.textBlock}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkBreaks]}
                  components={{
                    a: ({node, ...props}) => (
                      <a {...props} rel="noopener noreferrer" target="_blank" />
                    ),
                    img: ({node, ...props}) => (
                      // If someone pasted a markdown image inside text
                      <img {...props} className={styles.inlineImg} />
                    )
                  }}
                >
                  {preserveExtraBlankLines(b.markdown || '')}
                </ReactMarkdown>
              </div>
            )
          }

          if (b.type === 'image' && (b.url || b.file)) {
            const posClass =
              b.position === 'left'  ? styles.floatLeft :
              b.position === 'right' ? styles.floatRight :
              styles.mainImg

            return (
              <figure key={i} className={styles.figure}>
                <img src={b.url} alt={b.alt || ''} className={posClass} />
                {b.alt && <figcaption className={styles.caption}>{b.alt}</figcaption>}
              </figure>
            )
          }
          return null
        })}

        <div className={styles.clear} />

        <div className={styles.historyWrap}>
          {/* <Link
            href="/newsletters"
            className={styles.historyBtn}
          >
            View Newsletter History →
          </Link> */}
        </div>
      </article>
    </main>
  )
}
