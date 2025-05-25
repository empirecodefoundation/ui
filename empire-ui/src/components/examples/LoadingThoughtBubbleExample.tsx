'use client';
import React from "react";
import LoadingThoughtBubble from "../ai/loading-thought-bubble";

export const LoadingThoughtBubbleExample = () => (
  <div className="flex flex-col items-center gap-8 min-h-[120px] justify-center">
    <LoadingThoughtBubble />
    <LoadingThoughtBubble
      messages={["Crunching data...", "Thinking... 🤔", "Generating insights...", "Almost there..."]}
      interval={2000}
      className="mt-4"
    />
  </div>
);

export default LoadingThoughtBubbleExample; 