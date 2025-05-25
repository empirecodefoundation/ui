// @ts-nocheck
"use client";

import React from "react";
import { AISmartDataTable as BaseAISmartDataTable } from "@/components/ui/AISmartDataTable";

// Re-export the component with any additional configuration
export const AISmartDataTable = BaseAISmartDataTable;

// Export types for external use
export type {
  DataColumn,
  DataRow,
  AIInsight,
  QueryResult,
  AISmartDataTableProps
} from "@/components/ui/AISmartDataTable";

// Default export
export default AISmartDataTable;
