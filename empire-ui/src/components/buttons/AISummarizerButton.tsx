"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

const useAISummarizer = () => {
  const [isSummarizing, setIsSummarizing] = React.useState(false);
  const [summary, setSummary] = React.useState<string>("");
  const summaryRef = React.useRef<HTMLDivElement>(null);

  const handleSummarize = async (selectedText: string) => {
    if (!selectedText) {
      return;
    }

    setIsSummarizing(true);
    setSummary("");

    try {
      const response = await fetch("/api/buttons/AISummarizerButton", {
        method: "POST",
        body: `Summarize the following text: ${selectedText}`,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = (await reader?.read()) ?? {
          done: true,
          value: new Uint8Array(),
        };
        if (done) break;
        const chunk = decoder.decode(value);
        setSummary((prev) => prev + chunk);
      }
    } catch (error) {
      console.error("Error summarizing text:", error);
      alert("An error occurred while summarizing the text. Please try again.");
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      summaryRef.current &&
      !summaryRef.current.contains(event.target as Node)
    ) {
      setSummary("");
    }
  };

  React.useEffect(() => {
    if (summary) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [summary]);

  return { isSummarizing, summary, handleSummarize, summaryRef };
};

interface AISummarizerButtonProps {
  className?: string;
  buttonClassName?: string;
  tooltipClassName?: string;
  summaryClassName?: string;
}

const AISummarizerButton: React.FC<AISummarizerButtonProps> = ({
  className,
  buttonClassName,
  tooltipClassName,
  summaryClassName,
  ...props
}) => {
  const { isSummarizing, summary, handleSummarize, summaryRef } =
    useAISummarizer();

  const handleClick = async () => {
    const selectedText = window.getSelection()?.toString();
    await handleSummarize(selectedText || "");
  };

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <motion.button
            onClick={handleClick}
            className={cn(
              "fixed bottom-4 right-4 p-3 bg-primary text-primary-foreground rounded-full shadow-lg",
              buttonClassName
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={isSummarizing}
          >
            <Zap
              className={cn("h-6 w-6", isSummarizing ? "animate-pulse" : "")}
            />
            <span className="sr-only">Summarize selected text</span>
          </motion.button>
        </Tooltip.Trigger>
        <Tooltip.Content
          className={cn(
            "bg-secondary text-secondary-foreground px-3 py-1 rounded shadow-md text-sm",
            tooltipClassName
          )}
          sideOffset={5}
          {...props}
        >
          Summarize selected text
        </Tooltip.Content>
      </Tooltip.Root>
      {summary && (
        <div
          ref={summaryRef}
          className={cn(
            "fixed bottom-20 right-4 w-64 p-4 bg-background border border-border rounded-md shadow-lg",
            summaryClassName
          )}
        >
          <h3 className="text-lg font-semibold mb-2">Summary:</h3>
          <p className="text-sm">{summary}</p>
        </div>
      )}
    </Tooltip.Provider>
  );
};

export { AISummarizerButton };
