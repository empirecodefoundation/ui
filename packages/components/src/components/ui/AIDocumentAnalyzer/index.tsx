// @ts-nocheck
"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
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
  Zap,
  X,
  RotateCcw,
  Copy,
  Share2,
  ChevronDown,
  ChevronUp,
  Info,
  Clock,
  TrendingUp,
  Users,
  Tag,
  BarChart3,
  FileCheck,
  Plus,
  Trash2,
  RefreshCw,
  HelpCircle,
  Maximize2,
  Minimize2,
  Filter,
  Search,
  Calendar,
  Star,
  Bookmark
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisResult {
  id: string;
  summary: string;
  keyPoints: string[];
  sentiment: "positive" | "negative" | "neutral";
  entities: string[];
  topics: string[];
  readabilityScore: number;
  wordCount: number;
  confidence: number;
  timestamp: string;
  processingTime: number;
  language?: string;
  complexity?: "low" | "medium" | "high";
}

interface FileItem {
  id: string;
  file: File;
  preview?: string;
  status: "pending" | "processing" | "completed" | "error";
  progress: number;
  result?: AnalysisResult;
  error?: string;
}

interface AIDocumentAnalyzerProps {
  className?: string;
  onAnalysisComplete?: (result: AnalysisResult) => void;
  onBatchComplete?: (results: AnalysisResult[]) => void;
  maxFileSize?: number; // in MB
  maxFiles?: number;
  acceptedFileTypes?: string[];
  apiEndpoint?: string;
  enableBatch?: boolean;
  enableHistory?: boolean;
  theme?: "light" | "dark" | "auto";
}

