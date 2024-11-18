"use client";

import { useChat } from "ai/react";
import { ArrowUp, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AIChatboxProps {
  className?: string;
  isOpen?: boolean;
}

export const AIChatbox: React.FC<AIChatboxProps> = ({ className, isOpen }) => {
  //potential issue to solve: make this component non vercel dependent by updating useChat hook. (Github)
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const messagesEndRef: any = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.3 }}
          className={cn("max-w-sm", className)}
        >
          <Card className="bg-white shadow-2xl rounded-lg overflow-hidden">
            <CardHeader className="bg-black text-white p-4">
              <CardTitle className="text-lg flex gap-3 items-center">
                <Bot size={30} className="text-white" />
                <div className="flex flex-col gap-1 text-sm">
                  <p>Noni</p>
                  <div className="flex items-center gap-x-1">
                    <p className="bg-zinc-600 text-xs px-1 rounded">AI</p>
                    <p className="text-xs text-muted-foreground">Active</p>
                    <div className="rounded-full h-1 w-1 mt-0.5 bg-green-400" />
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-1">
              <ScrollArea className="h-96 w-full p-4">
                <div className="flex flex-col w-full mx-auto space-y-6">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${
                        m.role === "user" ? "justify-end" : "justify-start"
                      } `}
                    >
                      <div
                        className={`flex items-start gap-1 ${
                          m.role === "user"
                            ? "flex-row-reverse ml-10"
                            : "flex-row"
                        }`}
                      >
                        {m.role !== "user" && (
                          <Avatar className="flex items-center justify-center bg-black rounded-full size-11">
                            <Bot size={28} className="text-white" />
                          </Avatar>
                        )}
                        <div
                          className={`mx-2 p-3 ${
                            m.role === "user"
                              ? "bg-black text-white rounded-xl"
                              : "bg-zinc-200/60 text-black rounded-md"
                          } shadow-sm`}
                        >
                          <p className="text-sm">{m.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>
            </CardContent>
            <CardFooter className="p-4 bg-gray-100 flex items-center gap-3">
              <form
                onSubmit={handleSubmit}
                className="flex items-center space-x-2 w-full"
              >
                <Input
                  placeholder="Ask me anything..."
                  className="flex-grow border-2 border-black rounded-full px-6 py-3 text-zinc-700 shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300"
                  value={input}
                  onChange={handleInputChange}
                />
              </form>
              <Button
                onClick={handleSubmit}
                disabled={!input}
                type="submit"
                className="bg-black text-white rounded-full p-3 shadow-lg hover:opacity-90 hover:bg-black transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                <ArrowUp className="h-5 w-5" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
