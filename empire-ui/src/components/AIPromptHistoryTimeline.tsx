import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export type AIPromptHistoryItem = {
  prompt: string;
  response: string;
  timestamp?: number;
};

export interface AIPromptHistoryTimelineProps {
  items: AIPromptHistoryItem[];
  onClear?: () => void;
  className?: string;
}

function formatRelativeTime(timestamp?: number) {
  if (!timestamp) return null;
  return dayjs.unix(timestamp).fromNow();
}

export const AIPromptHistoryTimeline: React.FC<AIPromptHistoryTimelineProps> = ({
  items,
  onClear,
  className = "",
}) => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 1200);
    } catch (e) {
      // fallback or error
    }
  };

  return (
    <div className={`bg-white dark:bg-neutral-900 rounded-lg shadow p-4 max-h-96 overflow-y-auto border border-neutral-200 dark:border-neutral-800 ${className}`}>  
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">Prompt History</h3>
        {onClear && (
          <button
            onClick={onClear}
            className="text-xs px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 transition"
          >
            Clear History
          </button>
        )}
      </div>
      <ul className="space-y-4">
        {items.length === 0 && (
          <li className="text-neutral-400 text-sm text-center py-8">No history yet.</li>
        )}
        {items.map((item, idx) => (
          <li key={idx} className="relative pl-4 border-l-2 border-neutral-200 dark:border-neutral-700">
            <div className="absolute -left-2 top-2 w-3 h-3 bg-blue-500 rounded-full border-2 border-white dark:border-neutral-900" />
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400">
                {formatRelativeTime(item.timestamp)}
              </span>
            </div>
            <div className="mt-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-neutral-800 dark:text-neutral-100">Prompt:</span>
                <button
                  onClick={() => handleCopy(item.prompt, `prompt-${idx}`)}
                  className="text-xs px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-700 text-neutral-500 dark:text-neutral-300"
                >
                  {copied === `prompt-${idx}` ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="text-neutral-700 dark:text-neutral-200 text-sm whitespace-pre-line mb-2">{item.prompt}</div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-neutral-800 dark:text-neutral-100">Response:</span>
                <button
                  onClick={() => handleCopy(item.response, `response-${idx}`)}
                  className="text-xs px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-700 text-neutral-500 dark:text-neutral-300"
                >
                  {copied === `response-${idx}` ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="text-neutral-700 dark:text-neutral-200 text-sm whitespace-pre-line">{item.response}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AIPromptHistoryTimeline; 