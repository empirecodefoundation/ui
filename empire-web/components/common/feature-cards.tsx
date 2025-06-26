import React from 'react';
import { MinecartLCD } from "@/lib/fonts";
import { cn } from '@/lib/utils';
import Image from 'next/image';
import img3 from '@/images/img3.png';
import { AnimatedArrowDynamic } from '@/components/ui/animated-arrow';
import Threads from '@/components/ui/Threads';
import Beams from '@/components/ui/Beams';
import Link from 'next/link';

export const NewComponentsCard = () => {
  return (
    <Link href="/components" className="block h-full group">
      <div className="feature-card h-full relative overflow-hidden cursor-pointer transition-all duration-300 group-hover:border-4 group-hover:border-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] group-hover:scale-[1.02] group-hover:-translate-y-1">
        {/* Beams background effect */}
        <div className="absolute inset-0 z-0">
          <Beams
            beamWidth={2}
            beamHeight={15}
            beamNumber={12}
            lightColor="#ffffff"
            speed={5}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={135}
          />
        </div>
        
        {/* Content overlay */}
        <div className="relative z-10 p-5 h-full flex flex-col">
          <div className="mb-auto">
            <h3 className={cn("text-xl text-white font-bold tracking-wide group-hover:text-shadow-glow", MinecartLCD.className)}>
              NEW<br />
              COMPONENTS
            </h3>
          </div>
          
          <div className="mt-auto">
            <p className={cn("text-gray-300 text-xs tracking-wide group-hover:text-white transition-colors duration-300", MinecartLCD.className)}>
              DESIGNED FOR INTEREST<br />
              — FROM THE INSIDE OUT
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const WavyColoursCard = () => {
  return (
    <Link href="/colors" className="block h-full group">
      <div className="feature-card h-full relative overflow-hidden cursor-pointer transition-all duration-300 group-hover:border-4 group-hover:border-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] group-hover:scale-[1.02] group-hover:-translate-y-1">
        {/* Threads background effect */}
        <div className="absolute inset-0 z-0">
          <Threads
            amplitude={3}
            distance={0}
            enableMouseInteraction={true}
            color={[1, 1, 1]}
          />
        </div>
        
        {/* Content overlay */}
        <div className="relative z-10 p-5 h-full flex flex-col">
          <div className="mb-auto">
            <h3 className={cn("text-xl text-white font-bold tracking-wide group-hover:text-shadow-glow", MinecartLCD.className)}>
              EMPIRE UI<br />
              WAVY COLOURS
            </h3>
          </div>
          
          <div className="mt-auto">
            <p className={cn("text-gray-300 text-xs tracking-wide uppercase group-hover:text-white transition-colors duration-300", MinecartLCD.className)}>
              Explore More
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const SignalHubCard = () => {
  return (
    <div className="feature-card p-4 bg-black">
      <div className="mb-2">
        <h3 className={cn("text-xl text-white font-bold tracking-wide", MinecartLCD.className)}>
          COREX SIGNALHUB
        </h3>
      </div>
      
      <div className="flex justify-between items-center">
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
        <a href="#" className={cn("button-primary py-1.5 px-3 text-xs inline-flex items-center hover:bg-white hover:text-black group", MinecartLCD.className)}>
          EXPLORE SEGMENTS
          <span className="flex-grow"></span>
          <AnimatedArrowDynamic 
            size={16} 
            strokeWidth={2}
            className="animated-arrow ml-2"
          />
        </a>
      </div>
    </div>
  );
}; 