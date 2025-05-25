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
export interface DataColumn {
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

export interface DataRow {
  id: string;
  [key: string]: any;
}

export interface AIInsight {
  id: string;
  type: "trend" | "anomaly" | "correlation" | "summary" | "prediction";
  title: string;
  description: string;
  confidence: number;
  data?: any;
  visualization?: "chart" | "graph" | "heatmap" | "scatter";
  timestamp: string;
}

export interface QueryResult {
  data: DataRow[];
  insights: AIInsight[];
  totalCount: number;
  executionTime: number;
  query: string;
  confidence: number;
}

export interface AISmartDataTableProps {
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

      {/* Basic table display for now */}
      <div className="p-6">
        <div className="text-center py-12">
          <Brain className="h-16 w-16 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Smart Data Table</h3>
          <p className="text-gray-600">
            Advanced AI-powered data table with natural language querying, voice commands, and intelligent insights.
          </p>
        </div>
      </div>
    </div>
  );
};
