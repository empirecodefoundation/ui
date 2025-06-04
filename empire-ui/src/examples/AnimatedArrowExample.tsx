import React from 'react';
import { AnimatedArrow, AnimatedArrowDynamic, AnimatedArrowPulse } from '../components/ui/animated-arrow';
import { MinecartLCD } from "@/lib/fonts";
import { cn } from '@/lib/utils';

/**
 * Example showcasing different animated arrow variants
 * Used for the explore segment buttons
 */
export default function AnimatedArrowExample() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className={cn("text-white text-4xl font-bold mb-8 text-center", MinecartLCD.className)}>
          Animated Arrow Examples
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Basic Animated Arrow */}
          <div className="bg-black/50 p-6 rounded-lg border border-gray-700">
            <h3 className={cn("text-white text-xl mb-4", MinecartLCD.className)}>
              Basic Arrow
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex justify-center">
                <AnimatedArrow size={32} color="white" />
              </div>
              <a href="#" className={cn("explore-button text-center", MinecartLCD.className)}>
                EXPLORE SEGMENTS
                <AnimatedArrow 
                  size={18} 
                  color="black" 
                  strokeWidth={2.5}
                />
              </a>
            </div>
          </div>

          {/* Dynamic Animated Arrow (Recommended) */}
          <div className="bg-black/50 p-6 rounded-lg border border-gray-700">
            <h3 className={cn("text-white text-xl mb-4", MinecartLCD.className)}>
              Dynamic Arrow (Recommended)
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex justify-center">
                <AnimatedArrowDynamic size={32} color="white" />
              </div>
              <a href="#" className={cn("explore-button text-center", MinecartLCD.className)}>
                EXPLORE SEGMENTS
                <AnimatedArrowDynamic 
                  size={18} 
                  color="black" 
                  strokeWidth={2.5}
                  className="animated-arrow"
                />
              </a>
            </div>
          </div>

          {/* Pulsing Animated Arrow */}
          <div className="bg-black/50 p-6 rounded-lg border border-gray-700">
            <h3 className={cn("text-white text-xl mb-4", MinecartLCD.className)}>
              Pulsing Arrow
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex justify-center">
                <AnimatedArrowPulse size={32} color="white" />
              </div>
              <a href="#" className={cn("explore-button text-center", MinecartLCD.className)}>
                EXPLORE SEGMENTS
                <AnimatedArrowPulse 
                  size={18} 
                  color="black" 
                  strokeWidth={2.5}
                />
              </a>
            </div>
          </div>
        </div>

        {/* Standalone Arrow Examples */}
        <div className="mt-12">
          <h2 className={cn("text-white text-2xl font-bold mb-6", MinecartLCD.className)}>
            Standalone Arrow Variants
          </h2>
          <div className="bg-black/50 p-8 rounded-lg border border-gray-700">
            <div className="flex justify-around items-center">
              <div className="text-center">
                <AnimatedArrow size={48} color="white" />
                <p className={cn("text-gray-300 mt-2 text-sm", MinecartLCD.className)}>Basic</p>
              </div>
              <div className="text-center">
                <AnimatedArrowDynamic size={48} color="white" />
                <p className={cn("text-gray-300 mt-2 text-sm", MinecartLCD.className)}>Dynamic</p>
              </div>
              <div className="text-center">
                <AnimatedArrowPulse size={48} color="white" />
                <p className={cn("text-gray-300 mt-2 text-sm", MinecartLCD.className)}>Pulsing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Code Example */}
        <div className="mt-12">
          <h2 className={cn("text-white text-2xl font-bold mb-6", MinecartLCD.className)}>
            Usage Example
          </h2>
          <div className="bg-black p-6 rounded-lg border border-gray-700">
            <pre className="text-green-400 text-sm overflow-x-auto">
{`import { AnimatedArrowDynamic } from '@/components/ui/animated-arrow';

<a href="#" className="explore-button">
  EXPLORE SEGMENTS
  <AnimatedArrowDynamic 
    size={18} 
    color="black" 
    strokeWidth={2.5}
    className="animated-arrow"
  />
</a>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
} 