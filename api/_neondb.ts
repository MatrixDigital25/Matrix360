import { neon } from "@neondatabase/serverless";

export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL environment variable is not set");
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
