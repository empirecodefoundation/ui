'use client';

import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export default function ThemeGenerator() {
  const [prompt, setPrompt] = useState('');
  const [colors, setColors] = useState<ThemeColors | null>(null);
  const [loading, setLoading] = useState(false);

  const generateTheme = async () => {
    try {
      setLoading(true);
      
      // Initialize Gemini
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Create prompt for color generation
      const fullPrompt = `Generate a color theme based on this description: ${prompt}. 
        Return only a JSON object with these exact keys: primary, secondary, accent, background, text.
        Each value should be a hex color code.`;

      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();
      
      // Parse the response and update colors
      const themeColors = JSON.parse(text);
      setColors(themeColors);
      
      // Apply colors to CSS variables
      document.documentElement.style.setProperty('--primary-color', themeColors.primary);
      document.documentElement.style.setProperty('--secondary-color', themeColors.secondary);
      document.documentElement.style.setProperty('--accent-color', themeColors.accent);
      document.documentElement.style.setProperty('--background-color', themeColors.background);
      document.documentElement.style.setProperty('--text-color', themeColors.text);
      
    } catch (error) {
      console.error('Error generating theme:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="theme-generator">
      <div className="input-section">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your desired theme (e.g., 'A modern tech theme with dark blues and bright accents')"
          className="prompt-input"
        />
        <button 
          onClick={generateTheme}
          disabled={loading || !prompt}
          className="generate-button"
        >
          {loading ? 'Generating...' : 'Generate Theme'}
        </button>
      </div>

      {colors && (
        <div className="color-preview">
          <h3>Generated Theme</h3>
          <div className="color-grid">
            {Object.entries(colors).map(([key, value]) => (
              <div key={key} className="color-item">
                <div 
                  className="color-swatch" 
                  style={{ backgroundColor: value }}
                />
                <span className="color-name">{key}</span>
                <span className="color-value">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 