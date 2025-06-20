"use client";
import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";

function SimpleCursor() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, pointer } = useThree();
  
  useFrame(() => {
    if (meshRef.current) {
      // Follow the mouse cursor smoothly
      meshRef.current.position.x = (pointer.x * viewport.width) / 2;
      meshRef.current.position.y = (pointer.y * viewport.height) / 2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <MeshTransmissionMaterial
        ior={1.5}
        thickness={1}
        chromaticAberration={0.2}
        anisotropy={0.1}
        distortion={0.5}
        distortionScale={0.8}
        temporalDistortion={0.2}
        roughness={0}
        transmission={1}
        attenuationColor="#ffffff"
        attenuationDistance={0.5}
      />
    </mesh>
  );
}

function BackgroundElements() {
  return (
    <>
      {/* Background with gradient */}
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial color="#1a1a2e" />
      </mesh>
      
      {/* Colorful elements to see the distortion effect */}
      <mesh position={[-3, 2, -2]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#ff6b6b" />
      </mesh>
      
      <mesh position={[3, -1, -2]}>
        <cylinderGeometry args={[0.5, 0.5, 1]} />
        <meshBasicMaterial color="#4ecdc4" />
      </mesh>
      
      <mesh position={[0, -3, -2]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshBasicMaterial color="#45b7d1" />
      </mesh>
      
      <mesh position={[-2, -2, -2]}>
        <coneGeometry args={[0.6, 1.2]} />
        <meshBasicMaterial color="#f9ca24" />
      </mesh>
      
      <mesh position={[2, 2, -2]}>
        <octahedronGeometry args={[0.8]} />
        <meshBasicMaterial color="#a55eea" />
      </mesh>
    </>
  );
}

export default function TestCursor() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black text-white">
        Loading cursor effect...
      </div>
    );
  }

  return (
    <div className="w-full h-full relative bg-black cursor-none">
      {/* Instructions */}
      <div className="absolute top-4 left-4 z-10 text-white">
        <h2 className="text-xl font-bold mb-2">Liquid Cursor Test</h2>
        <p className="text-sm">Move your mouse to see the liquid glass effect</p>
        <p className="text-xs opacity-75 mt-1">The sphere should follow your cursor and distort the background</p>
      </div>
      
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance"
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color(0x000000), 0);
        }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <directionalLight position={[-5, 5, 5]} intensity={0.4} />
        
        <BackgroundElements />
        <SimpleCursor />
      </Canvas>
      
      {/* Status indicator */}
      <div className="absolute bottom-4 right-4 text-white text-sm opacity-75">
        <p>✓ TestCursor Active</p>
      </div>
    </div>
  );
} 