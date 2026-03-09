const { neon } = require('@neondatabase/serverless');

const sql = neon('postgresql://neondb_owner:npg_J4ipwhq5sRWF@ep-spring-wind-adr436gi-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require');

async function setup() {
  await sql`CREATE TABLE IF NOT EXISTS consultant_applications (
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
  )`;
  console.log('Table created successfully');

  const rows = await sql`SELECT COUNT(*) as count FROM consultant_applications`;
  console.log('Current rows:', rows[0].count);
}

setup().catch(err => console.error('Error:', err.message));
