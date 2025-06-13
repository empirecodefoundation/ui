"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedArrowProps {
  className?: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

// Stable arrow that only animates on hover - changes direction from diagonal to right
export const AnimatedArrowDynamic: React.FC<AnimatedArrowProps> = ({
  className,
  size = 20,
  color = "currentColor",
  strokeWidth = 2
}) => {
  return (
    <motion.div
      className={cn("inline-flex items-center justify-center", className)}
      initial={{ rotate: -45 }}
      whileHover={{ 
        rotate: 0,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M5 12H19"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <motion.path
          d="M12 5L19 12L12 19"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
};

// Original animated arrows kept for reference
export const AnimatedArrow: React.FC<AnimatedArrowProps> = ({
  className,
  size = 20,
  color = "currentColor",
  strokeWidth = 2
}) => {
  return (
    <motion.div
      className={cn("inline-flex items-center justify-center", className)}
      initial={{ x: 0, y: 0 }}
      animate={{ 
        x: [0, 3, 0],
        y: [0, -3, 0]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M7 17L17 7"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        <motion.path
          d="M7 7H17V17"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  );
};

// Pulsing arrow variant
export const AnimatedArrowPulse: React.FC<AnimatedArrowProps> = ({
  className,
  size = 20,
  color = "currentColor",
  strokeWidth = 2
}) => {
  return (
    <motion.div
      className={cn("inline-flex items-center justify-center", className)}
      animate={{
        scale: [1, 1.1, 1],
        x: [0, 3, 0],
        y: [0, -3, 0]
      }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M7 17L17 7"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.path
          d="M7 7H17V17"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2
          }}
        />
      </svg>
    </motion.div>
  );
}; 