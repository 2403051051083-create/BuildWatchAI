import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

/**
 * Generate AI analysis text using Gemini
 * @param prompt - The prompt to send to Gemini
 * @returns Generated text response
 */
export async function generateAIAnalysis(prompt: string): Promise<string> {
  try {
    const result = await geminiModel.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to generate AI analysis");
  }
}

export default genAI;
