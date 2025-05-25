// @ts-nocheck
"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  Upload,
  FileText,
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
  Copy,
  ChevronDown,
  ChevronUp,
  Clock,
  TrendingUp,
  Users,
  Tag,
  BarChart3,
  Plus,
  Trash2,
  RefreshCw,
  HelpCircle,
  Maximize2,
  Minimize2,
  Star,
  Bookmark
} from "lucide-react";
import { cn } from "@/lib/utils";

// Enhanced interfaces with additional features
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

interface EnhancedAIDocumentAnalyzerProps {
  className?: string;
  onAnalysisComplete?: (result: AnalysisResult) => void;
  onBatchComplete?: (results: AnalysisResult[]) => void;
  maxFileSize?: number;
  maxFiles?: number;
  acceptedFileTypes?: string[];
  apiEndpoint?: string;
  enableBatch?: boolean;
  enableHistory?: boolean;
  theme?: "light" | "dark" | "auto";
}

// Enhanced Upload Zone Component
const EnhancedUploadZone: React.FC<{
  files: FileItem[];
  dragActive: boolean;
  onDragEnter: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileSelect: (files: File[]) => void;
  maxFiles: number;
  acceptedFileTypes: string[];
  controls: any;
}> = ({
  files,
  dragActive,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onFileSelect,
  maxFiles,
  acceptedFileTypes,
  controls
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <motion.div
      animate={controls}
      className={cn(
        "relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300",
        "hover:border-purple-400 hover:bg-purple-50/30",
        dragActive
          ? "border-purple-500 bg-purple-50 scale-[1.02]"
          : "border-gray-300",
        files.length > 0 && "border-green-400 bg-green-50/30"
      )}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        accept={acceptedFileTypes.join(",")}
        onChange={(e) => {
          const selectedFiles = Array.from(e.target.files || []);
          if (selectedFiles.length > 0) {
            onFileSelect(selectedFiles);
          }
        }}
      />

      <div className="space-y-6">
        {files.length === 0 ? (
          <>
            <motion.div
              className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center"
              animate={{
                rotate: dragActive ? 360 : 0,
                scale: dragActive ? 1.1 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              <Upload className="h-8 w-8 text-white" />
            </motion.div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">
                Drop your documents here
              </h3>
              <p className="text-gray-600">
                or <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-purple-600 hover:text-purple-700 font-medium underline"
                >
                  browse files
                </button> to upload
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {acceptedFileTypes.map(type => (
                  <span
                    key={type}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    {type}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                Maximum {maxFiles} files, up to 10MB each
              </p>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <p className="font-semibold text-gray-900">
                  {files.length} file{files.length > 1 ? 's' : ''} ready
                </p>
                <p className="text-sm text-gray-600">
                  Click analyze to start processing
                </p>
              </div>
            </div>

            <motion.button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="h-4 w-4" />
              Add more files
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Enhanced File List Component
const EnhancedFileList: React.FC<{
  files: FileItem[];
  viewMode: "grid" | "list";
  onRemove: (id: string) => void;
  onRetry: (id: string) => void;
  getFileIcon: (fileName: string, size?: "sm" | "md" | "lg") => React.ReactNode;
  getStatusIcon: (status: FileItem["status"], size?: "sm" | "md") => React.ReactNode;
  formatFileSize: (bytes: number) => string;
}> = ({
  files,
  viewMode,
  onRemove,
  onRetry,
  getFileIcon,
  getStatusIcon,
  formatFileSize
}) => {
  if (files.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Files ({files.length})
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {files.filter(f => f.status === "completed").length} completed
          </span>
        </div>
      </div>

      <div className={cn(
        viewMode === "grid"
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          : "space-y-3"
      )}>
        <AnimatePresence>
          {files.map((file, index) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all",
                viewMode === "list" && "flex items-center gap-4"
              )}
            >
              {/* File Preview */}
              <div className={cn(
                "flex items-center gap-3",
                viewMode === "grid" ? "mb-3" : "flex-shrink-0"
              )}>
                {file.preview ? (
                  <div className="relative">
                    <img
                      src={file.preview}
                      alt={file.file.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="absolute -top-1 -right-1">
                      {getStatusIcon(file.status)}
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    {getFileIcon(file.file.name, "lg")}
                    <div className="absolute -top-1 -right-1">
                      {getStatusIcon(file.status)}
                    </div>
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {file.file.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(file.file.size)}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              {file.status === "processing" && (
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Processing...</span>
                    <span className="text-sm text-gray-600">{Math.round(file.progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-blue-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${file.progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}

              {/* Error Message */}
              {file.status === "error" && file.error && (
                <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                  {file.error}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {file.status === "error" && (
                    <motion.button
                      onClick={() => onRetry(file.id)}
                      className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </motion.button>
                  )}

                  {file.result && (
                    <motion.button
                      className="p-1 text-green-600 hover:text-green-700 hover:bg-green-50 rounded"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Eye className="h-4 w-4" />
                    </motion.button>
                  )}
                </div>

                <motion.button
                  onClick={() => onRemove(file.id)}
                  className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Enhanced Analysis Results Component
const EnhancedAnalysisResults: React.FC<{
  results: AnalysisResult[];
  expandedSections: Set<string>;
  onToggleSection: (sectionId: string) => void;
  onExport: (format: "json" | "csv" | "txt") => void;
  onCopy: (text: string) => void;
  getSentimentColor: (sentiment: string) => string;
  getComplexityColor: (complexity?: string) => string;
  formatProcessingTime: (ms: number) => string;
}> = ({
  results,
  expandedSections,
  onToggleSection,
  onExport,
  onCopy,
  getSentimentColor,
  getComplexityColor,
  formatProcessingTime
}) => {
  if (results.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-purple-600" />
          Analysis Results ({results.length})
        </h3>

        <div className="flex items-center gap-2">
          <motion.button
            onClick={() => onExport("json")}
            className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="h-4 w-4 mr-1 inline" />
            JSON
          </motion.button>
          <motion.button
            onClick={() => onExport("csv")}
            className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            CSV
          </motion.button>
          <motion.button
            onClick={() => onExport("txt")}
            className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            TXT
          </motion.button>
        </div>
      </div>

      <div className="space-y-4">
        {results.map((result, index) => (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            {/* Result Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500">
                      #{index + 1}
                    </span>
                    <span className="text-sm text-gray-400">
                      {new Date(result.timestamp).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium border",
                      getSentimentColor(result.sentiment)
                    )}>
                      {result.sentiment}
                    </span>

                    {result.complexity && (
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium border",
                        getComplexityColor(result.complexity)
                      )}>
                        {result.complexity} complexity
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={() => onCopy(result.summary)}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Copy className="h-4 w-4" />
                  </motion.button>

                  <motion.button
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Bookmark className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{result.wordCount}</div>
                  <div className="text-xs text-blue-700">Words</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{result.readabilityScore}/10</div>
                  <div className="text-xs text-green-700">Readability</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{Math.round(result.confidence * 100)}%</div>
                  <div className="text-xs text-purple-700">Confidence</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">{formatProcessingTime(result.processingTime)}</div>
                  <div className="text-xs text-gray-700">Processing</div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Summary</h4>
              <p className="text-gray-700 leading-relaxed">{result.summary}</p>
            </div>

            {/* Expandable Sections */}
            <div className="border-t border-gray-100">
              {/* Key Points */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => onToggleSection(`keypoints-${result.id}`)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">Key Points ({result.keyPoints.length})</span>
                  {expandedSections.has(`keypoints-${result.id}`) ?
                    <ChevronUp className="h-5 w-5 text-gray-400" /> :
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  }
                </button>

                <AnimatePresence>
                  {expandedSections.has(`keypoints-${result.id}`) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-4"
                    >
                      <ul className="space-y-2">
                        {result.keyPoints.map((point, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-700">{point}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Topics and Entities */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => onToggleSection(`details-${result.id}`)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">Topics & Entities</span>
                  {expandedSections.has(`details-${result.id}`) ?
                    <ChevronUp className="h-5 w-5 text-gray-400" /> :
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  }
                </button>

                <AnimatePresence>
                  {expandedSections.has(`details-${result.id}`) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                            <Tag className="h-4 w-4" />
                            Topics ({result.topics.length})
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {result.topics.map((topic, idx) => (
                              <motion.span
                                key={idx}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                              >
                                {topic}
                              </motion.span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Entities ({result.entities.length})
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {result.entities.map((entity, idx) => (
                              <motion.span
                                key={idx}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                              >
                                {entity}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
