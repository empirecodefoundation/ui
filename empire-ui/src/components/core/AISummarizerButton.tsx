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
    <div className={cn("relative", className)}>
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <motion.button
              onClick={handleClick}
              whileTap={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              className={cn(
                "p-3 bg-white text-zinc-800 border-2 border-black rounded-full transition-colors duration-200 hover:bg-zinc-100 hover:text-zinc-700",
                buttonClassName
              )}
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
              "bg-zinc-950 text-white px-4 py-2 rounded-xl shadow-lg text-sm",
              "transition-opacity duration-200 ease-in-out",
              tooltipClassName
            )}
            sideOffset={8}
            {...props}
          >
            Summarize selected text
          </Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>
      {summary && (
        <div
          ref={summaryRef}
          className={cn(
            "absolute top-full mt-4 w-[600px] max-h-80 p-4 border border-zinc-800 bg-zinc-950 rounded-[0.5rem] shadow-md overflow-y-auto",
            "scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-zinc-400 scrollbar-track-gray-100",
            summaryClassName
          )}
        >
          <h3 className="text-lg font-semibold mb-3 text-zinc-200">Summary:</h3>
          <p className="text-sm text-zinc-200 leading-relaxed">{summary}</p>
        </div>
      )}
    </div>
  );
};

export { AISummarizerButton };
