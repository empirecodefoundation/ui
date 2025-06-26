"use client";

import React from "react";
import Waves from "../ui/Waves";

export default function WavyBackgroundPreview() {
  return (
    <div className="relative h-96 w-full bg-white border border-black overflow-hidden">
      <Waves
        lineColor="#000"
        backgroundColor="rgba(255, 255, 255, 0.2)"
        waveSpeedX={0.02}
        waveSpeedY={0.01}
        waveAmpX={40}
        waveAmpY={20}
        friction={0.9}
        tension={0.01}
        maxCursorMove={120}
        xGap={12}
        yGap={36}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2 className="text-2xl font-bold text-black">Wavy Background</h2>
      </div>
    </div>
  );
} 