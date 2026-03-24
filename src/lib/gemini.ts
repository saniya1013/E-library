import { GoogleGenAI, Type } from "@google/genai";
import { Book } from "../types";

// Helper to get the AI instance
function getAI() {
  // Try GEMINI_API_KEY first (standard for free models), then API_KEY (standard for selected keys)
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  return new GoogleGenAI({ apiKey: apiKey || "" });
}

export async function getBookRecommendations(
  userPreferences: string[],
  favorites: Book[],
  allBooks: Book[],
  searchHistory: string[] = [],
  readingHistory: string[] = []
): Promise<{ bookId: string; reason: string }[]> {
  const ai = getAI();
  // Using gemini-3.1-flash-lite-preview as it's the latest flash lite model
  const model = "gemini-3.1-flash-lite-preview";
  
  const prompt = `
    You are a professional librarian and AI recommendation engine for "Lumina Lib".
    Based on the user's favorite books, their preferred genres, their recent search history, and their reading history, recommend 3 books from the provided catalog.
    
    User Preferences (Genres): ${userPreferences.join(", ")}
    User Favorites: ${favorites.map(b => b.title).join(", ")}
    Recent Search History: ${searchHistory.join(", ")}
    Reading History (Titles): ${allBooks.filter(b => readingHistory.includes(b.id)).map(b => b.title).join(", ")}
    
    Catalog:
    ${allBooks.map(b => `ID: ${b.id}, Title: ${b.title}, Author: ${b.author}, Genre: ${b.genre.join(", ")}, Description: ${b.description}`).join("\n")}
    
    Return a JSON array of objects with "bookId" and "reason" (a short, compelling reason why they would like it, mentioning how it relates to their favorites, preferences, search history, or reading history).
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              bookId: { type: Type.STRING },
              reason: { type: Type.STRING }
            },
            required: ["bookId", "reason"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error: any) {
    console.error("Error getting recommendations:", error);
    if (error?.message?.includes("403") || error?.message?.includes("PERMISSION_DENIED")) {
      console.warn("Permission denied. This might be due to an invalid or restricted API key. Please ensure you have selected a valid API key if required.");
    }
    return [];
  }
}

export async function getBookInsights(book: Book): Promise<string> {
  const ai = getAI();
  const model = "gemini-3.1-flash-lite-preview";
  const prompt = `Provide a brief, poetic insight or a "why read this" summary for the book "${book.title}" by ${book.author}. Keep it under 100 words.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt
    });
    return response.text || "No insights available.";
  } catch (error: any) {
    console.error("Error getting book insights:", error);
    return "Error fetching insights.";
  }
}
