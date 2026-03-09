import type { VercelRequest, VercelResponse } from "@vercel/node";
import db from "./_db";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    const { challenge_id, enterprise_id, consultant_ids } = req.body;
    const stmt = db.prepare(
      "INSERT INTO engagements (challenge_id, enterprise_id, status) VALUES (?, ?, 'Active')"
    );
    const info = stmt.run(challenge_id, enterprise_id);
    const engagementId = info.lastInsertRowid;

    const insertConsultant = db.prepare(
      "INSERT INTO engagement_consultants (engagement_id, consultant_id) VALUES (?, ?)"
    );
    for (const cid of consultant_ids) {
      insertConsultant.run(engagementId, cid);
    }

    return res.json({ id: engagementId });
  }

  res.setHeader("Allow", "POST");
  return res.status(405).json({ error: "Method not allowed" });
}
