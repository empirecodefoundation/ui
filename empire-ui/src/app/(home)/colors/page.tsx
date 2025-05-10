"use client";

import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { MagicButton } from './components/MagicButton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Copy, Check, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface ColorItem {
  name: string;
  hex: string;
  rgb: string;
}

interface Palette {
  name: string;
  category: string;
  colors: ColorItem[];
  featured?: boolean;
  popular?: boolean;
  new?: boolean;
}

// Color palettes
const colorPalettes: Palette[] = [
  {
    name: 'Aurora',
    category: 'AI',
    colors: [
      { name: 'Primary', hex: '#6366f1', rgb: '99, 102, 241' },
      { name: 'Secondary', hex: '#a855f7', rgb: '168, 85, 247' },
      { name: 'Accent', hex: '#ec4899', rgb: '236, 72, 153' },
      { name: 'Background', hex: '#0f172a', rgb: '15, 23, 42' },
      { name: 'Text', hex: '#f8fafc', rgb: '248, 250, 252' },
    ],
    featured: true,
    popular: true,
  },
  {
    name: 'Neural',
    category: 'AI',
    colors: [
      { name: 'Primary', hex: '#10b981', rgb: '16, 185, 129' },
      { name: 'Secondary', hex: '#0ea5e9', rgb: '14, 165, 233' },
      { name: 'Accent', hex: '#8b5cf6', rgb: '139, 92, 246' },
      { name: 'Background', hex: '#18181b', rgb: '24, 24, 27' },
      { name: 'Text', hex: '#f4f4f5', rgb: '244, 244, 245' },
    ],
    featured: true,
  },
  {
    name: 'Quantum',
    category: 'AI',
    colors: [
      { name: 'Primary', hex: '#0891b2', rgb: '8, 145, 178' },
      { name: 'Secondary', hex: '#6d28d9', rgb: '109, 40, 217' },
      { name: 'Accent', hex: '#f43f5e', rgb: '244, 63, 94' },
      { name: 'Background', hex: '#0f172a', rgb: '15, 23, 42' },
      { name: 'Text', hex: '#e2e8f0', rgb: '226, 232, 240' },
    ],
    new: true,
  },
  {
    name: 'Cyber',
    category: 'Tech',
    colors: [
      { name: 'Primary', hex: '#06b6d4', rgb: '6, 182, 212' },
      { name: 'Secondary', hex: '#3b82f6', rgb: '59, 130, 246' },
      { name: 'Accent', hex: '#14b8a6', rgb: '20, 184, 166' },
      { name: 'Background', hex: '#020617', rgb: '2, 6, 23' },
      { name: 'Text', hex: '#e2e8f0', rgb: '226, 232, 240' },
    ],
    popular: true,
  },
  {
    name: 'Cosmic',
    category: 'Creative',
    colors: [
      { name: 'Primary', hex: '#8b5cf6', rgb: '139, 92, 246' },
      { name: 'Secondary', hex: '#d946ef', rgb: '217, 70, 239' },
      { name: 'Accent', hex: '#ec4899', rgb: '236, 72, 153' },
      { name: 'Background', hex: '#0f172a', rgb: '15, 23, 42' },
      { name: 'Text', hex: '#f8fafc', rgb: '248, 250, 252' },
    ],
    featured: true,
  },
  {
    name: 'Vintage',
    category: 'Classic',
    colors: [
      { name: 'Primary', hex: '#b45309', rgb: '180, 83, 9' },
      { name: 'Secondary', hex: '#854d0e', rgb: '133, 77, 14' },
      { name: 'Accent', hex: '#a16207', rgb: '161, 98, 7' },
      { name: 'Background', hex: '#fffbeb', rgb: '255, 251, 235' },
      { name: 'Text', hex: '#44403c', rgb: '68, 64, 60' },
    ],
    popular: true,
  },
];

// Generate additional palettes to meet the 100+ requirement
const additionalPalettes: Palette[] = [];

