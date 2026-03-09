import type { VercelRequest, VercelResponse } from "@vercel/node";
import db from "../_db";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;
  const consultant = db.prepare("SELECT * FROM consultants WHERE consultant_id = ?").get(id);
  if (consultant) return res.json(consultant);
  return res.status(404).json({ error: "Not found" });
}
