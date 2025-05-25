import React, { useState, useEffect } from 'react';
import { useAuraTheme } from './useAuraTheme';
import { SketchPicker } from 'react-color';

/**
 * AuraTheme React component
 * Dynamically generates and previews an adaptive theme based on user prompt.
 * Integrates Gemini AI and predefined themes.
 */
const patternPreviews: Record<string, React.CSSProperties> = {
  'dark-waves': {
    background: 'repeating-linear-gradient(135deg, #23243a 0 10px, #1e1e2f 10px 20px)',
  },
  'sunny-stripes': {
    background: 'repeating-linear-gradient(90deg, #ffcc33 0 20px, #ffb347 20px 40px)',
  },
  'neon-grid': {
    background: 'linear-gradient(135deg, #181818 0%, #181818 100%), repeating-linear-gradient(0deg, #39ff14 0 2px, transparent 2px 40px), repeating-linear-gradient(90deg, #00e0ff 0 2px, transparent 2px 40px)',
  },
  'soft-dots': {
    background: 'radial-gradient(circle, #48c6ef 2px, transparent 2px), #f0f4f8',
    backgroundSize: '20px 20px',
  },
  'gemini-pattern': {
    background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)',
  },
};

type ThemeMode = 'ai' | 'custom' | 'predefined';

