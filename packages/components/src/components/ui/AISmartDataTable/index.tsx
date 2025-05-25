// @ts-nocheck
"use client";

import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  Upload,
  Brain,
  Sparkles,
  TrendingUp,
  BarChart3,
  PieChart,
  Loader2,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  Settings,
  Mic,
  MicOff,
  Zap,
  Target,
  AlertCircle,
  CheckCircle,
  Info,
  X,
  Copy,
  Share2,
  Bookmark,
  Star,
  Calendar,
  Clock,
  Users,
  Tag,
  Hash,
  Type,
  ToggleLeft,
  ToggleRight,
  Maximize2,
  Minimize2,
  Grid3X3,
  List,
  SortAsc,
  SortDesc
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EnhancedDataTable, AIInsightsPanel } from "./components";

// Enhanced interfaces for AI Smart Data Table
interface DataColumn {
  id: string;
  key: string;
  label: string;
  type: "string" | "number" | "date" | "boolean" | "currency" | "percentage" | "email" | "url";
  sortable?: boolean;
  filterable?: boolean;
  searchable?: boolean;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  align?: "left" | "center" | "right";
  format?: (value: any) => string;
  render?: (value: any, row: DataRow) => React.ReactNode;
  aggregation?: "sum" | "avg" | "count" | "min" | "max";
}

interface DataRow {
  id: string;
  [key: string]: any;
}

interface AIInsight {
  id: string;
  type: "trend" | "anomaly" | "correlation" | "summary" | "prediction";
  title: string;
  description: string;
  confidence: number;
  data?: any;
  visualization?: "chart" | "graph" | "heatmap" | "scatter";
  timestamp: string;
}

interface QueryResult {
  data: DataRow[];
  insights: AIInsight[];
  totalCount: number;
  executionTime: number;
  query: string;
  confidence: number;
}

interface AISmartDataTableProps {
  className?: string;
  data?: DataRow[];
  columns?: DataColumn[];
  onDataChange?: (data: DataRow[]) => void;
  onQueryExecute?: (query: string) => Promise<QueryResult>;
  onInsightGenerate?: (data: DataRow[]) => Promise<AIInsight[]>;
  enableAIQuery?: boolean;
  enableVoiceInput?: boolean;
  enableInsights?: boolean;
  enableExport?: boolean;
  enableImport?: boolean;
  enableRealtime?: boolean;
  pageSize?: number;
  maxRows?: number;
  theme?: "light" | "dark" | "auto";
  apiEndpoint?: string;
  title?: string;
  description?: string;
}

// Voice recognition hook
const useVoiceRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError("Speech recognition not supported in this browser");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();

    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognitionRef.current.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');

      setTranscript(transcript);
    };

    recognitionRef.current.onerror = (event: any) => {
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.start();
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }, []);

  return { isListening, transcript, error, startListening, stopListening, setTranscript };
};

