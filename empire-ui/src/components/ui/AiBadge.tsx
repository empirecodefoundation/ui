"use client";
import { Sparkles } from "lucide-react";

type AiBadgeProps = {
  label?: string;
  className?: string;
};

export default function AiBadge({
  label = "AI Powered",
  className = "",
}: AiBadgeProps) {
  return (
    <span
      className={`
        relative inline-flex items-center gap-2
        bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600
        text-white text-xs sm:text-sm font-semibold
        px-5 py-2 rounded-full shadow-lg
        text-shadow-md
        transition-transform duration-300 ease-in-out
        hover:scale-105 hover:brightness-110
        animate-glow
        ${className}
      `}
    >
      <Sparkles className="w-5 h-5 animate-shimmer" />
      {label}

      {/* Glowing border ring */}
      <style jsx>{`
        span::before {
          content: "";
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border-radius: 9999px; /* rounded-full */
          background: linear-gradient(
            270deg,
            #7c3aed,
            #d946ef,
            #ec4899,
            #7c3aed,
            #d946ef
          );
          background-size: 1000% 1000%;
          filter: blur(6px);
          animation: glowingBorder 8s linear infinite;
          z-index: -1;
        }

        @keyframes glowingBorder {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </span>
  );
}
