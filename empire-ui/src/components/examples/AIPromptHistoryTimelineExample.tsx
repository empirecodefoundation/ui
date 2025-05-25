'use client';
import React, { useState } from "react";
import AIPromptHistoryTimeline, { AIPromptHistoryItem } from "../AIPromptHistoryTimeline";

const initialItems: AIPromptHistoryItem[] = [
  {
    prompt: "Summarize this article",
    response: "Here's the summary...",
    timestamp: Math.floor(Date.now() / 1000) - 120,
  },
  {
    prompt: "Translate this",
    response: "Voici la traduction...",
    timestamp: Math.floor(Date.now() / 1000) - 60 * 10,
  },
  {
    prompt: "What is the capital of France?",
    response: "Paris.",
    timestamp: Math.floor(Date.now() / 1000) - 60 * 60,
  },
];

const AIPromptHistoryTimelineExample: React.FC = () => {
  const [items, setItems] = useState<AIPromptHistoryItem[]>(initialItems);

  const handleClear = () => setItems([]);

  return (
    <div className="max-w-xl mx-auto my-8">
      <AIPromptHistoryTimeline
        items={items}
        onClear={handleClear}
        className=""
      />
    </div>
  );
};

export default AIPromptHistoryTimelineExample; 