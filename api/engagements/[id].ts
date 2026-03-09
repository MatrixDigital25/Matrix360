import type { VercelRequest, VercelResponse } from "@vercel/node";
import db from "../_db";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;
  const engagement = db.prepare("SELECT * FROM engagements WHERE engagement_id = ?").get(id);
  if (!engagement) return res.status(404).json({ error: "Not found" });

  const consultants = db.prepare(`
    SELECT c.* FROM consultants c
    JOIN engagement_consultants ec ON c.consultant_id = ec.consultant_id
    WHERE ec.engagement_id = ?
  `).all(id);

  return res.json({ ...(engagement as any), consultants });
}
