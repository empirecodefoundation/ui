"use client";

import React, { useState } from "react";

type SentimentResult = {
  label: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
  score: number;
};

type SentimentWidgetProps = {
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  resultClassName?: string;
  emojiSize?: number;
  showConfidence?: boolean;
  apiUrl?: string;
  onAnalyze?: (result: SentimentResult) => void;
};

export function AISentimentWidget({
  className = "",
  inputClassName = "",
  buttonClassName = "",
  resultClassName = "",
  emojiSize = 24,
  showConfidence = true,
  apiUrl = process.env.NEXT_PUBLIC_HF_API_URL,
  onAnalyze
}: SentimentWidgetProps) {
  const [text, setText] = useState("");
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeSentiment = async () => {
    if (!text.trim()) {
      setError("Please enter some text to analyze");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiUrl || "", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_HF_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: text }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("Invalid API response format");
      }

      const analysisResult = {
        label: data[0].label,
        score: data[0].score
      };

      setResult(analysisResult);
      onAnalyze?.(analysisResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const getSentimentColor = (label: string) => {
    switch (label) {
      case "POSITIVE": return "bg-green-100 text-green-800";
      case "NEGATIVE": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getSentimentEmoji = (label: string) => {
    switch (label) {
      case "POSITIVE": return "😊";
      case "NEGATIVE": return "😞";
      default: return "😐";
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <textarea
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={`w-full p-3 border rounded-lg ${inputClassName}`}
        placeholder="Type something to analyze sentiment..."
        disabled={loading}
      />

      <button
        onClick={analyzeSentiment}
        disabled={loading || !text.trim()}
        className={`px-4 py-2 rounded-lg transition-colors ${
          loading || !text.trim()
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        } ${buttonClassName}`}
      >
        {loading ? "Analyzing..." : "Analyze Sentiment"}
      </button>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded-lg">
          Error: {error}
        </div>
      )}

      {result && (
        <div className={`p-4 rounded-lg flex items-center gap-3 ${getSentimentColor(result.label)} ${resultClassName}`}>
          <span style={{ fontSize: `${emojiSize}px` }}>
            {getSentimentEmoji(result.label)}
          </span>
          <div>
            <p className="font-medium capitalize">{result.label.toLowerCase()}</p>
            {showConfidence && (
              <p className="text-sm opacity-80">
                Confidence: {(result.score * 100).toFixed(1)}%
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}