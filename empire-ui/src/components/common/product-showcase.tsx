import React from 'react';
import { MinecartLCD } from "@/lib/fonts";
import { cn } from '@/lib/utils';
import Image from 'next/image';
import img1 from '@/images/img1.png';

export const ProductShowcase = () => {
  return (
    <div className="relative h-full mt-0">
      {/* Main content card with notch */}
      <div className="product-card flex flex-col h-full relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={img1}
            alt="Radio Device" 
            fill
            className="object-cover opacity-90"
            style={{ objectPosition: 'center 35%' }}
            priority
          />
        </div>
        
        {/* Content overlay */}
        <div className="relative z-10 p-10 flex flex-col h-full pt-16">
          {/* Main content */}
          <div className="flex flex-col md:flex-row flex-1">
            {/* Left side - Hero text */}
            <div className="w-full md:w-2/5 flex flex-col justify-center">
              <div className="mb-8">
                <h2 className={cn("text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-[2.5rem] tracking-wider", MinecartLCD.className)}>
                  <span className="hero-text-line-1" data-text="EXPERIENCE">EXPERIENCE</span><br />
                  <span className="hero-text-line-2" data-text="NEXT-GEN">NEXT-GEN</span><br />
                  <span className="hero-text-line-3" data-text="TECH TODAY">TECH TODAY</span>
                </h2>
              </div>
            </div>
            
            {/* Right side - Empty space for the image to show through */}
            <div className="w-full md:w-3/5"></div>
          </div>
          
          {/* Bottom section - specifications and button */}
          <div className="mt-auto flex flex-row justify-between items-end pb-10">
            {/* Left - Explore Segments button */}
            <div>
              <a href="#" className={cn("explore-button text-center", MinecartLCD.className)}>
                EXPLORE SEGMENTS
              </a>
            </div>
            
            {/* Right - Device Specifications */}
            <div className="text-right">
              <h3 className={cn("text-white text-2xl md:text-3xl font-bold tracking-wide", MinecartLCD.className)}>
                DEVICE<br />
                SPECIFICATIONS
              </h3>
              <div className="mt-2 space-y-1">
                <p className={cn("text-gray-300 text-sm md:text-base", MinecartLCD.className)}>5000mAh - Long Battery Life</p>
                <p className={cn("text-gray-300 text-sm md:text-base", MinecartLCD.className)}>AM/FM + Emergency Radio</p>
                <p className={cn("text-gray-300 text-sm md:text-base", MinecartLCD.className)}>Analog Tuning</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Empire UI title - using the class from globals.css instead of inline styles */}
      <div className="empire-ui-title">
        <h1 className={cn("text-white text-3xl font-black tracking-wide leading-none", MinecartLCD.className)}>
          Empire UI
        </h1>
      </div>
    </div>
  );
}; 