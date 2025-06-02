import React from 'react';
import { MinecartLCD } from "@/lib/fonts";
import { cn } from '@/lib/utils';
import Image from 'next/image';
import img1 from '@/images/img1.png';

export const ProductShowcase = () => {
  return (
    <div className="relative h-full mt-2">
      {/* Main content card with notch */}
      <div className="product-card flex flex-col h-full relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={img1}
            alt="Radio Device" 
            fill
            className="object-cover opacity-90"
            style={{ objectPosition: 'center 40%' }}
            priority
          />
        </div>
        
        {/* Content overlay */}
        <div className="relative z-10 p-10 flex flex-col h-full pt-24">
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
          
          {/* Bottom section - split into two */}
          <div className="mt-auto flex flex-col md:flex-row justify-between">
            {/* Left - Empty space for the button below */}
            <div className="md:w-1/3">
            </div>
            
            {/* Right - Device Specifications */}
            <div className="md:w-1/3 md:text-right mt-4 md:mt-0">
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
      
      {/* Explore Segments button positioned at bottom left */}
      <div className="absolute bottom-[10%] left-10 z-20">
        <a href="#" className="explore-button text-center">
          EXPLORE SEGMENTS
        </a>
      </div>
      
      {/* Empire UI title - using the class from globals.css instead of inline styles */}
      <div className="empire-ui-title">
        <h1 className={cn("text-white text-2xl font-extrabold tracking-wide", MinecartLCD.className)}>
          Empire UI
        </h1>
      </div>
    </div>
  );
}; 