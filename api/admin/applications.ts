import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Allow CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  const raw = process.env.DATABASE_URL;
  if (!raw) {
    return res.status(500).json({ error: "DATABASE_URL environment variable is not set on Vercel." });
  }

  try {
    const url = raw.replace(/[&?]channel_binding=[^&]*/g, '');
    const sql = neon(url);

    if (req.method === "DELETE") {
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: "Application ID is required for deletion" });
      
      await sql`DELETE FROM consultant_applications WHERE id = ${Number(id)}`;
      return res.status(200).json({ success: true, message: "Application deleted successfully" });
    }

    if (req.method === "GET") {
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

      return res.status(200).json(applications);
    }

    res.setHeader("Allow", "GET, DELETE");
    return res.status(405).json({ error: "Method not allowed" });

  } catch (error: any) {
    console.error("Fetch applications error:", error);
    return res.status(500).json({ 
      error: "Database error: " + (error.message || "Unknown error"),
      hint: "Check that DATABASE_URL is correct and the Neon database is accessible."
    });
  }
}
