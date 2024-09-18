"use client";

import { motion } from "framer-motion";
import { ChevronDownIcon, Bot } from "lucide-react";
import { useState } from "react";
import { AIChatbox } from "../AIChatbox";

export const ChatboxDemo1 = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbox = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto p-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1 }}
          onClick={toggleChatbox}
          className="bg-black fixed right-4 bottom-5 text-white rounded-full p-4 shadow-lg hover:opacity-90 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        >
          {isOpen ? <ChevronDownIcon size={24} /> : <Bot size={24} />}
        </motion.button>
        <AIChatbox className="absolute bottom-24 right-5" isOpen={isOpen} />
      </main>
    </div>
  );
};
