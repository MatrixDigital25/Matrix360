import { neon } from "@neondatabase/serverless";

export default async function handler(req: any, res: any) {
  const url = process.env.DATABASE_URL;
  if (!url) {
    return res.status(500).json({ error: "DATABASE_URL is not set" });
  }

  const sql = neon(url);

  try {
    // Ensure table exists
    await sql`
      CREATE TABLE IF NOT EXISTS workflows (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        document_text TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'Active',
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    if (req.method === "GET") {
      // Don't return full document text in the list view to save bandwidth
      const workflows = await sql`
        SELECT id, name, description, status, created_at 
        FROM workflows 
        ORDER BY created_at DESC
      `;
      return res.status(200).json(workflows);
    }

    if (req.method === "POST") {
      const { name, description, document_text } = req.body;
      if (!name || !document_text) {
        return res.status(400).json({ error: "Name and document text are required" });
      }

      const result = await sql`
        INSERT INTO workflows (name, description, document_text)
        VALUES (${name}, ${description || ''}, ${document_text})
        RETURNING id
      `;

      return res.status(201).json({ success: true, id: result[0].id });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err: any) {
    console.error("Workflows API Error:", err);
    return res.status(500).json({ error: "Database error", details: err.message });
  }
}
