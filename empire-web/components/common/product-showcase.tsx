import React from 'react';
import { MinecartLCD } from "@/lib/fonts";
import { cn } from '@/lib/utils';
import Image from 'next/image';
import img1 from '@/images/img1.png';
import { AnimatedArrowDynamic } from '@/components/ui/animated-arrow';
import { Heart } from 'lucide-react';

export const ProductShowcase = () => {
  return (
    <div className="relative h-[85vh] mt-0">
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
                <h2 className={cn("text-white text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold leading-[5rem] tracking-wider", MinecartLCD.className)}>
                  <span className="hero-text-line-1" data-text="EXPERIENCE">EXPERIENCE</span><br />
                  <span className="hero-text-line-2 whitespace-nowrap" data-text="NEXT - GEN">NEXT - GEN</span><br />
                  <span className="hero-text-line-3" data-text="TECH TODAY">TECH TODAY</span>
                </h2>
              </div>
            </div>
            
            {/* Right side - Empty space for the image to show through */}
            <div className="w-full md:w-3/5"></div>
          </div>
          
          {/* Bottom section - specifications */}
          <div className="mt-auto flex justify-end pb-16 pr-8">
            {/* Right - Contributor Excellence */}
            <div className="text-right">
              <h3 className={cn("text-white text-xl md:text-2xl font-bold tracking-wide", MinecartLCD.className)}>
                CONTRIBUTOR<br />
                EXCELLENCE
              </h3>
              <div className="mt-2 space-y-1">
                <p className={cn("text-gray-300 text-sm", MinecartLCD.className)}>Elite Open Source Ecosystem</p>
                <p className={cn("text-gray-300 text-sm", MinecartLCD.className)}>Industry-Leading UI Framework</p>
                <p className={cn("text-gray-300 text-sm", MinecartLCD.className)}>Revolutionary Impact Potential</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contribute button positioned at bottom left */}
      <div className="absolute bottom-8 left-10 z-20">
        <a 
          href="https://github.com/empirecodefoundation/ui.git" 
          target="_blank" 
          rel="noopener noreferrer"
          className={cn("explore-button text-center inline-flex items-center hover:bg-white hover:text-black group", MinecartLCD.className)}
        >
          CONTRIBUTE
          <span className="flex-grow"></span>
          <Heart 
            size={22} 
            className="ml-2 group-hover:fill-red-500 group-hover:text-red-500 transition-colors duration-300"
          />
        </a>
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