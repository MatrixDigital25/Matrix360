import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config(); // also load .env if present

import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import { neon } from "@neondatabase/serverless";

// Initialize SQLite database (in-memory for this example, but structured like Postgres)
const db = new Database(':memory:');

// Create tables
db.exec(`
  CREATE TABLE enterprises (
    enterprise_id INTEGER PRIMARY KEY AUTOINCREMENT,
    organization_name TEXT NOT NULL,
    industry TEXT NOT NULL,
    region TEXT NOT NULL,
    strategic_priorities TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE consultants (
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

  CREATE TABLE challenges (
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

  CREATE TABLE engagements (
    engagement_id INTEGER PRIMARY KEY AUTOINCREMENT,
    challenge_id INTEGER NOT NULL,
    enterprise_id INTEGER NOT NULL,
    status TEXT NOT NULL,
    start_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
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

  CREATE TABLE consultant_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    professional_title TEXT NOT NULL,
    organization TEXT NOT NULL,
    years_experience INTEGER NOT NULL,
    industry TEXT NOT NULL,
    specializations TEXT NOT NULL,
    linkedin_url TEXT NOT NULL,
    bio TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Insert some mock data
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

  INSERT INTO consultant_applications (full_name, professional_title, organization, years_experience, industry, specializations, linkedin_url, bio, status)
  VALUES ('Jane Doe', 'Enterprise Admin', 'Matrix Global', 10, 'Technology', 'AI, Cloud, FinTech', 'https://linkedin.com/in/janedoe', 'Highly experienced strategy consultant with a focus on AI and digital transformation. I have led multiple multi-million dollar projects across Europe and North America.', 'pending');
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- Enterprise APIs ---
  app.get("/api/enterprises", (req, res) => {
    const enterprises = db.prepare("SELECT * FROM enterprises").all();
    res.json(enterprises);
  });

  app.post("/api/enterprises", (req, res) => {
    const { organization_name, industry, region, strategic_priorities } = req.body;
    const stmt = db.prepare("INSERT INTO enterprises (organization_name, industry, region, strategic_priorities) VALUES (?, ?, ?, ?)");
    const info = stmt.run(organization_name, industry, region, strategic_priorities);
    res.json({ id: info.lastInsertRowid });
  });

  // --- Consultant APIs ---
  app.get("/api/consultants", (req, res) => {
    const consultants = db.prepare("SELECT * FROM consultants").all();
    res.json(consultants);
  });

  app.get("/api/consultants/:id", (req, res) => {
    const consultant = db.prepare("SELECT * FROM consultants WHERE consultant_id = ?").get(req.params.id);
    if (consultant) res.json(consultant);
    else res.status(404).json({ error: "Not found" });
  });

  // --- Challenge APIs ---
  app.post("/api/challenges", (req, res) => {
    const { enterprise_id, industry, challenge_description, strategic_objective, timeline, region } = req.body;
    const stmt = db.prepare("INSERT INTO challenges (enterprise_id, industry, challenge_description, strategic_objective, timeline, region) VALUES (?, ?, ?, ?, ?, ?)");
    const info = stmt.run(enterprise_id, industry, challenge_description, strategic_objective, timeline, region);
    res.json({ id: info.lastInsertRowid });
  });

  app.get("/api/challenges/:id", (req, res) => {
    const challenge = db.prepare("SELECT * FROM challenges WHERE challenge_id = ?").get(req.params.id);
    if (challenge) res.json(challenge);
    else res.status(404).json({ error: "Not found" });
  });

  // --- Matching Engine ---
  app.post("/api/match-consultants", (req, res) => {
    const { industry, region, strategic_specialization } = req.body;
    // Simple matching logic
    const stmt = db.prepare(`
      SELECT *, 
        (
          (CASE WHEN industry_expertise LIKE '%' || ? || '%' THEN 40 ELSE 0 END) +
          (CASE WHEN region = ? THEN 30 ELSE 0 END) +
          (CASE WHEN strategic_specialization LIKE '%' || ? || '%' THEN 30 ELSE 0 END)
        ) as match_score
      FROM consultants
      ORDER BY match_score DESC
      LIMIT 5
    `);
    const matches = stmt.all(industry, region, strategic_specialization);
    res.json(matches);
  });

  // --- Engagement APIs ---
  app.post("/api/engagements", (req, res) => {
    const { challenge_id, enterprise_id, consultant_ids } = req.body;

    const stmt = db.prepare("INSERT INTO engagements (challenge_id, enterprise_id, status) VALUES (?, ?, 'Active')");
    const info = stmt.run(challenge_id, enterprise_id);
    const engagementId = info.lastInsertRowid;

    const insertConsultant = db.prepare("INSERT INTO engagement_consultants (engagement_id, consultant_id) VALUES (?, ?)");
    for (const cid of consultant_ids) {
      insertConsultant.run(engagementId, cid);
    }

    res.json({ id: engagementId });
  });

  app.get("/api/engagements/:id", (req, res) => {
    const engagement = db.prepare("SELECT * FROM engagements WHERE engagement_id = ?").get(req.params.id);
    if (!engagement) return res.status(404).json({ error: "Not found" });

    const consultants = db.prepare(`
      SELECT c.* FROM consultants c
      JOIN engagement_consultants ec ON c.consultant_id = ec.consultant_id
      WHERE ec.engagement_id = ?
    `).all(req.params.id);

    res.json({ ...engagement, consultants });
  });

  // --- LinkedIn Profile Extraction ---
  app.post("/api/linkedin-extract", async (req, res) => {
    const { url } = req.body;
    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: "LinkedIn URL is required" });
    }
    const linkedinPattern = /^https?:\/\/(\w+\.)?linkedin\.com\/in\//i;
    if (!linkedinPattern.test(url.trim())) {
      return res.status(400).json({ error: "Please enter a valid LinkedIn profile URL" });
    }

    const strategies = [
      { headers: { "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)", "Accept": "text/html", "Accept-Language": "en-US,en;q=0.9" } },
      { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36", "Accept": "text/html,application/xhtml+xml", "Accept-Language": "en-US,en;q=0.9", "Referer": "https://www.google.com/" } },
      { headers: { "User-Agent": "LinkedInBot/1.0 (compatible; Mozilla/5.0; Apache-HttpClient +http://www.linkedin.com)", "Accept": "text/html" } },
    ];

    const getMeta = (html: string, property: string): string => {
      const r1 = new RegExp(`<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']*?)["']`, "i");
      const m1 = html.match(r1);
      if (m1) return m1[1];
      const r2 = new RegExp(`<meta[^>]+content=["']([^"']*?)["'][^>]+(?:property|name)=["']${property}["']`, "i");
      const m2 = html.match(r2);
      return m2 ? m2[1] : "";
    };

    const isLoginWall = (html: string, ogTitle: string): boolean => {
      if (html.includes("/authwall") || html.includes("auth_wall")) return true;
      if (html.includes("Sign in") && html.includes("Join now") && !ogTitle) return true;
      if (ogTitle.toLowerCase().includes("log in") || ogTitle.toLowerCase().includes("sign in")) return true;
      const t = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] || "";
      if (t.includes("LinkedIn Login") || t.includes("Sign Up")) return true;
      return false;
    };

    const extractUsername = (u: string): string => {
      const m = u.match(/linkedin\.com\/in\/([^/?#]+)/i);
      return m ? m[1].replace(/-/g, " ") : "";
    };

    const titleCase = (s: string): string => s.replace(/\b\w/g, (c) => c.toUpperCase());

    const cleanUrl = url.trim().split("?")[0].replace(/\/+$/, "");

    // Strategy 1: Direct LinkedIn fetch
    for (const strategy of strategies) {
      try {
        const response = await fetch(cleanUrl, { headers: strategy.headers, redirect: "follow" });
        if (!response.ok) continue;
        const html = await response.text();
        const ogTitle = getMeta(html, "og:title");
        const ogDescription = getMeta(html, "og:description");
        if (isLoginWall(html, ogTitle)) continue;
        const titleTag = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] || "";
        const titleSource = ogTitle || titleTag;
        if (!titleSource || titleSource.toLowerCase() === "linkedin") continue;
        const cleanTitle = titleSource.replace(/\s*\|\s*LinkedIn\s*$/i, "").trim();
        const parts = cleanTitle.split(/\s*[-–—]\s*/);
        const full_name = parts[0]?.trim() || "";
        if (!full_name) continue;
        const professional_title = parts[1]?.trim() || "";
        const organization = parts[2]?.trim() || "";
        let bio = (ogDescription || "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'").replace(/&quot;/g, '"').trim();
        if (bio.toLowerCase().startsWith(full_name.toLowerCase())) {
          bio = bio.slice(full_name.length).replace(/^\s*[-–—·:]\s*/, "").trim();
        }
        return res.json({ success: true, data: { full_name, professional_title, organization, bio, linkedin_url: url.trim() } });
      } catch { continue; }
    }

    // Strategy 2: Try Google search for the profile
    try {
      const username = cleanUrl.split("/in/")[1];
      const googleUrl = `https://www.google.com/search?q=site:linkedin.com/in/${encodeURIComponent(username)}`;
      const gResp = await fetch(googleUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          "Accept": "text/html", "Accept-Language": "en-US,en;q=0.9",
        },
      });
      if (gResp.ok) {
        const gHtml = await gResp.text();
        const snippetMatch = gHtml.match(new RegExp(`<h3[^>]*>([^<]*${username.replace(/-/g, '.')}[^<]*)<\\/h3>`, "i"))
          || gHtml.match(/<h3[^>]*>([^<]*linkedin[^<]*)<\/h3>/i);
        if (snippetMatch) {
          const snippetText = snippetMatch[1]
            .replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"')
            .replace(/\s*[-–—]\s*LinkedIn\s*$/i, "").trim();
          const parts = snippetText.split(/\s*[-–—]\s*/);
          if (parts[0] && parts[0].length > 1) {
            const descMatch = gHtml.match(/<div[^>]*class="[^"]*VwiC3b[^"]*"[^>]*>([^<]+)/i);
            const bio = descMatch ? descMatch[1].replace(/&amp;/g, "&").replace(/&#39;/g, "'").trim() : "";
            return res.json({ success: true, source: "google", data: { full_name: parts[0].trim(), professional_title: parts[1]?.trim() || "", organization: parts[2]?.trim() || "", bio, linkedin_url: url.trim() } });
          }
        }
      }
    } catch { /* continue */ }

    // Strategy 3: Extract name from URL username
    const username = extractUsername(url.trim());
    if (username) {
      return res.json({
        success: true,
        partial: true,
        data: { full_name: titleCase(username), professional_title: "", organization: "", bio: "", linkedin_url: url.trim() },
      });
    }

    return res.status(422).json({ error: "Could not extract this profile. Please fill the form manually." });
  });

  // --- Consultant Application APIs (SQLite Fallback) ---
  app.post("/api/applications", (req, res) => {
    try {
      const { full_name, professional_title, organization, years_experience, industry, specializations, linkedin_url, bio } = req.body;
      if (!full_name || !professional_title || !organization || !years_experience || !industry || !specializations || !linkedin_url || !bio) {
        return res.status(400).json({ error: "All fields are required" });
      }
      const stmt = db.prepare(`
        INSERT INTO consultant_applications 
        (full_name, professional_title, organization, years_experience, industry, specializations, linkedin_url, bio)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      const info = stmt.run(full_name, professional_title, organization, Number(years_experience), industry, specializations, linkedin_url, bio);
      return res.json({ success: true, id: info.lastInsertRowid });
    } catch (error: any) {
      console.error("Application submission error:", error);
      return res.status(500).json({ error: "Failed to submit application" });
    }
  });

  app.get("/api/admin/applications", (req, res) => {
    try {
      const applications = db.prepare("SELECT * FROM consultant_applications ORDER BY created_at DESC").all();
      return res.json(applications);
    } catch (error: any) {
      console.error("Fetch applications error:", error);
      return res.status(500).json({ error: "Failed to fetch applications" });
    }
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
