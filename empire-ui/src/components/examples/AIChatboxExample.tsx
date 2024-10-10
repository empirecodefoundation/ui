"use client";

import { motion } from "framer-motion";
import { ChevronDownIcon, Bot, MessageCircle } from "lucide-react";
import { useState } from "react";
import { AIChatbox } from "../core/AIChatbox";
import { cn } from "@/lib/utils";

export const AIChatboxExample = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleChatbox = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="bg-background text-foreground">
      <main className="mx-auto p-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1 }}
          onClick={toggleChatbox}
          className="rounded-full p-4 shadow-lg  border-muted-foreground hover:opacity-90 transition duration-300 ease-in-out"
        >
          {isOpen ? <ChevronDownIcon size={24} /> : <MessageCircle size={24} />}
        </motion.button>
        <AIChatbox
          className={cn("hidden", isOpen && "inline-block")}
          isOpen={isOpen}
        />
      </main>
    </div>
  );
};
