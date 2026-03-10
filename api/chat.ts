import { neon } from "@neondatabase/serverless";
import { GoogleGenAI } from "@google/genai";
import Groq from "groq-sdk";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const url = process.env.DATABASE_URL;
  if (!url) {
    return res.status(500).json({ error: "DATABASE_URL is not set" });
  }

  const { workflowId, message, provider = 'groq' } = req.body;
  if (!workflowId || !message) {
    return res.status(400).json({ error: "Missing workflowId or message" });
  }

  const sql = neon(url);

  try {
    // 1. Get API Key for requested provider
    const keys = await sql`SELECT key_value FROM api_keys WHERE provider = ${provider} LIMIT 1`;
    if (keys.length === 0) {
      return res.status(401).json({ error: `No ${provider} API Key found. Please configure it in System Config.` });
    }
    const apiKey = keys[0].key_value;

    // 2. Get Workflow Document
    const workflows = await sql`SELECT name, document_text FROM workflows WHERE id = ${workflowId}`;
    if (workflows.length === 0) {
      return res.status(404).json({ error: "Workflow not found" });
    }
    const workflow = workflows[0];
    
    const systemPrompt = `You are a highly capable AI assistant acting as an operational agent for the '${workflow.name}' workflow in the Matrix360 Strategic Intelligence OS.
Your answers should be heavily based on the following document context. Keep answers concise, professional, and directly relevant to the user query.

--- WORKFLOW CONTEXT ---
${workflow.document_text}
--- END CONTEXT ---`;

    // 3. Call AI API depending on provider
    let responseText = "";

    if (provider === 'gemini') {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: message,
        config: { systemInstruction: systemPrompt }
      });
      responseText = response.text || "";
    } else if (provider === 'groq') {
      const groq = new Groq({ apiKey });
      const response = await groq.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        model: "llama3-70b-8192",
      });
      responseText = response.choices[0]?.message?.content || "";
    } else {
      return res.status(400).json({ error: "Unsupported provider" });
    }

    return res.status(200).json({ response: responseText });
  } catch (err: any) {
    console.error("Chat API Error:", err);
    return res.status(500).json({ error: "AI Processing Error", details: err.message });
  }
}

