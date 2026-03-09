const { neon } = require('@neondatabase/serverless');

const sql = neon('postgresql://neondb_owner:npg_J4ipwhq5sRWF@ep-spring-wind-adr436gi-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require');

async function seed() {
  const result = await sql`
    INSERT INTO consultant_applications (full_name, professional_title, organization, years_experience, industry, specializations, linkedin_url, bio, status)
    VALUES (
      'Marcus Chen',
      'APAC Expansion Lead',
      'Matrix Strategic Advisory',
      12,
      'Technology',
      'Regulatory Strategy, Market Expansion, Data Sovereignty',
      'https://linkedin.com/in/marcuschen',
      'Expert in APAC market entry and regulatory compliance with over 12 years of experience helping Fortune 500 companies navigate complex data sovereignty laws across Singapore, Indonesia, and broader Southeast Asia.',
      'pending'
    )
    RETURNING id
  `;
  console.log('Inserted test consultant, id:', result[0].id);

  const rows = await sql`SELECT id, full_name, status, created_at FROM consultant_applications`;
  console.log('All applications:', rows);
}

seed().catch(err => console.error('Error:', err.message));
