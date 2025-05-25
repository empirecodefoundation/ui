// Mock API route for trending themes
import type { AuraThemeData } from './useAuraTheme';
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Simulate a Gemini AI response
const fetchGeminiTheme = (prompt: string): AuraThemeData => {
  // Mock Gemini AI response
  return {
    primary: '#ff6b6b',
    secondary: '#4ecdc4',
    background: '#f7f7f7',
    text: '#2d3436',
    pattern: 'gemini-pattern',
  };
};

// Simulate a handler for a GET request with a prompt query
export async function GET(request: { query: { prompt: string } }) {
  const { prompt } = request.query;
  let theme: AuraThemeData;
  if (/dark|night|midnight/i.test(prompt)) {
    theme = {
      primary: '#1e1e2f',
      secondary: '#3a3a5d',
      background: '#181824',
      text: '#f5f6fa',
      pattern: 'dark-waves',
    };
  } else if (/summer|beach|sun/i.test(prompt)) {
    theme = {
      primary: '#ffb347',
      secondary: '#ffcc33',
      background: '#fffbe7',
      text: '#2d2d2d',
      pattern: 'sunny-stripes',
    };
  } else if (/neon|futuristic|cyber/i.test(prompt)) {
    theme = {
      primary: '#39ff14',
      secondary: '#00e0ff',
      background: '#181818',
      text: '#fff',
      pattern: 'neon-grid',
    };
  } else {
    theme = fetchGeminiTheme(prompt);
  }
  return {
    status: 200,
    body: theme,
  };
}

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

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
    let themeData: AuraThemeData;
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

    return NextResponse.json(themeData);
  } catch (error) {
    console.error('Error generating theme:', error);
    return NextResponse.json(
      { error: 'Failed to generate theme' },
      { status: 500 }
    );
  }
}

