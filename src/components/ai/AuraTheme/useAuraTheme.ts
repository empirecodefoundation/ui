import { useState } from 'react';
import { generateTheme } from '../../../lib/gemini';

// Theme type definition
export type AuraThemeData = {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  pattern: string; // pattern name or URL
};

// Hook return type
interface AuraThemeHook {
  theme: AuraThemeData | null;
  loading: boolean;
  error: string | null;
  fetchTheme: (prompt: string) => Promise<AuraThemeData | null>;
  fetchGeminiTheme: (prompt: string) => Promise<AuraThemeData | null>;
  fetchPredefinedTheme: (themeName: string) => AuraThemeData | null;
  fetchRealGeminiTheme: (prompt: string) => Promise<AuraThemeData | null>;
  updateCustomColors: (colors: Partial<AuraThemeData>) => void;
  updateCustomPattern: (pattern: string) => void;
}

// Predefined themes
const predefinedThemes: Record<string, AuraThemeData> = {
  'dark': {
    primary: '#1e1e2f',
    secondary: '#23243a',
    background: '#181818',
    text: '#ffffff',
    pattern: 'dark-waves',
  },
  'summer': {
    primary: '#ffb347',
    secondary: '#ffcc33',
    background: '#fff5e6',
    text: '#2c3e50',
    pattern: 'sunny-stripes',
  },
  'neon': {
    primary: '#39ff14',
    secondary: '#00e0ff',
    background: '#181818',
    text: '#ffffff',
    pattern: 'neon-grid',
  },
  'default': {
    primary: '#6c63ff',
    secondary: '#48c6ef',
    background: '#f0f4f8',
    text: '#22223b',
    pattern: 'soft-dots',
  },
};

/**
 * Custom hook to fetch/generate an adaptive theme based on a prompt.
 * Integrates Gemini AI for theme generation and provides predefined themes.
 */
export const useAuraTheme = (): AuraThemeHook => {
  const [theme, setTheme] = useState<AuraThemeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTheme = async (prompt: string): Promise<AuraThemeData | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/aura-theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) throw new Error('Failed to fetch theme');
      const data = await response.json();
      setTheme(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchGeminiTheme = async (prompt: string): Promise<AuraThemeData | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/aura-theme/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) throw new Error('Failed to fetch Gemini theme');
      const data = await response.json();
      setTheme(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchPredefinedTheme = (themeName: string): AuraThemeData | null => {
    setLoading(true);
    setError(null);
    try {
      let themeData: AuraThemeData;
      switch (themeName) {
        case 'dark':
          themeData = {
            primary: '#1e1e2f',
            secondary: '#3a3a5d',
            background: '#181824',
            text: '#f5f6fa',
            pattern: 'dark-waves',
          };
          break;
        case 'summer':
          themeData = {
            primary: '#ffb347',
            secondary: '#ffcc33',
            background: '#fffbe7',
            text: '#2d2d2d',
            pattern: 'sunny-stripes',
          };
          break;
        default:
          throw new Error('Invalid theme name');
      }
      setTheme(themeData);
      return themeData;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchRealGeminiTheme = async (prompt: string): Promise<AuraThemeData | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateTheme(prompt);
      setTheme(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Error fetching Gemini theme:', errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateCustomColors = (colors: Partial<AuraThemeData>) => {
    setTheme(prev => prev ? { ...prev, ...colors } : null);
  };

  const updateCustomPattern = (pattern: string) => {
    setTheme(prev => prev ? { ...prev, pattern } : null);
  };

  return {
    theme,
    loading,
    error,
    fetchTheme,
    fetchGeminiTheme,
    fetchPredefinedTheme,
    fetchRealGeminiTheme,
    updateCustomColors,
    updateCustomPattern,
  };
};