export const AIDocumentAnalyzer: React.FC<AIDocumentAnalyzerProps> = ({
  className,
  onAnalysisComplete,
  onBatchComplete,
  maxFileSize = 10,
  maxFiles = 5,
  acceptedFileTypes = [".pdf", ".png", ".jpg", ".jpeg", ".txt", ".docx"],
  apiEndpoint = "/api/ai-document-analyzer",
  enableBatch = true,
  enableHistory = true,
  theme = "auto"
}) => {
  // Enhanced state management
  const [files, setFiles] = useState<FileItem[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterSentiment, setFilterSentiment] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Refs and animations
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const progressControls = useAnimation();

  // Enhanced drag and drop with better visual feedback
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => prev + 1);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragActive(true);
      controls.start({
        scale: 1.02,
        borderColor: "#8b5cf6",
        backgroundColor: "rgba(139, 92, 246, 0.05)",
        transition: { duration: 0.2 }
      });
    }
  }, [controls]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => {
      const newCount = prev - 1;
      if (newCount === 0) {
        setDragActive(false);
        controls.start({
          scale: 1,
          borderColor: "#d1d5db",
          backgroundColor: "transparent",
          transition: { duration: 0.2 }
        });
      }
      return newCount;
    });
  }, [controls]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setDragCounter(0);

    controls.start({
      scale: 1,
      borderColor: "#d1d5db",
      backgroundColor: "transparent",
      transition: { duration: 0.2 }
    });

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      handleMultipleFileSelection(droppedFiles);
    }
  }, [controls]);

  // Enhanced file handling with batch processing and previews
  const generateFilePreview = useCallback(async (file: File): Promise<string | undefined> => {
    if (file.type.startsWith('image/')) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });
    }
    return undefined;
  }, []);

  const validateFile = useCallback((file: File): string | null => {
    // Validate file size
    if (file.size > maxFileSize * 1024 * 1024) {
      return `File "${file.name}" exceeds ${maxFileSize}MB limit`;
    }

    // Validate file type
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    if (!acceptedFileTypes.includes(fileExtension)) {
      return `File type "${fileExtension}" not supported. Accepted: ${acceptedFileTypes.join(", ")}`;
    }

    return null;
  }, [maxFileSize, acceptedFileTypes]);

  const handleMultipleFileSelection = useCallback(async (selectedFiles: File[]) => {
    setGlobalError(null);

    // Check if batch processing is enabled
    if (!enableBatch && selectedFiles.length > 1) {
      setGlobalError("Batch processing is disabled. Please select only one file.");
      return;
    }

    // Check max files limit
    if (files.length + selectedFiles.length > maxFiles) {
      setGlobalError(`Maximum ${maxFiles} files allowed. Currently have ${files.length} files.`);
      return;
    }

    const newFiles: FileItem[] = [];

    for (const file of selectedFiles) {
      const validationError = validateFile(file);
      if (validationError) {
        setGlobalError(validationError);
        continue;
      }

      const preview = await generateFilePreview(file);
      const fileItem: FileItem = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        preview,
        status: "pending",
        progress: 0
      };

      newFiles.push(fileItem);
    }

    if (newFiles.length > 0) {
      setFiles(prev => [...prev, ...newFiles]);

      // Animate new files in
      controls.start({
        opacity: [0, 1],
        y: [20, 0],
        transition: { duration: 0.3, staggerChildren: 0.1 }
      });
    }
  }, [files.length, maxFiles, enableBatch, validateFile, generateFilePreview, controls]);

  const handleSingleFileSelection = useCallback((selectedFile: File) => {
    handleMultipleFileSelection([selectedFile]);
  }, [handleMultipleFileSelection]);

  const removeFile = useCallback((fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    setGlobalError(null);
  }, []);

  const clearAllFiles = useCallback(() => {
    setFiles([]);
    setGlobalError(null);
    setIsProcessing(false);
  }, []);

  // Enhanced analysis with batch processing and streaming progress
  const analyzeFile = useCallback(async (fileItem: FileItem): Promise<void> => {
    const startTime = Date.now();

    try {
      // Update file status to processing
      setFiles(prev => prev.map(f =>
        f.id === fileItem.id
          ? { ...f, status: "processing", progress: 0 }
          : f
      ));

      const formData = new FormData();
      formData.append("file", fileItem.file);

      // Simulate progress updates for better UX
      const progressInterval = setInterval(() => {
        setFiles(prev => prev.map(f =>
          f.id === fileItem.id && f.progress < 90
            ? { ...f, progress: f.progress + Math.random() * 15 }
            : f
        ));
      }, 500);

      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`);
      }

      const result = await response.json();
      const processingTime = Date.now() - startTime;

      const analysisResult: AnalysisResult = {
        ...result.analysis,
        id: `analysis-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        processingTime
      };

      // Update file with completed analysis
      setFiles(prev => prev.map(f =>
        f.id === fileItem.id
          ? {
              ...f,
              status: "completed",
              progress: 100,
              result: analysisResult
            }
          : f
      ));

      // Add to history if enabled
      if (enableHistory) {
        setAnalysisHistory(prev => [analysisResult, ...prev.slice(0, 19)]); // Keep last 20
      }

      onAnalysisComplete?.(analysisResult);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Analysis failed";

      setFiles(prev => prev.map(f =>
        f.id === fileItem.id
          ? {
              ...f,
              status: "error",
              progress: 0,
              error: errorMessage
            }
          : f
      ));
    }
  }, [apiEndpoint, enableHistory, onAnalysisComplete]);

  const analyzeAllFiles = useCallback(async () => {
    const pendingFiles = files.filter(f => f.status === "pending");
    if (pendingFiles.length === 0) return;

    setIsProcessing(true);
    setGlobalError(null);

    try {
      // Process files sequentially for better resource management
      for (const file of pendingFiles) {
        await analyzeFile(file);
        // Small delay between files to prevent overwhelming the API
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Trigger batch complete callback
      const completedResults = files
        .filter(f => f.result)
        .map(f => f.result!)
        .filter(Boolean);

      if (completedResults.length > 0) {
        onBatchComplete?.(completedResults);
      }

    } catch (err) {
      setGlobalError(err instanceof Error ? err.message : "Batch analysis failed");
    } finally {
      setIsProcessing(false);
    }
  }, [files, analyzeFile, onBatchComplete]);

  const retryFailedAnalysis = useCallback((fileId: string) => {
    const fileItem = files.find(f => f.id === fileId);
    if (fileItem && fileItem.status === "error") {
      analyzeFile(fileItem);
    }
  }, [files, analyzeFile]);

  // Enhanced utility functions with better visual indicators
  const getFileIcon = useCallback((fileName: string, size: "sm" | "md" | "lg" = "md") => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    const sizeClasses = {
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8"
    };

    const iconSize = sizeClasses[size];

    switch (extension) {
      case "pdf":
        return <FileText className={cn(iconSize, "text-red-500")} />;
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
      case "bmp":
      case "webp":
        return <FileImage className={cn(iconSize, "text-blue-500")} />;
      case "txt":
      case "rtf":
        return <FileType className={cn(iconSize, "text-gray-600")} />;
      case "docx":
      case "doc":
        return <FileText className={cn(iconSize, "text-blue-600")} />;
      default:
        return <FileText className={cn(iconSize, "text-gray-500")} />;
    }
  }, []);

  const getStatusIcon = useCallback((status: FileItem["status"], size: "sm" | "md" = "sm") => {
    const sizeClasses = {
      sm: "h-4 w-4",
      md: "h-5 w-5"
    };

    const iconSize = sizeClasses[size];

    switch (status) {
      case "pending":
        return <Clock className={cn(iconSize, "text-gray-400")} />;
      case "processing":
        return <Loader2 className={cn(iconSize, "text-blue-500 animate-spin")} />;
      case "completed":
        return <CheckCircle className={cn(iconSize, "text-green-500")} />;
      case "error":
        return <AlertCircle className={cn(iconSize, "text-red-500")} />;
      default:
        return null;
    }
  }, []);

  const getSentimentColor = useCallback((sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-emerald-700 bg-emerald-50 border-emerald-200";
      case "negative":
        return "text-red-700 bg-red-50 border-red-200";
      default:
        return "text-slate-700 bg-slate-50 border-slate-200";
    }
  }, []);

  const getComplexityColor = useCallback((complexity?: string) => {
    switch (complexity) {
      case "low":
        return "text-green-700 bg-green-50 border-green-200";
      case "medium":
        return "text-yellow-700 bg-yellow-50 border-yellow-200";
      case "high":
        return "text-red-700 bg-red-50 border-red-200";
      default:
        return "text-gray-700 bg-gray-50 border-gray-200";
    }
  }, []);

  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  const formatProcessingTime = useCallback((ms: number): string => {
    if (ms < 1000) return `${ms}ms`;
    const seconds = Math.floor(ms / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ${seconds % 60}s`;
  }, []);

  const toggleSection = useCallback((sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  }, []);

  // Enhanced export functionality with multiple formats
  const exportResults = useCallback((format: "json" | "csv" | "txt" | "pdf", results?: AnalysisResult[]) => {
    const dataToExport = results || analysisHistory;
    if (dataToExport.length === 0) return;

    const timestamp = new Date().toISOString().split('T')[0];

    switch (format) {
      case "json":
        const jsonData = {
          exportDate: new Date().toISOString(),
          totalAnalyses: dataToExport.length,
          analyses: dataToExport
        };
        downloadFile(
          JSON.stringify(jsonData, null, 2),
          `document-analysis-${timestamp}.json`,
          "application/json"
        );
        break;

      case "csv":
        const csvHeaders = [
          "Timestamp", "Summary", "Sentiment", "Word Count",
          "Readability Score", "Confidence", "Processing Time", "Key Points", "Topics", "Entities"
        ];
        const csvRows = dataToExport.map(result => [
          result.timestamp,
          `"${result.summary.replace(/"/g, '""')}"`,
          result.sentiment,
          result.wordCount,
          result.readabilityScore,
          result.confidence,
          result.processingTime,
          `"${result.keyPoints.join('; ').replace(/"/g, '""')}"`,
          `"${result.topics.join('; ').replace(/"/g, '""')}"`,
          `"${result.entities.join('; ').replace(/"/g, '""')}"`
        ]);
        const csvContent = [csvHeaders, ...csvRows].map(row => row.join(",")).join("\n");
        downloadFile(csvContent, `document-analysis-${timestamp}.csv`, "text/csv");
        break;

      case "txt":
        const txtContent = dataToExport.map((result, index) => `
ANALYSIS ${index + 1}
================
Date: ${new Date(result.timestamp).toLocaleString()}
Summary: ${result.summary}
Sentiment: ${result.sentiment}
Word Count: ${result.wordCount}
Readability Score: ${result.readabilityScore}/10
Confidence: ${Math.round(result.confidence * 100)}%
Processing Time: ${formatProcessingTime(result.processingTime)}

Key Points:
${result.keyPoints.map(point => `• ${point}`).join('\n')}

Topics: ${result.topics.join(', ')}
Entities: ${result.entities.join(', ')}

${'='.repeat(50)}
        `).join('\n');
        downloadFile(txtContent, `document-analysis-${timestamp}.txt`, "text/plain");
        break;
    }
  }, [analysisHistory, formatProcessingTime]);

  const downloadFile = useCallback((content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  }, []);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'u':
            event.preventDefault();
            fileInputRef.current?.click();
            break;
          case 'Enter':
            event.preventDefault();
            if (files.some(f => f.status === "pending")) {
              analyzeAllFiles();
            }
            break;
          case 'Escape':
            event.preventDefault();
            setSelectedResult(null);
            setIsFullscreen(false);
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [files, analyzeAllFiles]);

  return (
    <div className={cn(
      "w-full mx-auto transition-all duration-300",
      isFullscreen ? "fixed inset-0 z-50 bg-white p-4 overflow-auto" : "max-w-7xl p-6",
      className
    )}>
      {/* Enhanced Header with Controls */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Brain className="h-10 w-10 text-purple-600" />
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">AI Document Analyzer</h2>
              <p className="text-sm text-gray-500">
                {enableBatch ? `Batch processing enabled (max ${maxFiles} files)` : "Single file processing"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "px-3 py-1 rounded text-sm font-medium transition-all",
                viewMode === "grid"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "px-3 py-1 rounded text-sm font-medium transition-all",
                viewMode === "list"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              List
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <motion.button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </motion.button>

          {/* Help Button */}
          <motion.button
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Keyboard shortcuts: Ctrl+U (upload), Ctrl+Enter (analyze), Esc (close)"
          >
            <HelpCircle className="h-5 w-5" />
          </motion.button>
        </div>
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
