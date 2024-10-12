"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MessageSquareText } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

const useAIPhraser = () => {
  const [isPhrasing, setIsPhrasing] = React.useState(false);
  const [phrasedText, setPhrasedText] = React.useState<string>("");
  const phrasedTextRef = React.useRef<HTMLDivElement>(null);

  const handlePhrase = async (selectedText: string) => {
    if (!selectedText) {
      return;
    }

    setIsPhrasing(true);
    setPhrasedText("");

    try {
      const response = await fetch("/api/buttons/AIParaphraserButton", {
        method: "POST",
        body: `Paraphrase the following text: ${selectedText}`,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
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
        setPhrasedText((prev) => prev + chunk);
      }
    } catch (error) {
      console.error("Error phrasing text:", error);
      alert("An error occurred while phrasing the text. Please try again.");
    } finally {
      setIsPhrasing(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      phrasedTextRef.current &&
      !phrasedTextRef.current.contains(event.target as Node)
    ) {
      setPhrasedText("");
    }
  };

  React.useEffect(() => {
    if (phrasedText) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [phrasedText]);

  return { isPhrasing, phrasedText, handlePhrase, phrasedTextRef };
};

interface AIPhraseButtonProps {
  className?: string;
  buttonClassName?: string;
  tooltipClassName?: string;
  phrasedTextClassName?: string;
}

const AIPhraseButton: React.FC<AIPhraseButtonProps> = ({
  className,
  buttonClassName,
  tooltipClassName,
  phrasedTextClassName,
  ...props
}) => {
  const { isPhrasing, phrasedText, handlePhrase, phrasedTextRef } =
    useAIPhraser();

  const handleClick = async () => {
    const selectedText = window.getSelection()?.toString();
    await handlePhrase(selectedText || "");
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
              disabled={isPhrasing}
            >
              <MessageSquareText
                className={cn("h-6 w-6", isPhrasing ? "animate-pulse" : "")}
              />
              <span className="sr-only">Phrase selected text</span>
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
            Phrase selected text
          </Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>

      {phrasedText && (
        <div
          ref={phrasedTextRef}
          className={cn(
            "mt-4 p-4 rounded-lg shadow-sm border max-w-full",
            "overflow-x-auto break-words text-sm",
            "md:text-base",
            phrasedTextClassName
          )}
        >
          <h3 className="text-lg font-semibold mb-2">Phrased Text:</h3>
          <p>{phrasedText}</p>
        </div>
      )}
    </div>
  );
};

export { AIPhraseButton };