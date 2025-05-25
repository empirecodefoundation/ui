'use client';
import React from "react";
import PromptTemplateCard from "../ai/prompt-template-card";

export const PromptTemplateCardExample = () => (
  <div className="flex flex-col items-center justify-center min-h-[200px]">
    <PromptTemplateCard
      title="Summarizer"
      description="Summarizes emails using GPT-4"
      template="You are a helpful assistant. Summarize this email: {{input}}"
      onChange={updated => console.log('Template changed:', updated)}
      onTestChange={vals => console.log('Test values:', vals)}
    />
  </div>
);

export default PromptTemplateCardExample; 