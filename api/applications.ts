import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Allow CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const raw = process.env.DATABASE_URL;
  if (!raw) {
    return res.status(500).json({ error: "DATABASE_URL environment variable is not set on Vercel." });
  }

  try {
    const url = raw.replace(/[&?]channel_binding=[^&]*/g, '');
    const sql = neon(url);

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

    const {
      full_name,
      professional_title,
      organization,
      years_experience,
      industry,
      specializations,
      linkedin_url,
      bio,
    } = req.body;

    if (!full_name || !professional_title || !organization || !years_experience || !industry || !specializations || !linkedin_url || !bio) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await sql`
      INSERT INTO consultant_applications (full_name, professional_title, organization, years_experience, industry, specializations, linkedin_url, bio)
      VALUES (${full_name}, ${professional_title}, ${organization}, ${Number(years_experience)}, ${industry}, ${specializations}, ${linkedin_url}, ${bio})
      RETURNING id
    `;

    return res.status(200).json({ success: true, id: result[0].id });
  } catch (error: any) {
    console.error("Application submission error:", error);
    return res.status(500).json({ 
      error: "Database error: " + (error.message || "Unknown error"),
      hint: "Check DATABASE_URL and Neon database accessibility."
    });
  }
}
