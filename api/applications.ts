import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDb, ensureApplicationsTable } from "./_neondb";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await ensureApplicationsTable();
    const sql = getDb();

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

    return res.json({ success: true, id: result[0].id });
  } catch (error: any) {
    console.error("Application submission error:", error);
    return res.status(500).json({ error: "Failed to submit application" });
  }
}
