// @ts-nocheck
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  SortAsc,
  SortDesc,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  BarChart3,
  PieChart,
  Target,
  Sparkles,
  Brain,
  Clock,
  Star,
  CheckCircle,
  AlertTriangle,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

// Enhanced Table Component
export const EnhancedDataTable: React.FC<{
  columns: any[];
  data: any[];
  sortConfig: any;
  selectedRows: Set<string>;
  onSort: (key: string) => void;
  onRowSelect: (id: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
}> = ({
  columns,
  data,
  sortConfig,
  selectedRows,
  onSort,
  onRowSelect,
  onSelectAll,
  currentPage,
  totalPages,
  onPageChange,
  pageSize
}) => {
  const formatCellValue = (value: any, column: any) => {
    if (value === null || value === undefined) return "-";
    
    if (column.format) {
      return column.format(value);
    }
    
    switch (column.type) {
      case "currency":
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(value);
      case "percentage":
        return `${(value * 100).toFixed(1)}%`;
      case "date":
        return new Date(value).toLocaleDateString();
      case "number":
        return new Intl.NumberFormat().format(value);
      case "boolean":
        return value ? "Yes" : "No";
      case "email":
        return (
          <a href={`mailto:${value}`} className="text-blue-600 hover:text-blue-800 underline">
            {value}
          </a>
        );
      case "url":
        return (
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
            {value.length > 30 ? `${value.substring(0, 30)}...` : value}
          </a>
        );
      default:
        return value.toString();
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={data.length > 0 && selectedRows.size === data.length}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
              </th>
              {columns.map((column) => (
                <th
                  key={column.id}
                  className={cn(
                    "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                    column.sortable && "cursor-pointer hover:bg-gray-100 transition-colors",
                    column.align === "center" && "text-center",
                    column.align === "right" && "text-right"
                  )}
                  style={{ 
                    width: column.width,
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth 
                  }}
                  onClick={() => column.sortable && onSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    <span>{column.label}</span>
                    {column.sortable && (
                      <div className="flex flex-col">
                        {sortConfig?.key === column.key ? (
                          sortConfig.direction === "asc" ? (
                            <SortAsc className="h-3 w-3 text-purple-600" />
                          ) : (
                            <SortDesc className="h-3 w-3 text-purple-600" />
                          )
                        ) : (
                          <div className="flex flex-col opacity-30">
                            <ChevronUp className="h-2 w-2" />
                            <ChevronDown className="h-2 w-2 -mt-1" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </th>
              ))}
              <th className="w-16 px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <AnimatePresence>
              {data.map((row, index) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "hover:bg-gray-50 transition-colors",
                    selectedRows.has(row.id) && "bg-purple-50"
                  )}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(row.id)}
                      onChange={(e) => onRowSelect(row.id, e.target.checked)}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                  </td>
                  {columns.map((column) => (
                    <td
                      key={column.id}
                      className={cn(
                        "px-4 py-3 text-sm text-gray-900",
                        column.align === "center" && "text-center",
                        column.align === "right" && "text-right"
                      )}
                    >
                      {column.render 
                        ? column.render(row[column.key], row)
                        : formatCellValue(row[column.key], column)
                      }
                    </td>
                  ))}
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <motion.button
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Eye className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Edit className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span>
              Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, data.length)} of {data.length} results
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-4 w-4" />
            </motion.button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <motion.button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={cn(
                      "px-3 py-1 text-sm rounded transition-colors",
                      currentPage === page
                        ? "bg-purple-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {page}
                  </motion.button>
                );
              })}
            </div>
            
            <motion.button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};

// AI Insights Panel Component
export const AIInsightsPanel: React.FC<{
  insights: any[];
  isVisible: boolean;
  onClose: () => void;
  isGenerating: boolean;
}> = ({ insights, isVisible, onClose, isGenerating }) => {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case "trend":
        return <TrendingUp className="h-5 w-5 text-green-600" />;
      case "anomaly":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case "correlation":
        return <BarChart3 className="h-5 w-5 text-blue-600" />;
      case "summary":
        return <Info className="h-5 w-5 text-purple-600" />;
      case "prediction":
        return <Target className="h-5 w-5 text-red-600" />;
      default:
        return <Sparkles className="h-5 w-5 text-gray-600" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "text-green-600 bg-green-50";
    if (confidence >= 0.6) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed right-0 top-0 h-full w-96 bg-white border-l border-gray-200 shadow-xl z-50 overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
              </div>
              <motion.button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </div>

            {isGenerating ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="mx-auto mb-4"
                  >
                    <Brain className="h-12 w-12 text-purple-600" />
                  </motion.div>
                  <p className="text-gray-600">Generating AI insights...</p>
                </div>
              </div>
            ) : insights.length === 0 ? (
              <div className="text-center py-12">
                <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No insights available</p>
                <p className="text-sm text-gray-500 mt-2">
                  Generate insights to see AI-powered analysis of your data
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getInsightIcon(insight.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{insight.title}</h4>
                          <span className={cn(
                            "px-2 py-1 text-xs rounded-full",
                            getConfidenceColor(insight.confidence)
                          )}>
                            {Math.round(insight.confidence * 100)}%
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-3">{insight.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="capitalize">{insight.type}</span>
                          <span>{new Date(insight.timestamp).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
