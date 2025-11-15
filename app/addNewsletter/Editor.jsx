'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClientBrowser } from '@/lib/supabaseClient'

// Rich-text (HTML) → Markdown on paste
import TurndownService from 'turndown'
import { gfm } from 'turndown-plugin-gfm'

// Safe Markdown → React elements (no innerHTML)
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'

import Link from 'next/link'

/** simple float styles for preview */
const imgStyle = {
  base: { maxWidth: '100%', height: 'auto', borderRadius: 8 },
  left: { float: 'left', margin: '0 16px 16px 0', maxWidth: '48%' },
  right: { float: 'right', margin: '0 0 16px 16px', maxWidth: '48%' },
  main: { display: 'block', margin: '16px auto' }
}

/** Preserve multiple blank lines in Markdown preview */
function preserveExtraBlankLines(src = '') {
  // Turn runs of 2+ newlines into: "\n" + ("\n ") repeated (NBSP)
  return src.replace(/\n{2,}/g, (m) => {
    const extra = m.length - 1
    return '\n' + Array.from({ length: extra }, () => '\n\u00A0').join('')
  })
}

/** Turndown (HTML → Markdown) setup */
const td = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  emDelimiter: '*',
  bulletListMarker: '-',
  linkStyle: 'inlined',
})
td.use(gfm)

// Heuristic: convert inline style font-weight (>=600) to **bold**
td.addRule('inlineBoldByStyle', {
  filter: (node) => {
    if (!(node instanceof HTMLElement)) return false
    const tag = node.tagName
    if (tag === 'B' || tag === 'STRONG') return false
    const fw = (node.style?.fontWeight || '').toLowerCase().trim()
    if (!fw) return false
    if (fw === 'bold' || fw === 'bolder') return true
    const num = parseInt(fw, 10)
    return !Number.isNaN(num) && num >= 600
  },
  replacement: (content) => `**${content}**`
})

// Heuristic: convert inline style font-style italic/oblique to *italic*
td.addRule('inlineItalicByStyle', {
  filter: (node) => {
    if (!(node instanceof HTMLElement)) return false
    const tag = node.tagName
    if (tag === 'I' || tag === 'EM') return false
    const fs = (node.style?.fontStyle || '').toLowerCase().trim()
    return fs === 'italic' || fs === 'oblique'
  },
  replacement: (content) => `*${content}*`
})

// Heuristic: approximate big inline font-sizes as headings (if not already H1–H6)
td.addRule('fontSizeToHeading', {
  filter: (node) => {
    if (!(node instanceof HTMLElement)) return false
    const isBlock = getComputedStyle(node).display === 'block'
    const hasHeadingTag = /^H[1-6]$/.test(node.tagName)
    if (!isBlock || hasHeadingTag) return false
    const styleSize = node.style?.fontSize || ''
    if (!styleSize) return false
    const m = styleSize.match(/(\d+(?:\.\d+)?)px/i)
    if (!m) return false
    const px = parseFloat(m[1])
    return px >= 18 // only consider noticeably larger text
  },
  replacement: (content, node) => {
    const px = parseFloat((node).style.fontSize)
    const level = px >= 28 ? 1 : px >= 22 ? 2 : 3
    const hashes = '#'.repeat(level)
    return `\n\n${hashes} ${content.trim()}\n\n`
  }
})

function htmlToMarkdown(html) {
  const md = td.turndown(html)
  return preserveExtraBlankLines(md)
}

