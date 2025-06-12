"use client";
import React from 'react';
import Particles from './particles';

interface ParticlesBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export const ParticlesBackground = ({ children, className = "" }: ParticlesBackgroundProps) => {
  return (
    <div className={`relative min-h-screen ${className}`}>
      {/* Particles Background - Fixed to cover entire viewport, behind everything */}
      <div className="fixed inset-0 w-full h-full z-[-1]">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
          className="w-full h-full"
        />
      </div>
      
      {/* Content - Above particles */}
      <div className="relative z-0">
        {children}
      </div>
    </div>
  );
}; 