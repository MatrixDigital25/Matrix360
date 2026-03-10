import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export interface StrategicSignal {
  title: string;
  category: 'Opportunity Signals' | 'Risk Alerts' | 'Market Shifts' | 'Technology Disruptions';
  source: 'market news' | 'technology trends' | 'regulatory updates' | 'industry reports';
  content: string;
  recommendation: string;
  severity: 'Low' | 'Medium' | 'High';
}

export async function detectMarketSignals(industry: string, region: string): Promise<StrategicSignal[]> {
  if (!ai) {
    console.error("Gemini API key not found");
    return [];
  }

  const prompt = `Act as a Strategic Intelligence Engine for the Matrix360 Strategic Intelligence Operating System.
  Detect recent market signals and strategic risks for the ${industry} industry in the ${region} region.
  
  Ingest information from:
  - market news
  - technology trends
  - regulatory updates
  - industry reports
  
  Analyze and categorize each signal into:
  - Opportunity Signals
  - Risk Alerts
  - Market Shifts
  - Technology Disruptions
  
  For each signal, provide:
  1. A concise title
  2. The specific category
  3. The primary source type
  4. Detailed content/analysis of the signal
  5. An "Action Recommendation" suggesting a possible strategic response
  6. Severity level (Low, Medium, High)
  
  Focus on high-impact, recent events (last 30-90 days).`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              category: { 
                type: Type.STRING,
                enum: ['Opportunity Signals', 'Risk Alerts', 'Market Shifts', 'Technology Disruptions']
              },
              source: { 
                type: Type.STRING,
                enum: ['market news', 'technology trends', 'regulatory updates', 'industry reports']
              },
              content: { type: Type.STRING },
              recommendation: { type: Type.STRING },
              severity: { 
                type: Type.STRING,
                enum: ['Low', 'Medium', 'High']
              }
            },
            required: ['title', 'category', 'source', 'content', 'recommendation', 'severity']
          }
        }
      },
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text);
  } catch (error) {
    console.error("Error detecting market signals:", error);
    return [];
  }
}