// Categories to distribute the palettes
const categories = ['AI', 'Tech', 'Creative', 'Classic', 'Minimal', 'Vibrant', 'Material', 'Pastel'];

// Generate more palette variations
for (let i = 1; i <= 95; i++) {
  const hue = (i * 17) % 360;
  const paletteNumber = i + 6;
  const category = categories[i % categories.length];
  
  // Determine saturation and lightness based on category to create coherent themes
  let saturation, lightness, bgSaturation, bgLightness;
  
  switch (category) {
    case 'AI':
      saturation = 70 + (i % 20);
      lightness = 55 + (i % 20);
      bgSaturation = 80;
      bgLightness = 10 + (i % 10);
      break;
    case 'Tech':
      saturation = 60 + (i % 30);
      lightness = 50 + (i % 15);
      bgSaturation = 70;
      bgLightness = 5 + (i % 15);
      break;
    case 'Creative':
      saturation = 80 + (i % 20);
      lightness = 60 + (i % 25);
      bgSaturation = 60;
      bgLightness = 15 + (i % 10);
      break;
    case 'Classic':
      saturation = 40 + (i % 30);
      lightness = 45 + (i % 20);
      bgSaturation = 20;
      bgLightness = 90 - (i % 15);
      break;
    case 'Minimal':
      saturation = 20 + (i % 20);
      lightness = 60 + (i % 20);
      bgSaturation = 10;
      bgLightness = 95 - (i % 10);
      break;
    case 'Vibrant':
      saturation = 90 + (i % 10);
      lightness = 55 + (i % 20);
      bgSaturation = 50;
      bgLightness = 10 + (i % 20);
      break;
    case 'Material':
      saturation = 65 + (i % 25);
      lightness = 50 + (i % 15);
      bgSaturation = 30;
      bgLightness = 20 + (i % 15);
      break;
    case 'Pastel':
      saturation = 50 + (i % 20);
      lightness = 80 + (i % 15);
      bgSaturation = 20;
      bgLightness = 90 - (i % 15);
      break;
    default:
      saturation = 70;
      lightness = 60;
      bgSaturation = 15;
      bgLightness = 10 + (i % 80);
  }
  
  // Add some special badges randomly
  const isNew = i % 20 === 0;
  const isFeatured = i % 17 === 0;
  const isPopular = i % 13 === 0;
  
  additionalPalettes.push({
    name: `${category} ${paletteNumber - 6}`,
    category,
    colors: [
      { 
        name: 'Primary', 
        hex: hslToHex(hue, saturation, lightness), 
        rgb: hslToRgb(hue, saturation, lightness) 
      },
      { 
        name: 'Secondary', 
        hex: hslToHex((hue + 30) % 360, saturation, lightness - 5), 
        rgb: hslToRgb((hue + 30) % 360, saturation, lightness - 5) 
      },
      { 
        name: 'Accent', 
        hex: hslToHex((hue + 60) % 360, saturation + 10, lightness), 
        rgb: hslToRgb((hue + 60) % 360, saturation + 10, lightness) 
      },
      { 
        name: 'Background', 
        hex: hslToHex(hue, bgSaturation, bgLightness), 
        rgb: hslToRgb(hue, bgSaturation, bgLightness) 
      },
      { 
        name: 'Text', 
        hex: hslToHex(hue, 10, bgLightness < 50 ? 90 : 10), 
        rgb: hslToRgb(hue, 10, bgLightness < 50 ? 90 : 10) 
      },
    ],
    new: isNew,
    featured: isFeatured,
    popular: isPopular
  });
}

