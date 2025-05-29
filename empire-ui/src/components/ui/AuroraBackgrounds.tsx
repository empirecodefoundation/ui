"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function AuroraBackground({
  className,
  children,
  ...props
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-black",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-600/30 blur-[100px]" />
        <div className="absolute -top-10 -right-40 h-[400px] w-[400px] rounded-full bg-indigo-600/30 blur-[100px]" />
        <div className="absolute bottom-20 left-20 h-[400px] w-[400px] rounded-full bg-blue-600/20 blur-[100px]" />
        <div className="absolute -bottom-40 right-10 h-[500px] w-[500px] rounded-full bg-pink-600/20 blur-[100px]" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
} 