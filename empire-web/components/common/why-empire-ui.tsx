"use client";
import React from 'react';
import { MinecartLCD } from "@/lib/fonts";
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { AnimatedArrowDynamic } from '@/components/ui/animated-arrow';
import BulgeText from '@/components/ui/bulge-text';
import ScrambledText from '@/components/ui/scrambled-text';
import Ballpit from '@/components/ui/Ballpit';
import img10 from '@/images/img10.png';

export const WhyEmpireUI = () => {
  return (
    <div className="relative py-16">
      {/* Content Container - Narrower with more margins */}
      <div className="w-[1350px] max-w-[95%] mx-auto"> 
        
        {/* Main Container with border - Larger size */}
        <div className="relative p-8 min-h-[800px]" style={{
          border: '12px dotted white',
          borderRadius: '0px'
        }}>
          
          {/* Ballpit Background Effect - Contained within dotted border */}
          <div className="absolute z-0" style={{
            position: 'absolute',
            overflow: 'hidden',
            minHeight: 'calc(800px - 40px)',
            maxHeight: 'calc(800px - 40px)',
            width: 'calc(100% - 24px)',
            top: '12px',
            left: '12px',
            right: '12px',
            bottom: '28px'
          }}>
            <Ballpit
              count={100}
              gravity={2.3}
              friction={0.8}
              wallBounce={1}
              followCursor={true}
            />
          </div>
          
          {/* Top Section - Empire UI Heading */}
          <div className="mb-8 relative z-30">
            <h1 className={cn("text-white text-6xl md:text-7xl font-bold leading-tight", MinecartLCD.className)}>
              Why Empire UI
            </h1>
          </div>
          
          {/* Subtext Section with Scrambled Text Effect - Higher z-index */}
          <div className="mb-16 relative z-30">
            <ScrambledText
              className={cn("text-white text-xl leading-relaxed max-w-4xl", MinecartLCD.className)}
              radius={100}
              duration={1.2}
              speed={0.5}
              scrambleChars=".:"
            >
              At Empire UI, We Don't Just Build Tech — We Craft Experiences. Every 
              Device Is Engineered With Precision, Purpose, And A Deep Understanding 
              Of How Technology Fits Into Your Life. Our Mission Is Simple: Empower The 
              Next Generation With Tools That Look Great, Perform Better, And Last 
              Longer.
            </ScrambledText>
          </div>
          
          {/* Middle Section - Robot positioned at bottom, Empire UI text overlaying */}
          <div className="relative flex-1 mb-16">
            
            {/* Robot Image - Lower z-index, positioned at bottom of container */}
            <div className="absolute -bottom-67 -right-8 w-4/5 z-10" style={{ height: '660px' }}>
              <div className="relative h-full">
                <Image
                  src={img10}
                  alt="Empire UI Robot"
                  fill
                  className="object-contain object-bottom object-right"
                  priority
                />
              </div>
            </div>
            
            {/* Large Empire UI Text - Higher z-index, overlaying the robot */}
            <div className="relative z-40 w-full -mt-8 pointer-events-none">
              <BulgeText
                className={cn("text-white text-[10rem] md:text-[12rem] font-bold leading-none w-full", MinecartLCD.className)}
                style={{ 
                  letterSpacing: '0.06em'
                }}
                bulgeRadius={100}
                bulgeStrength={1.6}
              >
                Empire UI
              </BulgeText>
            </div>
          </div>
          
          {/* Bottom Left - Community Section - Higher z-index */}
          <div className="absolute bottom-8 left-8 z-30">
            <h3 className={cn("text-white text-2xl font-bold mb-2", MinecartLCD.className)}>
              Join Our Community
            </h3>
            <p className={cn("text-white text-lg mb-6", MinecartLCD.className)}>
              For Latest Updates & Discounts
            </p>
            
            <a href="https://discord.gg/RdKBQbFH" target="_blank" rel="noopener noreferrer" className={cn("bg-black text-white px-6 py-3 rounded-full border-2 border-white hover:bg-white hover:text-black transition-colors duration-300 flex items-center gap-3 group w-fit", MinecartLCD.className)}>
              <span className="group-hover:animate-bounce">🚀</span>
              JOIN COMMUNITY
              <AnimatedArrowDynamic 
                size={18} 
                strokeWidth={2}
                className="group-hover:text-black"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}; 