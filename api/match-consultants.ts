import type { VercelRequest, VercelResponse } from "@vercel/node";
import db from "./_db";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { industry, region, strategic_specialization } = req.body;
  const stmt = db.prepare(`
    SELECT *, 
      (
        (CASE WHEN industry_expertise LIKE '%' || ? || '%' THEN 40 ELSE 0 END) +
        (CASE WHEN region = ? THEN 30 ELSE 0 END) +
        (CASE WHEN strategic_specialization LIKE '%' || ? || '%' THEN 30 ELSE 0 END)
      ) as match_score
    FROM consultants
    ORDER BY match_score DESC
    LIMIT 5
  `);
  const matches = stmt.all(industry, region, strategic_specialization);
  return res.json(matches);
}
