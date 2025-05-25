// @ts-nocheck
"use client";

import React, { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  Image,
  Brain,
  Loader2,
  Download,
  Eye,
  Sparkles,
  AlertCircle,
  CheckCircle,
  FileImage,
  FileType,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisResult {
  summary: string;
  keyPoints: string[];
  sentiment: "positive" | "negative" | "neutral";
  entities: string[];
  topics: string[];
  readabilityScore: number;
  wordCount: number;
  confidence: number;
}

interface AIDocumentAnalyzerProps {
  className?: string;
  onAnalysisComplete?: (result: AnalysisResult) => void;
  maxFileSize?: number; // in MB
  acceptedFileTypes?: string[];
  apiEndpoint?: string;
}

export const AIDocumentAnalyzer: React.FC<AIDocumentAnalyzerProps> = ({
  className,
  onAnalysisComplete,
  maxFileSize = 10,
  acceptedFileTypes = [".pdf", ".png", ".jpg", ".jpeg", ".txt", ".docx"],
  apiEndpoint = "/api/ai-document-analyzer"
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [extractedText, setExtractedText] = useState<string>("");
  const [analysisStep, setAnalysisStep] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelection = (selectedFile: File) => {
    setError(null);

    // Validate file size
    if (selectedFile.size > maxFileSize * 1024 * 1024) {
      setError(`File size must be less than ${maxFileSize}MB`);
      return;
    }

    // Validate file type
    const fileExtension = "." + selectedFile.name.split(".").pop()?.toLowerCase();
    if (!acceptedFileTypes.includes(fileExtension)) {
      setError(`File type not supported. Accepted types: ${acceptedFileTypes.join(", ")}`);
      return;
    }

    setFile(selectedFile);
    setAnalysisResult(null);
    setExtractedText("");
  };

  const analyzeDocument = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);
    setAnalysisStep("Uploading document...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      setAnalysisStep("Extracting text...");

      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`);
      }

      setAnalysisStep("Analyzing content with AI...");

      const result = await response.json();

      setAnalysisStep("Generating insights...");

      // Simulate processing time for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));

      setAnalysisResult(result.analysis);
      setExtractedText(result.extractedText);
      onAnalysisComplete?.(result.analysis);

    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setIsAnalyzing(false);
      setAnalysisStep("");
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "pdf":
        return <FileText className="h-8 w-8 text-red-500" />;
      case "png":
      case "jpg":
      case "jpeg":
        return <FileImage className="h-8 w-8 text-blue-500" />;
      case "txt":
        return <FileType className="h-8 w-8 text-gray-500" />;
      default:
        return <FileText className="h-8 w-8 text-gray-500" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600 bg-green-50";
      case "negative":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const downloadResults = () => {
    if (!analysisResult || !file) return;

    const results = {
      fileName: file.name,
      analysisDate: new Date().toISOString(),
      extractedText,
      analysis: analysisResult
    };

    const blob = new Blob([JSON.stringify(results, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analysis-${file.name.split(".")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-6 space-y-6", className)}>
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Brain className="h-8 w-8 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900">AI Document Analyzer</h2>
        </div>
        <p className="text-gray-600">
          Upload documents for AI-powered analysis, extraction, and insights
        </p>
      </div>

      {/* Upload Area */}
      <motion.div
        className={cn(
          "relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200",
          dragActive
            ? "border-purple-500 bg-purple-50"
            : "border-gray-300 hover:border-gray-400",
          file && "border-green-500 bg-green-50"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept={acceptedFileTypes.join(",")}
          onChange={(e) => e.target.files?.[0] && handleFileSelection(e.target.files[0])}
        />

        {!file ? (
          <div className="space-y-4">
            <Upload className="h-12 w-12 text-gray-400 mx-auto" />
            <div>
              <p className="text-lg font-medium text-gray-900">
                Drop your document here or click to browse
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Supports: {acceptedFileTypes.join(", ")} (max {maxFileSize}MB)
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              {getFileIcon(file.name)}
              <div className="text-left">
                <p className="font-medium text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>

            <motion.button
              onClick={analyzeDocument}
              disabled={isAnalyzing}
              className={cn(
                "inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all",
                "bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4" />
                  Analyze Document
                </>
              )}
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* Analysis Progress */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4"
          >
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
              <div>
                <p className="font-medium text-blue-900">Processing Document</p>
                <p className="text-sm text-blue-700">{analysisStep}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="font-medium text-red-900">Analysis Error</p>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analysis Results */}
      <AnimatePresence>
        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-900">Analysis Results</h3>
              </div>
              <button
                onClick={downloadResults}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="h-4 w-4" />
                Export Results
              </button>
            </div>

            {/* Summary Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Summary</h4>
              <p className="text-gray-700 leading-relaxed">{analysisResult.summary}</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{analysisResult.wordCount}</div>
                <div className="text-sm text-gray-600">Words</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{analysisResult.readabilityScore}/10</div>
                <div className="text-sm text-gray-600">Readability</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{Math.round(analysisResult.confidence * 100)}%</div>
                <div className="text-sm text-gray-600">Confidence</div>
              </div>
            </div>

            {/* Sentiment Analysis */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Sentiment Analysis</h4>
              <div className={cn(
                "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
                getSentimentColor(analysisResult.sentiment)
              )}>
                {analysisResult.sentiment.charAt(0).toUpperCase() + analysisResult.sentiment.slice(1)}
              </div>
            </div>

            {/* Key Points */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Points</h4>
              <ul className="space-y-2">
                {analysisResult.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Entities and Topics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Entities</h4>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.entities.map((entity, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {entity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Topics</h4>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.topics.map((topic, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Extracted Text */}
            {extractedText && (
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-semibold text-gray-900">Extracted Text</h4>
                  <button
                    onClick={() => {
                      const element = document.getElementById('extracted-text');
                      if (element) {
                        element.style.maxHeight = element.style.maxHeight === 'none' ? '200px' : 'none';
                      }
                    }}
                    className="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700"
                  >
                    <Eye className="h-4 w-4" />
                    Toggle Full Text
                  </button>
                </div>
                <div
                  id="extracted-text"
                  className="max-h-48 overflow-y-auto bg-gray-50 p-4 rounded-lg text-sm text-gray-700 leading-relaxed transition-all duration-300"
                  style={{ maxHeight: '200px' }}
                >
                  {extractedText}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
