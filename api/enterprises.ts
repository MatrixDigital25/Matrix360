import type { VercelRequest, VercelResponse } from "@vercel/node";
import db from "./_db";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    const enterprises = db.prepare("SELECT * FROM enterprises").all();
    return res.json(enterprises);
  }

  if (req.method === "POST") {
    const { organization_name, industry, region, strategic_priorities } = req.body;
    const stmt = db.prepare(
      "INSERT INTO enterprises (organization_name, industry, region, strategic_priorities) VALUES (?, ?, ?, ?)"
    );
    const info = stmt.run(organization_name, industry, region, strategic_priorities);
    return res.json({ id: info.lastInsertRowid });
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method not allowed" });
}
