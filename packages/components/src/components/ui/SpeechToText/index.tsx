import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "../../shared/Button";
import { Card } from "../../shared/Card";
import { useApi } from "../../../hooks/useApi";
import { useTheme } from "../../../hooks/useTheme";

interface SpeechToTextProps {
  openAIApiKey: string;
  onTranscription: (text: string) => void;
  onError: (error: string) => void;
  theme?: "light" | "dark";
  className?: string;
  language?: string;
  continuous?: boolean;
}

export const SpeechToText: React.FC<SpeechToTextProps> = ({
  openAIApiKey,
  onTranscription,
  onError,
  theme: propTheme,
  className = "",
  language = "en-US",
  continuous = false,
}) => {
  const { theme } = useTheme(propTheme);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { callApi, isLoading, error } = useApi<{ text: string }>();

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });

        try {
          const formData = new FormData();
          formData.append("file", audioBlob, "audio.webm");
          formData.append("model", "whisper-1");
          formData.append("language", language);

          const response = await callApi(
            "https://api.openai.com/v1/audio/transcriptions",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${openAIApiKey}`,
              },
              body: formData,
            }
          );

          onTranscription(response.text);
        } catch (error) {
          onError(
            error instanceof Error ? error.message : "Transcription failed"
          );
        } finally {
          if (!continuous) {
            setIsRecording(false);
          }
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      onError("Failed to access microphone");
    }
  }, [openAIApiKey, language, continuous, onTranscription, onError, callApi]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
    }
  }, [isRecording]);

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }, [isRecording, startRecording, stopRecording]);

  return (
    <Card
      theme={theme}
      className={className}
      title="Speech to Text"
      subtitle="Click the button to start recording"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Button
          variant={isRecording ? "danger" : "primary"}
          size="lg"
          isLoading={isLoading}
          theme={theme}
          onClick={toggleRecording}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            padding: 0,
          }}
        >
          {isRecording ? (
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: "white",
                borderRadius: "50%",
              }}
            />
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 14C13.6569 14 15 12.6569 15 11V5C15 3.34315 13.6569 2 12 2C10.3431 2 9 3.34315 9 5V11C9 12.6569 10.3431 14 12 14Z"
                fill="currentColor"
              />
              <path
                d="M19 11C19 14.866 15.866 18 12 18C8.13401 18 5 14.866 5 11M12 22V18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </Button>
        {error && (
          <div style={{ color: "#dc2626", fontSize: "0.875rem" }}>{error}</div>
        )}
      </div>
    </Card>
  );
};
