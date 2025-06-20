import React from 'react';
import FluidGlass from '../ui/FluidGlass';

/**
 * Example usage of the FluidGlass component with liquid cursor effect
 */
export default function FluidGlassExample() {
  return (
    <div className="w-full min-h-screen bg-black">
      {/* Lens Mode Example */}
      <div className="h-screen">
        <h2 className="absolute top-4 left-4 text-white z-10 text-2xl font-bold">
          FluidGlass - Lens Mode
        </h2>
        <div style={{ height: '100vh', position: 'relative' }}>
          <FluidGlass 
            mode="lens"
            lensProps={{
              scale: 0.25,
              ior: 1.15,
              thickness: 5,
              chromaticAberration: 0.1,
              anisotropy: 0.01  
            }}
          />
        </div>
      </div>

      {/* Cube Mode Example */}
      <div className="h-screen">
        <h2 className="absolute top-4 left-4 text-white z-10 text-2xl font-bold">
          FluidGlass - Cube Mode
        </h2>
        <div style={{ height: '100vh', position: 'relative' }}>
          <FluidGlass 
            mode="cube"
            cubeProps={{
              scale: 0.3,
              ior: 1.2,
              thickness: 8,
              chromaticAberration: 0.15,
            }}
          />
        </div>
      </div>

      {/* Bar Mode Example */}
      <div className="h-screen">
        <h2 className="absolute top-4 left-4 text-white z-10 text-2xl font-bold">
          FluidGlass - Bar Mode
        </h2>
        <div style={{ height: '100vh', position: 'relative' }}>
          <FluidGlass 
            mode="bar"
            barProps={{
              navItems: [
                { label: "Home", link: "#home" },
                { label: "About", link: "#about" },
                { label: "Contact", link: "#contact" },
                { label: "Portfolio", link: "#portfolio" }
              ]
            }}
          />
        </div>
      </div>
    </div>
  );
} 