export default function Editor() {
  const supabase = createClientBrowser()
  const router = useRouter()
  const search = useSearchParams()
  const editingId = search.get('id')

  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [date, setDate] = useState('') // YYYY-MM-DD
  const [summary, setSummary] = useState('')
  const [isPublished, setIsPublished] = useState(false)

  // Blocks: {type:'text', markdown} | {type:'image', file?, url?, alt?, position}
  const [blocks, setBlocks] = useState([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const textRefs = useRef([])

  /** Insert text at the caret in a text block */
  function insertAtCursor(i, toInsert) {
    setBlocks(arr => {
      const blk = arr[i]
      if (!blk || blk.type !== 'text') return arr
      const el = textRefs.current[i]
      const start = el?.selectionStart ?? blk.markdown.length
      const end = el?.selectionEnd ?? blk.markdown.length
      const before = blk.markdown.slice(0, start)
      const after = blk.markdown.slice(end)
      const next = before + toInsert + after
      const nextPos = (before + toInsert).length
      const out = arr.map((x, idx) => idx === i ? { ...x, markdown: next } : x)
      queueMicrotask(() => {
        if (textRefs.current[i]) {
          textRefs.current[i].focus()
          textRefs.current[i].setSelectionRange(nextPos, nextPos)
        }
      })
      return out
    })
  }

  /** Paste images into a text block: upload to Supabase, insert ![](url) */
  async function pasteImagesFromClipboard(i, e) {
    const items = Array.from(e.clipboardData?.items || [])
    const files = items
      .map(it => (it.kind === 'file' ? it.getAsFile() : null))
      .filter(Boolean)
      .filter(file => /^image\//.test(file.type))

    if (files.length === 0) return false
    e.preventDefault()
    for (const file of files) {
      try {
        const url = await uploadToStorage(file)
        insertAtCursor(i, `![image](${url})\n`)
      } catch (err) {
        console.error('Image paste upload failed:', err)
        setError(err.message || 'Image upload failed')
      }
    }
    return true
  }

  /** Load existing newsletter if editing */
  useEffect(() => {
    async function load() {
      if (!editingId) return
      const { data, error } = await supabase
        .from('newsletters')
        .select('*')
        .eq('id', editingId)
        .single()
      if (error) {
        console.error('Load error:', error.message)
        setError(error.message)
        return
      }
      setTitle(data.title || '')
      setSubtitle(data.subtitle || '')
      setDate(data.published_on ? String(data.published_on).slice(0, 10) : '')
      setSummary(data.summary || '')
      setIsPublished(!!data.is_published)
      setBlocks(Array.isArray(data.blocks) ? data.blocks : [])
    }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingId])

  /** Toolbar helper */
  function wrapSelection(i, left, right = left) {
    const el = textRefs.current[i]
    setBlocks(arr => arr.map((blk, idx) => {
      if (idx !== i || blk.type !== 'text') return blk
      if (!el) return { ...blk, markdown: (blk.markdown || '') + left + right }
      const start = el.selectionStart ?? 0
      const end = el.selectionEnd ?? 0
      const s = blk.markdown || ''
      const selected = s.slice(start, end)
      const next = s.slice(0, start) + left + selected + right + s.slice(end)
      queueMicrotask(() => {
        const caret = start + left.length + selected.length + right.length
        el.focus()
        el.setSelectionRange(caret, caret)
      })
      return { ...blk, markdown: next }
    }))
  }

  function addTextBlock() {
    setBlocks(b => [...b, { type: 'text', markdown: '' }])
  }
  function addImageBlock() {
    setBlocks(b => [...b, { type: 'image', file: null, url: '', alt: '', position: 'main' }])
  }

  /** Upload to Supabase Storage (bucket: newsletters) */
  async function uploadToStorage(file) {
    const safeName = file.name.replace(/[^\w.\-]+/g, '_')
    const path = `newsletters/${Date.now()}-${safeName}`
    const { error } = await supabase.storage.from('newsletters').upload(path, file, {
      cacheControl: '3600',
      upsert: false
    })
    if (error) throw error
    const { data: pub } = supabase.storage.from('newsletters').getPublicUrl(path)
    return pub.publicUrl
  }

  /** Prepare blocks for saving */
  async function prepareBlocks() {
    return Promise.all(blocks.map(async (blk) => {
      if (blk.type === 'image') {
        let url = blk.url
        if (!url && blk.file) url = await uploadToStorage(blk.file)
        return { type: 'image', url: url || '', alt: blk.alt || '', position: blk.position || 'main' }
      }
      return { type: 'text', markdown: blk.markdown || '' }
    }))
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true); setError('')
    try {
      const prepared = await prepareBlocks()
      const firstImg = prepared.find(b => b.type === 'image' && b.url)
      const hero_url = firstImg ? firstImg.url : null

      const payload = {
        title,
        subtitle: subtitle || null,
        published_on: date || null,
        hero_url,
        summary: summary || null,
        blocks: prepared,
        is_published: !!isPublished
      }

      if (editingId) {
        const { error } = await supabase.from('newsletters').update(payload).eq('id', editingId)
        if (error) throw error
      } else {
        const { error } = await supabase.from('newsletters').insert(payload)
        if (error) throw error
      }

      router.push('/drafts')
    } catch (err) {
      console.error(err)
      setError(err.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  /** Enter handling in text blocks */
  function handleTextKeyDown(i, e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      insertAtCursor(i, '\n\n')
    }
  }

  /** Right-column preview */
  function Preview() {
    return (
      <>
        <style jsx>{`
          .preview-body p {
            margin: 0 0 1em;
            line-height: 1.6;
          }
          .preview-body ul,
          .preview-body ol {
            margin: 0 0 1em 1.25em;
          }
          .preview-body h1,
          .preview-body h2,
          .preview-body h3 {
            margin: 1.25em 0 0.5em;
          }
          .preview-body br + br {
            line-height: 1.2rem;
            display: block;
            content: '';
          }
        `}</style>

        <div className="preview-body">
          {blocks.map((blk, i) => {
            if (blk.type === 'text') {
              return (
                <div key={i} style={{ marginBottom: 12 }}>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkBreaks]}
                    components={{
                      a: ({node, ...props}) => (
                        <a {...props} rel="noopener noreferrer" target="_blank" />
                      ),
                      img: ({node, ...props}) => (
                        <img {...props} style={{ ...imgStyle.base, ...imgStyle.main }} />
                      )
                    }}
                  >
                    {preserveExtraBlankLines(blk.markdown || '')}
                  </ReactMarkdown>
                </div>
              )
            }
            if (blk.type === 'image') {
              const style = {
                ...imgStyle.base,
                ...(blk.position === 'left' ? imgStyle.left :
                  blk.position === 'right' ? imgStyle.right : imgStyle.main)
              }
              const src = blk.url ? blk.url : (blk.file ? URL.createObjectURL(blk.file) : '')
              return (
                <figure key={i} style={{ margin: '16px 0', overflow: 'auto' }}>
                  {src
                    ? <img src={src} alt={blk.alt || ''} style={style} />
                    : <div style={{ padding: 12, border: '1px dashed #bbb', borderRadius: 8 }}>No image selected</div>}
                </figure>
              )
            }
            return null
          })}
          <div style={{ clear: 'both' }} />
        </div>
      </>
    )
  }

  return (
    <main style={{ maxWidth: 1200, margin: '24px auto', padding: '0 16px', fontFamily: 'system-ui' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginBottom: 8 }}>
        <h1 style={{ margin: 0 }}>{editingId ? 'Edit Newsletter' : 'Add Newsletter'}</h1>
        <Link style={{ fontSize: 14, color: '#0a66c2' }} href='/drafts'>Drafts</Link>
        <Link style={{ fontSize: 14, color: '#0a66c2' }} href='/addNewsletter'>New</Link>
        <a href="/logout" style={{ fontSize: 14, color: '#0a66c2' }}>Logout</a>
      </header>

      <p style={{ color: '#666', marginTop: 0 }}>
        Blocks render in the order you add them (FIFO). Mix text and images. Paste images directly into text areas.
      </p>

      <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Left column: form/editor */}
        <section>
          <div style={{ display: 'grid', gap: 12 }}>
            <input
              placeholder="Title (for reference on drafts and all newsletters)"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
            <input placeholder="Subtitle" value={subtitle} onChange={e => setSubtitle(e.target.value)} />
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />

            {/* Summary editor (its own state, not b.*) */}
            <textarea
              placeholder="Short summary (optional) — supports rich paste (bold/italic/links) and extra blank lines"
              rows={3}
              value={summary}
              onChange={e => setSummary(e.target.value)}
              style={{ whiteSpace: 'pre-wrap' }}
              onPaste={(e) => {
                const html = e.clipboardData?.getData('text/html')
                if (html) {
                  e.preventDefault()
                  const md = htmlToMarkdown(html)
                  // For summary we don't track a caret; just append (or replace selection manually if needed)
                  const target = e.currentTarget
                  const start = target.selectionStart ?? summary.length
                  const end = target.selectionEnd ?? summary.length
                  const next = summary.slice(0, start) + md + summary.slice(end)
                  setSummary(next)
                  // restore caret
                  queueMicrotask(() => {
                    target.focus()
                    const pos = start + md.length
                    target.setSelectionRange(pos, pos)
                  })
                }
              }}
            />

            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" onClick={addTextBlock}>+ Text block</button>
              <button type="button" onClick={addImageBlock}>+ Image block</button>
              <label style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="checkbox" checked={isPublished} onChange={e => setIsPublished(e.target.checked)} />
                Publish now
              </label>
            </div>

            {/* Block editors */}
            <ol style={{ padding: 0, marginTop: 12 }}>
              {blocks.map((blk, i) => (
                <li key={i} style={{ listStyle: 'none', border: '1px solid #e5e5e5', borderRadius: 10, padding: 12, marginBottom: 12 }}>
                  <div style={{ fontWeight: 600, marginBottom: 8 }}>
                    {blk.type === 'text' ? `Text block #${i + 1}` : `Image block #${i + 1}`}
                  </div>

                  {blk.type === 'text' ? (
                    <>
                      <small style={{ color: '#666' }}>
                        Markdown: **bold**, *italic*, lists (- / 1.), [links](https://). Enter = line break; multiple Enters = more space.
                      </small>
                      <div style={{ display: 'flex', gap: 8, margin: '6px 0' }}>
                        <button type="button" onClick={() => wrapSelection(i, '**')}>Bold</button>
                        <button type="button" onClick={() => wrapSelection(i, '*')}>Italic</button>
                        <button type="button" onClick={() => insertAtCursor(i, '\n')}>Line break</button>
                        <button type="button" onClick={() => insertAtCursor(i, '\n\n')}>Paragraph space</button>
                        <button type="button" onClick={() => insertAtCursor(i, '- ')}>• List</button>
                        <button type="button" onClick={() => insertAtCursor(i, '1. ')}>1. List</button>
                        <button type="button" onClick={() => insertAtCursor(i, '## ')}>Subtitle</button>
                      </div>
                      <textarea
                        ref={el => (textRefs.current[i] = el)}
                        rows={6}
                        value={blk.markdown}
                        onChange={e =>
                          setBlocks(arr => arr.map((x, idx) => idx === i ? { ...x, markdown: e.target.value } : x))
                        }
                        onKeyDown={e => handleTextKeyDown(i, e)}
                        onPaste={async e => {
                          // 1) images
                          const imageHandled = await pasteImagesFromClipboard(i, e)
                          if (imageHandled) return
                          // 2) rich text → Markdown
                          const html = e.clipboardData?.getData('text/html')
                          if (html) {
                            e.preventDefault()
                            const md = htmlToMarkdown(html)
                            insertAtCursor(i, md)
                            return
                          }
                        }}
                        placeholder="Write Markdown… (Paste keeps bold/italic/links; big headings kept as # / ## / ###)"
                        style={{ width: '100%', marginTop: 4, whiteSpace: 'pre-wrap' }}
                      />
                    </>
                  ) : (
                    <>
                      <input
                        type="file" accept="image/*"
                        onChange={e => {
                          const file = e.target.files?.[0] || null
                          setBlocks(arr => arr.map((x, idx) => idx === i ? { ...x, file, url: x.url || '' } : x))
                        }}
                      />
                      <input
                        placeholder="Alt text (accessibility + SEO)"
                        value={blk.alt || ''}
                        onChange={e => setBlocks(arr => arr.map((x, idx) => idx === i ? { ...x, alt: e.target.value } : x))}
                        style={{ display: 'block', marginTop: 8, width: '100%' }}
                      />
                      <label style={{ display: 'block', marginTop: 8 }}>
                        Position:{' '}
                        <select
                          value={blk.position || 'main'}
                          onChange={e => setBlocks(arr => arr.map((x, idx) => idx === i ? { ...x, position: e.target.value } : x))}
                        >
                          <option value="main">Full width</option>
                          <option value="left">Float left</option>
                          <option value="right">Float right</option>
                        </select>
                      </label>
                      <div style={{ marginTop: 8 }}>
                        {blk.url
                          ? <small style={{ color: '#2a7' }}>Uploaded ✓</small>
                          : blk.file ? <small>Will upload on Save</small> : <small>No file chosen</small>}
                      </div>
                    </>
                  )}

                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <button type="button" onClick={() => setBlocks(arr => arr.filter((_, idx) => idx !== i))}>
                      Remove block
                    </button>
                  </div>
                </li>
              ))}
            </ol>

            {error && <div style={{ color: 'crimson' }}>{error}</div>}
            <button type="submit" disabled={saving}>{saving ? 'Saving…' : (editingId ? 'Save changes' : 'Save')}</button>
          </div>
        </section>

        {/* Right column: live preview */}
        <section style={{ borderLeft: '1px solid #eee', paddingLeft: 24 }}>
          <h2 style={{ marginTop: 0 }}>Preview</h2>
          <article>
            <h1 style={{ marginBottom: 0 }}>{title || 'Untitled newsletter'}</h1>
            {subtitle && <h3 style={{ marginTop: 6, color: '#555' }}>{subtitle}</h3>}
            {date && <div style={{ color: '#666', margin: '4px 0 12px' }}>{date}</div>}

            {/* Summary preview using same Markdown/spacing rules */}
            {summary && (
              <div style={{ fontSize: 18 }}>
                <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                  {preserveExtraBlankLines(summary)}
                </ReactMarkdown>
              </div>
            )}

            <Preview />
          </article>
        </section>
      </form>
    </main>
  )
}
