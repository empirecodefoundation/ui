import React from 'react';
import { MinecartLCD } from "@/lib/fonts";
import { cn } from '@/lib/utils';
import Image from 'next/image';
import img1 from '@/images/img1.png';

export const ProductShowcase = () => {
  return (
    <div className="product-card flex flex-col h-full relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={img1}
          alt="Radio Device" 
          fill
          className="object-cover opacity-90"
          priority
        />
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 p-8 flex flex-col h-full">
        {/* Logo/Title */}
        <div className="mb-3">
          <h1 className={cn("text-white text-2xl tracking-wide", MinecartLCD.className)}>Empire UI</h1>
        </div>
        
        {/* Main content */}
        <div className="flex flex-col md:flex-row flex-1">
          {/* Left side - Hero text */}
          <div className="w-full md:w-2/5 flex flex-col justify-center">
            <div className="mb-4">
              <h2 className={cn("text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-wider", MinecartLCD.className)}>
                EXPERIENCE<br />
                NEXT-GEN<br />
                TECH TODAY
              </h2>
            </div>
          </div>
          
          {/* Right side - Empty space for the image to show through */}
          <div className="w-full md:w-3/5"></div>
        </div>
        
        {/* Bottom section - split into two */}
        <div className="mt-auto flex flex-col md:flex-row justify-between">
          {/* Left - Corex SignalHub */}
          <div className="md:w-1/3 bg-black bg-opacity-80 p-4 rounded-lg">
            <h3 className={cn("text-xl text-white font-bold tracking-wide", MinecartLCD.className)}>
              COREX SIGNALHUB
            </h3>
            <div className="flex justify-between items-center mt-2">
              <div>
                <p className={cn("text-gray-300 text-xs tracking-wide", MinecartLCD.className)}>
                  Best Aesthetics.<br />
                  Built For Exploration.
                </p>
              </div>
              <div className="bg-white rounded-full p-2">
                <div className="w-4 h-4 rounded-full border border-black"></div>
              </div>
            </div>
            <div className="mt-3">
              <a href="#" className={cn("button-primary py-1.5 px-3 text-xs", MinecartLCD.className)}>
                EXPLORE SEGMENTS
              </a>
            </div>
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
  );
}; 