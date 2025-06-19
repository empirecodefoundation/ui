"use client";

import React from "react";
import { MinecartLCD } from "@/lib/fonts";
import { cn } from "@/lib/utils";

interface ResponsiveWrapperProps {
  children: React.ReactNode;
}

export const ResponsiveWrapper = ({ children }: ResponsiveWrapperProps) => {
  return (
    <>
      {/* Mobile/Small Screen Message - Hidden on screens >= 1200px */}
      <div className="block xl:hidden min-h-screen bg-black flex flex-col items-center justify-center p-8 text-center">
        <div className="max-w-md mx-auto">
          <h1 className={cn("text-white text-4xl font-bold mb-6 leading-tight", MinecartLCD.className)}>
            Ahh bro pls get a laptop to code
          </h1>
          <p className={cn("text-gray-300 text-lg mb-8", MinecartLCD.className)}>
            This website is optimized for desktop experience. Please access it from a device with at least 1450px screen width for the best experience.
          </p>
          <div className={cn("text-gray-400 text-sm", MinecartLCD.className)}>
            Current screen: &lt; 1280px<br />
            Required: ≥ 1280px (Desktop)
          </div>
        </div>
      </div>

      {/* Main Content - Hidden on small screens, visible and scaled on larger screens */}
      <div className="hidden xl:block">
        <div 
          className="
            scale-100 xl:scale-100
            base:scale-105
            scale-1.1:scale-110
            scale-1.2:scale-[1.15]
            scale-1.3:scale-[1.2]
            scale-1.4:scale-[1.25]
            scale-1.5:scale-[1.3]
            scale-1.6:scale-[1.35]
            scale-1.7:scale-[1.4]
            scale-1.8:scale-[1.45]
            scale-1.9:scale-[1.5]
            scale-2.0:scale-[1.6]
            transform-gpu origin-top
            min-h-screen
          "
          style={{
            transformOrigin: 'top center',
            width: '100vw',
            minHeight: '100vh'
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}; 