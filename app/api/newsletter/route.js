import { sql } from '@vercel/postgres'

export default async function handler(req, res) {
  const { rows } = await sql`
    SELECT id, title, published_on, hero_url, summary
    FROM newsletters
    WHERE deleted_at IS NULL AND is_published = true
    ORDER BY published_on DESC NULLS LAST, created_at DESC;
  `
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
  res.status(200).json(rows)
}
