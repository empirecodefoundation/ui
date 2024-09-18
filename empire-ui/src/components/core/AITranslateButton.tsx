"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

const useAITranslator = () => {
  const [isTranslating, setIsTranslating] = React.useState(false);
  const [translation, setTranslation] = React.useState<string>("");
  const translationRef = React.useRef<HTMLDivElement>(null);

  const handleTranslate = async (selectedText: string) => {
    if (!selectedText) {
      return;
    }

    setIsTranslating(true);
    setTranslation("");

    try {
      const response = await fetch("/api/buttons/AITranslatorButton", {
        method: "POST",
        body: `Translate the following text: ${selectedText}`,
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
        setTranslation((prev) => prev + chunk);
      }
    } catch (error) {
      console.error("Error summarizing text:", error);
      alert("An error occurred while summarizing the text. Please try again.");
    } finally {
      setIsTranslating(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      translationRef.current &&
      !translationRef.current.contains(event.target as Node)
    ) {
      setTranslation("");
    }
  };

  React.useEffect(() => {
    if (translation) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [translation]);

  return { isTranslating, translation, handleTranslate, translationRef };
};

interface AITranslaterButtonProps {
  className?: string;
  buttonClassName?: string;
  tooltipClassName?: string;
  translationClassName?: string;
}

const AITranslatorButton: React.FC<AITranslaterButtonProps> = ({
  className,
  buttonClassName,
  tooltipClassName,
  translationClassName,
  ...props
}) => {
  const { isTranslating, translation, handleTranslate, translationRef } =
    useAITranslator();

  const handleClick = async () => {
    const selectedText = window.getSelection()?.toString();
    await handleTranslate(selectedText || "");
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
              disabled={isTranslating}
            >
              <Zap
                className={cn("h-6 w-6", isTranslating ? "animate-pulse" : "")}
              />
              <span className="sr-only">Translate selected text</span>
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
            Translate selected text
          </Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>
      {translation && (
        <div
          ref={translationRef}
          className={cn(
            "absolute top-full mt-4 w-[600px] max-h-80 p-4 border border-zinc-800 bg-zinc-950 rounded-[0.5rem] shadow-md overflow-y-auto",
            "scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-zinc-400 scrollbar-track-gray-100",
            translationClassName
          )}
        >
          <h3 className="text-lg font-semibold mb-3 text-zinc-200">
            Translation:
          </h3>
          <p className="text-sm text-zinc-200 leading-relaxed">{translation}</p>
        </div>
      )}
    </div>
  );
};

export { AITranslatorButton };
