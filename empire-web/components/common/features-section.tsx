"use client";
import React, { useEffect, useRef, useState } from 'react';
import { MinecartLCD } from "@/lib/fonts";
import { cn } from '@/lib/utils';
import Image from 'next/image';
import img4 from '@/images/img4.png';
import { AnimatedArrowDynamic } from '@/components/ui/animated-arrow';
import Balatro from '@/components/ui/Balatro';

export const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const fallbackImageRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      
      const startOffset = windowHeight;
      const endOffset = -sectionHeight;
      const totalDistance = startOffset - endOffset;
      const currentPosition = rect.top;
      
      let progress = (startOffset - currentPosition) / totalDistance;
      progress = Math.max(0, Math.min(1, progress));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden mt-16"
    >
      {/* Content Container - Pulled up to start closer to previous section */}
      <div className="w-[1450px] max-w-[95%] mx-auto mt-4">
        <div 
          className="relative w-full h-[660px] rounded-[50px] overflow-hidden bg-black group border-2 border-white"
        >
          
          {/* Balatro Background Effect */}
          <div className="absolute inset-0 z-0 overflow-hidden" style={{ borderRadius: '50px' }}>
            <Balatro
              isRotate={true}
              spinSpeed={3}
              mouseInteraction={false}
              pixelFilter={700}
            />
          </div>

          {/* Fallback Image - For browsers that don't support WebGL */}
          <div 
            ref={fallbackImageRef}
            className="absolute inset-0 z-0"
            style={{ display: 'none' }}
          >
            <Image 
              src={img4}
              alt="Features Device" 
              fill
              className="object-cover" 
              style={{ objectPosition: 'center center' }}
              priority
            />
          </div>

          {/* Features Title - Moved up as requested */}
          <div className="absolute top-[8%] left-[5%] z-20 max-w-[40%]">
            <h1 className={cn("text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight", MinecartLCD.className)}>
              Features
            </h1>
            <p className={cn("text-gray-300 text-lg leading-relaxed mt-3", MinecartLCD.className)}>
              Packed With Power. Engineered For Tomorrow.
            </p>
          </div>

          {/* GET UPDATES Button - Same horizontal level as Features title but higher */}
          <div className="absolute top-[6%] right-[3%] z-20">
            <p className={cn("text-gray-400 text-sm mb-4 text-right", MinecartLCD.className)}>
              More Information
            </p>
            <a href="#" className={cn("explore-button group hover:bg-white hover:text-black", MinecartLCD.className)}>
              GET UPDATES
              <span className="flex-grow"></span>
              <AnimatedArrowDynamic 
                size={22} 
                strokeWidth={2.5}
                className="animated-arrow ml-2 group-hover:rotate-45 transition-transform duration-300"
              />
            </a>
          </div>

          {/* Main Description - Moved up */}
          <div className="absolute top-[35%] left-[5%] z-20 max-w-[50%]">
            <p className={cn("text-gray-300 text-base md:text-lg leading-relaxed", MinecartLCD.className)}>
              Empire UI Components Blend Sleek Industrial Design With 
              Cutting-Edge Technology To Deliver Powerful Functionality 
              In Every Detail. From Ultra-Fast Integration And Best Looking 
              UI Components, Every Feature Is Designed To Elevate Your 
              Experience And Keep You One Step Ahead Of The Entire 
              Industry.
            </p>
          </div>

          {/* Feature List - Moved to bottom right corner, floating */}
          <div className="absolute bottom-[15%] right-[5%] z-20 max-w-[40%]">
            <div className="space-y-5">
              {/* Feature 1 */}
              <div className="border-b border-gray-600 pb-3">
                <h3 className={cn("text-white text-lg md:text-xl font-bold", MinecartLCD.className)}>
                  ULTRA-FAST ADDITIONS ⚡
                </h3>
              </div>

              {/* Feature 2 */}
              <div className="border-b border-gray-600 pb-3">
                <h3 className={cn("text-white text-lg md:text-xl font-bold", MinecartLCD.className)}>
                  LONG-LASTING UI UPDATES 🔋
                </h3>
              </div>

              {/* Feature 3 */}
              <div className="border-b border-gray-600 pb-3">
                <h3 className={cn("text-white text-lg md:text-xl font-bold", MinecartLCD.className)}>
                  REGULAR UPDATED UI COMPONENTS 🔒
                </h3>
              </div>

              {/* Feature 4 */}
              <div>
                <h3 className={cn("text-white text-lg md:text-xl font-bold", MinecartLCD.className)}>
                  SEAMLESS CONNECTIVITY 🌐
                </h3>
              </div>
            </div>
          </div>

          {/* WATCH DEMO Button - Bottom left corner */}
          <div className="absolute bottom-[8%] left-[5%] z-20">
            <p className={cn("text-gray-400 text-sm mb-4", MinecartLCD.className)}>
              SEE IT IN ACTION
            </p>
            <a href="#" className={cn("explore-button bg-transparent border-2 border-white text-white hover:bg-white hover:text-black group", MinecartLCD.className)}>
              WATCH DEMO
              <span className="flex-grow"></span>
              <AnimatedArrowDynamic 
                size={22} 
                strokeWidth={2.5}
                className="animated-arrow ml-2 group-hover:rotate-45 transition-transform duration-300"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}; 