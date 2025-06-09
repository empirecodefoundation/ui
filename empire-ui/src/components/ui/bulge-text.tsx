"use client";
import React, { useRef, useState, useCallback } from 'react';

interface BulgeTextProps {
  children: string;
  className?: string;
  bulgeRadius?: number;
  bulgeStrength?: number;
  style?: React.CSSProperties;
}

export default function BulgeText({ 
  children, 
  className = "", 
  bulgeRadius = 80,
  bulgeStrength = 1.5,
  style = {}
}: BulgeTextProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!textRef.current) return;
    
    const rect = textRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePos({ x, y });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  const getCharStyle = useCallback((charIndex: number, char: string) => {
    if (!isHovering || !textRef.current) return {
      transform: 'scale(1) translateY(0px)',
      transition: 'transform 0.3s ease-out',
      display: 'inline-block',
      transformOrigin: 'center bottom',
      position: 'relative'
    };
    
    // Calculate approximate character position
    const charWidth = textRef.current.offsetWidth / children.length;
    const charHeight = textRef.current.offsetHeight;
    const charX = charIndex * charWidth + charWidth / 2;
    const charY = charHeight / 2;
    
    // Calculate distance from mouse to character (perfect circular calculation)
    const dx = mousePos.x - charX;
    const dy = mousePos.y - charY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Apply perfect circular bulge effect
    if (distance < bulgeRadius) {
      // Use perfect circular interpolation for smooth circular effect
      const normalizedDistance = distance / bulgeRadius;
      
      // Perfect circular falloff: 1 - x^2 creates a perfect circular curve
      const circularInfluence = 1 - (normalizedDistance * normalizedDistance);
      
      // Apply smooth cubic easing for more natural feel
      const easedInfluence = circularInfluence * circularInfluence * (3 - 2 * circularInfluence);
      
      const scale = 1 + (easedInfluence * (bulgeStrength - 1));
      const translateY = -easedInfluence * 20; // Smooth upward movement
      
      return {
        transform: `scale(${scale}) translateY(${translateY}px)`,
        transition: 'transform 0.1s ease-out',
        display: 'inline-block',
        transformOrigin: 'center bottom',
        zIndex: Math.floor(easedInfluence * 30) + 1,
        position: 'relative'
      };
    }
    
    return {
      transform: 'scale(1) translateY(0px)',
      transition: 'transform 0.2s ease-out',
      display: 'inline-block',
      transformOrigin: 'center bottom',
      position: 'relative'
    };
  }, [isHovering, mousePos.x, mousePos.y, children.length, bulgeRadius, bulgeStrength]);

  return (
    <div
      ref={textRef}
      className={`select-none cursor-default ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children.split('').map((char, index) => (
        <span
          key={index}
          style={getCharStyle(index, char)}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
} 