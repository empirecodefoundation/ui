import React, { useState, useRef, useEffect } from "react";
import { Button } from "../../base/Button";
import { Card } from "../../base/Card";
import { useTheme } from "../../../hooks/useTheme";
import { useApi } from "../../../hooks/useApi";
import { cn } from "../../../utils/cn";
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  Bot,
  User,
  Settings,
  Loader2,
} from "lucide-react";
import {
  SpeechToTextResponse,
  TextToSpeechResponse,
  ChatResponse,
} from "../../../types/api";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface AIChatInterfaceProps {
  className?: string;
  initialMessages?: Message[];
  onMessageSent?: (message: Message) => void;
  onMessageReceived?: (message: Message) => void;
  placeholder?: string;
  maxMessages?: number;
  autoScroll?: boolean;
}

export const AIChatInterface: React.FC<AIChatInterfaceProps> = ({
  className,
  initialMessages = [],
  onMessageSent,
  onMessageReceived,
  placeholder = "Type your message...",
  maxMessages = 50,
  autoScroll = true,
}) => {
  const { theme, setTheme } = useTheme();
  const { callApi, loading, error } = useApi();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, autoScroll]);

  // Handle speech recognition
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const formData = new FormData();
        formData.append("audio", audioBlob);

        try {
          const response = await callApi<SpeechToTextResponse>(
            "/api/speech-to-text",
            {
              method: "POST",
              body: formData,
            }
          );

          if (response.text) {
            handleSendMessage(response.text);
          }
        } catch (error) {
          console.error("Error processing speech:", error);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Handle text-to-speech
  const speakMessage = async (text: string) => {
    try {
      setIsSpeaking(true);
      const response = await callApi<TextToSpeechResponse>(
        "/api/text-to-speech",
        {
          method: "POST",
          body: JSON.stringify({ text }),
        }
      );

      if (response.audioUrl) {
        const audio = new Audio(response.audioUrl);
        audio.onended = () => setIsSpeaking(false);
        await audio.play();
      }
    } catch (error) {
      console.error("Error with text-to-speech:", error);
      setIsSpeaking(false);
    }
  };

  // Handle message sending
  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage].slice(-maxMessages));
    onMessageSent?.(userMessage);
    setInputValue("");

    try {
      const response = await callApi<ChatResponse>("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: content }),
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.reply,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage].slice(-maxMessages));
      onMessageReceived?.(assistantMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Card
      className={cn(
        "flex flex-col h-[600px] w-full max-w-2xl mx-auto bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">AI Chat Assistant</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300",
              message.role === "assistant" ? "justify-start" : "justify-end"
            )}
          >
            {message.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
            )}
            <div
              className={cn(
                "max-w-[80%] rounded-lg p-3 shadow-sm",
                message.role === "assistant"
                  ? "bg-muted text-foreground"
                  : "bg-primary text-primary-foreground"
              )}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
            {message.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="border-t p-4 bg-muted/50">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Theme</label>
              <div className="flex gap-2 mt-1">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("light")}
                >
                  Light
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("dark")}
                >
                  Dark
                </Button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Voice Settings</label>
              <div className="flex gap-2 mt-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSpeaking(!isSpeaking)}
                >
                  {isSpeaking ? "Stop Speaking" : "Start Speaking"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Input Container */}
      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={isRecording ? stopRecording : startRecording}
            className={cn(
              "transition-colors",
              isRecording && "text-destructive hover:text-destructive/90"
            )}
          >
            {isRecording ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </Button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && !e.shiftKey && handleSendMessage(inputValue)
            }
            placeholder={placeholder}
            className="flex-1 min-w-0 px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || loading}
            className="transition-colors"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              speakMessage(messages[messages.length - 1]?.content || "")
            }
            disabled={!messages.length || isSpeaking}
            className="transition-colors"
          >
            {isSpeaking ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </Button>
        </div>
        {error && (
          <p className="text-destructive text-sm mt-2 animate-in fade-in slide-in-from-bottom-4">
            {error.message}
          </p>
        )}
      </div>
    </Card>
  );
};
