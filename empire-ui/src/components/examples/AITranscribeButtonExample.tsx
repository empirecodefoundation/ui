"use client";

import { AITranscribeButton } from "../core/AITranscribeButton";

export const AITranscribeButtonExample = () => {
  return (
    <div className="p-6">
      <div className="flex flex-col gap-5">
        <div className="text-sm text-muted-foreground">
          Upload an audio file and get an AI-powered transcription.
        </div>
        <AITranscribeButton />
      </div>
    </div>
  );
};