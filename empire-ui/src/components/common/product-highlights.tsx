"use client";
import React from 'react';
import { MinecartLCD } from "@/lib/fonts";
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { AnimatedArrowDynamic } from '@/components/ui/animated-arrow';

// Import images
import img5 from '@/images/img5.png';
import img6 from '@/images/img6.png';
import img7 from '@/images/img7.png';
import img8 from '@/images/img8.png';
import img9 from '@/images/img9.png';

// Simple product card component without animations
const ProductCard = ({ 
  title, 
  image, 
  className,
  showArrow = true
}: {
  title: string;
  image: any;
  className?: string;
  showArrow?: boolean;
}) => {
  return (
    <div className={cn("relative overflow-hidden bg-black group cursor-pointer", className)}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 h-full flex flex-col justify-between">
        {/* Arrow Button */}
        {showArrow && (
          <div className="flex justify-end">
            <div className="w-14 h-14 rounded-full border border-white/50 flex items-center justify-center bg-transparent hover:bg-white transition-colors duration-300 group/arrow text-white hover:text-black">
              <AnimatedArrowDynamic 
                size={20} 
                strokeWidth={2.5}
                className=""
              />
            </div>
          </div>
        )}

        {/* Title */}
        <div>
          <h3 className={cn("text-white text-xl md:text-2xl font-bold uppercase tracking-wider", MinecartLCD.className)}>
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export const ProductHighlights = () => {
  return (
    <div className="relative bg-[#202020] py-8">
      {/* Content Container - Same width as Features section */}
      <div className="w-[1450px] max-w-[95%] mx-auto">
        
        {/* Header Section - Title on the right */}
        <div className="flex justify-end items-start mb-6">
          <div className="text-right">
            <h1 className={cn("text-white text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4", MinecartLCD.className)}>
              Product Highlights
            </h1>
            <div className="flex items-center justify-end gap-6">
              <div className="h-px bg-dotted w-64" style={{ 
                backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)', 
                backgroundSize: '8px 3px',
                backgroundRepeat: 'repeat-x',
                height: '3px'
              }}></div>
              <p className={cn("text-gray-300 text-lg", MinecartLCD.className)}>
                Our Devices. Redefined
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid Layout - 2 vertical segments */}
        <div className="grid grid-cols-2 gap-6 h-[600px]">
          
          {/* LEFT SEGMENT */}
          <div className="flex flex-col gap-6">
            {/* BACKGROUNDS - Large top block */}
            <ProductCard
              title="BACKGROUNDS"
              image={img5}
              className="h-[300px] rounded-[50px]"
            />
            
            {/* Bottom row - TEXTURES and COMPONENTS */}
            <div className="grid grid-cols-2 gap-6 h-[294px]">
              <ProductCard
                title="TEXTURES"
                image={img9}
                className="rounded-[50px]"
              />
              <ProductCard
                title="COMPONENTS"
                image={img8}
                className="rounded-[50px]"
              />
            </div>
          </div>

          {/* RIGHT SEGMENT */}
          <div className="grid grid-cols-2 gap-6">
            {/* NAVIGATION - Left half */}
            <ProductCard
              title="NAVIGATION"
              image={img6}
              className="rounded-[50px]"
            />
            
            {/* CURSORS - Right half */}
            <ProductCard
              title="CURSORS"
              image={img7}
              className="rounded-[50px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 