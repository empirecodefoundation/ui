"use client";
import React, { useEffect, useState } from 'react';

interface ScrollProgressLineProps {
  color?: string;
  dotSize?: number;
  dotSpacing?: number;
}

const ScrollProgressLine: React.FC<ScrollProgressLineProps> = ({
  color = '#ffffff',
  dotSize = 5,
  dotSpacing = 16
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [smoothScrollProgress, setSmoothScrollProgress] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = documentHeight > 0 ? scrollTop / documentHeight : 0;
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    const updateWindowHeight = () => {
      setWindowHeight(window.innerHeight);
    };

    updateScrollProgress();
    updateWindowHeight();
    window.addEventListener('scroll', updateScrollProgress);
    window.addEventListener('resize', updateScrollProgress);
    window.addEventListener('resize', updateWindowHeight);

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
      window.removeEventListener('resize', updateWindowHeight);
    };
  }, []);

  // Smooth animation effect for scroll progress
  useEffect(() => {
    const animateProgress = () => {
      setSmoothScrollProgress(prev => {
        const diff = scrollProgress - prev;
        const step = diff * 0.12; // Smooth animation speed
        if (Math.abs(diff) < 0.001) {
          return scrollProgress;
        }
        return prev + step;
      });
    };

    const intervalId = setInterval(animateProgress, 16); // ~60fps
    return () => clearInterval(intervalId);
  }, [scrollProgress]);

  // Generate straight vertical line path
  const generateStraightPath = () => {
    const navbarHeight = 85;
    const bottomMargin = 50;
    const availableHeight = windowHeight - navbarHeight - bottomMargin;
    const x = dotSize + 5; // Center position
    
    return `M ${x} ${navbarHeight} L ${x} ${navbarHeight + availableHeight}`;
  };

  // Generate dots along straight vertical line
  const generateStraightDots = () => {
    const navbarHeight = 85;
    const bottomMargin = 50;
    const availableHeight = windowHeight - navbarHeight - bottomMargin;
    const dots = [];
    const x = dotSize + 5; // Center position
    
    const totalDots = Math.floor(availableHeight / dotSpacing);
    
    for (let i = 0; i <= totalDots; i++) {
      const progress = i / totalDots;
      const y = navbarHeight + (progress * availableHeight);
      const isFilled = progress <= smoothScrollProgress;
      
      dots.push(
        <circle
          key={i}
          cx={x}
          cy={y}
          r={dotSize}
          fill={isFilled ? color : 'transparent'}
          stroke={color}
          strokeWidth={2}
          opacity={1}
        />
      );
    }
    
    return dots;
  };

  const svgWidth = (dotSize * 2) + 10;

  return (
    <div
      className="fixed -top-1 -right-4 z-40 pointer-events-none"
      style={{ height: windowHeight }}
    >
      <svg
        width={svgWidth}
        height={windowHeight}
        className="opacity-100"
      >
        {/* Background straight path */}
        <path
          d={generateStraightPath()}
          stroke={color}
          strokeWidth={1}
          fill="none"
          opacity={0.2}
        />
        
        {/* Straight line dots */}
        {generateStraightDots()}
      </svg>
    </div>
  );
};

export default ScrollProgressLine; 