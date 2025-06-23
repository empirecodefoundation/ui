"use client";
import React, { useState, useEffect } from 'react';
import { PageLayout } from "@/components/layout/page-layout";
import { MinecartLCD } from "@/lib/fonts";
import { cn } from '@/lib/utils';
import Image from 'next/image';

// Color palette data - 20 palettes with 6 colors each
const colorPalettes = [
  {
    id: 1,
    name: "Sunset Vibes",
    theme: "Warm & Energetic",
    colors: [
      { name: "Coral Sunset", hex: "#FF6B6B" },
      { name: "Golden Hour", hex: "#FFE66D" },
      { name: "Peachy Keen", hex: "#FF8E53" },
      { name: "Lavender Dusk", hex: "#C44569" },
      { name: "Deep Rose", hex: "#F8B500" },
      { name: "Crimson Fire", hex: "#DC143C" }
    ]
  },
  {
    id: 2,
    name: "Ocean Depths",
    theme: "Cool & Calming",
    colors: [
      { name: "Deep Sea", hex: "#0F3460" },
      { name: "Ocean Blue", hex: "#16537E" },
      { name: "Aqua Mint", hex: "#40E0D0" },
      { name: "Seafoam", hex: "#9FE2BF" },
      { name: "Coral Reef", hex: "#FF7F7F" },
      { name: "Pearl White", hex: "#F8F8FF" }
    ]
  },
  {
    id: 3,
    name: "Forest Escape",
    theme: "Natural & Earthy",
    colors: [
      { name: "Pine Green", hex: "#2D5016" },
      { name: "Moss Green", hex: "#8FBC8F" },
      { name: "Sage Green", hex: "#9CAF88" },
      { name: "Bark Brown", hex: "#8B4513" },
      { name: "Autumn Leaf", hex: "#DAA520" },
      { name: "Morning Mist", hex: "#F5F5DC" }
    ]
  },
  {
    id: 4,
    name: "Neon Dreams",
    theme: "Electric & Bold",
    colors: [
      { name: "Electric Blue", hex: "#0080FF" },
      { name: "Neon Pink", hex: "#FF1493" },
      { name: "Cyber Green", hex: "#00FF41" },
      { name: "Purple Haze", hex: "#8A2BE2" },
      { name: "Solar Yellow", hex: "#FFFF00" },
      { name: "Matrix Black", hex: "#0D1117" }
    ]
  },
  {
    id: 5,
    name: "Pastel Paradise",
    theme: "Soft & Dreamy",
    colors: [
      { name: "Baby Pink", hex: "#FFB6C1" },
      { name: "Soft Blue", hex: "#B0E0E6" },
      { name: "Mint Cream", hex: "#F0FFF0" },
      { name: "Lavender Mist", hex: "#E6E6FA" },
      { name: "Peach Puff", hex: "#FFDAB9" },
      { name: "Lemon Chiffon", hex: "#FFFACD" }
    ]
  },
  {
    id: 6,
    name: "Monochrome Elegance",
    theme: "Classic & Timeless",
    colors: [
      { name: "Pure Black", hex: "#000000" },
      { name: "Charcoal", hex: "#36454F" },
      { name: "Steel Gray", hex: "#71797E" },
      { name: "Silver", hex: "#C0C0C0" },
      { name: "Light Gray", hex: "#D3D3D3" },
      { name: "Pure White", hex: "#FFFFFF" }
    ]
  },
  {
    id: 7,
    name: "Tropical Breeze",
    theme: "Vibrant & Fresh",
    colors: [
      { name: "Tropical Blue", hex: "#00CED1" },
      { name: "Lime Green", hex: "#32CD32" },
      { name: "Mango Orange", hex: "#FFA500" },
      { name: "Hibiscus Red", hex: "#DC143C" },
      { name: "Coconut White", hex: "#FFFAF0" },
      { name: "Palm Green", hex: "#228B22" }
    ]
  },
  {
    id: 8,
    name: "Royal Luxury",
    theme: "Rich & Sophisticated",
    colors: [
      { name: "Royal Purple", hex: "#7851A9" },
      { name: "Gold Leaf", hex: "#FFD700" },
      { name: "Deep Burgundy", hex: "#800020" },
      { name: "Emerald Green", hex: "#50C878" },
      { name: "Sapphire Blue", hex: "#0F52BA" },
      { name: "Pearl Ivory", hex: "#FFFFF0" }
    ]
  },
  {
    id: 9,
    name: "Autumn Harvest",
    theme: "Warm & Cozy",
    colors: [
      { name: "Pumpkin Orange", hex: "#FF7518" },
      { name: "Maple Red", hex: "#A0522D" },
      { name: "Golden Wheat", hex: "#F5DEB3" },
      { name: "Chestnut Brown", hex: "#954535" },
      { name: "Cranberry", hex: "#9F2B68" },
      { name: "Cream White", hex: "#FFFDD0" }
    ]
  },
  {
    id: 10,
    name: "Winter Frost",
    theme: "Cool & Crisp",
    colors: [
      { name: "Ice Blue", hex: "#B0E0E6" },
      { name: "Frost White", hex: "#F0F8FF" },
      { name: "Silver Blue", hex: "#6495ED" },
      { name: "Arctic Gray", hex: "#708090" },
      { name: "Snow White", hex: "#FFFAFA" },
      { name: "Winter Navy", hex: "#2F4F4F" }
    ]
  },
  {
    id: 11,
    name: "Cyberpunk City",
    theme: "Futuristic & Dark",
    colors: [
      { name: "Neon Cyan", hex: "#00FFFF" },
      { name: "Hot Pink", hex: "#FF69B4" },
      { name: "Electric Purple", hex: "#BF00FF" },
      { name: "Acid Green", hex: "#B0FF00" },
      { name: "Chrome Silver", hex: "#C0C0C0" },
      { name: "Void Black", hex: "#000000" }
    ]
  },
  {
    id: 12,
    name: "Desert Mirage",
    theme: "Warm & Arid",
    colors: [
      { name: "Sand Dune", hex: "#C19A6B" },
      { name: "Cactus Green", hex: "#587E76" },
      { name: "Sunset Orange", hex: "#FF4500" },
      { name: "Terracotta", hex: "#E2725B" },
      { name: "Oasis Blue", hex: "#4682B4" },
      { name: "Bone White", hex: "#F9F6EE" }
    ]
  },
  {
    id: 13,
    name: "Spring Garden",
    theme: "Fresh & Blooming",
    colors: [
      { name: "Cherry Blossom", hex: "#FFB7C5" },
      { name: "Fresh Grass", hex: "#7CFC00" },
      { name: "Tulip Red", hex: "#FF6347" },
      { name: "Daffodil Yellow", hex: "#FFFF31" },
      { name: "Violet Bloom", hex: "#8A2BE2" },
      { name: "Morning Dew", hex: "#F0FFFF" }
    ]
  },
  {
    id: 14,
    name: "Vintage Retro",
    theme: "Nostalgic & Classic",
    colors: [
      { name: "Mustard Yellow", hex: "#FFDB58" },
      { name: "Burnt Orange", hex: "#CC5500" },
      { name: "Olive Green", hex: "#808000" },
      { name: "Rust Red", hex: "#B7410E" },
      { name: "Cream Beige", hex: "#F5F5DC" },
      { name: "Coffee Brown", hex: "#6F4E37" }
    ]
  },
  {
    id: 15,
    name: "Galaxy Explorer",
    theme: "Cosmic & Mysterious",
    colors: [
      { name: "Deep Space", hex: "#0B1426" },
      { name: "Nebula Purple", hex: "#663399" },
      { name: "Star White", hex: "#FFFFFF" },
      { name: "Cosmic Blue", hex: "#4169E1" },
      { name: "Plasma Pink", hex: "#FF1493" },
      { name: "Meteor Gray", hex: "#696969" }
    ]
  },
  {
    id: 16,
    name: "Candy Shop",
    theme: "Sweet & Playful",
    colors: [
      { name: "Bubblegum Pink", hex: "#FF69B4" },
      { name: "Cotton Candy", hex: "#FFBCD9" },
      { name: "Mint Green", hex: "#98FB98" },
      { name: "Lemon Drop", hex: "#FFFACD" },
      { name: "Grape Purple", hex: "#6A5ACD" },
      { name: "Vanilla Cream", hex: "#F3E5AB" }
    ]
  },
  {
    id: 17,
    name: "Urban Jungle",
    theme: "Modern & Industrial",
    colors: [
      { name: "Concrete Gray", hex: "#95A5A6" },
      { name: "Steel Blue", hex: "#4682B4" },
      { name: "Rust Orange", hex: "#B7410E" },
      { name: "Moss Green", hex: "#8FBC8F" },
      { name: "Brick Red", hex: "#CB4154" },
      { name: "Ash White", hex: "#F5F5F5" }
    ]
  },
  {
    id: 18,
    name: "Mediterranean",
    theme: "Coastal & Warm",
    colors: [
      { name: "Azure Blue", hex: "#007FFF" },
      { name: "Olive Branch", hex: "#9AB973" },
      { name: "Terracotta Pot", hex: "#E2725B" },
      { name: "Lemon Zest", hex: "#FFF700" },
      { name: "Lavender Field", hex: "#E6E6FA" },
      { name: "Sea Salt", hex: "#F8F8FF" }
    ]
  },
  {
    id: 19,
    name: "Northern Lights",
    theme: "Magical & Ethereal",
    colors: [
      { name: "Aurora Green", hex: "#00FF7F" },
      { name: "Polar Blue", hex: "#4682B4" },
      { name: "Magenta Glow", hex: "#FF00FF" },
      { name: "Arctic White", hex: "#F0F8FF" },
      { name: "Midnight Navy", hex: "#191970" },
      { name: "Electric Teal", hex: "#00CED1" }
    ]
  },
  {
    id: 20,
    name: "Coffee House",
    theme: "Warm & Inviting",
    colors: [
      { name: "Espresso Brown", hex: "#3C2415" },
      { name: "Caramel Latte", hex: "#AF6F09" },
      { name: "Cream Foam", hex: "#F5F5DC" },
      { name: "Cinnamon Spice", hex: "#D2691E" },
      { name: "Mocha Bean", hex: "#704214" },
      { name: "Vanilla Steam", hex: "#F3E5AB" }
    ]
  }
];

