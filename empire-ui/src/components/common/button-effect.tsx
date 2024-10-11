"use client";

import React, { useState, useRef, useEffect } from "react";

interface ButtonEffect {
  children: React.ReactNode;
}

export default function ButtonEffect({ children }: ButtonEffect) {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const pixelSize = 16; // Increased from 4 to 16
  const buttonWidth = 160;
  const buttonHeight = 48;
  const cols = Math.floor(buttonWidth / pixelSize);
  const rows = Math.floor(buttonHeight / pixelSize);
  const disintegrationRadius = 40; // Increased from 20 to 40 to match the larger pixel size

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    if (isHovering) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovering]);

  const pixels = Array.from({ length: cols * rows }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const pixelX = col * pixelSize + pixelSize / 2;
    const pixelY = row * pixelSize + pixelSize / 2;
    const distanceToMouse = isHovering
      ? Math.sqrt(
          Math.pow(pixelX - mousePosition.x, 2) +
            Math.pow(pixelY - mousePosition.y, 2)
        )
      : Infinity;

    const isDisintegrating = distanceToMouse < disintegrationRadius;
    const disintegrationProgress = isDisintegrating
      ? 1 - distanceToMouse / disintegrationRadius
      : 0;

    const translateX = isDisintegrating
      ? (Math.random() - 0.5) * 40 * disintegrationProgress
      : 0;
    const translateY = isDisintegrating
      ? (Math.random() - 0.5) * 40 * disintegrationProgress
      : 0;
    const scale = isDisintegrating ? 1 - disintegrationProgress : 1;

    return (
      <div
        key={i}
        className="absolute bg-zinc-700 transition-all duration-200"
        style={{
          width: `${pixelSize}px`,
          height: `${pixelSize}px`,
          left: `${col * pixelSize}px`,
          top: `${row * pixelSize}px`,
          transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
          opacity: isDisintegrating ? 1 - disintegrationProgress : 1,
        }}
      />
    );
  });

  return (
    <button
      ref={buttonRef}
      className="relative w-32 h-12 bg-transparent text-zinc-950 font-bold py-1 px-2 rounded focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-opacity-50 overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => alert("Button clicked!")}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0">{pixels}</div>
    </button>
  );
}
