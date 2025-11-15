import { put } from '@vercel/blob'

export const config = { api: { bodyParser: false } } // stream the file

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const contentType = req.headers['content-type'] || 'application/octet-stream'
  const name = `newsletters/${Date.now()}`
  const blob = await put(name, req, { access: 'public', contentType })
  res.status(200).json({ url: blob.url })
}
