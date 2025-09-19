import { GoogleGenAI } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";

// Ensure the API key is available in the environment variables
const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.warn("Gemini API key not found. AI features will be disabled.");
}

export const generateServiceNotes = async (keywords: string): Promise<string> => {
  if (!ai) {
    return "AI service is unavailable. API key not configured.";
  }

  try {
    const prompt = `Based on the following keywords from a medical equipment service, generate a concise and professional service log note. The keywords are: "${keywords}". The note should be structured and clear for official records.`;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
       config: {
          temperature: 0.5,
          topP: 0.9,
          thinkingConfig: { thinkingBudget: 0 } 
       }
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating service notes:", error);
    return "Failed to generate AI notes. Please enter manually.";
  }
};