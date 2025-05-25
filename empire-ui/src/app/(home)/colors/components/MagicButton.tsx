import React, { useState } from 'react';
import toast from 'react-hot-toast';

export const MagicButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const fonts = [
    { name: 'Inter', value: 'font-sans' },
    { name: 'Roboto Mono', value: 'font-mono' },
    { name: 'Playfair Display', value: 'font-serif' },
    { name: 'Montserrat', value: 'font-montserrat' },
    { name: 'Poppins', value: 'font-poppins' }
  ];
  
  const themes = [
    { name: 'System Default', value: 'system' },
    { name: 'Light', value: 'light' },
    { name: 'Dark', value: 'dark' },
  ];
  
  const applyColorTheme = (theme: string) => {
    if (typeof document !== 'undefined') {
      const html = document.documentElement;
      
      if (theme === 'system') {
        html.classList.remove('dark', 'light');
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          html.classList.add('dark');
        } else {
          html.classList.add('light');
        }
      } else {
        html.classList.remove('dark', 'light');
        html.classList.add(theme);
      }
      
      localStorage.setItem('theme', theme);
      toast.success(`Applied ${theme} theme`);
    }
  };
  
  const applyFont = (font: string) => {
    if (typeof document !== 'undefined') {
      const body = document.body;
      
      // Remove all font classes
      fonts.forEach(f => body.classList.remove(f.value));
      
      // Add the selected font class
      body.classList.add(font);
      
      localStorage.setItem('font', font);
      toast.success(`Applied ${font.replace('font-', '')} font`);
    }
  };
  
  const testRandomPalette = () => {
    // Generate a random primary color hue
    const hue = Math.floor(Math.random() * 360);
    
    // Create a random palette
    const primary = hslToHex(hue, 70, 60);
    const secondary = hslToHex((hue + 30) % 360, 80, 65);
    const accent = hslToHex((hue + 60) % 360, 85, 70);
    const background = hslToHex(hue, 15, 10);
    const foreground = hslToHex(hue, 10, 95);
    
    // Apply this palette to CSS variables
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      
      root.style.setProperty('--primary', hexToHsl(primary));
      root.style.setProperty('--secondary', hexToHsl(secondary));
      root.style.setProperty('--accent', hexToHsl(accent));
      root.style.setProperty('--background', hexToHsl(background));
      root.style.setProperty('--foreground', hexToHsl(foreground));
      
      toast.success('Applied random color palette! Refresh to revert.');
    }
  };
  
  // Utility to convert HSL to HEX
  function hslToHex(h: number, s: number, l: number) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }
  
  // Utility to convert HEX to HSL string for CSS variables
  function hexToHsl(hex: string) {
    // Remove the # from the beginning
    hex = hex.replace('#', '');
    
    // Parse the hex values to RGB
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    
    // Find the min and max values to calculate the lightness
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    
    if (max === min) {
      // Achromatic case
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      
      h = h / 6;
    }
    
    // Convert to degrees and percentages
    h = Math.round((h || 0) * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    
    // Return HSL in the format CSS variables use
    return `${h} ${s}% ${l}%`;
  }
  
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-all"
      >
        <span className="font-semibold">✨ Magic Button</span>
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg shadow-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Magic Customizer</h2>
              <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-accent/10">
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Theme</h3>
                <div className="flex flex-wrap gap-2">
                  {themes.map((theme) => (
                    <button
                      key={theme.value}
                      onClick={() => applyColorTheme(theme.value)}
                      className="px-3 py-1.5 rounded-md bg-accent/10 hover:bg-accent/20"
                    >
                      {theme.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Fonts</h3>
                <div className="flex flex-wrap gap-2">
                  {fonts.map((font) => (
                    <button
                      key={font.value}
                      onClick={() => applyFont(font.value)}
                      className="px-3 py-1.5 rounded-md bg-accent/10 hover:bg-accent/20"
                    >
                      {font.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Random Palette</h3>
                <button
                  onClick={testRandomPalette}
                  className="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Generate Random Palette
                </button>
                <p className="text-xs text-muted-foreground mt-1">
                  This will temporarily change the site colors. Refresh to revert.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 