import React from 'react';
import { FeaturesSection } from '../components/common/features-section';
import { MinecartLCD } from "@/lib/fonts";
import { cn } from '@/lib/utils';

/**
 * Example showcasing the Features section with scroll-triggered zoom effects
 */
export default function FeaturesSectionExample() {
  return (
    <div className="bg-gray-900">
      {/* Spacer section to demonstrate scroll effect */}
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className={cn("text-white text-6xl font-bold mb-4", MinecartLCD.className)}>
            Scroll Down
          </h1>
          <p className={cn("text-gray-400 text-xl", MinecartLCD.className)}>
            To See The Features Section With Zoom Effect
          </p>
          <div className="mt-8 animate-bounce">
            <svg className="w-8 h-8 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* Additional content to demonstrate the full scroll effect */}
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className={cn("text-white text-4xl font-bold mb-4", MinecartLCD.className)}>
            Section Complete
          </h2>
          <p className={cn("text-gray-400 text-lg", MinecartLCD.className)}>
            The image should now be settled in the background
          </p>
        </div>
      </div>
    </div>
  );
} 