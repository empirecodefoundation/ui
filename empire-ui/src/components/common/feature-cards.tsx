import React from 'react';
import { MinecartLCD } from "@/lib/fonts";
import { cn } from '@/lib/utils';
import Image from 'next/image';
import img2 from '@/images/img2.png';
import img3 from '@/images/img3.png';

export const NewComponentsCard = () => {
  return (
    <div className="feature-card h-full relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={img2}
          alt="Component Device" 
          fill
          className="object-cover object-center opacity-90"
          style={{ objectPosition: 'center 40%' }}
          priority
        />
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 p-5 h-full flex flex-col">
        <div className="mb-auto">
          <h3 className={cn("text-xl text-white font-bold tracking-wide", MinecartLCD.className)}>
            NEW<br />
            COMPONENTS
          </h3>
        </div>
        
        <div className="mt-auto">
          <p className={cn("text-gray-300 text-xs tracking-wide", MinecartLCD.className)}>
            DESIGNED FOR INTEREST<br />
            — FROM THE INSIDE OUT
          </p>
        </div>
      </div>
    </div>
  );
};

export const WavyColoursCard = () => {
  return (
    <div className="feature-card h-full relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={img3}
          alt="Wavy Component" 
          fill
          className="object-cover object-center scale-110 opacity-90"
          style={{ objectPosition: 'center 25%' }}
          priority
        />
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 p-5 h-full flex flex-col">
        <div className="mb-auto">
          <h3 className={cn("text-xl text-white font-bold tracking-wide", MinecartLCD.className)}>
            EMPIRE UI<br />
            WAVY COLOURS
          </h3>
        </div>
        
        <div className="mt-auto">
          <p className={cn("text-gray-300 text-xs tracking-wide", MinecartLCD.className)}>
            ULTRA-FAST USB-C CHARGING<br />
            WITH INTELLIGENT POWER<br />
            MODULATION
          </p>
        </div>
      </div>
    </div>
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
        <a href="#" className={cn("button-primary py-1.5 px-3 text-xs", MinecartLCD.className)}>
          EXPLORE SEGMENTS
        </a>
      </div>
    </div>
  );
}; 