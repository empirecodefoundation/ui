import React from "react";

export const Documentation: React.FC = () => {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1>Documentation</h1>
      <p>
        Welcome to the Empire UI documentation. Here you'll find comprehensive
        guides and documentation to help you start working with Empire UI as
        quickly as possible.
      </p>

      <h2>Getting Started</h2>
      <p>
        Empire UI is a modern UI library that provides powerful AI capabilities
        through its components. To get started, you can:
      </p>
      <ul>
        <li>Use the AI Chat interface for natural conversations</li>
        <li>Generate images with the Image Generator</li>
        <li>Get coding help with the Code Assistant</li>
      </ul>

      <h2>Components</h2>
      <p>Empire UI provides several AI-powered components:</p>
      <ul>
        <li>
          <strong>AIChatInterface</strong> - A chat interface for interacting
          with AI
          <ul>
            <li>Natural language processing</li>
            <li>Voice input/output</li>
            <li>Message history</li>
          </ul>
        </li>
        <li>
          <strong>AIImageGenerator</strong> - Generate images using AI
          <ul>
            <li>Multiple image sizes</li>
            <li>Style options</li>
            <li>Quality settings</li>
          </ul>
        </li>
        <li>
          <strong>AICodeAssistant</strong> - Get help with coding
          <ul>
            <li>Code generation</li>
            <li>Multiple languages</li>
            <li>Syntax highlighting</li>
          </ul>
        </li>
      </ul>

      <h2>Theme Support</h2>
      <p>
        Empire UI supports both light and dark themes. You can toggle between
        them using the theme button in the header.
      </p>

      <h2>API Integration</h2>
      <p>
        All AI components are designed to work with your backend API. You'll
        need to implement the following endpoints:
      </p>
      <ul>
        <li>
          <code>/api/chat</code> - For chat functionality
        </li>
        <li>
          <code>/api/generate-image</code> - For image generation
        </li>
        <li>
          <code>/api/generate-code</code> - For code generation
        </li>
        <li>
          <code>/api/speech-to-text</code> - For voice input
        </li>
        <li>
          <code>/api/text-to-speech</code> - For voice output
        </li>
      </ul>

      <h2>Contributing</h2>
      <p>
        We welcome contributions to Empire UI! Please check our GitHub
        repository for more information on how to contribute.
      </p>
    </div>
  );
};
