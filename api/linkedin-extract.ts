import type { VercelRequest, VercelResponse } from "@vercel/node";

const FETCH_STRATEGIES = [
  {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
    },
  },
  {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      "Referer": "https://www.google.com/",
      "Cache-Control": "no-cache",
    },
  },
  {
    headers: {
      "User-Agent": "LinkedInBot/1.0 (compatible; Mozilla/5.0; Apache-HttpClient +http://www.linkedin.com)",
      "Accept": "text/html",
    },
  },
];

function getMeta(html: string, property: string): string {
  const r1 = new RegExp(`<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']*?)["']`, "i");
  const m1 = html.match(r1);
  if (m1) return m1[1];
  const r2 = new RegExp(`<meta[^>]+content=["']([^"']*?)["'][^>]+(?:property|name)=["']${property}["']`, "i");
  const m2 = html.match(r2);
  return m2 ? m2[1] : "";
}

function isLoginWall(html: string, ogTitle: string): boolean {
  if (html.includes("/authwall") || html.includes("auth_wall")) return true;
  if (html.includes("Sign in") && html.includes("Join now") && !ogTitle) return true;
  if (ogTitle.toLowerCase().includes("log in") || ogTitle.toLowerCase().includes("sign in")) return true;
  const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] || "";
  if (title.includes("LinkedIn Login") || title.includes("Sign Up")) return true;
  return false;
}

function parseProfile(html: string, originalUrl: string) {
  const ogTitle = getMeta(html, "og:title");
  const ogDescription = getMeta(html, "og:description");
  const titleTag = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] || "";
  if (isLoginWall(html, ogTitle)) return null;
  const titleSource = ogTitle || titleTag;
  if (!titleSource || titleSource.toLowerCase() === "linkedin") return null;
  const cleanTitle = titleSource.replace(/\s*\|\s*LinkedIn\s*$/i, "").trim();
  const parts = cleanTitle.split(/\s*[-–—]\s*/);
  const full_name = parts[0]?.trim() || "";
  if (!full_name) return null;
  const professional_title = parts[1]?.trim() || "";
  const organization = parts[2]?.trim() || "";
  let bio = (ogDescription || "")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'").replace(/&quot;/g, '"').trim();
  if (bio.toLowerCase().startsWith(full_name.toLowerCase())) {
    bio = bio.slice(full_name.length).replace(/^\s*[-–—·:]\s*/, "").trim();
  }
  return { full_name, professional_title, organization, bio: bio || "", linkedin_url: originalUrl };
}

function extractUsername(url: string): string {
  const m = url.match(/linkedin\.com\/in\/([^/?#]+)/i);
  return m ? m[1].replace(/-/g, " ") : "";
}

function titleCase(str: string): string {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.body;
  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "LinkedIn URL is required" });
  }

  const linkedinPattern = /^https?:\/\/(\w+\.)?linkedin\.com\/in\//i;
  if (!linkedinPattern.test(url.trim())) {
    return res.status(400).json({ error: "Please enter a valid LinkedIn profile URL (e.g. https://linkedin.com/in/username)" });
  }

  const cleanUrl = url.trim().split("?")[0].replace(/\/+$/, "");

  // Strategy 1: Direct LinkedIn fetch (works for famous/public profiles)
  for (const strategy of FETCH_STRATEGIES) {
    try {
      const response = await fetch(cleanUrl, { headers: strategy.headers, redirect: "follow" });
      if (!response.ok) continue;
      const html = await response.text();
      const data = parseProfile(html, url.trim());
      if (data && data.full_name) {
        return res.json({ success: true, data });
      }
    } catch { continue; }
  }

  // Strategy 2: Try Google's cached version of the profile
  try {
    const username = cleanUrl.split("/in/")[1];
    const googleUrl = `https://www.google.com/search?q=site:linkedin.com/in/${encodeURIComponent(username)}`;
    const gResp = await fetch(googleUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "text/html",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    if (gResp.ok) {
      const gHtml = await gResp.text();
      // Google search results contain the profile name and title in the snippet
      // Pattern: "Name - Title - Company" in the search result heading
      const snippetMatch = gHtml.match(new RegExp(`<h3[^>]*>([^<]*${username.replace(/-/g, '.')}[^<]*)<\\/h3>`, "i"))
        || gHtml.match(/<h3[^>]*>([^<]*linkedin[^<]*)<\/h3>/i);
      if (snippetMatch) {
        const snippetText = snippetMatch[1]
          .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
          .replace(/&#39;/g, "'").replace(/&quot;/g, '"')
          .replace(/\s*[-–—]\s*LinkedIn\s*$/i, "").trim();
        const parts = snippetText.split(/\s*[-–—]\s*/);
        if (parts[0] && parts[0].length > 1) {
          // Also try to grab the description snippet
          const descMatch = gHtml.match(/<div[^>]*class="[^"]*VwiC3b[^"]*"[^>]*>([^<]+)/i);
          const bio = descMatch ? descMatch[1].replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"').trim() : "";
          return res.json({
            success: true,
            source: "google",
            data: {
              full_name: parts[0].trim(),
              professional_title: parts[1]?.trim() || "",
              organization: parts[2]?.trim() || "",
              bio,
              linkedin_url: url.trim(),
            },
          });
        }
      }
    }
  } catch { /* Google search failed, continue */ }

  // Strategy 3: Extract what we can from the URL username as a partial fill
  const username = extractUsername(url.trim());
  if (username) {
    return res.json({
      success: true,
      partial: true,
      data: {
        full_name: titleCase(username),
        professional_title: "",
        organization: "",
        bio: "",
        linkedin_url: url.trim(),
      },
    });
  }

  return res.status(422).json({
    error: "Could not extract this profile. Please fill the form manually.",
  });
}
