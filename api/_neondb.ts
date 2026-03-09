import { neon } from "@neondatabase/serverless";

export function getDb() {
  const raw = process.env.DATABASE_URL;
  if (!raw) throw new Error("DATABASE_URL environment variable is not set");
  // Strip channel_binding param — not supported by the HTTP-based serverless driver
  const url = raw.replace(/[&?]channel_binding=[^&]*/g, '');
  return neon(url);
}

export async function ensureApplicationsTable() {
  const sql = getDb();
  await sql`
    CREATE TABLE IF NOT EXISTS consultant_applications (
      id SERIAL PRIMARY KEY,
      full_name TEXT NOT NULL,
      professional_title TEXT NOT NULL,
      organization TEXT NOT NULL,
      years_experience INTEGER NOT NULL,
      industry TEXT NOT NULL,
      specializations TEXT NOT NULL,
      linkedin_url TEXT NOT NULL,
      bio TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;
}
