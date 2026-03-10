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
      const keys = await sql`SELECT provider FROM api_keys`;
      const hasKeys = {
        gemini: keys.some((k: any) => k.provider === 'gemini'),
        groq: keys.some((k: any) => k.provider === 'groq')
      };
      // For backward compatibility, keep `hasKey` as true if any key exists
      return res.status(200).json({ success: true, hasKey: hasKeys.gemini || hasKeys.groq, hasKeys });
    }

    if (req.method === "POST") {
      const { provider, apiKey } = req.body;
      if (!apiKey) {
        return res.status(400).json({ error: "API key is required" });
      }
      const safeProvider = provider === "groq" ? "groq" : "gemini";

      await sql`
        INSERT INTO api_keys (provider, key_value) 
        VALUES (${safeProvider}, ${apiKey})
        ON CONFLICT (provider) 
        DO UPDATE SET key_value = EXCLUDED.key_value, created_at = NOW()
      `;

      return res.status(200).json({ success: true, message: `API key saved for ${safeProvider}` });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err: any) {
    console.error("API Key Error:", err);
    return res.status(500).json({ error: "Database error", details: err.message });
  }
}
