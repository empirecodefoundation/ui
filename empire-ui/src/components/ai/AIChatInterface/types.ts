export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export interface AIChatInterfaceProps {
  className?: string;
  initialMessages?: Message[];
  onMessageSent?: (message: Message) => void;
  onMessageReceived?: (message: Message) => void;
  placeholder?: string;
  maxMessages?: number;
  autoScroll?: boolean;
}

export interface ChatResponse {
  reply: string;
  audioUrl?: string;
}

export interface SpeechToTextResponse {
  text: string;
}

export interface TextToSpeechResponse {
  audioUrl: string;
}
