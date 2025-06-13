import React from 'react';
import { AnimatedArrowDynamic } from '../components/ui/animated-arrow';
import { MinecartLCD } from "@/lib/fonts";
import { cn } from '@/lib/utils';

/**
 * Example showcasing the stable arrow that changes direction on hover
 * From diagonal to horizontal (right)
 */
export default function StableArrowExample() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className={cn("text-white text-4xl font-bold mb-8 text-center", MinecartLCD.className)}>
          Stable Arrow Example
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Default State */}
          <div className="bg-black/50 p-6 rounded-lg border border-gray-700">
            <h3 className={cn("text-white text-xl mb-4", MinecartLCD.className)}>
              Default State (Diagonal)
            </h3>
            <div className="flex flex-col gap-6">
              <div className="flex justify-center">
                <AnimatedArrowDynamic size={48} color="white" />
              </div>
              <p className={cn("text-gray-300 text-center", MinecartLCD.className)}>
                Arrow points diagonally up-right when not hovered
              </p>
            </div>
          </div>

          {/* Hover State */}
          <div className="bg-black/50 p-6 rounded-lg border border-gray-700">
            <h3 className={cn("text-white text-xl mb-4", MinecartLCD.className)}>
              Hover State (Horizontal)
            </h3>
            <div className="flex flex-col gap-6">
              <div className="flex justify-center">
                <div className="border-2 border-dashed border-blue-500 p-4 rounded-lg">
                  <AnimatedArrowDynamic size={48} color="white" />
                  <p className={cn("text-blue-400 text-sm mt-2", MinecartLCD.className)}>
                    Hover over me!
                  </p>
                </div>
              </div>
              <p className={cn("text-gray-300 text-center", MinecartLCD.className)}>
                Arrow rotates to point right when hovered
              </p>
            </div>
          </div>
        </div>

        {/* Button Examples */}
        <div className="mt-12">
          <h2 className={cn("text-white text-2xl font-bold mb-6", MinecartLCD.className)}>
            Button Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Explore Button */}
            <div className="bg-black/50 p-6 rounded-lg border border-gray-700">
              <h3 className={cn("text-white text-xl mb-4", MinecartLCD.className)}>
                Explore Button
              </h3>
              <div className="flex justify-center">
                <a href="#" className={cn("explore-button text-center", MinecartLCD.className)}>
                  EXPLORE SEGMENTS
                  <span className="flex-grow"></span>
                  <AnimatedArrowDynamic 
                    size={22} 
                    color="black" 
                    strokeWidth={2.5}
                    className="animated-arrow ml-2"
                  />
                </a>
              </div>
            </div>

            {/* Primary Button */}
            <div className="bg-black/50 p-6 rounded-lg border border-gray-700">
              <h3 className={cn("text-white text-xl mb-4", MinecartLCD.className)}>
                Primary Button
              </h3>
              <div className="flex justify-center">
                <a href="#" className={cn("button-primary py-1.5 px-3", MinecartLCD.className)}>
                  GET STARTED
                  <span className="flex-grow"></span>
                  <AnimatedArrowDynamic 
                    size={18} 
                    color="black" 
                    strokeWidth={2}
                    className="animated-arrow ml-2"
                  />
                </a>
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
  <span className="flex-grow"></span>
  <AnimatedArrowDynamic 
    size={22} 
    color="black" 
    strokeWidth={2.5}
    className="animated-arrow ml-2"
  />
</a>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
} 