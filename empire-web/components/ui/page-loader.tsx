"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface PageLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
}

export const PageLoader = ({ isLoading, onComplete }: PageLoaderProps) => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setLoadingProgress(0);
      
      // Animate loading progress with high viscosity increments  
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 0.5; // Smaller increment for more viscous motion
        });
      }, 12); // Update every 12ms for viscous motion

      // Complete after 1.5 seconds
      const completeTimeout = setTimeout(() => {
        clearInterval(progressInterval);
        setLoadingProgress(100);
        setTimeout(() => {
          onComplete?.();
        }, 200); // Small delay after completion
      }, 1500);

      return () => {
        clearInterval(progressInterval);
        clearTimeout(completeTimeout);
      };
    }
  }, [isLoading, onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 0.4, 
            ease: [0.12, 0.8, 0.24, 1] // Consistent high viscosity easing
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1a1a1a]"
        >
          <div className="flex flex-col items-center space-y-6">
            {/* Logo with flip animation */}
            <motion.div
              className="w-24 h-24 rounded-[50px] overflow-hidden flex items-center justify-center bg-black"
              style={{
                clipPath: 'inset(0 round 50px)', // Force square shape with rounded corners
              }}
              animate={{
                rotateY: [0, 0, -180, -360, -360, -360, -540, -720, -720], // 2 backwards flips, pause, 2 backwards flips
              }}
              transition={{
                duration: 1.5,
                times: [0, 0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.85, 1], // Extended timing for more viscous motion
                ease: [0.12, 0.8, 0.24, 1] // High viscosity easing - slower start, smooth flow
              }}
            >
              <div className="w-20 h-20 rounded-[40px] bg-black flex items-center justify-center overflow-hidden">
                <Image 
                  src="/EMUI.png" 
                  alt="Empire UI Logo" 
                  width={64} 
                  height={64}
                  className="object-cover w-16 h-16 rounded-[32px]"
                />
              </div>
            </motion.div>

            {/* Loading bar */}
            <div className="w-24 h-2 bg-transparent border border-white rounded-[60px] overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-[60px]"
                initial={{ width: "0%" }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ 
                  duration: 0.05, 
                  ease: [0.12, 0.8, 0.24, 1] // High viscosity easing to match logo
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 