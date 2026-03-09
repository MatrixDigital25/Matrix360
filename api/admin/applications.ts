import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";

function getDb() {
  const raw = process.env.DATABASE_URL;
  if (!raw) throw new Error("DATABASE_URL environment variable is not set");
  const url = raw.replace(/[&?]channel_binding=[^&]*/g, '');
  return neon(url);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const sql = getDb();
    await sql`
      CREATE TABLE IF NOT EXISTS consultant_applications (
        id SERIAL PRIMARY KEY,
        full_name TEXT NOT NULL,
        professional_title TEXT NOT NULL,
        organization TEXT NOT NULL,
        years_experience INTEGER NOT NULL,
        industry TEXT NOT NULL,
        specializations TEXT NOT NULL,
        linkedin_url TEXT NOT NULL,
        bio TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;
    const applications = await sql`
      SELECT * FROM consultant_applications ORDER BY created_at DESC
    `;
    return res.json(applications);
  } catch (error: any) {
    console.error("Fetch applications error:", error);
    return res.status(500).json({ error: error.message || "Failed to fetch applications" });
  }
}