// Toast Notification Component
const ToastNotification = ({ message, isVisible, onClose }: { message: string, isVisible: boolean, onClose: () => void }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (isVisible) {
      // Capture current scroll position when notification shows
      setScrollPosition(window.scrollY);
      
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <div 
      className={cn(
        "absolute z-[60] transform transition-all duration-300 ease-in-out",
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}
      style={{
        position: 'absolute',
        top: `${scrollPosition + 24}px`,
        right: '24px',
        zIndex: 60
      }}
    >
      <div className="bg-green-500/90 backdrop-blur-sm border-4 border-dotted border-green-300 rounded-2xl px-6 py-4 shadow-lg" style={{borderSpacing: '6px'}}>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-green-300 rounded-full flex items-center justify-center">
            <span className="text-green-800 text-sm font-bold">✓</span>
          </div>
          <span className={cn("text-white font-bold text-sm", MinecartLCD.className)}>
            {message}
          </span>
        </div>
      </div>
    </div>
  );
};

// Custom Color Picker Component
const CustomColorPicker = ({ color, onChange, index }: { color: string, onChange: (color: string) => void, index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hexInput, setHexInput] = useState(color);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHexInput(value);
    
    // Validate hex color
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      onChange(value);
    }
  };

  const handleHexSubmit = () => {
    if (/^#[0-9A-F]{6}$/i.test(hexInput)) {
      onChange(hexInput);
    } else {
      setHexInput(color); // Reset to current color if invalid
    }
    setIsOpen(false);
  };

  useEffect(() => {
    setHexInput(color);
  }, [color]);

  return (
    <div className="relative">
      {/* Color Preview */}
      <div 
        className="w-full h-20 rounded-lg border-4 border-dotted border-white/30 cursor-pointer relative group transition-all duration-300 hover:border-white/50"
        style={{ backgroundColor: color, borderSpacing: '6px' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
          <span className={cn("text-white text-xs font-bold", MinecartLCD.className)}>Click to Edit</span>
        </div>
      </div>

      {/* Custom Dropdown */}
      <div className={cn(
        "absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-sm border-4 border-dotted border-white/40 rounded-lg p-4 z-10 transition-all duration-300 ease-in-out transform origin-top",
        isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"
      )} style={{borderSpacing: '6px'}}>
        
        {/* Native Color Picker */}
        <div className="mb-4">
          <label className={cn("block text-white text-xs font-bold mb-2", MinecartLCD.className)}>
            Pick Color
          </label>
          <input
            type="color"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-12 rounded border-4 border-dotted border-white/30 bg-transparent cursor-pointer transition-all duration-300 hover:border-white/50"
            style={{borderSpacing: '4px'}}
          />
        </div>

        {/* Hex Input */}
        <div className="mb-4">
          <label className={cn("block text-white text-xs font-bold mb-2", MinecartLCD.className)}>
            Hex Code
          </label>
          <input
            type="text"
            value={hexInput}
            onChange={handleHexChange}
            placeholder="#FF6B6B"
            className={cn("w-full px-3 py-2 bg-white/10 border-4 border-dotted border-white/30 rounded text-white text-sm font-mono focus:outline-none focus:border-white/50 transition-all duration-300", MinecartLCD.className)}
            style={{borderSpacing: '4px'}}
            onKeyPress={(e) => e.key === 'Enter' && handleHexSubmit()}
          />
        </div>

        {/* Quick Color Presets */}
        <div className="mb-4">
          <label className={cn("block text-white text-xs font-bold mb-2", MinecartLCD.className)}>
            Quick Colors
          </label>
          <div className="grid grid-cols-6 gap-2">
            {['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#FF69B4', '#00CED1', '#FFD700', '#9370DB', '#32CD32', '#FF4500'].map((presetColor) => (
              <button
                key={presetColor}
                className="w-8 h-8 rounded border-2 border-dotted border-white/30 hover:border-white/60 transition-all duration-200 hover:scale-110"
                style={{ backgroundColor: presetColor, borderSpacing: '3px' }}
                onClick={() => onChange(presetColor)}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleHexSubmit}
            className={cn("flex-1 py-2 px-3 bg-green-500/20 hover:bg-green-500/40 text-green-400 text-xs rounded border-4 border-dotted border-green-500/30 transition-all duration-300", MinecartLCD.className)}
            style={{borderSpacing: '4px'}}
          >
            Apply
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className={cn("flex-1 py-2 px-3 bg-gray-500/20 hover:bg-gray-500/40 text-gray-400 text-xs rounded border-4 border-dotted border-gray-500/30 transition-all duration-300", MinecartLCD.className)}
            style={{borderSpacing: '4px'}}
          >
            Close
          </button>
        </div>
      </div>

      {/* Hex Code Display */}
      <div className={cn("text-center text-white text-xs mt-2 font-mono", MinecartLCD.className)}>
        {color.toUpperCase()}
      </div>
    </div>
  );
};

// Color Palette Creator Component
const ColorPaletteCreator = ({ onCopySuccess }: { onCopySuccess: (message: string) => void }) => {
  const [customColors, setCustomColors] = useState<string[]>(['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F']);
  const [paletteName, setPaletteName] = useState('My Custom Palette');

  const handleColorChange = (index: number, color: string) => {
    const newColors = [...customColors];
    newColors[index] = color;
    setCustomColors(newColors);
  };

  const addColor = () => {
    if (customColors.length < 8) {
      setCustomColors([...customColors, '#000000']);
    }
  };

  const removeColor = (index: number) => {
    if (customColors.length > 1) {
      const newColors = customColors.filter((_, i) => i !== index);
      setCustomColors(newColors);
    }
  };

  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  };

  const randomizePalette = () => {
    const newColors = customColors.map(() => generateRandomColor());
    setCustomColors(newColors);
  };

  const copyPalette = () => {
    const paletteText = `${paletteName}: ${customColors.join(', ')}`;
    navigator.clipboard.writeText(paletteText);
    onCopySuccess('🎨 Custom palette copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      {/* Palette Name Input */}
      <div className="text-center">
        <input
          type="text"
          value={paletteName}
          onChange={(e) => setPaletteName(e.target.value)}
          className={cn("bg-white/10 border-4 border-dotted border-white/30 rounded-lg px-4 py-2 text-white text-center text-lg font-bold focus:outline-none focus:border-white/50", MinecartLCD.className)}
          placeholder="Enter palette name"
          style={{borderSpacing: '6px'}}
        />
      </div>

      {/* Color Editors */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {customColors.map((color, index) => (
          <div key={index} className="space-y-3">
            {/* Custom Color Picker */}
            <CustomColorPicker 
              color={color}
              onChange={(newColor) => handleColorChange(index, newColor)}
              index={index}
            />
            
            {/* Remove Button */}
            {customColors.length > 1 && (
              <button
                onClick={() => removeColor(index)}
                className={cn("w-full py-2 px-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 text-xs rounded border-4 border-dotted border-red-500/30 transition-all duration-300 font-bold", MinecartLCD.className)}
                style={{borderSpacing: '6px'}}
              >
                Remove Color
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        {customColors.length < 8 && (
          <button
            onClick={addColor}
            className={cn("px-6 py-2 bg-green-500/20 hover:bg-green-500/40 text-green-400 rounded-lg border-4 border-dotted border-green-500/30 transition-colors", MinecartLCD.className)}
            style={{borderSpacing: '6px'}}
          >
            Add Color
          </button>
        )}
        
        <button
          onClick={randomizePalette}
          className={cn("px-6 py-2 bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 rounded-lg border-4 border-dotted border-blue-500/30 transition-colors", MinecartLCD.className)}
          style={{borderSpacing: '6px'}}
        >
          Randomize
        </button>
        
        <button
          onClick={copyPalette}
          className={cn("px-6 py-2 bg-purple-500/20 hover:bg-purple-500/40 text-purple-400 rounded-lg border-4 border-dotted border-purple-500/30 transition-colors", MinecartLCD.className)}
          style={{borderSpacing: '6px'}}
        >
          Copy Palette
        </button>
      </div>

      {/* Preview Card */}
      <div className="bg-white/5 backdrop-blur-sm rounded-3xl border-4 border-dotted border-white/40 p-6" style={{borderSpacing: '8px'}}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center border-4 border-dotted border-white/30" style={{borderSpacing: '6px'}}>
              <div className="w-8 h-8 relative">
                {/* Dotted Cat Face Outline */}
                <div className="absolute inset-0">
                  {/* Cat head circle */}
                  <div className="w-full h-full border-4 border-dotted border-gray-600 rounded-full" style={{borderSpacing: '6px'}}></div>
                  {/* Cat ears */}
                  <div className="absolute -top-1 left-1 w-2 h-2 border-2 border-dotted border-gray-600 rounded-full transform rotate-45" style={{borderSpacing: '4px'}}></div>
                  <div className="absolute -top-1 right-1 w-2 h-2 border-2 border-dotted border-gray-600 rounded-full transform rotate-45" style={{borderSpacing: '4px'}}></div>
                  {/* Cat eyes */}
                  <div className="absolute top-2 left-2 w-1 h-1 bg-gray-600 rounded-full"></div>
                  <div className="absolute top-2 right-2 w-1 h-1 bg-gray-600 rounded-full"></div>
                  {/* Cat nose */}
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 bg-gray-600 rounded-full"></div>
                  {/* Cat mouth */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-2 h-0.5 border-b-2 border-dotted border-gray-600 rounded-b-full" style={{borderSpacing: '4px'}}></div>
                </div>
              </div>
            </div>
            <div>
              <h3 className={cn("text-white text-lg font-bold", MinecartLCD.className)}>
                {paletteName}
              </h3>
              <p className={cn("text-gray-400 text-sm", MinecartLCD.className)}>Custom Creation</p>
            </div>
          </div>
          <div className={cn("text-gray-500 text-sm", MinecartLCD.className)}>Preview</div>
        </div>

        {/* Color Preview Grid */}
        <div className="grid grid-cols-2 gap-3">
          {customColors.slice(0, 6).map((color, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border-2 border-dotted border-white/20" style={{borderSpacing: '4px'}}>
              <div 
                className="w-10 h-10 rounded-full border-4 border-dotted border-white/30 flex-shrink-0 transition-all duration-300 hover:border-white/50"
                style={{ backgroundColor: color, borderSpacing: '6px' }}
              />
              <div className="flex-1 min-w-0">
                <div className={cn("text-white text-sm font-bold truncate", MinecartLCD.className)}>
                  Color {index + 1}
                </div>
                <div className={cn("text-gray-300 text-xs font-bold", MinecartLCD.className)}>
                  {color.toUpperCase()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Color Card Component
const ColorCard = ({ palette, onCopySuccess }: { palette: typeof colorPalettes[0], onCopySuccess: (message: string) => void }) => {
  const copyPalette = () => {
    const hexCodes = palette.colors.map(color => color.hex).join(', ');
    navigator.clipboard.writeText(hexCodes);
    onCopySuccess(`✨ "${palette.name}" palette copied to clipboard!`);
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-3xl border-4 border-dotted border-white/40 p-6 hover:bg-white/10 transition-all duration-300 group" style={{borderSpacing: '8px'}}>
      {/* Header with cat image */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center border-4 border-dotted border-white/30" style={{borderSpacing: '6px'}}>
            <div className="w-8 h-8 relative">
              {/* Dotted Cat Face Outline */}
              <div className="absolute inset-0">
                {/* Cat head circle */}
                <div className="w-full h-full border-4 border-dotted border-gray-600 rounded-full" style={{borderSpacing: '6px'}}></div>
                {/* Cat ears */}
                <div className="absolute -top-1 left-1 w-2 h-2 border-2 border-dotted border-gray-600 rounded-full transform rotate-45" style={{borderSpacing: '4px'}}></div>
                <div className="absolute -top-1 right-1 w-2 h-2 border-2 border-dotted border-gray-600 rounded-full transform rotate-45" style={{borderSpacing: '4px'}}></div>
                {/* Cat eyes */}
                <div className="absolute top-2 left-2 w-1 h-1 bg-gray-600 rounded-full"></div>
                <div className="absolute top-2 right-2 w-1 h-1 bg-gray-600 rounded-full"></div>
                {/* Cat nose */}
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 bg-gray-600 rounded-full"></div>
                {/* Cat mouth */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-2 h-0.5 border-b-2 border-dotted border-gray-600 rounded-b-full" style={{borderSpacing: '4px'}}></div>
              </div>
            </div>
          </div>
          <div>
            <h3 className={cn("text-white text-lg font-bold", MinecartLCD.className)}>
              {palette.name}
            </h3>
            <p className={cn("text-gray-400 text-sm", MinecartLCD.className)}>{palette.theme}</p>
          </div>
        </div>
        <div className={cn("text-gray-500 text-sm", MinecartLCD.className)}>#{palette.id.toString().padStart(2, '0')}</div>
      </div>

      {/* Color Grid */}
      <div className="grid grid-cols-2 gap-3">
        {palette.colors.map((color, index) => (
          <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200">
            {/* Color Preview Circle */}
            <div 
              className="w-8 h-8 rounded-full border-4 border-dotted border-white/30 flex-shrink-0"
              style={{ backgroundColor: color.hex, borderSpacing: '6px' }}
            />
            
            {/* Color Info */}
            <div className="flex-1 min-w-0">
              <div className={cn("text-white text-sm font-medium truncate", MinecartLCD.className)}>
                {color.name}
              </div>
              <div className={cn("text-gray-400 text-xs font-mono", MinecartLCD.className)}>
                {color.hex}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Copy All Button */}
      <button 
        onClick={copyPalette}
        className={cn("w-full mt-4 py-2 px-4 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-colors duration-200 border-4 border-dotted border-white/30", MinecartLCD.className)}
        style={{borderSpacing: '6px'}}
      >
        Copy Palette
      </button>
    </div>
  );
};

const ColorsPage = () => {
  const [showCustomCreator, setShowCustomCreator] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleCopySuccess = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsMinimized(true);
    }
  };

  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (showCustomCreator) {
      document.body.style.overflow = 'hidden';
      // Scroll to top when overlay opens
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showCustomCreator]);

  return (
    <PageLayout>
      <div className="min-h-screen py-8">
        {/* Toast Notification */}
        <ToastNotification 
          message={toastMessage}
          isVisible={showToast}
          onClose={handleCloseToast}
        />

        {/* Header Section */}
        <div className="w-[1450px] max-w-[95%] mx-auto mb-12">
          <div className="text-center">
            <h1 className={cn("text-white text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6", MinecartLCD.className)}>
              Color Palettes
            </h1>
            <p className={cn("text-gray-300 text-xl mb-8", MinecartLCD.className)}>
              Curated color combinations for your next project
            </p>
            <div className="flex items-center justify-center gap-6">
              <div className="h-px bg-dotted w-64" style={{ 
                backgroundImage: 'radial-gradient(circle, white 3px, transparent 3px)', 
                backgroundSize: '12px 6px',
                backgroundRepeat: 'repeat-x',
                height: '6px'
              }}></div>
              <span className={cn("text-gray-400 text-lg", MinecartLCD.className)}>
                20 Unique Palettes
              </span>
              <div className="h-px bg-dotted w-64" style={{ 
                backgroundImage: 'radial-gradient(circle, white 3px, transparent 3px)', 
                backgroundSize: '12px 6px',
                backgroundRepeat: 'repeat-x',
                height: '6px'
              }}></div>
            </div>
          </div>
        </div>

        {/* Color Palette Grid */}
        <div className="w-[1450px] max-w-[95%] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {colorPalettes.map((palette) => (
              <ColorCard key={palette.id} palette={palette} onCopySuccess={handleCopySuccess} />
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="w-[1450px] max-w-[95%] mx-auto mt-16 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border-4 border-dotted border-white/30 p-8" style={{borderSpacing: '6px'}}>
            <h3 className={cn("text-white text-2xl font-bold mb-4", MinecartLCD.className)}>
              How to Use These Palettes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div>
                <div className={cn("text-white text-lg font-bold mb-2", MinecartLCD.className)}>🎨 Copy Colors</div>
                <p className={cn("text-gray-300 text-sm", MinecartLCD.className)}>
                  Click on any color or use the "Copy Palette" button to get hex codes for your projects.
                </p>
              </div>
              <div>
                <div className={cn("text-white text-lg font-bold mb-2", MinecartLCD.className)}>🖌️ Mix & Match</div>
                <p className={cn("text-gray-300 text-sm", MinecartLCD.className)}>
                  Combine colors from different palettes to create your own unique color schemes.
                </p>
              </div>
              <div>
                <div className={cn("text-white text-lg font-bold mb-2", MinecartLCD.className)}>✨ Get Inspired</div>
                <p className={cn("text-gray-300 text-sm", MinecartLCD.className)}>
                  Each palette is themed to inspire different moods and styles for your designs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Create Your Own Color Palette Section */}
        <div className="w-[1450px] max-w-[95%] mx-auto mt-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border-4 border-dotted border-white/40 p-8" style={{borderSpacing: '8px'}}>
            <h3 className={cn("text-white text-2xl font-bold mb-6 text-center", MinecartLCD.className)}>
              Create Your Own Color Palette
            </h3>
            <p className={cn("text-gray-300 text-lg mb-8 text-center", MinecartLCD.className)}>
              Mix and match colors to generate your custom palette with complete creative freedom. 
              Click below to open the advanced color palette creator with full customization options.
            </p>
            
            <div className="text-center">
              <button
                onClick={() => setShowCustomCreator(true)}
                className={cn("px-8 py-4 bg-white/10 hover:bg-white/20 rounded-lg text-white text-lg font-bold transition-colors duration-200 border-4 border-dotted border-white/30 hover:border-white/50", MinecartLCD.className)}
                style={{borderSpacing: '6px'}}
              >
                Create Custom Palette
              </button>
            </div>
          </div>
        </div>

        {/* Custom Palette Creator Overlay */}
        {showCustomCreator && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 p-4 overflow-y-auto"
            onClick={handleOverlayClick}
          >
            <div className="min-h-screen flex items-start justify-center pt-8 pb-8">
              <div className={cn(
                "bg-black/90 backdrop-blur-sm rounded-2xl border-4 border-dotted border-white/40 w-full max-w-6xl transition-all duration-300",
                isMinimized ? "h-16" : "h-auto"
              )} style={{borderSpacing: '8px'}}>
                {/* Header with controls */}
                <div className="flex items-center justify-between p-4 border-b-4 border-dotted border-white/30" style={{borderSpacing: '6px'}}>
                  <h3 className={cn("text-white text-xl font-bold", MinecartLCD.className)}>
                    Custom Palette Creator
                  </h3>
                  <div className="flex items-center gap-2">
                    {/* Minimize Button */}
                    <button
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="w-8 h-8 bg-yellow-500/20 hover:bg-yellow-500/40 rounded border-4 border-dotted border-yellow-500/30 flex items-center justify-center text-yellow-400 transition-colors"
                      style={{borderSpacing: '4px'}}
                    >
                      <span className={cn("text-lg font-bold", MinecartLCD.className)}>−</span>
                    </button>
                    {/* Close Button */}
                    <button
                      onClick={() => {
                        setShowCustomCreator(false);
                        setIsMinimized(false);
                      }}
                      className="w-8 h-8 bg-red-500/20 hover:bg-red-500/40 rounded border-4 border-dotted border-red-500/30 flex items-center justify-center text-red-400 transition-colors"
                      style={{borderSpacing: '4px'}}
                    >
                      <span className={cn("text-lg font-bold", MinecartLCD.className)}>×</span>
                    </button>
                  </div>
                </div>
                
                {/* Content */}
                {!isMinimized && (
                  <div className="p-6">
                    <ColorPaletteCreator onCopySuccess={handleCopySuccess} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default ColorsPage; 