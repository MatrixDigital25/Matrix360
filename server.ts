import express, { Request, Response, NextFunction } from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import * as otplib from "otplib";
// @ts-ignore
const { authenticator } = otplib;
import qrcode from "qrcode";

// Secret for JWT
const JWT_SECRET = process.env.JWT_SECRET || "enterprise-secret-key-123";

// Initialize SQLite database
const db = new Database(':memory:');

// Create tables with Enterprise Security features
db.exec(`
  CREATE TABLE organizations (
    org_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'USER', -- ADMIN, MANAGER, USER
    user_type TEXT NOT NULL DEFAULT 'ENTERPRISE', -- ENTERPRISE, CONSULTANT
    org_id INTEGER NOT NULL,
    has_onboarded INTEGER DEFAULT 0,
    two_factor_secret TEXT,
    two_factor_enabled INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (org_id) REFERENCES organizations(org_id)
  );

  CREATE TABLE audit_logs (
    log_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    org_id INTEGER NOT NULL,
    action TEXT NOT NULL,
    details TEXT,
    ip_address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (org_id) REFERENCES organizations(org_id)
  );

  CREATE TABLE enterprises (
    enterprise_id INTEGER PRIMARY KEY AUTOINCREMENT,
    org_id INTEGER NOT NULL,
    organization_name TEXT NOT NULL,
    industry TEXT NOT NULL,
    region TEXT NOT NULL,
    strategic_priorities TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (org_id) REFERENCES organizations(org_id)
  );

  CREATE TABLE consultants (
    consultant_id INTEGER PRIMARY KEY AUTOINCREMENT,
    org_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    domain TEXT NOT NULL,
    industry_expertise TEXT NOT NULL,
    strategic_specialization TEXT NOT NULL,
    geographies TEXT NOT NULL, -- JSON array
    years_experience INTEGER NOT NULL,
    projects TEXT NOT NULL, -- JSON array
    ai_rating REAL DEFAULT 4.5,
    availability TEXT DEFAULT 'Available',
    transformation_specialty TEXT,
    profile_photo TEXT,
    bio TEXT,
    hourly_rate INTEGER DEFAULT 250,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (org_id) REFERENCES organizations(org_id)
  );

  CREATE TABLE transactions (
    transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
    org_id INTEGER NOT NULL,
    enterprise_id INTEGER NOT NULL,
    consultant_id INTEGER NOT NULL,
    amount REAL NOT NULL,
    platform_fee REAL NOT NULL,
    consultant_earnings REAL NOT NULL,
    status TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (org_id) REFERENCES organizations(org_id),
    FOREIGN KEY (enterprise_id) REFERENCES enterprises(enterprise_id),
    FOREIGN KEY (consultant_id) REFERENCES consultants(consultant_id)
  );

  CREATE TABLE challenges (
    challenge_id INTEGER PRIMARY KEY AUTOINCREMENT,
    org_id INTEGER NOT NULL,
    enterprise_id INTEGER NOT NULL,
    industry TEXT NOT NULL,
    challenge_description TEXT NOT NULL,
    strategic_objective TEXT NOT NULL,
    timeline TEXT NOT NULL,
    region TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (org_id) REFERENCES organizations(org_id),
    FOREIGN KEY (enterprise_id) REFERENCES enterprises(enterprise_id)
  );

  CREATE TABLE engagements (
    engagement_id INTEGER PRIMARY KEY AUTOINCREMENT,
    org_id INTEGER NOT NULL,
    challenge_id INTEGER NOT NULL,
    enterprise_id INTEGER NOT NULL,
    status TEXT NOT NULL,
    start_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (org_id) REFERENCES organizations(org_id),
    FOREIGN KEY (challenge_id) REFERENCES challenges(challenge_id),
    FOREIGN KEY (enterprise_id) REFERENCES enterprises(enterprise_id)
  );

  CREATE TABLE engagement_consultants (
    engagement_id INTEGER NOT NULL,
    consultant_id INTEGER NOT NULL,
    PRIMARY KEY (engagement_id, consultant_id),
    FOREIGN KEY (engagement_id) REFERENCES engagements(engagement_id),
    FOREIGN KEY (consultant_id) REFERENCES consultants(consultant_id)
  );

  CREATE TABLE deliverables (
    deliverable_id INTEGER PRIMARY KEY AUTOINCREMENT,
    engagement_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    status TEXT NOT NULL,
    due_date DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (engagement_id) REFERENCES engagements(engagement_id)
  );

  CREATE TABLE meetings (
    meeting_id INTEGER PRIMARY KEY AUTOINCREMENT,
    engagement_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    scheduled_at DATETIME NOT NULL,
    transcript TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (engagement_id) REFERENCES engagements(engagement_id)
  );

  CREATE TABLE documents (
    document_id INTEGER PRIMARY KEY AUTOINCREMENT,
    engagement_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (engagement_id) REFERENCES engagements(engagement_id)
  );

  CREATE TABLE ai_insights (
    insight_id INTEGER PRIMARY KEY AUTOINCREMENT,
    engagement_id INTEGER NOT NULL,
    insight_type TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (engagement_id) REFERENCES engagements(engagement_id)
  );

  CREATE TABLE ai_agents (
    agent_id INTEGER PRIMARY KEY AUTOINCREMENT,
    org_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- STRATEGIST, ANALYST, RESEARCHER
    status TEXT DEFAULT 'Active',
    config TEXT, -- JSON configuration
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (org_id) REFERENCES organizations(org_id)
  );
` + `
  CREATE TABLE integrations (
    integration_id INTEGER PRIMARY KEY AUTOINCREMENT,
    org_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- CRM, ERP, DATA, INTEL
    provider TEXT NOT NULL, -- Salesforce, SAP, Snowflake, etc.
    config TEXT, -- JSON configuration
    status TEXT DEFAULT 'Disconnected',
    last_sync DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (org_id) REFERENCES organizations(org_id)
  );

  CREATE TABLE strategic_signals (
    signal_id INTEGER PRIMARY KEY AUTOINCREMENT,
    org_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL, -- Opportunity Signals, Risk Alerts, Market Shifts, Technology Disruptions
    source TEXT NOT NULL, -- market news, technology trends, regulatory updates, industry reports
    content TEXT NOT NULL,
    recommendation TEXT,
    severity TEXT DEFAULT 'Medium', -- Low, Medium, High
    status TEXT DEFAULT 'New', -- New, Reviewed, Actioned
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (org_id) REFERENCES organizations(org_id)
  );
`);

