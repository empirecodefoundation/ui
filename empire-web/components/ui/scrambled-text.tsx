import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

export interface ScrambledTextProps {
  /** The radius around the mouse pointer within which characters will scramble */
  radius?: number;
  /** The duration of the scramble effect on a character */
  duration?: number;
  /** The speed of the scramble animation */
  speed?: number;
  /** The characters used for scrambling */
  scrambleChars?: string;
  /** The text content to be scrambled */
  children: React.ReactNode;
  /** Additional CSS classes for the component */
  className?: string;
  /** Inline styles for the component */
  style?: React.CSSProperties;
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
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
      const mouseY = e.clientY - containerRect.top;
      
      charsRef.current.forEach((c) => {
        const { left, top, width, height } = c.getBoundingClientRect();
        const charX = left - containerRect.left + width / 2;
        const charY = top - containerRect.top + height / 2;
        
        // Calculate distance from mouse to character center
        const distance = Math.sqrt(
          Math.pow(mouseX - charX, 2) + Math.pow(mouseY - charY, 2)
        );
        
        // Only scramble characters within the specified radius
        if (distance <= radius) {
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
  }, [radius, duration, speed, scrambleChars]);

  return (
    <div ref={rootRef} className={`text-block ${className}`} style={style}>
      <p>{children}</p>
    </div>
  );
};

export default ScrambledText; 