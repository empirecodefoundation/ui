"use client";

import React from "react";
import { PromptEditor } from "@/components/core/prompt-edditor";
import { toast } from "sonner";

export default function PromptEditorEx() {
  const handleTest = async (prompt: string, model: string) => {
    // Simulate API call to AI provider
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(
          `This is a mock response for the prompt: "${prompt.substring(
            0,
            50
          )}..." using model: ${model}`
        );
      }, 1000);
    });
  };

  const handleSave = (template: any) => {
    console.log("Saving template:", template);
    toast.success("Template saved to local storage!");
    // Here you would typically save to your backend
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          PromptEditor Example
        </h1>
        <PromptEditor
          onTest={handleTest}
          onSave={handleSave}
          className="shadow-xl"
        />
      </div>
    </div>
  );
}
