import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getAgentInsights(kpis: any) {
  try {
    const prompt = `
      You are an expert Insurance Sales & Service Coach. 
      Analyze the following KPIs for an agent named Tanner Hatke (specializing in Home & Life Insurance) and provide 3 short, punchy, actionable insights to help him cross-sell, retain policyholders, or manage risk today.
      
      Current KPIs:
      - CSAT: ${kpis.csat}% (Goal: 95%)
      - Average Handle Time: ${kpis.aht}s (Goal: 320s)
      - First Call Resolution: ${kpis.fcr}% (Goal: 85%)
      - Quality Score: ${kpis.quality}% (Goal: 90%)
      
      Return the response as a JSON array of strings. Focus on insurance-specific scenarios (renewals, life triggers, property risk).
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Error fetching insights:", error);
    return [
      "Keep your energy high for the afternoon rush!",
      "Focus on summarizing key points at the end of calls to improve FCR.",
      "Your empathy scores are top-tier today—keep it up!"
    ];
  }
}
