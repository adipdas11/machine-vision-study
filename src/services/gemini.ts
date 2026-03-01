import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

export function getGenAI() {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set");
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
}

const CACHE_PREFIX = 'gemini_image_cache_';

export async function generateDiagram(prompt: string): Promise<string> {
  // 1. Check LocalStorage Cache
  const cacheKey = CACHE_PREFIX + btoa(prompt).slice(0, 32); // Simple hash key
  const cachedImage = localStorage.getItem(cacheKey);
  if (cachedImage) {
    return cachedImage;
  }

  const ai = getGenAI();
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `Generate a clear, educational, technical diagram or illustration for a machine vision presentation. 
            Style: Clean, modern, scientific, white background, high contrast.
            Subject: ${prompt}`,
          },
        ],
      },
    });

    // Extract image from response
    for (const candidate of response.candidates || []) {
      for (const part of candidate.content?.parts || []) {
        if (part.inlineData && part.inlineData.mimeType.startsWith('image/')) {
           const imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
           
           // 2. Save to LocalStorage Cache
           try {
             localStorage.setItem(cacheKey, imageUrl);
           } catch (e) {
             console.warn("Failed to cache image to localStorage (quota exceeded?)", e);
           }
           
           return imageUrl;
        }
      }
    }
    
    throw new Error("No image generated in response");
  } catch (error) {
    console.error("Image generation failed:", error);
    throw error;
  }
}
