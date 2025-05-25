// Remove the unused import since we're using fetch directly
// import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  console.error('Gemini API key is missing. Please add VITE_GEMINI_API_KEY to your .env file');
}

function cleanJSONResponse(text: string): string {
  return text.trim().replace(/^```json\s*|\s*```$/g, '');
}

export async function generateTheme(prompt: string) {
  if (!apiKey) {
    throw new Error('Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file');
  }

  if (!prompt) {
    throw new Error('Prompt is required');
  }

  try {
    const requestPrompt = `Generate a color palette and pattern for: ${prompt}. 
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
      }`;

    console.log('=== Gemini API Request ===');
    console.log('API Key:', apiKey ? 'Present' : 'Missing');
    console.log('Model:', 'gemini-2.0-flash');
    console.log('Prompt:', requestPrompt);
    console.log('========================');

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: requestPrompt
                }
              ]
            }
          ]
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to generate theme');
    }

    const data = await response.json();
    console.log('=== Gemini API Response ===');
    console.log('Response:', data);
    console.log('==========================');

    // Extract the text from the response
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error('No text in response');
    }

    console.log('Raw response text:', text);

    // Parse the response and extract theme data
    let themeData;
    try {
      const cleanedText = cleanJSONResponse(text);
      console.log('Cleaned response text:', cleanedText);
      themeData = JSON.parse(cleanedText);
      console.log('Parsed Theme Data:', themeData);
    } catch (e) {
      console.error('Failed to parse JSON response:', e);
      console.error('Raw response that failed to parse:', text);
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
    console.error('=== Gemini API Error ===');
    console.error('Error Type:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('Error Message:', error instanceof Error ? error.message : String(error));
    if (error instanceof Error && 'cause' in error) {
      console.error('Error Cause:', error.cause);
    }
    console.error('========================');
    throw new Error('Failed to generate theme. Please check your API key and try again.');
  }
} 