import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "../../shared/Card";
import { Input } from "../../shared/Input";
import { Button } from "../../shared/Button";
import { useApi } from "../../../hooks/useApi";
import { useTheme } from "../../../hooks/useTheme";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  openAIApiKey: string;
  systemPrompt: string;
  onMessage: (message: Message) => void;
  onError: (error: string) => void;
  theme?: "light" | "dark";
  className?: string;
  maxMessages?: number;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  openAIApiKey,
  systemPrompt,
  onMessage,
  onError,
  theme: propTheme,
  className = "",
  maxMessages = 50,
}) => {
  const { theme } = useTheme(propTheme);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { callApi, isLoading, error } = useApi<{
    choices: { message: { content: string } }[];
  }>();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage].slice(-maxMessages));
    setInput("");
    onMessage(userMessage);

    try {
      const response = await callApi(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${openAIApiKey}`,
          },
          body: {
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: systemPrompt },
              ...messages.map((m) => ({ role: m.role, content: m.content })),
              { role: "user", content: userMessage.content },
            ],
          },
        }
      );

      const assistantMessage: Message = {
        role: "assistant",
        content: response.choices[0].message.content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage].slice(-maxMessages));
      onMessage(assistantMessage);
    } catch (error) {
      onError(
        error instanceof Error ? error.message : "Failed to get response"
      );
    }
  }, [
    input,
    isLoading,
    messages,
    maxMessages,
    openAIApiKey,
    systemPrompt,
    onMessage,
    onError,
    callApi,
  ]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  return (
    <Card
      theme={theme}
      className={className}
      title="AI Chat"
      subtitle="Chat with an AI assistant"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "500px",
          gap: "1rem",
        }}
      >
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{
                  maxWidth: "80%",
                  padding: "0.75rem 1rem",
                  borderRadius: "12px",
                  fontSize: "0.875rem",
                  lineHeight: 1.5,
                  alignSelf:
                    message.role === "user" ? "flex-end" : "flex-start",
                  backgroundColor:
                    message.role === "user"
                      ? "#0070f3"
                      : theme === "dark"
                      ? "#374151"
                      : "#f3f4f6",
                  color: message.role === "user" ? "white" : "inherit",
                }}
              >
                {message.content}
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                maxWidth: "80%",
                padding: "0.75rem 1rem",
                borderRadius: "12px",
                fontSize: "0.875rem",
                backgroundColor: theme === "dark" ? "#374151" : "#f3f4f6",
                alignSelf: "flex-start",
              }}
            >
              Thinking...
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={isLoading}
            theme={theme}
            fullWidth
            rightIcon={
              <Button
                variant="primary"
                size="sm"
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                theme={theme}
              >
                Send
              </Button>
            }
          />
        </div>
        {error && (
          <div style={{ color: "#dc2626", fontSize: "0.875rem" }}>{error}</div>
        )}
      </div>
    </Card>
  );
};
