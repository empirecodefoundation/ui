import React from 'react';
import Lanyard from '../components/3d/Lanyard';

/**
 * Example usage of the 3D Lanyard component
 * 
 * This demonstrates different configurations and use cases
 */
export default function LanyardExample() {
  return (
    <div className="w-full min-h-screen">
      {/* Basic usage with default settings */}
      <div className="h-screen">
        <h2 className="absolute top-4 left-4 text-white z-10 text-2xl font-bold">
          Basic Lanyard
        </h2>
        <Lanyard />
      </div>

      {/* Custom positioning and gravity */}
      <div className="h-screen">
        <h2 className="absolute top-4 left-4 text-white z-10 text-2xl font-bold">
          Custom Gravity & Position
        </h2>
        <Lanyard 
          position={[0, 0, 20]} 
          gravity={[0, -40, 0]}
          fov={30}
        />
      </div>

      {/* Smaller container example */}
      <div className="h-96 border border-gray-300 rounded-lg overflow-hidden">
        <h2 className="absolute top-4 left-4 text-black z-10 text-xl font-bold">
          Contained Lanyard
        </h2>
        <Lanyard 
          position={[0, 0, 15]}
          gravity={[0, -30, 0]}
          fov={25}
          transparent={false}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

// Usage in any component:
/*
import Lanyard from './components/3d/Lanyard';

function MyComponent() {
  return (
    <div>
      <h1>My App</h1>
      <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
    </div>
  );
}
*/ 