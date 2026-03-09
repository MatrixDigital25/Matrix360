import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.body;
  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "LinkedIn URL is required" });
  }

  // Validate it's a LinkedIn URL
  const linkedinPattern = /^https?:\/\/(\w+\.)?linkedin\.com\/in\//i;
  if (!linkedinPattern.test(url.trim())) {
    return res.status(400).json({ error: "Please enter a valid LinkedIn profile URL (e.g. https://linkedin.com/in/username)" });
  }

  try {
    const response = await fetch(url.trim(), {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      redirect: "follow",
    });

    if (!response.ok) {
      return res.status(422).json({ error: "Could not fetch LinkedIn profile. Make sure the URL is correct and the profile is public." });
    }

    const html = await response.text();

    // Extract Open Graph meta tags from the HTML
    const getMeta = (property: string): string => {
      // Match both property="og:..." and name="og:..."
      const regex = new RegExp(`<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']*?)["']`, "i");
      const match = html.match(regex);
      if (match) return match[1];
      // Also try content first
      const regex2 = new RegExp(`<meta[^>]+content=["']([^"']*?)["'][^>]+(?:property|name)=["']${property}["']`, "i");
      const match2 = html.match(regex2);
      return match2 ? match2[1] : "";
    };

    const ogTitle = getMeta("og:title");       // "FirstName LastName - Title - Company | LinkedIn"
    const ogDescription = getMeta("og:description"); // Summary/bio text
    const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] || "";

    // Parse the OG title: "FirstName LastName - Title - Company | LinkedIn"
    const titleSource = ogTitle || title;
    const cleanTitle = titleSource.replace(/\s*\|\s*LinkedIn\s*$/i, "").trim();
    const parts = cleanTitle.split(/\s*[-–—]\s*/);

    const full_name = parts[0]?.trim() || "";
    const professional_title = parts[1]?.trim() || "";
    const organization = parts[2]?.trim() || "";

    // Clean up description (LinkedIn often adds prefix text)
    let bio = ogDescription
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .trim();

    // LinkedIn descriptions sometimes start with "Full Name - ..." — remove that
    if (bio.toLowerCase().startsWith(full_name.toLowerCase())) {
      bio = bio.slice(full_name.length).replace(/^\s*[-–—·:]\s*/, "").trim();
    }

    const extracted = {
      full_name,
      professional_title,
      organization,
      bio: bio || "",
      linkedin_url: url.trim(),
    };

    return res.json({ success: true, data: extracted });
  } catch (error: any) {
    console.error("LinkedIn extraction error:", error);
    return res.status(500).json({ error: "Failed to extract LinkedIn profile data. Please fill the form manually." });
  }
}
