import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export async function generateTheme(prompt: string) {
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured');
  }

  if (!prompt) {
    throw new Error('Prompt is required');
  }

  try {
    // Get the Gemini Pro model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Generate theme based on prompt
    const result = await model.generateContent(
      `Generate a color palette and pattern for: ${prompt}. 
      Consider the following:
      1. Primary color should be bold and attention-grabbing
      2. Secondary color should complement the primary color
      3. Background color should be subtle and not compete with content
      4. Text color should ensure good readability
      5. Pattern should enhance the overall theme without being distracting
      
      Return the response in JSON format with the following structure:
      {
        "primary": "hex color",
        "secondary": "hex color",
        "background": "hex color",
        "text": "hex color",
        "pattern": "pattern name"
      }`
    );
    const response = await result.response;
    const text = response.text();

    // Parse the response and extract theme data
    let themeData;
    try {
      themeData = JSON.parse(text);
    } catch (e) {
      // Fallback if JSON parsing fails
      themeData = {
        primary: '#ff6b6b',
        secondary: '#4ecdc4',
        background: '#f7f7f7',
        text: '#2d3436',
        pattern: 'gemini-pattern',
      };
    }

    return themeData;
  } catch (error) {
    console.error('Error generating theme:', error);
    throw new Error('Failed to generate theme');
  }
} 