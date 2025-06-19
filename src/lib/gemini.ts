import { GoogleGenerativeAI } from '@google/generative-ai';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export async function generateTheme(prompt: string): Promise<ThemeColors> {
  try {
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const fullPrompt = `Generate a color theme based on this description: ${prompt}. 
      Return only a JSON object with these exact keys: primary, secondary, accent, background, text.
      Each value should be a hex color code.`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();
    
    return JSON.parse(text);
  } catch (error) {
    console.error('Error generating theme:', error);
    throw new Error('Failed to generate theme. Please try again.');
  }
} 