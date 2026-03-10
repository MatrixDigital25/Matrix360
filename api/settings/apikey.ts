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
      CREATE TABLE IF NOT EXISTS api_keys (
        id SERIAL PRIMARY KEY,
        provider VARCHAR(50) NOT NULL,
        key_value TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(provider)
      )
    `;

    if (req.method === "GET") {
      const keys = await sql`SELECT id, provider FROM api_keys WHERE provider = 'gemini' LIMIT 1`;
      return res.status(200).json({ success: true, hasKey: keys.length > 0 });
    }

    if (req.method === "POST") {
      const { apiKey } = req.body;
      if (!apiKey) {
        return res.status(400).json({ error: "API key is required" });
      }

      await sql`
        INSERT INTO api_keys (provider, key_value) 
        VALUES ('gemini', ${apiKey})
        ON CONFLICT (provider) 
        DO UPDATE SET key_value = EXCLUDED.key_value, created_at = NOW()
      `;

      return res.status(200).json({ success: true, message: "API key saved" });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err: any) {
    console.error("API Key Error:", err);
    return res.status(500).json({ error: "Database error", details: err.message });
  }
}
