import { neon } from "@neondatabase/serverless";

const DATABASE_URL = process.env.DATABASE_URL!;

export function getDb() {
  return neon(DATABASE_URL);
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