// Insert some mock data with organization isolation
const salt = bcrypt.genSaltSync(10);
const hashedPwd = bcrypt.hashSync("password123", salt);

db.exec(`
  INSERT INTO organizations (name) VALUES ('Acme Corp');
  INSERT INTO organizations (name) VALUES ('Stark Industries');

  INSERT INTO users (email, password_hash, role, user_type, org_id, has_onboarded) 
  VALUES ('admin@acme.com', '${hashedPwd}', 'ADMIN', 'ENTERPRISE', 1, 1);
  
  INSERT INTO users (email, password_hash, role, user_type, org_id, has_onboarded) 
  VALUES ('user@acme.com', '${hashedPwd}', 'USER', 'ENTERPRISE', 1, 1);

  INSERT INTO enterprises (org_id, organization_name, industry, region, strategic_priorities) 
  VALUES (1, 'Global Tech Corp', 'Technology', 'APAC', 'Market Expansion, Regulatory Compliance');

  INSERT INTO consultants (org_id, name, title, domain, industry_expertise, strategic_specialization, geographies, years_experience, projects, ai_rating, availability, transformation_specialty, bio, profile_photo, hourly_rate)
  VALUES (
    1,
    'Dr. Sarah Jenkins', 
    'Senior Regulatory Strategist', 
    'Regulatory Strategy',
    'Healthcare', 
    'Compliance, Policy, EU Markets', 
    '["Europe", "North America"]', 
    15, 
    '["GDPR Framework for Global Bank", "EU Health Policy Reform"]', 
    4.9, 
    'Available', 
    'Compliance', 
    'Expert in global healthcare regulation and compliance.',
    'https://picsum.photos/seed/sarah/400/400',
    350
  );

  INSERT INTO consultants (org_id, name, title, domain, industry_expertise, strategic_specialization, geographies, years_experience, projects, ai_rating, availability, transformation_specialty, bio, profile_photo, hourly_rate)
  VALUES (
    1,
    'Marcus Chen', 
    'APAC Expansion Lead', 
    'Market Entry',
    'Technology', 
    'Market Entry, Supply Chain, M&A', 
    '["APAC", "Global"]', 
    12, 
    '["Tech Unicorn SE Asia Entry", "Logistics Network Optimization"]', 
    4.7, 
    'Limited', 
    'M&A', 
    'Expert in APAC market entry and regulatory compliance.',
    'https://picsum.photos/seed/marcus/400/400',
    275
  );

  INSERT INTO consultants (org_id, name, title, domain, industry_expertise, strategic_specialization, geographies, years_experience, projects, ai_rating, availability, transformation_specialty, bio, profile_photo, hourly_rate)
  VALUES (
    1,
    'Elena Rostova', 
    'Supply Chain Risk Specialist', 
    'Supply Chain',
    'Manufacturing', 
    'Logistics, Risk Mitigation, Sustainability', 
    '["Europe", "Middle East"]', 
    10, 
    '["Automotive Tier-1 Risk Audit", "Green Supply Chain Initiative"]', 
    4.5, 
    'Available', 
    'Risk Mitigation', 
    'Specialist in supply chain resilience and risk management.',
    'https://picsum.photos/seed/elena/400/400',
    225
  );

  INSERT INTO consultants (org_id, name, title, domain, industry_expertise, strategic_specialization, geographies, years_experience, projects, ai_rating, availability, transformation_specialty, bio, profile_photo, hourly_rate)
  VALUES (
    1,
    'David Okafor', 
    'Digital Transformation Advisor', 
    'Digital Transformation',
    'Finance', 
    'Fintech, Agile, Cloud Architecture', 
    '["North America", "Global"]', 
    18, 
    '["Legacy Bank Cloud Migration", "Digital Wallet Ecosystem Design"]', 
    5.0, 
    'Busy', 
    'Automation', 
    'Leader in financial services digital transformation.',
    'https://picsum.photos/seed/david/400/400',
    450
  );

  INSERT INTO challenges (org_id, enterprise_id, industry, challenge_description, strategic_objective, timeline, region)
  VALUES (1, 1, 'Technology', 'Need to navigate data sovereignty laws in Singapore and Indonesia for cloud rollout.', 'Successful market entry with 100% compliance', '6 months', 'APAC');

  INSERT INTO engagements (org_id, challenge_id, enterprise_id, status)
  VALUES (1, 1, 1, 'Active');

  INSERT INTO engagement_consultants (engagement_id, consultant_id)
  VALUES (1, 1);

  INSERT INTO integrations (org_id, name, type, provider, status)
  VALUES (1, 'Salesforce Production', 'CRM', 'Salesforce', 'Connected');
  INSERT INTO integrations (org_id, name, type, provider, status)
  VALUES (1, 'SAP Global ERP', 'ERP', 'SAP', 'Disconnected');
  INSERT INTO integrations (org_id, name, type, provider, status)
  VALUES (1, 'Snowflake Data Warehouse', 'DATA', 'Snowflake', 'Connected');
  INSERT INTO integrations (org_id, name, type, provider, status)
  VALUES (1, 'Bloomberg Terminal Feed', 'INTEL', 'Bloomberg', 'Connected');

  INSERT INTO ai_insights (engagement_id, insight_type, content)
  VALUES (1, 'Risk', 'Data sovereignty laws in Indonesia may require local server infrastructure by 2025.');
  INSERT INTO ai_insights (engagement_id, insight_type, content)
  VALUES (1, 'Opportunity', 'New ESG tax incentives in Indonesia could offset 15% of initial setup costs.');
  INSERT INTO ai_insights (engagement_id, insight_type, content)
  VALUES (1, 'Recommendation', 'Establish a local entity in Jakarta by Q4 to leverage regional trade agreements.');
  INSERT INTO ai_insights (engagement_id, insight_type, content)
  VALUES (1, 'Risk', 'Singapore Data Sovereignty Act 2024 may impact cloud storage architecture.');

  INSERT INTO strategic_signals (org_id, title, category, source, content, recommendation, severity)
  VALUES (1, 'EU AI Act Implementation', 'Risk Alerts', 'regulatory updates', 'The final text of the EU AI Act has been published, introducing strict requirements for high-risk AI systems.', 'Conduct a comprehensive AI audit to ensure all deployed models comply with transparency and risk management standards.', 'High');

  INSERT INTO strategic_signals (org_id, title, category, source, content, recommendation, severity)
  VALUES (1, 'Quantum Computing Breakthrough', 'Technology Disruptions', 'technology trends', 'A major breakthrough in error-correcting quantum bits has accelerated the timeline for cryptographically relevant quantum computers.', 'Begin transitioning to post-quantum cryptographic standards for all sensitive enterprise data.', 'Medium');

  INSERT INTO strategic_signals (org_id, title, category, source, content, recommendation, severity)
  VALUES (1, 'Emerging Market Tech Boom', 'Opportunity Signals', 'market news', 'Venture capital flow into Southeast Asian deep tech startups has increased by 40% year-over-year.', 'Explore strategic partnerships or acquisitions in the Jakarta and Ho Chi Minh City tech hubs.', 'Medium');
`);

