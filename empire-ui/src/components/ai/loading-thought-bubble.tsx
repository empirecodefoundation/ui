'use client';
import React, { useEffect, useRef, useState } from "react";

interface LoadingThoughtBubbleProps {
  messages?: string[];
  interval?: number;
  className?: string;
}

const DEFAULT_MESSAGES = [
  "Thinking... 🤔",
  "Crunching data...",
  "Generating insights...",
  "Almost there...",
  "Consulting the AI brain...",
  "Dreaming up answers...",
];

export const LoadingThoughtBubble: React.FC<LoadingThoughtBubbleProps> = ({
  messages = DEFAULT_MESSAGES,
  interval = 3000,
  className = "",
}) => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setFade(false);
    const fadeTimeout = setTimeout(() => setFade(true), 100);
    return () => clearTimeout(fadeTimeout);
  }, [index]);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, interval);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index, interval, messages.length]);

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white dark:bg-zinc-900 shadow-md border border-gray-200 dark:border-zinc-700 min-h-[44px] transition-all duration-300 ${className}`}
      aria-live="polite"
    >
      <span
        className={`transition-opacity duration-500 ease-in-out ${fade ? "opacity-100" : "opacity-0"}`}
      >
        {messages[index]}
      </span>
      <span className="flex items-end ml-2">
        <span className="w-2 h-2 bg-blue-400 rounded-full mx-0.5 animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="w-2 h-2 bg-blue-400 rounded-full mx-0.5 animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="w-2 h-2 bg-blue-400 rounded-full mx-0.5 animate-bounce" style={{ animationDelay: "300ms" }} />
      </span>
    </div>
  );
};

export default LoadingThoughtBubble; 