"use client";
import React, { useState, useRef, useEffect } from 'react';
import { MinecartLCD } from "@/lib/fonts";
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { AnimatedArrowDynamic } from '@/components/ui/animated-arrow';
import PixelCard from '@/components/ui/pixel-card';
import { useRouter } from 'next/navigation';

// Import images
import img5 from '@/images/img5.png';
import img6 from '@/images/img6.png';
import img7 from '@/images/img7.png';
import img8 from '@/images/img8.png';
import img9 from '@/images/img9.png';

// Product card component with pixel animation
const ProductCard = ({ 
  title, 
  image, 
  className,
  showArrow = true,
  onHover,
  onLeave,
  onMouseMove,
  isSpotlighted,
  isDimmed,
  onNavigationStart
}: {
  title: string;
  image: any;
  className?: string;
  showArrow?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
  onMouseMove?: (e: React.MouseEvent) => void;
  isSpotlighted?: boolean;
  isDimmed?: boolean;
  onNavigationStart?: () => void;
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    if (onNavigationStart) {
      onNavigationStart();
    }
    router.push('/components');
  };

  return (
    <div 
      className={cn(
        "relative rounded-[50px] overflow-hidden cursor-pointer transition-all duration-700 ease-out",
        isSpotlighted ? "z-50 scale-[1.01] shadow-xl shadow-white/20" : "scale-100",
        isDimmed ? "opacity-40 scale-[0.99]" : "opacity-100 scale-100",
        className
      )}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onMouseMove={onMouseMove}
      onClick={handleCardClick}
      style={{
        transitionProperty: 'opacity, transform, box-shadow',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Image Container */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-[50px]"
          priority
        />
      </div>
      
      {/* Pixel Animation Wrapper */}
      <PixelCard 
        variant="white"
        gap={4}
        speed={25}
        className="w-full h-full"
      >
        {/* Content */}
        <div className="relative p-8 h-full flex flex-col justify-between" style={{ zIndex: 110 }}>
          {/* Arrow Button */}
          {showArrow && (
            <div className="flex justify-end">
              <div className="w-14 h-14 rounded-full border border-white/50 flex items-center justify-center bg-transparent hover:bg-white transition-colors duration-300 group/arrow text-white hover:text-black">
                <AnimatedArrowDynamic 
                  size={20} 
                  strokeWidth={2.5}
                  className=""
                />
              </div>
            </div>
          )}

          {/* Title */}
          <div>
            <h3 className={cn("text-white text-xl md:text-2xl font-bold uppercase tracking-wider", MinecartLCD.className)}>
              {title}
            </h3>
          </div>
        </div>
      </PixelCard>
    </div>
  );
};

export const ProductHighlights = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolling, setIsScrolling] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scrolling to prevent accidental spotlight activation and clear effect when scrolling away
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      
      // Check if the product highlights section is in viewport
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        
        // If section is not visible, immediately clear the spotlight effect
        if (!isInViewport && hoveredCard) {
          setHoveredCard(null);
          // Also clear any pending timeouts
          if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
          }
        }
      }
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Reset scrolling state after scroll stops
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [hoveredCard]); // Add hoveredCard as dependency

  const handleCardHover = (cardTitle: string) => {
    // Clear any pending timeout first
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    // If user is scrolling, wait for them to stop before activating spotlight
    if (isScrolling) {
      hoverTimeoutRef.current = setTimeout(() => {
        // Double-check they're still hovering and not scrolling
        if (!isScrolling) {
          setHoveredCard(cardTitle);
        }
      }, 150);
      return;
    }
    
    // Set the hovered card immediately if not scrolling
    setHoveredCard(cardTitle);
  };

  const handleCardLeave = () => {
    // Clear any pending timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    // Delay clearing the hover state to allow for smooth transitions between cards
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredCard(null);
    }, 150);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || isScrolling) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  // Create radial gradient based on mouse position
  const createRadialOverlay = () => {
    if (!hoveredCard || !containerRef.current) return {};
    
    const { x, y } = mousePosition;
    
    return {
      background: `radial-gradient(circle 150px at ${x}px ${y}px, 
        rgba(0, 0, 0, 0) 0%, 
        rgba(0, 0, 0, 0.2) 40%, 
        rgba(0, 0, 0, 0.4) 70%, 
        rgba(0, 0, 0, 0.5) 100%), 
        radial-gradient(circle 300px at ${x}px ${y}px, 
        rgba(0, 0, 0, 0.2) 60%, 
        rgba(0, 0, 0, 0.4) 100%)`
    };
  };

  const handleNavigationStart = () => {
    setIsNavigating(true);
  };

  return (
    <>
      {/* Navigation Loading Overlay */}
      {isNavigating && (
        <div className="fixed inset-0 z-[100] bg-black bg-opacity-75 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <p className={cn("text-white text-lg", MinecartLCD.className)}>
              Loading Components...
            </p>
          </div>
        </div>
      )}

      {/* Radial Dark Overlay that follows cursor */}
      <div 
        className={cn(
          "fixed inset-0 z-40 transition-all duration-500 ease-in-out pointer-events-none",
          hoveredCard ? "opacity-100" : "opacity-0"
        )}
        style={createRadialOverlay()}
      />
      
      <div className="relative py-8" ref={containerRef}>
        {/* Content Container - Same width as Features section */}
        <div className="w-[1450px] max-w-[95%] mx-auto">
          
          {/* Header Section - Title on the right */}
          <div className="flex justify-end items-start mb-6">
            <div className="text-right">
              <h1 className={cn("text-white text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4", MinecartLCD.className)}>
                Product Highlights
              </h1>
              <div className="flex items-center justify-end gap-6">
                <div className="h-px bg-dotted w-64" style={{ 
                  backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)', 
                  backgroundSize: '8px 3px',
                  backgroundRepeat: 'repeat-x',
                  height: '3px'
                }}></div>
                <p className={cn("text-gray-300 text-lg", MinecartLCD.className)}>
                  Our Devices. Redefined
                </p>
              </div>
            </div>
          </div>

          {/* Main Grid Layout - 2 vertical segments */}
          <div className="grid grid-cols-2 gap-6 h-[600px]">
            
            {/* LEFT SEGMENT */}
            <div className="flex flex-col gap-6">
              {/* BACKGROUNDS - Large top block */}
              <ProductCard
                title="BACKGROUNDS"
                image={img5}
                className="h-[300px] rounded-[50px] border-2 border-white"
                onHover={() => handleCardHover("BACKGROUNDS")}
                onLeave={handleCardLeave}
                onMouseMove={handleMouseMove}
                isSpotlighted={hoveredCard === "BACKGROUNDS"}
                isDimmed={hoveredCard !== null && hoveredCard !== "BACKGROUNDS"}
                onNavigationStart={handleNavigationStart}
              />
              
              {/* Bottom row - TEXTURES and COMPONENTS */}
              <div className="grid grid-cols-2 gap-6 h-[294px]">
                <ProductCard
                  title="TEXTURES"
                  image={img9}
                  className="rounded-[50px] border-2 border-white"
                  onHover={() => handleCardHover("TEXTURES")}
                  onLeave={handleCardLeave}
                  onMouseMove={handleMouseMove}
                  isSpotlighted={hoveredCard === "TEXTURES"}
                  isDimmed={hoveredCard !== null && hoveredCard !== "TEXTURES"}
                  onNavigationStart={handleNavigationStart}
                />
                <ProductCard
                  title="COMPONENTS"
                  image={img8}
                  className="rounded-[50px] border-2 border-white"
                  onHover={() => handleCardHover("COMPONENTS")}
                  onLeave={handleCardLeave}
                  onMouseMove={handleMouseMove}
                  isSpotlighted={hoveredCard === "COMPONENTS"}
                  isDimmed={hoveredCard !== null && hoveredCard !== "COMPONENTS"}
                  onNavigationStart={handleNavigationStart}
                />
              </div>
            </div>

            {/* RIGHT SEGMENT */}
            <div className="grid grid-cols-2 gap-6">
              {/* NAVIGATION - Left half */}
              <ProductCard
                title="NAVIGATION"
                image={img6}
                className="rounded-[50px] border-2 border-white"
                onHover={() => handleCardHover("NAVIGATION")}
                onLeave={handleCardLeave}
                onMouseMove={handleMouseMove}
                isSpotlighted={hoveredCard === "NAVIGATION"}
                isDimmed={hoveredCard !== null && hoveredCard !== "NAVIGATION"}
                onNavigationStart={handleNavigationStart}
              />
              
              {/* CURSORS - Right half */}
              <ProductCard
                title="CURSORS"
                image={img7}
                className="rounded-[50px] border-2 border-white"
                onHover={() => handleCardHover("CURSORS")}
                onLeave={handleCardLeave}
                onMouseMove={handleMouseMove}
                isSpotlighted={hoveredCard === "CURSORS"}
                isDimmed={hoveredCard !== null && hoveredCard !== "CURSORS"}
                onNavigationStart={handleNavigationStart}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}; 