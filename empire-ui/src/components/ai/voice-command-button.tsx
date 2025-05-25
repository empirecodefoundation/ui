'use client';
import React, { useRef, useState } from "react";

interface VoiceCommandButtonProps {
  commands: Record<string, () => void>;
  onCommandRecognized?: (command: string) => void;
  onError?: (error: string) => void;
  label?: string;
}

const getSpeechRecognition = () => {
  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  return SpeechRecognition ? new SpeechRecognition() : null;
};

export const VoiceCommandButton: React.FC<VoiceCommandButtonProps> = ({
  commands,
  onCommandRecognized,
  onError,
  label,
}) => {
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);

  const handleResult = (event: any) => {
    const result = Array.from(event.results)
      .map((res: any) => res[0].transcript)
      .join("")
      .toLowerCase()
      .trim();
    setTranscript(result);
    let matched = false;
    Object.keys(commands).forEach((cmd) => {
      if (result.includes(cmd.toLowerCase())) {
        commands[cmd]();
        onCommandRecognized?.(cmd);
        matched = true;
      }
    });
    if (!matched) {
      setError("Command not recognized");
      onError?.("Command not recognized");
    } else {
      setError(null);
    }
    setListening(false);
  };

  const handleError = (event: any) => {
    setError(event.error || "Speech recognition error");
    onError?.(event.error || "Speech recognition error");
    setListening(false);
  };

  const startListening = () => {
    setError(null);
    setTranscript("");
    const recognition = getSpeechRecognition();
    if (!recognition) {
      setError("SpeechRecognition API not supported in this browser.");
      onError?.("SpeechRecognition API not supported in this browser.");
      return;
    }
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.onresult = handleResult;
    recognition.onerror = handleError;
    recognition.onend = () => setListening(false);
    recognition.start();
    setListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        aria-label={listening ? "Stop listening" : "Start listening"}
        onClick={listening ? stopListening : startListening}
        className={`relative flex items-center justify-center w-14 h-14 rounded-full border border-gray-300 bg-white shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          listening ? "ring-2 ring-blue-400 animate-pulse" : ""
        }`}
      >
        <svg
          className={`w-7 h-7 text-gray-700 ${listening ? "text-blue-500" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18v2m0 0c-3.314 0-6-2.686-6-6m6 6c3.314 0 6-2.686 6-6m-6 6V4m0 0a3 3 0 013 3v5a3 3 0 01-6 0V7a3 3 0 013-3z"
          />
        </svg>
        {listening && (
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs text-blue-500 animate-pulse">
            Listening...
          </span>
        )}
      </button>
      {label && <span className="text-sm text-gray-600 mt-1">{label}</span>}
      {transcript && (
        <span className="text-xs text-gray-500 mt-1">“{transcript}”</span>
      )}
      {error && (
        <span className="text-xs text-red-500 mt-1">{error}</span>
      )}
    </div>
  );
};

export default VoiceCommandButton; 