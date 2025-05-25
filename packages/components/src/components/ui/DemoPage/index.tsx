import React, { useState } from "react";
import { AISummarizer } from "../AISummarizer";
import { SpeechToText } from "../SpeechToText";
import { ChatInterface } from "../ChatInterface";
import { AIImageGenerator } from "../AIImageGenerator";
import { SmartDataTable } from "../SmartDataTable";
import { PromptEditor } from "../PromptEditor";
import { VoiceCommandButton } from "../VoiceCommandButton";

const styles = {
  demoPage: {
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  dark: {
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
  },
  header: {
    marginBottom: "2rem",
  },
  controls: {
    display: "flex",
    gap: "1rem",
    marginTop: "1rem",
  },
  input: {
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    flex: 1,
  },
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  buttonHover: {
    backgroundColor: "#0051a2",
  },
  section: {
    marginBottom: "3rem",
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  darkSection: {
    borderColor: "#333",
  },
  h1: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  h2: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
  },
};

const DemoPage: React.FC = () => {
  const [openAIApiKey, setOpenAIApiKey] = useState<string>("");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const handleError = (error: string) => {
    console.error("Error:", error);
  };

  const sampleData = [
    { name: "John", age: 30, city: "New York" },
    { name: "Jane", age: 25, city: "London" },
    { name: "Bob", age: 35, city: "Paris" },
  ];

  const columns = ["name", "age", "city"];

  return (
    <div
      style={{ ...styles.demoPage, ...(theme === "dark" ? styles.dark : {}) }}
    >
      <header style={styles.header}>
        <h1 style={styles.h1}>EmpireUI AI Components Demo</h1>
        <div style={styles.controls}>
          <input
            type="text"
            placeholder="Enter OpenAI API Key"
            value={openAIApiKey}
            onChange={(e) => setOpenAIApiKey(e.target.value)}
            style={styles.input}
          />
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            style={styles.button}
            onMouseOver={(e) =>
              Object.assign(e.currentTarget.style, styles.buttonHover)
            }
            onMouseOut={(e) =>
              Object.assign(e.currentTarget.style, styles.button)
            }
          >
            Toggle Theme
          </button>
        </div>
      </header>

      <main>
        <section
          style={{
            ...styles.section,
            ...(theme === "dark" ? styles.darkSection : {}),
          }}
        >
          <h2 style={styles.h2}>AISummarizer</h2>
          <AISummarizer
            openAIApiKey={openAIApiKey}
            onSummaryGenerated={(summary) => console.log(summary)}
            onError={handleError}
            theme={theme}
          />
        </section>

        <section
          style={{
            ...styles.section,
            ...(theme === "dark" ? styles.darkSection : {}),
          }}
        >
          <h2 style={styles.h2}>SpeechToText</h2>
          <SpeechToText
            openAIApiKey={openAIApiKey}
            onTranscription={(text) => console.log(text)}
            onError={handleError}
            theme={theme}
          />
        </section>

        <section
          style={{
            ...styles.section,
            ...(theme === "dark" ? styles.darkSection : {}),
          }}
        >
          <h2 style={styles.h2}>ChatInterface</h2>
          <ChatInterface
            openAIApiKey={openAIApiKey}
            systemPrompt="You are a helpful assistant."
            onMessage={(message) => console.log(message)}
            onError={handleError}
            theme={theme}
          />
        </section>

        <section
          style={{
            ...styles.section,
            ...(theme === "dark" ? styles.darkSection : {}),
          }}
        >
          <h2 style={styles.h2}>AIImageGenerator</h2>
          <AIImageGenerator
            openAIApiKey={openAIApiKey}
            onImageGenerated={(url) => console.log(url)}
            onError={handleError}
            theme={theme}
          />
        </section>

        <section
          style={{
            ...styles.section,
            ...(theme === "dark" ? styles.darkSection : {}),
          }}
        >
          <h2 style={styles.h2}>SmartDataTable</h2>
          <SmartDataTable
            openAIApiKey={openAIApiKey}
            data={sampleData}
            columns={columns}
            onQuery={(query, result) => console.log(result)}
            onError={handleError}
            theme={theme}
          />
        </section>

        <section
          style={{
            ...styles.section,
            ...(theme === "dark" ? styles.darkSection : {}),
          }}
        >
          <h2 style={styles.h2}>PromptEditor</h2>
          <PromptEditor
            openAIApiKey={openAIApiKey}
            initialPrompt="Write a story about"
            onTest={(result) => console.log(result)}
            onSave={(prompt) => console.log(prompt)}
            onError={handleError}
            theme={theme}
          />
        </section>

        <section
          style={{
            ...styles.section,
            ...(theme === "dark" ? styles.darkSection : {}),
          }}
        >
          <h2 style={styles.h2}>VoiceCommandButton</h2>
          <VoiceCommandButton
            onCommand={(command) => console.log(command)}
            onError={handleError}
            theme={theme}
          />
        </section>
      </main>
    </div>
  );
};

export default DemoPage;
