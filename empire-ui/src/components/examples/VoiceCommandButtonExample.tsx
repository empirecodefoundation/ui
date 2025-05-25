'use client';
import React from "react";
import VoiceCommandButton from "../ai/voice-command-button";

const setTheme = (theme: string) => {
  if (theme === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
};

export const VoiceCommandButtonExample = () => (
  <div className="flex flex-col items-center justify-center min-h-[200px]">
    <VoiceCommandButton
      label="Speak"
      commands={{
        "scroll down": () => window.scrollBy(0, 500),
        "scroll up": () => window.scrollBy(0, -500),
        "dark mode": () => setTheme("dark"),
        "light mode": () => setTheme("light"),
      }}
      onCommandRecognized={(cmd) => console.log("Recognized:", cmd)}
    />
  </div>
);

export default VoiceCommandButtonExample; 