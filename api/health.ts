import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const raw = process.env.DATABASE_URL;
    if (!raw) return res.json({ ok: false, error: "no DATABASE_URL" });
    const url = raw.replace(/[&?]channel_binding=[^&]*/g, '');
    const sql = neon(url);
    const result = await sql`SELECT 1 as test`;
    return res.json({ ok: true, db_connected: true, result });
  } catch (err: any) {
    return res.json({ ok: false, error: err.message, stack: err.stack });
  }
}
