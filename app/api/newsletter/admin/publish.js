import { sql } from '@vercel/postgres'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { id, published } = req.body
  await sql`UPDATE newsletters SET is_published = ${published} WHERE id = ${id};`
  res.status(204).end()
}
