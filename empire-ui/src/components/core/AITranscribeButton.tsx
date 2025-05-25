"use client";

import { useState, useRef } from "react";
import { Mic, Loader2, FileAudio, Copy, Download } from "lucide-react";
import { motion } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AITranscribeButtonProps {
  className?: string;
  buttonClassName?: string;
  tooltipClassName?: string;
  cardClassName?: string;
  transcriptionClassName?: string;
  onTranscriptionComplete?: (transcription: string) => void;
}

export const AITranscribeButton: React.FC<AITranscribeButtonProps> = ({
  className = "",
  buttonClassName = "",
  tooltipClassName = "",
  cardClassName = "",
  transcriptionClassName = "",
  onTranscriptionComplete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [transcription, setTranscription] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
    }
  };

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTranscription("");
      setAudioFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleTranscribe = async () => {
    if (!audioFile) return;

    setIsTranscribing(true);
    setTranscription("");

    try {
      // Create FormData to send the file
      const formData = new FormData();
      formData.append("file", audioFile);

      const response = await fetch("/api/buttons/AITranscribeButton", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Transcription failed");
      }

      const data = await response.json();
      setTranscription(data.text);

      if (onTranscriptionComplete) {
        onTranscriptionComplete(data.text);
      }
    } catch (error) {
      console.error("Error transcribing audio:", error);
      setTranscription("Error: Failed to transcribe audio. Please try again.");
    } finally {
      setIsTranscribing(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcription);
  };

  const downloadTranscription = () => {
    const element = document.createElement("a");
    const file = new Blob([transcription], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "transcription.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className={`relative ${className}`}>
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleButtonClick}
              className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ${buttonClassName}`}
              aria-label="Transcribe audio with AI"
            >
              <Mic className="w-4 h-4 mr-2" />
              Transcribe Audio
            </motion.button>
          </Tooltip.Trigger>
          <Tooltip.Content
            className={`bg-zinc-950 text-white px-4 py-2 rounded-xl shadow-lg text-sm transition-opacity duration-200 ease-in-out ${tooltipClassName}`}
            sideOffset={8}
          >
            Transcribe audio with AI
          </Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>

      {isOpen && (
        <Card className={`mt-4 w-full max-w-md ${cardClassName}`}>
          <CardHeader>
            <CardTitle className="text-lg">AI Audio Transcription</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="flex-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
                <Button
                  onClick={handleTranscribe}
                  disabled={!audioFile || isTranscribing}
                  size="sm"
                >
                  {isTranscribing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing
                    </>
                  ) : (
                    <>
                      <FileAudio className="w-4 h-4 mr-2" />
                      Transcribe
                    </>
                  )}
                </Button>
              </div>

              {audioFile && (
                <div className="text-sm text-muted-foreground">
                  Selected file: {audioFile.name}
                </div>
              )}

              {transcription && (
                <div className={`mt-4 ${transcriptionClassName}`}>
                  <div className="text-sm font-medium mb-2">Transcription:</div>
                  <div className="p-3 bg-muted rounded-md text-sm whitespace-pre-wrap">
                    {transcription}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          {transcription && (
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={downloadTranscription}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </CardFooter>
          )}
        </Card>
      )}
    </div>
  );
};