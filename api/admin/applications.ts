import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDb, ensureApplicationsTable } from "../_neondb";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await ensureApplicationsTable();
    const sql = getDb();

    const applications = await sql`
      SELECT * FROM consultant_applications ORDER BY created_at DESC
    `;

    return res.json(applications);
  } catch (error: any) {
    console.error("Fetch applications error:", error);
    return res.status(500).json({ error: "Failed to fetch applications" });
  }
}
