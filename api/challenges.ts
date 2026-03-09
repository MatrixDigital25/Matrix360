import type { VercelRequest, VercelResponse } from "@vercel/node";
import db from "./_db";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    const { enterprise_id, industry, challenge_description, strategic_objective, timeline, region } = req.body;
    const stmt = db.prepare(
      "INSERT INTO challenges (enterprise_id, industry, challenge_description, strategic_objective, timeline, region) VALUES (?, ?, ?, ?, ?, ?)"
    );
    const info = stmt.run(enterprise_id, industry, challenge_description, strategic_objective, timeline, region);
    return res.json({ id: info.lastInsertRowid });
  }

  if (req.method === "GET" && req.query.id) {
    const challenge = db.prepare("SELECT * FROM challenges WHERE challenge_id = ?").get(req.query.id);
    if (challenge) return res.json(challenge);
    return res.status(404).json({ error: "Not found" });
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method not allowed" });
}
