import { neon } from "@neondatabase/serverless";

export default async function handler(req: any, res: any) {
  const url = process.env.DATABASE_URL;
  if (!url) {
    return res.status(500).json({ error: "DATABASE_URL is not set" });
  }

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "Workflow ID is required" });

  const sql = neon(url);

  try {
    if (req.method === "GET") {
      const workflow = await sql`SELECT * FROM workflows WHERE id = ${id}`;
      if (workflow.length === 0) {
        return res.status(404).json({ error: "Workflow not found" });
      }
      return res.status(200).json(workflow[0]);
    }

    if (req.method === "DELETE") {
      await sql`DELETE FROM workflows WHERE id = ${id}`;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err: any) {
    console.error("Workflow ID API Error:", err);
    return res.status(500).json({ error: "Database error", details: err.message });
  }
}
