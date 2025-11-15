import { sql } from '@vercel/postgres'

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { title, published_on, hero_url, summary, blocks, is_published } = req.body
      const result = await sql`
        INSERT INTO newsletters (title, published_on, hero_url, summary, blocks, is_published)
        VALUES (${title}, ${published_on}, ${hero_url}, ${summary}, ${blocks}, ${is_published})
        RETURNING *;
      `
      return res.status(200).json(result.rows[0])
    }

    if (req.method === 'DELETE') {
      const { id } = req.query
      await sql`UPDATE newsletters SET deleted_at = now() WHERE id = ${id};`
      return res.status(204).end()
    }

    if (req.method === 'GET') {
      const result = await sql`
        SELECT * FROM newsletters WHERE deleted_at IS NULL ORDER BY created_at DESC;
      `
      return res.status(200).json(result.rows)
    }

    res.status(405).end()
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e.message })
  }
}
