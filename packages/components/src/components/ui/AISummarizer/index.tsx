import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";

// Types for summarization options
export interface SummarizationOptions {
  maxLength?: number;
  style?: "concise" | "detailed" | "bullet-points";
  language?: string;
  focus?: string[];
}

export interface AISummarizerProps {
  openAIApiKey: string;
  options?: SummarizationOptions;
  onSummaryGenerated?: (summary: string) => void;
  onError?: (error: string) => void;
  className?: string;
  theme?: "light" | "dark";
}

// Default styles with theme support
const getStyles = (theme: "light" | "dark") => ({
  card: {
    border: `1px solid ${theme === "light" ? "#e5e7eb" : "#374151"}`,
    borderRadius: 12,
    padding: 24,
    maxWidth: 480,
    margin: "40px auto",
    background: theme === "light" ? "#fff" : "#1f2937",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    color: theme === "light" ? "#1f2937" : "#f3f4f6",
  },
  button: {
    background: "#6366f1",
    color: "#fff",
    border: 0,
    borderRadius: 6,
    padding: "8px 20px",
    fontWeight: 600,
    cursor: "pointer",
    marginBottom: 16,
    transition: "all 0.2s ease",
  },
  input: {
    marginBottom: 12,
    padding: "8px 12px",
    borderRadius: 6,
    border: `1px solid ${theme === "light" ? "#e5e7eb" : "#374151"}`,
    background: theme === "light" ? "#fff" : "#374151",
    color: theme === "light" ? "#1f2937" : "#f3f4f6",
  },
  summary: {
    background: theme === "light" ? "#f3f4f6" : "#374151",
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
    whiteSpace: "pre-wrap" as const,
  },
  error: {
    color: "#dc2626",
    marginBottom: 8,
  },
});

export const AISummarizer: React.FC<AISummarizerProps> = ({
  openAIApiKey,
  options = {},
  onSummaryGenerated,
  onError,
  className = "",
  theme = "light",
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [progress, setProgress] = useState(0);

  const styles = getStyles(theme);

  // Enhanced file reading with progress
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setError("");
      setSummary("");
      const f = e.target.files?.[0];
      if (!f) return;
      setFile(f);

      // Check file size (max 5MB)
      if (f.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }

      // Check file type
      const allowedTypes = [
        "text/plain",
        "text/markdown",
        "application/json",
        "text/csv",
        "text/x-log",
      ];
      if (!allowedTypes.includes(f.type)) {
        setError("Unsupported file type. Please upload a text file.");
        return;
      }

      const reader = new FileReader();
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          setProgress((event.loaded / event.total) * 100);
        }
      };
      reader.onload = (ev) => {
        setText(ev.target?.result as string);
        setProgress(100);
      };
      reader.onerror = () => {
        setError("Failed to read file.");
        onError?.("Failed to read file.");
      };
      reader.readAsText(f);
    },
    [onError]
  );

  // Enhanced summarization with options
  const handleSummarize = async () => {
    setError("");
    setSummary("");
    setLoading(true);
    try {
      if (!openAIApiKey) {
        const errorMsg =
          "OpenAI API key not set. Pass it as the 'openAIApiKey' prop to AISummarizer.";
        setError(errorMsg);
        onError?.(errorMsg);
        setLoading(false);
        return;
      }

      const {
        maxLength = 200,
        style = "concise",
        language = "English",
        focus = [],
      } = options;

      let prompt = `Summarize the following document in ${language}:\n\n`;
      prompt += `Style: ${style}\n`;
      prompt += `Maximum length: ${maxLength} words\n`;
      if (focus.length > 0) {
        prompt += `Focus on: ${focus.join(", ")}\n`;
      }
      prompt += `\nDocument:\n${text}`;

      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openAIApiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant that summarizes documents.",
            },
            { role: "user", content: prompt },
          ],
          max_tokens: 512,
          temperature: 0.7,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error?.message || "OpenAI API error");
      }

      const data = await res.json();
      const generatedSummary =
        data.choices?.[0]?.message?.content || "No summary returned.";
      setSummary(generatedSummary);
      onSummaryGenerated?.(generatedSummary);
    } catch (err: any) {
      const errorMsg = err.message || "Failed to summarize.";
      setError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
      style={styles.card}
    >
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
        AI-Powered Summarizer
      </h2>

      <div style={{ marginBottom: 16 }}>
        <input
          type="file"
          accept=".txt,.md,.json,.csv,.log"
          onChange={handleFileChange}
          style={styles.input}
        />
        {progress > 0 && progress < 100 && (
          <div style={{ marginTop: 8 }}>
            <div
              style={{
                width: "100%",
                height: 4,
                background: "#e5e7eb",
                borderRadius: 2,
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                style={{
                  height: "100%",
                  background: "#6366f1",
                  borderRadius: 2,
                }}
              />
            </div>
          </div>
        )}
      </div>

      {file && (
        <div
          style={{
            marginBottom: 8,
            color: theme === "light" ? "#555" : "#9ca3af",
          }}
        >
          Selected: {file.name}
        </div>
      )}

      <button
        onClick={handleSummarize}
        disabled={!text || loading}
        style={{
          ...styles.button,
          opacity: !text || loading ? 0.5 : 1,
          cursor: !text || loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={styles.error}
        >
          {error}
        </motion.div>
      )}

      {summary && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.summary}
        >
          <strong>Summary:</strong>
          <div>{summary}</div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AISummarizer;
