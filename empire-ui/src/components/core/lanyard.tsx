"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface LanyardProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  thickness?: 'thin' | 'normal' | 'thick';
  fullScreen?: boolean;
}

export const Lanyard = ({
  color = "#ffffff",
  size = "md",
  thickness = "normal",
  fullScreen = false,
  className,
  ...props
}: LanyardProps) => {
  // Size mapping
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  // Thickness mapping
  const thicknessMap = {
    thin: 'border-2',
    normal: 'border-3',
    thick: 'border-4',
  };

  return (
    <div 
      className={cn(
        "flex items-center justify-center",
        fullScreen && "fixed inset-0 bg-black/70 z-50",
        className
      )} 
      {...props}
    >
      <div 
        className={cn(
          "rounded-full animate-spin",
          sizeMap[size],
          thicknessMap[thickness],
        )}
        style={{ 
          borderColor: `${color}40`, 
          borderTopColor: color,
        }}
      />
    </div>
  );
};

export default Lanyard; 