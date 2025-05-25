import React, { useState, useRef } from "react";

export interface VoiceCommandButtonProps {
  onCommand: (command: string) => void;
  onError?: (error: string) => void;
  className?: string;
  theme?: "light" | "dark";
}

export const VoiceCommandButton: React.FC<VoiceCommandButtonProps> = ({
  onCommand,
  onError,
  className = "",
  theme = "light",
}) => {
  const [listening, setListening] = useState(false);
  const [error, setError] = useState("");
  const recognitionRef = useRef<any>(null);

  const styles = {
    button: {
      background: listening ? "#dc2626" : "#6366f1",
      color: "#fff",
      border: 0,
      borderRadius: "50%",
      width: 56,
      height: 56,
      fontSize: 28,
      cursor: "pointer",
      marginBottom: 8,
      transition: "all 0.2s ease",
    },
    error: {
      color: "#dc2626",
      marginBottom: 8,
    },
  };

  const handleMicClick = () => {
    setError("");
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      setError("Speech recognition not supported in this browser.");
      onError?.("Speech recognition not supported in this browser.");
      return;
    }
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onresult = (event: any) => {
      const command = event.results[0][0].transcript;
      onCommand(command);
    };
    recognition.onerror = (event: any) => {
      setError(event.error);
      onError?.(event.error);
      setListening(false);
    };
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  return (
    <div className={className} style={{ textAlign: "center" }}>
      <button
        style={styles.button}
        onClick={handleMicClick}
        aria-label={listening ? "Stop Listening" : "Start Listening"}
      >
        {listening ? "■" : "🎤"}
      </button>
      {error && <div style={styles.error}>{error}</div>}
    </div>
  );
};

export default VoiceCommandButton;
