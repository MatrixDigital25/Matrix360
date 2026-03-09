import Database from "better-sqlite3";

const db = new Database(':memory:');

db.exec(`
  CREATE TABLE IF NOT EXISTS enterprises (
    enterprise_id INTEGER PRIMARY KEY AUTOINCREMENT,
    organization_name TEXT NOT NULL,
    industry TEXT NOT NULL,
    region TEXT NOT NULL,
    strategic_priorities TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS consultants (
    consultant_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    industry_expertise TEXT NOT NULL,
    strategic_specialization TEXT NOT NULL,
    region TEXT NOT NULL,
    years_experience INTEGER NOT NULL,
    profile_photo TEXT,
    bio TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS challenges (
    challenge_id INTEGER PRIMARY KEY AUTOINCREMENT,
    enterprise_id INTEGER NOT NULL,
    industry TEXT NOT NULL,
    challenge_description TEXT NOT NULL,
    strategic_objective TEXT NOT NULL,
    timeline TEXT NOT NULL,
    region TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (enterprise_id) REFERENCES enterprises(enterprise_id)
  );

  CREATE TABLE IF NOT EXISTS engagements (
    engagement_id INTEGER PRIMARY KEY AUTOINCREMENT,
    challenge_id INTEGER NOT NULL,
    enterprise_id INTEGER NOT NULL,
    status TEXT NOT NULL,
    start_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (challenge_id) REFERENCES challenges(challenge_id),
    FOREIGN KEY (enterprise_id) REFERENCES enterprises(enterprise_id)
  );

  CREATE TABLE IF NOT EXISTS engagement_consultants (
    engagement_id INTEGER NOT NULL,
    consultant_id INTEGER NOT NULL,
    PRIMARY KEY (engagement_id, consultant_id),
    FOREIGN KEY (engagement_id) REFERENCES engagements(engagement_id),
    FOREIGN KEY (consultant_id) REFERENCES consultants(consultant_id)
  );

  CREATE TABLE IF NOT EXISTS deliverables (
    deliverable_id INTEGER PRIMARY KEY AUTOINCREMENT,
    engagement_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    status TEXT NOT NULL,
    due_date DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (engagement_id) REFERENCES engagements(engagement_id)
  );

  CREATE TABLE IF NOT EXISTS meetings (
    meeting_id INTEGER PRIMARY KEY AUTOINCREMENT,
    engagement_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    scheduled_at DATETIME NOT NULL,
    transcript TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (engagement_id) REFERENCES engagements(engagement_id)
  );

  CREATE TABLE IF NOT EXISTS documents (
    document_id INTEGER PRIMARY KEY AUTOINCREMENT,
    engagement_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (engagement_id) REFERENCES engagements(engagement_id)
  );

  CREATE TABLE IF NOT EXISTS ai_insights (
    insight_id INTEGER PRIMARY KEY AUTOINCREMENT,
    engagement_id INTEGER NOT NULL,
    insight_type TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (engagement_id) REFERENCES engagements(engagement_id)
  );
`);

// Seed data
const enterpriseCount = (db.prepare("SELECT COUNT(*) as count FROM enterprises").get() as any).count;
if (enterpriseCount === 0) {
  db.exec(`
    INSERT INTO enterprises (organization_name, industry, region, strategic_priorities) 
    VALUES ('Global Tech Corp', 'Technology', 'APAC', 'Market Expansion, Regulatory Compliance');

    INSERT INTO consultants (name, title, industry_expertise, strategic_specialization, region, years_experience, bio)
    VALUES ('Marcus Chen', 'APAC Expansion Lead', 'Technology, Telecommunications', 'Regulatory Strategy, Market Expansion', 'Singapore', 12, 'Expert in APAC market entry and regulatory compliance.');

    INSERT INTO challenges (enterprise_id, industry, challenge_description, strategic_objective, timeline, region)
    VALUES (1, 'Technology', 'Need to navigate data sovereignty laws in Singapore and Indonesia for cloud rollout.', 'Successful market entry with 100% compliance', '6 months', 'APAC');

    INSERT INTO engagements (challenge_id, enterprise_id, status)
    VALUES (1, 1, 'Active');

    INSERT INTO engagement_consultants (engagement_id, consultant_id)
    VALUES (1, 1);
  `);
}

export default db;
