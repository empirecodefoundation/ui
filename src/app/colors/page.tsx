"use client";

import React from "react";
import { Navbar } from "@/components/common/navbar";
import { EmpireFooter } from "@/components/common/empire-footer";
import { MinecartLCD } from "@/lib/fonts";
import { cn } from "@/lib/utils";

const colorPalettes = [
  // Modern Blue Shades
  { name: "Ocean Depths", colors: ["#0F172A", "#1E293B", "#334155", "#475569", "#64748B", "#94A3B8"] },
  { name: "Sky Blue", colors: ["#0C4A6E", "#0369A1", "#0284C7", "#0EA5E9", "#38BDF8", "#7DD3FC"] },
  { name: "Royal Blue", colors: ["#1E1B4B", "#312E81", "#3730A3", "#4338CA", "#6366F1", "#8B5CF6"] },
  
  // Green Palettes
  { name: "Forest Green", colors: ["#14532D", "#166534", "#15803D", "#16A34A", "#22C55E", "#4ADE80"] },
  { name: "Emerald", colors: ["#064E3B", "#065F46", "#047857", "#059669", "#10B981", "#34D399"] },
  { name: "Lime Green", colors: ["#365314", "#3F6212", "#4D7C0F", "#65A30D", "#84CC16", "#A3E635"] },
  
  // Purple Shades
  { name: "Deep Purple", colors: ["#581C87", "#6B21A8", "#7C2D12", "#8B5CF6", "#A855F7", "#C084FC"] },
  { name: "Lavender", colors: ["#4C1D95", "#5B21B6", "#6D28D9", "#7C3AED", "#8B5CF6", "#A78BFA"] },
  { name: "Violet", colors: ["#3B0764", "#4C1D95", "#5B21B6", "#6D28D9", "#7C3AED", "#8B5CF6"] },
  
  // Red Palettes
  { name: "Crimson", colors: ["#7F1D1D", "#991B1B", "#B91C1C", "#DC2626", "#EF4444", "#F87171"] },
  { name: "Rose", colors: ["#881337", "#9F1239", "#BE123C", "#E11D48", "#F43F5E", "#FB7185"] },
  { name: "Pink", colors: ["#831843", "#9D174D", "#BE185D", "#DB2777", "#EC4899", "#F472B6"] },
  
  // Orange Palettes
  { name: "Sunset", colors: ["#9A3412", "#C2410C", "#DC2626", "#EA580C", "#F97316", "#FB923C"] },
  { name: "Amber", colors: ["#78350F", "#92400E", "#B45309", "#D97706", "#F59E0B", "#FBBF24"] },
  { name: "Yellow", colors: ["#713F12", "#854D0E", "#A16207", "#CA8A04", "#EAB308", "#FACC15"] },
  
  // Neutral Palettes
  { name: "Charcoal", colors: ["#0F0F0F", "#171717", "#262626", "#404040", "#525252", "#737373"] },
  { name: "Stone", colors: ["#1C1917", "#292524", "#44403C", "#57534E", "#78716C", "#A8A29E"] },
  { name: "Slate", colors: ["#0F172A", "#1E293B", "#334155", "#475569", "#64748B", "#94A3B8"] },
  
  // Teal & Cyan
  { name: "Teal", colors: ["#134E4A", "#115E59", "#0F766E", "#0D9488", "#14B8A6", "#2DD4BF"] },
  { name: "Cyan", colors: ["#164E63", "#155E75", "#0E7490", "#0891B2", "#06B6D4", "#22D3EE"] },
  { name: "Aqua", colors: ["#083344", "#0A4F5C", "#0E7490", "#0891B2", "#06B6D4", "#67E8F9"] },
  
  // Warm Palettes
  { name: "Terracotta", colors: ["#7C2D12", "#9A3412", "#C2410C", "#EA580C", "#F97316", "#FB923C"] },
  { name: "Copper", colors: ["#92400E", "#B45309", "#D97706", "#F59E0B", "#FBBF24", "#FDE047"] },
  { name: "Bronze", colors: ["#78350F", "#92400E", "#B45309", "#D97706", "#F59E0B", "#FBBF24"] },
  
  // Cool Palettes
  { name: "Arctic", colors: ["#1E293B", "#334155", "#475569", "#64748B", "#94A3B8", "#CBD5E1"] },
  { name: "Glacier", colors: ["#0C4A6E", "#0369A1", "#0284C7", "#0EA5E9", "#38BDF8", "#7DD3FC"] },
  { name: "Frost", colors: ["#0F172A", "#1E293B", "#334155", "#64748B", "#94A3B8", "#E2E8F0"] },
  
  // Vibrant Palettes
  { name: "Neon", colors: ["#1A1A2E", "#16213E", "#0F3460", "#E94560", "#F39C12", "#00D4AA"] },
  { name: "Electric", colors: ["#2D1B69", "#11998E", "#38EF7D", "#FF6B6B", "#FFE66D", "#FF6B9D"] },
  { name: "Cosmic", colors: ["#0F0F23", "#240046", "#3C096C", "#5A189A", "#7B2CBF", "#9D4EDD"] },
  { name: "Galaxy", colors: ["#03001C", "#301B3F", "#3E4C59", "#4B8F8C", "#53D8FB", "#9BF0E1"] }
];

export default function ColorsPage() {
  return (
    <div className="min-h-screen" style={{ marginTop: '-15px' }}>
      {/* Navigation */}
      <Navbar />
      
      {/* Particle Background - keeping the same as other pages */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-black">
          {/* Particle effect background */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className={cn("text-5xl font-bold text-white mb-4", MinecartLCD.className)}>
              Color Palettes
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our curated collection of 30 stunning color palettes. Each palette contains 6 harmonious colors 
              designed to elevate your design projects with perfect color harmony.
            </p>
          </div>

          {/* Color Palette Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {colorPalettes.map((palette, index) => (
              <div
                key={index}
                className="bg-black/50 backdrop-blur-sm border-2 border-white rounded-[40px] p-6 hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                {/* Palette Name */}
                <h3 className={cn("text-xl font-bold text-white text-center mb-4", MinecartLCD.className)}>
                  {palette.name}
                </h3>
                
                {/* Color Grid */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {palette.colors.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="aspect-square rounded-lg border border-white/20 hover:scale-110 transition-transform duration-200 cursor-pointer"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
                
                {/* Color Codes */}
                <div className="space-y-1">
                  {palette.colors.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="flex justify-between items-center text-xs text-gray-300 hover:text-white transition-colors"
                    >
                      <span className="font-mono">{color}</span>
                      <button
                        onClick={() => navigator.clipboard.writeText(color)}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <p className="text-lg text-gray-300 mb-6">
              Love these color palettes? Use them in your next project!
            </p>
            <button className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors">
              Download All Palettes
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <EmpireFooter />
    </div>
  );
} 