// --- Middleware ---
interface AuthRequest extends Request {
  user?: {
    user_id: number;
    email: string;
    role: string;
    org_id: number;
    two_factor_verified?: boolean;
  };
}

const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.auth_token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

const authorize = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
};

const logAudit = (userId: number | undefined, orgId: number, action: string, details: string, ip: string | undefined) => {
  const stmt = db.prepare("INSERT INTO audit_logs (user_id, org_id, action, details, ip_address) VALUES (?, ?, ?, ?, ?)");
  stmt.run(userId, orgId, action, details, ip);
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cookieParser());

  // --- Auth APIs ---
  app.post("/api/auth/register", async (req, res) => {
    const { email, password, organization_name, user_type } = req.body;
    try {
      const orgStmt = db.prepare("INSERT INTO organizations (name) VALUES (?)");
      const orgInfo = orgStmt.run(organization_name || `${email}'s Org`);
      const orgId = orgInfo.lastInsertRowid;

      const hashedPassword = await bcrypt.hash(password, 10);
      const userStmt = db.prepare("INSERT INTO users (email, password_hash, role, user_type, org_id) VALUES (?, ?, 'ADMIN', ?, ?)");
      const userInfo = userStmt.run(email, hashedPassword, user_type || 'ENTERPRISE', orgId);

      logAudit(Number(userInfo.lastInsertRowid), Number(orgId), "REGISTER", `User registered for org ${organization_name}`, req.ip);
      res.json({ success: true });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as any;

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (user.two_factor_enabled) {
      // Return partial token for 2FA verification
      const tempToken = jwt.sign({ 
        user_id: user.user_id, 
        email: user.email, 
        role: user.role, 
        org_id: user.org_id,
        two_factor_verified: false 
      }, JWT_SECRET, { expiresIn: '5m' });
      
      return res.json({ requires2FA: true, tempToken });
    }

    const token = jwt.sign({ 
      user_id: user.user_id, 
      email: user.email, 
      role: user.role, 
      org_id: user.org_id,
      two_factor_verified: false
    }, JWT_SECRET, { expiresIn: '24h' });

    res.cookie("auth_token", token, { 
      httpOnly: true, 
      secure: true, 
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000 
    });

    logAudit(user.user_id, user.org_id, "LOGIN", "User logged in", req.ip);
    res.json({ success: true, user: { email: user.email, role: user.role, org_id: user.org_id, user_type: user.user_type, has_onboarded: user.has_onboarded } });
  });

  app.post("/api/auth/2fa/setup", authenticate, async (req: AuthRequest, res) => {
    const secret = authenticator.generateSecret();
    const otpauth = authenticator.keyuri(req.user!.email, "MATRIX360", secret);
    
    db.prepare("UPDATE users SET two_factor_secret = ? WHERE user_id = ?").run(secret, req.user!.user_id);
    
    const qrCodeUrl = await qrcode.toDataURL(otpauth);
    res.json({ qrCodeUrl, secret });
  });

  app.post("/api/auth/2fa/verify", async (req: AuthRequest, res) => {
    const { code, tempToken } = req.body;
    let userData: any;

    try {
      if (tempToken) {
        userData = jwt.verify(tempToken, JWT_SECRET);
      } else {
        // Setup verification
        const token = req.cookies.auth_token;
        userData = jwt.verify(token, JWT_SECRET);
      }
    } catch (err) {
      return res.status(401).json({ error: "Invalid session" });
    }

    const user = db.prepare("SELECT * FROM users WHERE user_id = ?").get(userData.user_id) as any;
    const isValid = authenticator.check(code, user.two_factor_secret);

    if (!isValid) return res.status(400).json({ error: "Invalid code" });

    // Enable 2FA if it was a setup
    if (!user.two_factor_enabled) {
      db.prepare("UPDATE users SET two_factor_enabled = 1 WHERE user_id = ?").run(user.user_id);
    }

    const token = jwt.sign({ 
      user_id: user.user_id, 
      email: user.email, 
      role: user.role, 
      org_id: user.org_id,
      two_factor_verified: true
    }, JWT_SECRET, { expiresIn: '24h' });

    res.cookie("auth_token", token, { 
      httpOnly: true, 
      secure: true, 
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000 
    });

    logAudit(user.user_id, user.org_id, "2FA_VERIFY", "2FA verified", req.ip);
    res.json({ success: true, user: { email: user.email, role: user.role, org_id: user.org_id, user_type: user.user_type, has_onboarded: user.has_onboarded } });
  });

  app.post("/api/auth/logout", (req, res) => {
    res.clearCookie("auth_token");
    res.json({ success: true });
  });

  app.get("/api/auth/me", authenticate, (req: AuthRequest, res) => {
    res.json(req.user);
  });

  // --- Onboarding APIs ---
  app.post("/api/onboarding/enterprise", authenticate, (req: AuthRequest, res) => {
    const { enterprise, challenge, agent } = req.body;
    const orgId = req.user!.org_id;

    db.transaction(() => {
      // 1. Create Enterprise Profile
      const entStmt = db.prepare("INSERT INTO enterprises (org_id, organization_name, industry, region, strategic_priorities) VALUES (?, ?, ?, ?, ?)");
      const entInfo = entStmt.run(orgId, enterprise.name, enterprise.industry, enterprise.region, enterprise.priorities);
      const enterpriseId = entInfo.lastInsertRowid;

      // 2. Create First Challenge
      const chalStmt = db.prepare("INSERT INTO challenges (org_id, enterprise_id, industry, challenge_description, strategic_objective, timeline, region) VALUES (?, ?, ?, ?, ?, ?, ?)");
      chalStmt.run(orgId, enterpriseId, enterprise.industry, challenge.description, challenge.objective, challenge.timeline, enterprise.region);

      // 3. Deploy First AI Agent
      const agentStmt = db.prepare("INSERT INTO ai_agents (org_id, name, type, config) VALUES (?, ?, ?, ?)");
      agentStmt.run(orgId, agent.name, agent.type, JSON.stringify(agent.config));

      // 4. Mark User as Onboarded
      db.prepare("UPDATE users SET has_onboarded = 1 WHERE user_id = ?").run(req.user!.user_id);
    })();

    logAudit(req.user!.user_id, orgId, "ONBOARDING_COMPLETE", "Enterprise onboarding completed", req.ip);
    res.json({ success: true });
  });

  app.post("/api/onboarding/consultant", authenticate, (req: AuthRequest, res) => {
    const { profile } = req.body;
    const orgId = req.user!.org_id;

    db.transaction(() => {
      // 1. Create Consultant Profile
      const consStmt = db.prepare(`
        INSERT INTO consultants (
          org_id, name, title, domain, industry_expertise, 
          strategic_specialization, geographies, years_experience, 
          projects, bio, hourly_rate
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      consStmt.run(
        orgId, 
        profile.name, 
        profile.title, 
        profile.domain, 
        profile.industry_expertise,
        profile.specialization,
        JSON.stringify(profile.geographies),
        profile.years_experience,
        JSON.stringify([]),
        profile.bio,
        profile.hourly_rate
      );

      // 2. Mark User as Onboarded
      db.prepare("UPDATE users SET has_onboarded = 1 WHERE user_id = ?").run(req.user!.user_id);
    })();

    logAudit(req.user!.user_id, orgId, "ONBOARDING_COMPLETE", "Consultant onboarding completed", req.ip);
    res.json({ success: true });
  });

  // --- AI Agent APIs ---
  app.get("/api/ai-agents", authenticate, (req: AuthRequest, res) => {
    const agents = db.prepare("SELECT * FROM ai_agents WHERE org_id = ?").all(req.user!.org_id);
    res.json(agents);
  });

  app.post("/api/ai-agents", authenticate, (req: AuthRequest, res) => {
    const { name, type, config } = req.body;
    const stmt = db.prepare("INSERT INTO ai_agents (org_id, name, type, config) VALUES (?, ?, ?, ?)");
    const info = stmt.run(req.user!.org_id, name, type, JSON.stringify(config));
    logAudit(req.user!.user_id, req.user!.org_id, "CREATE_AGENT", `Deployed agent ${name}`, req.ip);
    res.json({ id: info.lastInsertRowid });
  });

  // --- Analytics APIs (Isolated by Org) ---
  app.get("/api/analytics/transformation-success", authenticate, (req: AuthRequest, res) => {
    const stats = db.prepare(`
      SELECT 
        status, 
        COUNT(*) as count,
        (SELECT COUNT(*) FROM deliverables d WHERE d.engagement_id = e.engagement_id AND d.status = 'Completed') as completed_deliverables,
        (SELECT COUNT(*) FROM deliverables d WHERE d.engagement_id = e.engagement_id) as total_deliverables
      FROM engagements e
      WHERE org_id = ?
      GROUP BY status
    `).all(req.user!.org_id);
    
    // Mocking some ROI data since we don't have a full ROI table yet
    const roiData = [
      { month: 'Jan', roi: 12 },
      { month: 'Feb', roi: 15 },
      { month: 'Mar', roi: 18 },
      { month: 'Apr', roi: 22 },
      { month: 'May', roi: 25 },
      { month: 'Jun', roi: 30 },
    ];

    res.json({ stats, roiData });
  });

  app.get("/api/analytics/consultant-utilization", authenticate, (req: AuthRequest, res) => {
    const consultants = db.prepare(`
      SELECT 
        name, 
        availability,
        (SELECT COUNT(*) FROM engagement_consultants ec WHERE ec.consultant_id = c.consultant_id) as active_projects,
        hourly_rate
      FROM consultants c
      WHERE org_id = ?
    `).all(req.user!.org_id);

    const utilizationTrends = [
      { week: 'W1', rate: 65 },
      { week: 'W2', rate: 72 },
      { week: 'W3', rate: 68 },
      { week: 'W4', rate: 85 },
    ];

    res.json({ consultants, utilizationTrends });
  });

  app.get("/api/analytics/ai-performance", authenticate, (req: AuthRequest, res) => {
    const insights = db.prepare(`
      SELECT 
        insight_type, 
        COUNT(*) as count
      FROM ai_insights ai
      JOIN engagements e ON ai.engagement_id = e.engagement_id
      WHERE e.org_id = ?
      GROUP BY insight_type
    `).all(req.user!.org_id);

    const performanceMetrics = {
      accuracy: 94.2,
      latency: 0.45,
      tasksCompleted: 1240,
      efficiencyGain: 35
    };

    res.json({ insights, performanceMetrics });
  });

  app.get("/api/analytics/market-trends", authenticate, (req: AuthRequest, res) => {
    // Mocking market trends data
    const trends = [
      { category: 'Regulatory', strength: 85, trend: 'up' },
      { category: 'Technology', strength: 70, trend: 'up' },
      { category: 'Market', strength: 45, trend: 'down' },
      { category: 'Supply Chain', strength: 60, trend: 'stable' },
    ];

    const signalVolume = [
      { day: 'Mon', volume: 120 },
      { day: 'Tue', volume: 150 },
      { day: 'Wed', volume: 180 },
      { day: 'Thu', volume: 140 },
      { day: 'Fri', volume: 210 },
    ];

    res.json({ trends, signalVolume });
  });

  // --- Audit Logs ---
  app.get("/api/audit-logs", authenticate, authorize(['ADMIN']), (req: AuthRequest, res) => {
    const logs = db.prepare("SELECT * FROM audit_logs WHERE org_id = ? ORDER BY created_at DESC").all(req.user!.org_id);
    res.json(logs);
  });

  // --- Enterprise APIs (Isolated by Org) ---
  app.get("/api/enterprises", authenticate, (req: AuthRequest, res) => {
    const enterprises = db.prepare("SELECT * FROM enterprises WHERE org_id = ?").all(req.user!.org_id);
    res.json(enterprises);
  });

  app.post("/api/enterprises", authenticate, (req: AuthRequest, res) => {
    const { organization_name, industry, region, strategic_priorities } = req.body;
    const stmt = db.prepare("INSERT INTO enterprises (org_id, organization_name, industry, region, strategic_priorities) VALUES (?, ?, ?, ?, ?)");
    const info = stmt.run(req.user!.org_id, organization_name, industry, region, strategic_priorities);
    logAudit(req.user!.user_id, req.user!.org_id, "CREATE_ENTERPRISE", `Created enterprise ${organization_name}`, req.ip);
    res.json({ id: info.lastInsertRowid });
  });

  // --- Consultant APIs (Isolated by Org) ---
  app.get("/api/consultants", authenticate, (req: AuthRequest, res) => {
    const consultants = db.prepare("SELECT * FROM consultants WHERE org_id = ?").all(req.user!.org_id);
    res.json(consultants);
  });

  app.get("/api/consultants/:id", authenticate, (req: AuthRequest, res) => {
    const consultant = db.prepare("SELECT * FROM consultants WHERE consultant_id = ? AND org_id = ?").get(req.params.id, req.user!.org_id);
    if (consultant) res.json(consultant);
    else res.status(404).json({ error: "Not found" });
  });

  // --- Challenge APIs (Isolated by Org) ---
  app.post("/api/challenges", authenticate, (req: AuthRequest, res) => {
    const { enterprise_id, industry, challenge_description, strategic_objective, timeline, region } = req.body;
    const stmt = db.prepare("INSERT INTO challenges (org_id, enterprise_id, industry, challenge_description, strategic_objective, timeline, region) VALUES (?, ?, ?, ?, ?, ?, ?)");
    const info = stmt.run(req.user!.org_id, enterprise_id, industry, challenge_description, strategic_objective, timeline, region);
    logAudit(req.user!.user_id, req.user!.org_id, "CREATE_CHALLENGE", `Created challenge for enterprise ${enterprise_id}`, req.ip);
    res.json({ id: info.lastInsertRowid });
  });

  app.get("/api/challenges/:id", authenticate, (req: AuthRequest, res) => {
    const challenge = db.prepare("SELECT * FROM challenges WHERE challenge_id = ? AND org_id = ?").get(req.params.id, req.user!.org_id);
    if (challenge) res.json(challenge);
    else res.status(404).json({ error: "Not found" });
  });

  // --- Matching Engine (Isolated by Org) ---
  app.post("/api/match-consultants", authenticate, (req: AuthRequest, res) => {
    const { industry, region, strategic_specialization } = req.body;
    const stmt = db.prepare(`
      SELECT *, 
        (
          (CASE WHEN industry_expertise LIKE '%' || ? || '%' THEN 40 ELSE 0 END) +
          (CASE WHEN region = ? THEN 30 ELSE 0 END) +
          (CASE WHEN strategic_specialization LIKE '%' || ? || '%' THEN 30 ELSE 0 END)
        ) as match_score
      FROM consultants
      WHERE org_id = ?
      ORDER BY match_score DESC
      LIMIT 5
    `);
    const matches = stmt.all(industry, region, strategic_specialization, req.user!.org_id);
    res.json(matches);
  });

  // --- Engagement APIs (Isolated by Org) ---
  app.post("/api/engagements", authenticate, (req: AuthRequest, res) => {
    const { challenge_id, enterprise_id, consultant_ids } = req.body;
    
    const stmt = db.prepare("INSERT INTO engagements (org_id, challenge_id, enterprise_id, status) VALUES (?, ?, ?, 'Active')");
    const info = stmt.run(req.user!.org_id, challenge_id, enterprise_id);
    const engagementId = info.lastInsertRowid;

    const insertConsultant = db.prepare("INSERT INTO engagement_consultants (engagement_id, consultant_id) VALUES (?, ?)");
    for (const cid of consultant_ids) {
      insertConsultant.run(engagementId, cid);
    }

    logAudit(req.user!.user_id, req.user!.org_id, "CREATE_ENGAGEMENT", `Created engagement ${engagementId}`, req.ip);
    res.json({ id: engagementId });
  });

  app.get("/api/engagements/:id", authenticate, (req: AuthRequest, res) => {
    const engagement = db.prepare("SELECT * FROM engagements WHERE engagement_id = ? AND org_id = ?").get(req.params.id, req.user!.org_id);
    if (!engagement) return res.status(404).json({ error: "Not found" });

    const consultants = db.prepare(`
      SELECT c.* FROM consultants c
      JOIN engagement_consultants ec ON c.consultant_id = ec.consultant_id
      WHERE ec.engagement_id = ?
    `).all(req.params.id);

    res.json({ ...engagement, consultants });
  });

  // --- Booking & Payment APIs (Isolated by Org) ---
  app.post("/api/bookings", authenticate, (req: AuthRequest, res) => {
    const { enterprise_id, consultant_id, scheduled_at, duration_hours, title } = req.body;
    
    const consultant = db.prepare("SELECT hourly_rate FROM consultants WHERE consultant_id = ? AND org_id = ?").get(consultant_id, req.user!.org_id) as any;
    if (!consultant) return res.status(404).json({ error: "Consultant not found" });

    const amount = consultant.hourly_rate * duration_hours;
    const platform_fee = amount * 0.15;
    const consultant_earnings = amount - platform_fee;

    const txStmt = db.prepare(`
      INSERT INTO transactions (org_id, enterprise_id, consultant_id, amount, platform_fee, consultant_earnings, status, type, description)
      VALUES (?, ?, ?, ?, ?, ?, 'Completed', 'Advisory Session', ?)
    `);
    const txInfo = txStmt.run(req.user!.org_id, enterprise_id, consultant_id, amount, platform_fee, consultant_earnings, title);

    let engagement = db.prepare("SELECT engagement_id FROM engagement_consultants ec JOIN engagements e ON ec.engagement_id = e.engagement_id WHERE ec.consultant_id = ? AND e.org_id = ? LIMIT 1").get(consultant_id, req.user!.org_id) as any;
    
    if (!engagement) {
      const engStmt = db.prepare("INSERT INTO engagements (org_id, challenge_id, enterprise_id, status) VALUES (?, 1, ?, 'Active')");
      const engInfo = engStmt.run(req.user!.org_id, enterprise_id);
      const engId = engInfo.lastInsertRowid;
      db.prepare("INSERT INTO engagement_consultants (engagement_id, consultant_id) VALUES (?, ?)").run(engId, consultant_id);
      engagement = { engagement_id: engId };
    }

    const meetingStmt = db.prepare("INSERT INTO meetings (engagement_id, title, scheduled_at) VALUES (?, ?, ?)");
    meetingStmt.run(engagement.engagement_id, title, scheduled_at);

    logAudit(req.user!.user_id, req.user!.org_id, "CREATE_BOOKING", `Created booking for consultant ${consultant_id}`, req.ip);
    res.json({ 
      success: true, 
      transaction_id: txInfo.lastInsertRowid,
      amount,
      consultant_earnings,
      platform_fee
    });
  });

  app.get("/api/transactions", authenticate, (req: AuthRequest, res) => {
    const transactions = db.prepare("SELECT * FROM transactions WHERE org_id = ? ORDER BY created_at DESC").all(req.user!.org_id);
    res.json(transactions);
  });

  // --- Integration APIs (Isolated by Org) ---
  app.get("/api/integrations", authenticate, (req: AuthRequest, res) => {
    const integrations = db.prepare("SELECT * FROM integrations WHERE org_id = ? ORDER BY created_at DESC").all(req.user!.org_id);
    res.json(integrations);
  });

  // --- Strategic Signals APIs ---
  app.get("/api/strategic-signals", authenticate, (req: AuthRequest, res) => {
    const signals = db.prepare("SELECT * FROM strategic_signals WHERE org_id = ? ORDER BY created_at DESC").all(req.user!.org_id);
    res.json(signals);
  });

  app.post("/api/strategic-signals", authenticate, (req: AuthRequest, res) => {
    const { title, category, source, content, recommendation, severity } = req.body;
    const stmt = db.prepare(`
      INSERT INTO strategic_signals (org_id, title, category, source, content, recommendation, severity)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(req.user!.org_id, title, category, source, content, recommendation, severity || 'Medium');
    
    logAudit(req.user!.user_id, req.user!.org_id, "CREATE_SIGNAL", `Detected ${category}: ${title}`, req.ip);
    res.json({ id: info.lastInsertRowid });
  });

  app.patch("/api/strategic-signals/:id", authenticate, (req: AuthRequest, res) => {
    const { status } = req.body;
    db.prepare("UPDATE strategic_signals SET status = ? WHERE signal_id = ? AND org_id = ?").run(status, req.params.id, req.user!.org_id);
    res.json({ success: true });
  });

  app.post("/api/integrations", authenticate, (req: AuthRequest, res) => {
    const { name, type, provider, config } = req.body;
    const stmt = db.prepare("INSERT INTO integrations (org_id, name, type, provider, config, status) VALUES (?, ?, ?, ?, ?, 'Connected')");
    const info = stmt.run(req.user!.org_id, name, type, provider, JSON.stringify(config));
    logAudit(req.user!.user_id, req.user!.org_id, "CREATE_INTEGRATION", `Created integration ${name}`, req.ip);
    res.json({ id: info.lastInsertRowid });
  });

  app.delete("/api/integrations/:id", authenticate, (req: AuthRequest, res) => {
    const stmt = db.prepare("DELETE FROM integrations WHERE integration_id = ? AND org_id = ?");
    stmt.run(req.params.id, req.user!.org_id);
    logAudit(req.user!.user_id, req.user!.org_id, "DELETE_INTEGRATION", `Deleted integration ${req.params.id}`, req.ip);
    res.json({ success: true });
  });

  app.post("/api/integrations/:id/sync", authenticate, (req: AuthRequest, res) => {
    const stmt = db.prepare("UPDATE integrations SET last_sync = CURRENT_TIMESTAMP, status = 'Connected' WHERE integration_id = ? AND org_id = ?");
    stmt.run(req.params.id, req.user!.org_id);
    logAudit(req.user!.user_id, req.user!.org_id, "SYNC_INTEGRATION", `Synced integration ${req.params.id}`, req.ip);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