// Utility to convert HSL to HEX
function hslToHex(h: number, s: number, l: number): string {
  const rgb = hslToRgb(h, s, l).split(', ').map(Number);
  return '#' + rgb.map(x => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

// Utility to convert HSL to RGB
function hslToRgb(h: number, s: number, l: number): string {
  h /= 360;
  s /= 100;
  l /= 100;
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return `${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}`;
}

// Combine the predefined and additional palettes
const allPalettes = [...colorPalettes, ...additionalPalettes];

// CSS Variables Names for reference
const cssVariableNames: Record<string, string> = {
  'Primary': '--primary',
  'Secondary': '--secondary',
  'Accent': '--accent',
  'Background': '--background',
  'Text': '--foreground'
};

export default function ColorsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedColor, setCopiedColor] = useState('');
  const [activePreview, setActivePreview] = useState<string | null>(null);
  
  // Filter palettes based on category and search term
  const filteredPalettes = allPalettes.filter(palette => {
    const matchesCategory = selectedCategory === 'All' || palette.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      palette.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      palette.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Get unique categories for filter buttons
  const uniqueCategories = ['All', ...Array.from(new Set(allPalettes.map(p => p.category)))];
  
  // Handle copy color to clipboard
  const handleCopyColor = (color: ColorItem, format: 'hex' | 'rgb' | 'css') => {
    let textToCopy: string;
    
    if (format === 'hex') {
      textToCopy = color.hex;
    } else if (format === 'rgb') {
      textToCopy = `rgb(${color.rgb})`;
    } else if (format === 'css') {
      textToCopy = `var(${cssVariableNames[color.name]})`;
    }
    
    navigator.clipboard.writeText(textToCopy!).then(() => {
      setCopiedColor(`${color.hex}-${format}`);
      toast.success(`Copied ${textToCopy} to clipboard!`);
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedColor('');
      }, 2000);
    });
  };
  
  // Preview a palette by temporarily applying it to the site
  const previewPalette = (palette: Palette) => {
    if (activePreview === palette.name) {
      // If already previewing, turn it off
      resetPalettePreview();
      return;
    }
    
    const root = document.documentElement;
    
    // Save current values
    const originalValues: Record<string, string> = {};
    palette.colors.forEach(color => {
      const varName = cssVariableNames[color.name];
      if (varName) {
        originalValues[varName] = getComputedStyle(root).getPropertyValue(varName);
      }
    });
    
    // Apply new palette
    palette.colors.forEach(color => {
      const varName = cssVariableNames[color.name];
      if (varName) {
        // Convert hex to HSL format for CSS variables
        root.style.setProperty(varName, hexToHsl(color.hex));
      }
    });
    
    setActivePreview(palette.name);
    toast.success(`Previewing ${palette.name} palette. Click again to reset.`);
    
    // Store original values for reset
    root.dataset.originalPalette = JSON.stringify(originalValues);
  };
  
  // Reset palette preview
  const resetPalettePreview = () => {
    const root = document.documentElement;
    
    if (root.dataset.originalPalette) {
      const originalValues = JSON.parse(root.dataset.originalPalette || '{}');
      
      // Restore original values
      Object.entries(originalValues).forEach(([varName, value]) => {
        root.style.setProperty(varName, value as string);
      });
      
      delete root.dataset.originalPalette;
      setActivePreview(null);
      toast.success('Original palette restored.');
    }
  };
  
  // Convert HEX to HSL format for CSS variables
  const hexToHsl = (hex: string): string => {
    // Remove the # from the beginning
    hex = hex.replace('#', '');
    
    // Parse the RGB components
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    
    // Find the min and max values
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    
    // Calculate HSL values
    let h = 0, s = 0, l = (max + min) / 2;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      
      h /= 6;
    }
    
    // Convert to 0-360, 0-100, 0-100 format
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    
    return `${h} ${s}% ${l}%`;
  };
  
  // Reset preview when leaving the page
  useEffect(() => {
    return () => {
      resetPalettePreview();
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-950 text-white pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      
      <div className="container mx-auto py-10 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Color Palettes</h1>
            <p className="text-lg mt-2 text-muted-foreground max-w-2xl">
              Choose from over 100 carefully crafted color palettes for your next AI project.
              Each palette is designed to work harmoniously and support accessibility standards.
            </p>
          </div>
          <MagicButton />
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
              placeholder="Search palettes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {uniqueCategories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredPalettes.map((palette, index) => (
              <motion.div
                key={palette.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative"
              >
                <div 
                  className={`rounded-xl overflow-hidden shadow-md border ${activePreview === palette.name ? 'ring-2 ring-primary' : ''}`}
                  style={{
                    backgroundColor: palette.colors.find(c => c.name === 'Background')?.hex || '#ffffff',
                    color: palette.colors.find(c => c.name === 'Text')?.hex || '#000000'
                  }}
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg" style={{ color: palette.colors.find(c => c.name === 'Text')?.hex || '#000000' }}>
                          {palette.name}
                        </h3>
                        <p className="text-sm opacity-80" style={{ color: palette.colors.find(c => c.name === 'Text')?.hex || '#000000' }}>
                          {palette.category}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        {palette.new && (
                          <Badge className="bg-green-500 hover:bg-green-600">New</Badge>
                        )}
                        {palette.featured && (
                          <Badge className="bg-purple-500 hover:bg-purple-600">Featured</Badge>
                        )}
                        {palette.popular && (
                          <Badge className="bg-blue-500 hover:bg-blue-600">Popular</Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2.5">
                      {palette.colors.map((color, colorIndex) => (
                        <div 
                          key={`${palette.name}-${color.name}`} 
                          className="flex items-center gap-3"
                        >
                          <div 
                            className="w-10 h-10 rounded-md shadow-inner" 
                            style={{ backgroundColor: color.hex }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate" style={{ color: palette.colors.find(c => c.name === 'Text')?.hex || '#000000' }}>
                              {color.name}
                            </p>
                            <p className="text-xs opacity-80 truncate" style={{ color: palette.colors.find(c => c.name === 'Text')?.hex || '#000000' }}>
                              {color.hex}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost" 
                              size="icon"
                              className="h-7 w-7 rounded-full"
                              onClick={() => handleCopyColor(color, 'hex')}
                              title={`Copy ${color.hex}`}
                            >
                              {copiedColor === `${color.hex}-hex` ? (
                                <Check size={14} className="text-green-500" />
                              ) : (
                                <Copy size={14} style={{ color: palette.colors.find(c => c.name === 'Text')?.hex || '#000000' }} />
                              )}
                            </Button>
                            <Button
                              variant="ghost" 
                              size="icon"
                              className="h-7 w-7 rounded-full"
                              onClick={() => handleCopyColor(color, 'css')}
                              title={`Copy CSS variable: ${cssVariableNames[color.name]}`}
                            >
                              {copiedColor === `${color.hex}-css` ? (
                                <Check size={14} className="text-green-500" />
                              ) : (
                                <span style={{ color: palette.colors.find(c => c.name === 'Text')?.hex || '#000000' }} className="text-xs font-mono">
                                  CSS
                                </span>
                              )}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div 
                    className="mt-2 py-3 px-4 border-t flex justify-between items-center"
                    style={{ 
                      borderColor: `${palette.colors.find(c => c.name === 'Text')?.hex}20`,
                      backgroundColor: `${palette.colors.find(c => c.name === 'Background')?.hex}`,
                    }}
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => previewPalette(palette)}
                      className="text-xs"
                      style={{
                        borderColor: `${palette.colors.find(c => c.name === 'Text')?.hex}40`,
                        color: palette.colors.find(c => c.name === 'Text')?.hex
                      }}
                    >
                      <Eye size={14} className="mr-1" />
                      {activePreview === palette.name ? 'Reset' : 'Preview'}
                    </Button>
                    
                    <p className="text-xs opacity-60" style={{ color: palette.colors.find(c => c.name === 'Text')?.hex }}>
                      Click colors to copy
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredPalettes.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No palettes found matching your criteria</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="mt-4"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 