"use client";

import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { MinecartLCD } from "@/lib/fonts";

interface SidebarItem {
  title: string;
  label?: string;
  labelColor?: string;
  onClick?: () => void;
}

interface SidebarCategory {
  title: string;
  items: SidebarItem[];
}

interface ClassifiedSidebarProps {
  categories: SidebarCategory[];
  selectedItem?: string;
  onItemClick?: (item: string) => void;
}

export const ClassifiedSidebar: React.FC<ClassifiedSidebarProps> = ({
  categories,
  selectedItem,
  onItemClick,
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const animationDefaults: gsap.TweenVars = { duration: 0.3, ease: "expo" };

  const getLabelStyles = (color?: string) => {
    switch (color) {
      case "orange":
        return "bg-white text-orange-600 border border-orange-600";
      case "blue":
        return "bg-white text-blue-600 border border-blue-600";
      case "green":
        return "bg-white text-green-600 border border-green-600";
      case "purple":
        return "bg-white text-purple-600 border border-purple-600";
      default:
        return "bg-white text-gray-600 border border-gray-600";
    }
  };

  const handleItemClick = (item: string) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  const distMetric = (x: number, y: number, x2: number, y2: number): number => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  const findClosestEdge = (
    mouseX: number,
    mouseY: number,
    width: number,
    height: number
  ): "top" | "bottom" => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
  };

  // Flowing Menu Item Component
  const FlowingMenuItem: React.FC<{
    item: SidebarItem;
    isSelected: boolean;
    onItemClick: (title: string) => void;
  }> = ({ item, isSelected, onItemClick }) => {
    const itemRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const marqueeInnerRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = (ev: React.MouseEvent<HTMLDivElement>) => {
      if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
        return;
      const rect = itemRef.current.getBoundingClientRect();
      const x = ev.clientX - rect.left;
      const y = ev.clientY - rect.top;
      const edge = findClosestEdge(x, y, rect.width, rect.height);

      const tl = gsap.timeline({ defaults: animationDefaults });

      tl.set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
        .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0)
        .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" }, 0);
    };

    const handleMouseLeave = (ev: React.MouseEvent<HTMLDivElement>) => {
      if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
        return;
      const rect = itemRef.current.getBoundingClientRect();
      const x = ev.clientX - rect.left;
      const y = ev.clientY - rect.top;
      const edge = findClosestEdge(x, y, rect.width, rect.height);

      const tl = gsap.timeline({ defaults: animationDefaults });

      tl.to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0).to(
        marqueeInnerRef.current,
        { y: edge === "top" ? "101%" : "-101%" },
        0
      );
    };

    const repeatedMarqueeContent = React.useMemo(() => {
      return Array.from({ length: 4 }).map((_, idx) => (
        <React.Fragment key={idx}>
          <div className="flex items-center justify-between px-4 w-full">
            <span className={cn("text-black text-sm lg:text-base font-medium", MinecartLCD.className)}>
              {item.title}
            </span>
            {item.label && (
              <span className={cn(
                "px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-black text-white ml-4",
                MinecartLCD.className
              )}>
                {item.label}
              </span>
            )}
          </div>
        </React.Fragment>
      ));
    }, [item.title, item.label]);

    return (
      <div
        ref={itemRef}
        className={cn(
          "relative group cursor-pointer overflow-hidden rounded-[40px] p-3 lg:p-4 border-2",
          isSelected
            ? "bg-gray-700 border-white"
            : "border-transparent hover:border-gray-600",
          MinecartLCD.className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onItemClick(item.title)}
      >
        <div className="flex items-center justify-between relative z-10">
          <span className={cn(
            "text-white text-sm lg:text-base font-medium transition-opacity duration-300 group-hover:opacity-0",
            MinecartLCD.className
          )}>
            {item.title}
          </span>
          
          {item.label && (
            <span className={cn(
              "px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide relative z-20 transition-opacity duration-300 group-hover:opacity-0",
              getLabelStyles(item.labelColor),
              MinecartLCD.className
            )}>
              {item.label}
            </span>
          )}
        </div>

        {/* Marquee Effect */}
        <div 
          className="absolute inset-0 bg-white rounded-[40px] overflow-hidden pointer-events-none"
          ref={marqueeRef}
          style={{ transform: "translateY(101%)" }}
        >
          <div 
            className="h-full w-[400%] flex"
            ref={marqueeInnerRef}
          >
            <div className="flex items-center h-full w-full animate-marquee">
              {repeatedMarqueeContent}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white scrollbar-track-black">
      <div className="p-4 lg:p-6 space-y-6 lg:space-y-8">
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-3 lg:space-y-4">
            {/* Category Title */}
            <h3 className={cn(
              "text-white font-bold text-sm lg:text-base uppercase tracking-wide",
              MinecartLCD.className
            )}>
              {category.title}
            </h3>
            
            {/* Category Items */}
            <div className="space-y-2">
              {category.items.map((item, itemIndex) => (
                <FlowingMenuItem
                  key={itemIndex}
                  item={item}
                  isSelected={selectedItem === item.title}
                  onItemClick={handleItemClick}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 