export const AISmartDataTable: React.FC<AISmartDataTableProps> = ({
  className,
  data: initialData = [],
  columns: initialColumns = [],
  onDataChange,
  onQueryExecute,
  onInsightGenerate,
  enableAIQuery = true,
  enableVoiceInput = true,
  enableInsights = true,
  enableExport = true,
  enableImport = true,
  enableRealtime = false,
  pageSize = 10,
  maxRows = 1000,
  theme = "auto",
  apiEndpoint = "/api/ai-smart-data-table",
  title = "AI Smart Data Table",
  description = "Intelligent data analysis with natural language querying"
}) => {
  // Enhanced state management
  const [data, setData] = useState<DataRow[]>(initialData);
  const [columns, setColumns] = useState<DataColumn[]>(initialColumns);
  const [filteredData, setFilteredData] = useState<DataRow[]>(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [aiQuery, setAiQuery] = useState("");
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"table" | "grid" | "cards">("table");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [columnFilters, setColumnFilters] = useState<Record<string, any>>({});
  const [queryHistory, setQueryHistory] = useState<string[]>([]);
  const [realtimeEnabled, setRealtimeEnabled] = useState(enableRealtime);

  // Voice recognition
  const { isListening, transcript, error: voiceError, startListening, stopListening, setTranscript } = useVoiceRecognition();

  // Refs and animations
  const tableRef = useRef<HTMLDivElement>(null);
  const queryInputRef = useRef<HTMLInputElement>(null);
  const controls = useAnimation();
  const insightControls = useAnimation();

  // Auto-detect columns from data
  useEffect(() => {
    if (initialColumns.length === 0 && data.length > 0) {
      const detectedColumns: DataColumn[] = Object.keys(data[0]).map((key, index) => {
        const sampleValue = data[0][key];
        let type: DataColumn["type"] = "string";

        if (typeof sampleValue === "number") {
          type = "number";
        } else if (typeof sampleValue === "boolean") {
          type = "boolean";
        } else if (sampleValue instanceof Date || (typeof sampleValue === "string" && !isNaN(Date.parse(sampleValue)))) {
          type = "date";
        } else if (typeof sampleValue === "string") {
          if (sampleValue.includes("@")) type = "email";
          else if (sampleValue.startsWith("http")) type = "url";
          else if (sampleValue.includes("$") || sampleValue.includes("€")) type = "currency";
          else if (sampleValue.includes("%")) type = "percentage";
        }

        return {
          id: `col-${index}`,
          key,
          label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
          type,
          sortable: true,
          filterable: true,
          searchable: true,
          align: type === "number" || type === "currency" || type === "percentage" ? "right" : "left"
        };
      });

      setColumns(detectedColumns);
    }
  }, [data, initialColumns]);

  // Apply voice transcript to AI query
  useEffect(() => {
    if (transcript && !isListening) {
      setAiQuery(transcript);
      setTranscript("");
    }
  }, [transcript, isListening, setTranscript]);

  // Filter and search data
  useEffect(() => {
    let filtered = [...data];

    // Apply search query
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      filtered = filtered.filter(row =>
        columns.some(col => {
          if (!col.searchable) return false;
          const value = row[col.key];
          return value?.toString().toLowerCase().includes(searchLower);
        })
      );
    }

    // Apply column filters
    Object.entries(columnFilters).forEach(([key, filterValue]) => {
      if (filterValue !== undefined && filterValue !== "") {
        filtered = filtered.filter(row => {
          const value = row[key];
          if (typeof filterValue === "string") {
            return value?.toString().toLowerCase().includes(filterValue.toLowerCase());
          }
          return value === filterValue;
        });
      }
    });

    // Apply sorting
    if (sortConfig) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [data, searchQuery, columnFilters, sortConfig, columns]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  // AI Query Processing
  const executeAIQuery = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setIsProcessing(true);
    setError(null);

    try {
      let result: QueryResult;

      if (onQueryExecute) {
        result = await onQueryExecute(query);
      } else {
        // Default AI query processing
        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query,
            data: data.slice(0, 100), // Send sample for processing
            columns
          })
        });

        if (!response.ok) {
          throw new Error(`Query failed: ${response.statusText}`);
        }

        result = await response.json();
      }

      // Update data if query returned new data
      if (result.data && result.data.length > 0) {
        setData(result.data);
        onDataChange?.(result.data);
      }

      // Update insights
      if (result.insights) {
        setInsights(prev => [...result.insights, ...prev.slice(0, 4)]);
        setShowInsights(true);
      }

      // Add to query history
      setQueryHistory(prev => [query, ...prev.slice(0, 9)]);

      // Animate success
      controls.start({
        scale: [1, 1.02, 1],
        transition: { duration: 0.3 }
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : "Query execution failed");
    } finally {
      setIsProcessing(false);
    }
  }, [data, columns, onQueryExecute, apiEndpoint, onDataChange, controls]);

  // Generate AI Insights
  const generateInsights = useCallback(async () => {
    if (data.length === 0) return;

    setIsGeneratingInsights(true);
    setError(null);

    try {
      let newInsights: AIInsight[];

      if (onInsightGenerate) {
        newInsights = await onInsightGenerate(data);
      } else {
        // Default insight generation
        const response = await fetch(`${apiEndpoint}/insights`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: data.slice(0, 100), columns })
        });

        if (!response.ok) {
          throw new Error(`Insight generation failed: ${response.statusText}`);
        }

        const result = await response.json();
        newInsights = result.insights;
      }

      setInsights(newInsights);
      setShowInsights(true);

      // Animate insights panel
      insightControls.start({
        x: [300, 0],
        opacity: [0, 1],
        transition: { duration: 0.5, ease: "easeOut" }
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : "Insight generation failed");
    } finally {
      setIsGeneratingInsights(false);
    }
  }, [data, columns, onInsightGenerate, apiEndpoint, insightControls]);

  // Handle sorting
  const handleSort = useCallback((columnKey: string) => {
    setSortConfig(prev => {
      if (prev?.key === columnKey) {
        return prev.direction === "asc"
          ? { key: columnKey, direction: "desc" }
          : null;
      }
      return { key: columnKey, direction: "asc" };
    });
  }, []);

  // Handle row selection
  const handleRowSelect = useCallback((rowId: string, selected: boolean) => {
    setSelectedRows(prev => {
      const newSet = new Set(prev);
      if (selected) {
        newSet.add(rowId);
      } else {
        newSet.delete(rowId);
      }
      return newSet;
    });
  }, []);

  // Handle select all
  const handleSelectAll = useCallback((selected: boolean) => {
    if (selected) {
      setSelectedRows(new Set(paginatedData.map(row => row.id)));
    } else {
      setSelectedRows(new Set());
    }
  }, [paginatedData]);

  // Export data
  const exportData = useCallback((format: "csv" | "json" | "xlsx") => {
    const dataToExport = selectedRows.size > 0
      ? data.filter(row => selectedRows.has(row.id))
      : filteredData;

    const timestamp = new Date().toISOString().split('T')[0];

    switch (format) {
      case "csv":
        const csvHeaders = columns.map(col => col.label).join(",");
        const csvRows = dataToExport.map(row =>
          columns.map(col => {
            const value = row[col.key];
            return typeof value === "string" && value.includes(",")
              ? `"${value.replace(/"/g, '""')}"`
              : value;
          }).join(",")
        );
        const csvContent = [csvHeaders, ...csvRows].join("\n");
        downloadFile(csvContent, `data-export-${timestamp}.csv`, "text/csv");
        break;

      case "json":
        const jsonContent = JSON.stringify({
          exportDate: new Date().toISOString(),
          totalRows: dataToExport.length,
          columns: columns.map(col => ({ key: col.key, label: col.label, type: col.type })),
          data: dataToExport
        }, null, 2);
        downloadFile(jsonContent, `data-export-${timestamp}.json`, "application/json");
        break;
    }
  }, [data, filteredData, selectedRows, columns]);

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

  return (
    <div className={cn(
      "w-full mx-auto transition-all duration-300 bg-white rounded-xl border border-gray-200 shadow-sm",
      isFullscreen ? "fixed inset-4 z-50 overflow-auto" : "max-w-7xl",
      className
    )}>
      {/* Enhanced Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Brain className="h-8 w-8 text-purple-600" />
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            {[
              { mode: "table", icon: Grid3X3, label: "Table" },
              { mode: "grid", icon: MoreHorizontal, label: "Grid" },
              { mode: "cards", icon: List, label: "Cards" }
            ].map(({ mode, icon: Icon, label }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                className={cn(
                  "px-3 py-1 rounded text-sm font-medium transition-all flex items-center gap-1",
                  viewMode === mode
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <motion.button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </motion.button>
        </div>
      </div>

      {/* AI Query Interface */}
      {enableAIQuery && (
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">AI Query Interface</h3>
              <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                Natural Language
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <input
                  ref={queryInputRef}
                  type="text"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      executeAIQuery(aiQuery);
                    }
                  }}
                  placeholder="Ask anything about your data... (e.g., 'Show me sales trends for last quarter' or 'Find customers with high value orders')"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  disabled={isProcessing}
                />

                {enableVoiceInput && (
                  <motion.button
                    onClick={isListening ? stopListening : startListening}
                    className={cn(
                      "absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all",
                      isListening
                        ? "text-red-600 bg-red-50 hover:bg-red-100"
                        : "text-gray-400 hover:text-purple-600 hover:bg-purple-50"
                    )}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={isProcessing}
                  >
                    {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </motion.button>
                )}
              </div>

              <motion.button
                onClick={() => executeAIQuery(aiQuery)}
                disabled={isProcessing || !aiQuery.trim()}
                className={cn(
                  "px-6 py-3 bg-purple-600 text-white rounded-lg font-medium transition-all",
                  "hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed",
                  "flex items-center gap-2"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4" />
                    Execute Query
                  </>
                )}
              </motion.button>
            </div>

            {/* Voice Status */}
            <AnimatePresence>
              {isListening && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Mic className="h-4 w-4" />
                  </motion.div>
                  Listening... Speak your query now
                </motion.div>
              )}
            </AnimatePresence>

            {/* Query History */}
            {queryHistory.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-600">Recent queries:</span>
                {queryHistory.slice(0, 3).map((query, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setAiQuery(query)}
                    className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {query.length > 30 ? `${query.substring(0, 30)}...` : query}
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Controls Bar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search data..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
            />
          </div>

          {/* Filters */}
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "px-3 py-2 border border-gray-300 rounded-lg transition-all flex items-center gap-2",
              showFilters ? "bg-purple-50 border-purple-300 text-purple-700" : "bg-white text-gray-700 hover:bg-gray-50"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Filter className="h-4 w-4" />
            Filters
            {Object.keys(columnFilters).length > 0 && (
              <span className="bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {Object.keys(columnFilters).length}
              </span>
            )}
          </motion.button>

          {/* AI Insights */}
          {enableInsights && (
            <motion.button
              onClick={generateInsights}
              disabled={isGeneratingInsights || data.length === 0}
              className="px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg transition-all flex items-center gap-2 disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isGeneratingInsights ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Brain className="h-4 w-4" />
              )}
              Generate Insights
            </motion.button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Selected Count */}
          {selectedRows.size > 0 && (
            <span className="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full">
              {selectedRows.size} selected
            </span>
          )}

          {/* Export */}
          {enableExport && (
            <div className="relative group">
              <motion.button
                className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="h-4 w-4" />
                Export
                <ChevronDown className="h-3 w-3" />
              </motion.button>

              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                <div className="p-1">
                  {["csv", "json"].map((format) => (
                    <button
                      key={format}
                      onClick={() => exportData(format as any)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                    >
                      Export as {format.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Refresh */}
          <motion.button
            onClick={() => {
              setData([...data]);
              setSelectedRows(new Set());
              setSearchQuery("");
              setColumnFilters({});
            }}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            whileHover={{ scale: 1.05, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className="h-4 w-4" />
          </motion.button>
        </div>
      </div>

      {/* Error Display */}
      <AnimatePresence>
        {(error || voiceError) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-red-900">Error</p>
                <p className="text-sm text-red-700">{error || voiceError}</p>
              </div>
              <button
                onClick={() => {
                  setError(null);
                }}
                className="text-red-600 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-b border-gray-100 bg-gray-50 overflow-hidden"
          >
            <div className="p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Advanced Filters</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {columns.filter(col => col.filterable).map((column) => (
                  <div key={column.id} className="space-y-2">
                    <label className="text-xs font-medium text-gray-700">{column.label}</label>
                    {column.type === "boolean" ? (
                      <select
                        value={columnFilters[column.key] || ""}
                        onChange={(e) => setColumnFilters(prev => ({
                          ...prev,
                          [column.key]: e.target.value === "" ? undefined : e.target.value === "true"
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">All</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    ) : column.type === "date" ? (
                      <input
                        type="date"
                        value={columnFilters[column.key] || ""}
                        onChange={(e) => setColumnFilters(prev => ({
                          ...prev,
                          [column.key]: e.target.value || undefined
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    ) : (
                      <input
                        type={column.type === "number" || column.type === "currency" ? "number" : "text"}
                        value={columnFilters[column.key] || ""}
                        onChange={(e) => setColumnFilters(prev => ({
                          ...prev,
                          [column.key]: e.target.value || undefined
                        }))}
                        placeholder={`Filter ${column.label.toLowerCase()}...`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-600">
                  {Object.keys(columnFilters).length} filter(s) applied
                </span>
                <motion.button
                  onClick={() => setColumnFilters({})}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Clear All
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 relative">
        {/* Data Display */}
        <div className="p-6">
          {data.length === 0 ? (
            <div className="text-center py-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-12 w-12 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Data Available</h3>
                  <p className="text-gray-600 mb-4">
                    Upload data or connect a data source to get started with AI-powered analysis.
                  </p>
                  {enableImport && (
                    <motion.button
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 mx-auto"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Upload className="h-4 w-4" />
                      Import Data
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </div>
          ) : (
            <>
              {/* Data Summary */}
              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-600 rounded-lg">
                        <BarChart3 className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-700">Total Records</p>
                        <p className="text-2xl font-bold text-blue-900">{filteredData.length}</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-600 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-green-700">Selected</p>
                        <p className="text-2xl font-bold text-green-900">{selectedRows.size}</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-600 rounded-lg">
                        <Grid3X3 className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-purple-700">Columns</p>
                        <p className="text-2xl font-bold text-purple-900">{columns.length}</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-600 rounded-lg">
                        <Sparkles className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-yellow-700">Insights</p>
                        <p className="text-2xl font-bold text-yellow-900">{insights.length}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Table Display */}
              <motion.div
                ref={tableRef}
                initial={{ opacity: 0 }}
                animate={controls}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
              >
                <EnhancedDataTable
                  columns={columns}
                  data={paginatedData}
                  sortConfig={sortConfig}
                  selectedRows={selectedRows}
                  onSort={handleSort}
                  onRowSelect={handleRowSelect}
                  onSelectAll={handleSelectAll}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  pageSize={pageSize}
                />
              </motion.div>
            </>
          )}
        </div>

        {/* AI Insights Panel */}
        <AIInsightsPanel
          insights={insights}
          isVisible={showInsights}
          onClose={() => setShowInsights(false)}
          isGenerating={isGeneratingInsights}
        />
      </div>
    </div>
  );
};
