import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AIImageGeneratorProps {
  openAIApiKey: string;
  onImageGenerated: (url: string) => void;
  onError: (error: string) => void;
  theme?: "light" | "dark";
  className?: string;
  defaultSize?: "256x256" | "512x512" | "1024x1024";
  defaultStyle?: "vivid" | "natural";
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "1rem",
  },
  input: {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    fontSize: "0.875rem",
    outline: "none",
  },
  controls: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
  select: {
    padding: "0.5rem",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    fontSize: "0.875rem",
    outline: "none",
  },
  button: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.875rem",
    fontWeight: 500,
  },
  imageContainer: {
    position: "relative" as const,
    width: "100%",
    aspectRatio: "1",
    borderRadius: "12px",
    overflow: "hidden",
    backgroundColor: "#f3f4f6",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  },
  loading: {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "0.5rem",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "3px solid #f3f4f6",
    borderTopColor: "#0070f3",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  dark: {
    backgroundColor: "#1f2937",
    color: "#f3f4f6",
  },
  light: {
    backgroundColor: "white",
    color: "#1f2937",
  },
  darkInput: {
    backgroundColor: "#374151",
    color: "#f3f4f6",
    borderColor: "#4b5563",
  },
  darkSelect: {
    backgroundColor: "#374151",
    color: "#f3f4f6",
    borderColor: "#4b5563",
  },
  darkImageContainer: {
    backgroundColor: "#374151",
  },
};

export const AIImageGenerator: React.FC<AIImageGeneratorProps> = ({
  openAIApiKey,
  onImageGenerated,
  onError,
  theme = "light",
  className = "",
  defaultSize = "512x512",
  defaultStyle = "vivid",
}) => {
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState(defaultSize);
  const [style, setStyle] = useState(defaultStyle);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const generateImage = useCallback(async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openAIApiKey}`,
          },
          body: JSON.stringify({
            prompt: prompt.trim(),
            n: 1,
            size,
            style,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await response.json();
      const url = data.data[0].url;
      setImageUrl(url);
      onImageGenerated(url);
    } catch (error) {
      onError(
        error instanceof Error ? error.message : "Failed to generate image"
      );
    } finally {
      setIsLoading(false);
    }
  }, [prompt, size, style, isLoading, openAIApiKey, onImageGenerated, onError]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        generateImage();
      }
    },
    [generateImage]
  );

  return (
    <div
      style={{
        ...styles.container,
        ...(theme === "dark" ? styles.dark : styles.light),
      }}
      className={className}
    >
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Describe the image you want to generate..."
        disabled={isLoading}
        style={{
          ...styles.input,
          ...(theme === "dark" ? styles.darkInput : {}),
        }}
      />
      <div style={styles.controls}>
        <select
          value={size}
          onChange={(e) => setSize(e.target.value as typeof size)}
          disabled={isLoading}
          style={{
            ...styles.select,
            ...(theme === "dark" ? styles.darkSelect : {}),
          }}
        >
          <option value="256x256">256x256</option>
          <option value="512x512">512x512</option>
          <option value="1024x1024">1024x1024</option>
        </select>
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value as typeof style)}
          disabled={isLoading}
          style={{
            ...styles.select,
            ...(theme === "dark" ? styles.darkSelect : {}),
          }}
        >
          <option value="vivid">Vivid</option>
          <option value="natural">Natural</option>
        </select>
        <button
          onClick={generateImage}
          disabled={isLoading || !prompt.trim()}
          style={{
            ...styles.button,
            opacity: isLoading || !prompt.trim() ? 0.5 : 1,
            cursor: isLoading || !prompt.trim() ? "not-allowed" : "pointer",
          }}
        >
          Generate
        </button>
      </div>
      <div
        style={{
          ...styles.imageContainer,
          ...(theme === "dark" ? styles.darkImageContainer : {}),
        }}
      >
        <AnimatePresence>
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={styles.loading}
            >
              <div style={styles.spinner} />
              <span>Generating image...</span>
            </motion.div>
          ) : imageUrl ? (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={imageUrl}
              alt={prompt}
              style={styles.image}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};
