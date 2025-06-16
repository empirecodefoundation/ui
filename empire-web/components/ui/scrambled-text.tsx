import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

export interface ScrambledTextProps {
  sectionWidth?: number; // Width of each vertical section
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
  sectionWidth = 150, // Default section width in pixels
  duration = 0.4, // Shorter timeline
  speed = 1.2, // Faster speed
  scrambleChars = ".:",
  className = "",
  style = {},
  children,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const charsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (!rootRef.current) return;

    const split = SplitText.create(rootRef.current.querySelector("p"), {
      type: "chars",
      charsClass: "char",
    });
    charsRef.current = split.chars as HTMLElement[];

    charsRef.current.forEach((c) => {
      gsap.set(c, {
        display: "inline-block",
        attr: { "data-content": c.innerHTML },
      });
    });

    const handleMove = (e: PointerEvent) => {
      if (!rootRef.current) return;
      
      const containerRect = rootRef.current.getBoundingClientRect();
      const mouseX = e.clientX - containerRect.left;
      
      // Calculate which vertical section the mouse is in
      const currentSection = Math.floor(mouseX / sectionWidth);
      
      charsRef.current.forEach((c) => {
        const { left, width } = c.getBoundingClientRect();
        const charX = left - containerRect.left + width / 2;
        const charSection = Math.floor(charX / sectionWidth);
        
        // Only scramble characters in the same vertical section as the mouse
        if (charSection === currentSection) {
          gsap.to(c, {
            overwrite: true,
            duration: duration,
            scrambleText: {
              text: (c as HTMLElement).dataset.content || "",
              chars: scrambleChars,
              speed,
            },
            ease: "power2.out",
          });
        }
      });
    };

    const handleLeave = () => {
      // Quickly restore all text when mouse leaves
      charsRef.current.forEach((c) => {
        gsap.to(c, {
          overwrite: true,
          duration: 0.2,
          scrambleText: {
            text: (c as HTMLElement).dataset.content || "",
            chars: scrambleChars,
            speed: 2,
          },
          ease: "power2.out",
        });
      });
    };

    const el = rootRef.current;
    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);

    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
      split.revert();
    };
  }, [sectionWidth, duration, speed, scrambleChars]);

  return (
    <div ref={rootRef} className={`text-block ${className}`} style={style}>
      <p>{children}</p>
    </div>
  );
};

export default ScrambledText; 