import React from "react";
import { gsap } from "gsap";
import { MinecartLCD } from "@/lib/fonts";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  name: string;
  tag?: string | null;
  isSubheader?: boolean;
  onClick?: () => void;
  isSelected?: boolean;
}

const FlowingMenuItem: React.FC<SidebarItemProps> = ({ 
  name, 
  tag, 
  isSubheader, 
  onClick, 
  isSelected 
}) => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);
  const staticTextRef = React.useRef<HTMLSpanElement>(null);

  const animationDefaults: gsap.TweenVars = { duration: 0.8, ease: "expo.out" };

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

  const handleMouseEnter = (ev: React.MouseEvent<HTMLButtonElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current || isSubheader)
      return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    const tl = gsap.timeline({ defaults: animationDefaults });

    // Hide static text immediately when marquee starts
    if (staticTextRef.current) {
      gsap.set(staticTextRef.current, { opacity: 0 });
    }

    tl.set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" }, 0);
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLButtonElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current || isSubheader)
      return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    const tl = gsap.timeline({ defaults: animationDefaults });

    // Show static text back when marquee leaves
    tl.to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .to(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0)
      .set(staticTextRef.current, { opacity: 1 }, 0.4); // Show text after marquee is gone
  };

  const repeatedMarqueeContent = React.useMemo(() => {
    return Array.from({ length: 8 }).map((_, idx) => (
      <React.Fragment key={idx}>
        <span 
          className={MinecartLCD.className}
          style={{
            color: '#060010',
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: 1.2,
            padding: '0 1.5rem'
          }}
        >
          {name}
        </span>
        <span 
          className={MinecartLCD.className}
          style={{
            color: '#060010',
            padding: '0 1rem',
            fontWeight: 'bold',
            fontSize: '14px'
          }}
        >
          •
        </span>
      </React.Fragment>
    ));
  }, [name]);

  if (isSubheader) {
    return (
      <div className={cn("text-gray-400 font-medium text-sm mt-4 mb-2", MinecartLCD.className)}>
        {name}
      </div>
    );
  }

  return (
    <div 
      className="relative overflow-hidden"
      ref={itemRef}
      style={{ borderRadius: '25px' }}
    >
      <button
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "w-full text-left py-2 px-3 flex items-center justify-between group relative z-10",
          isSelected
            ? "bg-gray-800 text-white"
            : "text-gray-300",
          MinecartLCD.className
        )}
        style={{ borderRadius: '25px' }}
      >
        <span ref={staticTextRef}>{name}</span>
        {tag && (
          <span
            className="px-2 py-1 text-xs font-medium bg-white text-black relative z-20"
            style={{ borderRadius: '12px' }}
          >
            {tag}
          </span>
        )}
      </button>
      
      {/* Marquee overlay - only affects this specific item */}
      <div 
        ref={marqueeRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          overflow: 'hidden',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          background: '#fff',
          transform: 'translate3d(0, 101%, 0)',
          borderRadius: '25px',
          zIndex: 15
        }}
      >
        <div 
          ref={marqueeInnerRef}
          style={{
            height: '100%',
            width: '200%',
            display: 'flex',
            transform: 'translateX(0)'
          }}
        >
          <div 
                       style={{
             display: 'flex',
             alignItems: 'center',
             position: 'relative',
             height: '100%',
             width: '200%',
             willChange: 'transform',
             animation: 'sidebarMarquee 6s linear infinite'
           }}
          >
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes sidebarMarquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default FlowingMenuItem; 