export const AuraTheme: React.FC = () => {
  const { theme, loading, error, fetchTheme, fetchGeminiTheme, fetchPredefinedTheme, fetchRealGeminiTheme, updateCustomColors, updateCustomPattern } = useAuraTheme();
  const [prompt, setPrompt] = useState('');
  const [themeMode, setThemeMode] = useState<ThemeMode>('ai');
  const [customColors, setCustomColors] = useState({
    primary: '#6c63ff',
    secondary: '#48c6ef',
    background: '#f0f4f8',
    text: '#22223b',
  });
  const [customPattern, setCustomPattern] = useState<string | null>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [tempColors, setTempColors] = useState(customColors);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Apply theme to the page
  useEffect(() => {
    if (theme) {
      document.documentElement.style.setProperty('--primary-color', theme.primary);
      document.documentElement.style.setProperty('--secondary-color', theme.secondary);
      document.documentElement.style.setProperty('--background-color', theme.background);
      document.documentElement.style.setProperty('--text-color', theme.text);
      document.documentElement.style.setProperty('--pattern', patternPreviews[theme.pattern]?.background || 'none');
    }
  }, [theme]);

  // Handle prompt submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (themeMode === 'ai') {
      const aiTheme = await fetchRealGeminiTheme(prompt);
      if (aiTheme) {
        setCustomColors(aiTheme);
        setTempColors(aiTheme);
      }
    } else if (themeMode === 'custom') {
      setShowColorPicker(true);
    }
  };

  // Handle Gemini AI theme generation
  const handleGeminiTheme = async () => {
    setThemeMode('ai');
    try {
      const aiTheme = await fetchRealGeminiTheme(prompt);
      if (aiTheme) {
        // Apply the AI-generated theme colors
        setCustomColors(aiTheme);
        setTempColors(aiTheme);
        updateCustomColors(aiTheme);
      }
    } catch (err) {
      console.error('Failed to generate theme with Gemini:', err);
    }
  };

  // Handle predefined theme selection
  const handlePredefinedTheme = (themeName: string) => {
    setThemeMode('predefined');
    const predefinedTheme = fetchPredefinedTheme(themeName);
    if (predefinedTheme) {
      setCustomColors(predefinedTheme);
      setTempColors(predefinedTheme);
    }
  };

  // Handle custom theme selection
  const handleCustomTheme = () => {
    setThemeMode('custom');
    setShowColorPicker(true);
  };

  // Handle color change
  const handleColorChange = (color: any, key: string) => {
    setTempColors(prev => ({ ...prev, [key]: color.hex }));
  };

  // Handle pattern upload
  const handlePatternUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const patternUrl = URL.createObjectURL(e.target.files[0]);
      setCustomPattern(patternUrl);
      updateCustomPattern(patternUrl);
    }
  };

  // Handle close color picker
  const handleCloseColorPicker = () => {
    setShowColorPicker(false);
    setTempColors(customColors); // Reset temp colors to current theme
  };

  // Handle apply colors
  const handleApplyColors = () => {
    setCustomColors(tempColors);
    updateCustomColors(tempColors);
    setShowColorPicker(false);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowColorPicker(false);
    setTempColors(customColors);
  };

  return (
    <>
      {/* Floating Theme Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 50,
          height: 50,
          borderRadius: '50%',
          background: theme?.primary || '#6c63ff',
          color: theme?.text || '#fff',
          border: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
          zIndex: 1000,
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        title="Customize Theme"
      >
        🎨
      </button>

      {/* Theme Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1001,
        }}>
          <div style={{
            maxWidth: 480,
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto',
            margin: '2rem auto',
            padding: '2rem',
            borderRadius: 16,
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            background: theme?.background || '#fff',
            color: theme?.text || '#222',
            fontFamily: 'Inter, sans-serif',
            transition: 'background 0.4s, color 0.4s',
            position: 'relative',
          }}>
            {/* Close Modal Button */}
            <button
              onClick={handleCloseModal}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'none',
                border: 'none',
                fontSize: 24,
                cursor: 'pointer',
                color: theme?.text || '#222',
                padding: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                width: 32,
                height: 32,
                transition: 'background-color 0.2s',
              }}
              title="Close"
            >
              ×
            </button>

            <h2 style={{ marginBottom: 8, fontWeight: 700 }}>Theme Customization</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
              <input
                type="text"
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Enter a theme prompt (e.g. 'summer vibes')"
                style={{
                  flex: 1,
                  padding: '0.5rem 1rem',
                  borderRadius: 8,
                  border: '1px solid #ccc',
                  fontSize: 16,
                }}
              />
              <button
                type="submit"
                style={{
                  background: theme?.primary || '#6c63ff',
                  color: theme?.text || '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '0.5rem 1.2rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: 16,
                  transition: 'background 0.3s',
                }}
                disabled={loading}
              >
                {loading ? 'Generating...' : 'Generate'}
              </button>
            </form>

            <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
              <button
                onClick={handleGeminiTheme}
                style={{
                  background: theme?.secondary || '#4ecdc4',
                  color: theme?.text || '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '0.5rem 1.2rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: 16,
                  transition: 'background 0.3s',
                }}
                disabled={loading}
              >
                Generate with Gemini AI
              </button>
              <button
                onClick={handleCustomTheme}
                style={{
                  background: theme?.secondary || '#4ecdc4',
                  color: theme?.text || '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '0.5rem 1.2rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: 16,
                  transition: 'background 0.3s',
                }}
                disabled={loading}
              >
                Customize Theme
              </button>
              <button
                onClick={() => handlePredefinedTheme('dark')}
                style={{
                  background: theme?.primary || '#1e1e2f',
                  color: theme?.text || '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '0.5rem 1.2rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: 16,
                  transition: 'background 0.3s',
                }}
                disabled={loading}
              >
                Dark Theme
              </button>
              <button
                onClick={() => handlePredefinedTheme('summer')}
                style={{
                  background: theme?.primary || '#ffb347',
                  color: theme?.text || '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '0.5rem 1.2rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: 16,
                  transition: 'background 0.3s',
                }}
                disabled={loading}
              >
                Summer Theme
              </button>
            </div>

            {showColorPicker && (
              <div style={{
                position: 'relative',
                marginBottom: 24,
                padding: '1.5rem',
                borderRadius: 12,
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
              }}>
                <h3 style={{ marginBottom: 16, paddingRight: 24 }}>Customize Colors</h3>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: 4 }}>Primary</label>
                    <SketchPicker
                      color={tempColors.primary}
                      onChange={color => handleColorChange(color, 'primary')}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: 4 }}>Secondary</label>
                    <SketchPicker
                      color={tempColors.secondary}
                      onChange={color => handleColorChange(color, 'secondary')}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: 4 }}>Background</label>
                    <SketchPicker
                      color={tempColors.background}
                      onChange={color => handleColorChange(color, 'background')}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: 4 }}>Text</label>
                    <SketchPicker
                      color={tempColors.text}
                      onChange={color => handleColorChange(color, 'text')}
                    />
                  </div>
                </div>
                <div style={{ marginTop: 24 }}>
                  <h3 style={{ marginBottom: 8 }}>Upload Pattern</h3>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePatternUpload}
                    style={{ display: 'block' }}
                  />
                </div>
                <div style={{ 
                  marginTop: 24, 
                  display: 'flex', 
                  gap: 12, 
                  justifyContent: 'flex-end' 
                }}>
                  <button
                    onClick={handleCloseColorPicker}
                    style={{
                      padding: '0.5rem 1.2rem',
                      borderRadius: 8,
                      border: '1px solid #ccc',
                      background: 'transparent',
                      cursor: 'pointer',
                      fontSize: 14,
                      fontWeight: 600,
                      transition: 'all 0.2s',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleApplyColors}
                    style={{
                      padding: '0.5rem 1.2rem',
                      borderRadius: 8,
                      border: 'none',
                      background: tempColors.primary,
                      color: '#fff',
                      cursor: 'pointer',
                      fontSize: 14,
                      fontWeight: 600,
                      transition: 'all 0.2s',
                    }}
                  >
                    Apply Colors
                  </button>
                </div>
              </div>
            )}

            {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
            
            {theme && (
              <div>
                <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                  {(['primary', 'secondary', 'background', 'text'] as const).map(key => (
                    <div key={key} style={{ textAlign: 'center' }}>
                      <div style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: (theme as any)[key],
                        border: '1.5px solid #ddd',
                        margin: '0 auto 4px',
                      }} />
                      <div style={{ fontSize: 12, color: '#888' }}>{key}</div>
                    </div>
                  ))}
                </div>
                <div style={{
                  ...patternPreviews[theme.pattern] || {},
                  borderRadius: 12,
                  height: 56,
                  marginBottom: 20,
                  border: '1.5px solid #e0e0e0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  color: theme.text,
                  background: patternPreviews[theme.pattern]?.background || '#f0f4f8',
                }}>
                  Pattern: <span style={{ fontWeight: 600, marginLeft: 6 }}>{theme.pattern}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AuraTheme;
