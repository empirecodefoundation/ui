// @ts-nocheck
"use client";

import React, { useState, useCallback } from "react";
import { AISmartDataTable } from "@/components/core/AISmartDataTable";

// Sample data for demonstration
const generateSampleData = (count: number = 50) => {
  const names = ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson", "David Brown", "Lisa Davis", "Tom Miller", "Anna Garcia", "Chris Lee", "Emma Taylor"];
  const companies = ["TechCorp", "DataSys", "CloudInc", "AI Solutions", "Digital Labs", "Innovation Co", "Future Tech", "Smart Systems", "NextGen", "Quantum Corp"];
  const departments = ["Sales", "Marketing", "Engineering", "Support", "HR", "Finance", "Operations", "Product", "Design", "Research"];
  const statuses = ["Active", "Inactive", "Pending", "Suspended"];
  const regions = ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East"];

  return Array.from({ length: count }, (_, index) => ({
    id: `user-${index + 1}`,
    name: names[Math.floor(Math.random() * names.length)],
    email: `user${index + 1}@example.com`,
    company: companies[Math.floor(Math.random() * companies.length)],
    department: departments[Math.floor(Math.random() * departments.length)],
    salary: Math.floor(Math.random() * 150000) + 30000,
    revenue: Math.floor(Math.random() * 500000) + 10000,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    region: regions[Math.floor(Math.random() * regions.length)],
    active: Math.random() > 0.3,
    joinDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    lastLogin: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    performance: Math.floor(Math.random() * 100) + 1,
    projects: Math.floor(Math.random() * 20) + 1,
    satisfaction: Math.random() * 5,
    website: `https://${companies[Math.floor(Math.random() * companies.length)].toLowerCase().replace(' ', '')}.com`
  }));
};

// Column definitions
const sampleColumns = [
  {
    id: "name",
    key: "name",
    label: "Name",
    type: "string" as const,
    sortable: true,
    searchable: true,
    filterable: true,
    width: 150
  },
  {
    id: "email",
    key: "email",
    label: "Email",
    type: "email" as const,
    sortable: true,
    searchable: true,
    filterable: true,
    width: 200
  },
  {
    id: "company",
    key: "company",
    label: "Company",
    type: "string" as const,
    sortable: true,
    searchable: true,
    filterable: true,
    width: 140
  },
  {
    id: "department",
    key: "department",
    label: "Department",
    type: "string" as const,
    sortable: true,
    filterable: true,
    width: 120
  },
  {
    id: "salary",
    key: "salary",
    label: "Salary",
    type: "currency" as const,
    sortable: true,
    filterable: true,
    align: "right" as const,
    width: 120,
    aggregation: "avg" as const
  },
  {
    id: "revenue",
    key: "revenue",
    label: "Revenue",
    type: "currency" as const,
    sortable: true,
    filterable: true,
    align: "right" as const,
    width: 130,
    aggregation: "sum" as const
  },
  {
    id: "status",
    key: "status",
    label: "Status",
    type: "string" as const,
    sortable: true,
    filterable: true,
    width: 100,
    render: (value: string) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        value === "Active" ? "bg-green-100 text-green-800" :
        value === "Inactive" ? "bg-red-100 text-red-800" :
        value === "Pending" ? "bg-yellow-100 text-yellow-800" :
        "bg-gray-100 text-gray-800"
      }`}>
        {value}
      </span>
    )
  },
  {
    id: "region",
    key: "region",
    label: "Region",
    type: "string" as const,
    sortable: true,
    filterable: true,
    width: 130
  },
  {
    id: "active",
    key: "active",
    label: "Active",
    type: "boolean" as const,
    sortable: true,
    filterable: true,
    width: 80,
    align: "center" as const
  },
  {
    id: "joinDate",
    key: "joinDate",
    label: "Join Date",
    type: "date" as const,
    sortable: true,
    filterable: true,
    width: 120
  },
  {
    id: "lastLogin",
    key: "lastLogin",
    label: "Last Login",
    type: "date" as const,
    sortable: true,
    filterable: true,
    width: 120
  },
  {
    id: "performance",
    key: "performance",
    label: "Performance",
    type: "percentage" as const,
    sortable: true,
    filterable: true,
    align: "right" as const,
    width: 120,
    format: (value: number) => `${value}%`,
    render: (value: number) => (
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${
              value >= 80 ? "bg-green-500" :
              value >= 60 ? "bg-yellow-500" :
              "bg-red-500"
            }`}
            style={{ width: `${value}%` }}
          />
        </div>
        <span className="text-sm font-medium">{value}%</span>
      </div>
    )
  },
  {
    id: "projects",
    key: "projects",
    label: "Projects",
    type: "number" as const,
    sortable: true,
    filterable: true,
    align: "right" as const,
    width: 100
  },
  {
    id: "satisfaction",
    key: "satisfaction",
    label: "Satisfaction",
    type: "number" as const,
    sortable: true,
    filterable: true,
    align: "right" as const,
    width: 120,
    format: (value: number) => `${value.toFixed(1)}/5`,
    render: (value: number) => (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={`text-sm ${
              i < Math.floor(value) ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
        <span className="text-sm text-gray-600 ml-1">{value.toFixed(1)}</span>
      </div>
    )
  },
  {
    id: "website",
    key: "website",
    label: "Website",
    type: "url" as const,
    sortable: false,
    searchable: true,
    width: 150
  }
];

export const AISmartDataTableExample: React.FC<{
  mode?: "basic" | "advanced" | "enterprise";
  initialData?: any[];
  customColumns?: any[];
}> = ({ 
  mode = "advanced",
  initialData,
  customColumns
}) => {
  const [data, setData] = useState(() => initialData || generateSampleData(mode === "basic" ? 20 : mode === "advanced" ? 50 : 100));
  const [columns] = useState(() => customColumns || sampleColumns);

  // Handle AI query execution
  const handleQueryExecute = useCallback(async (query: string) => {
    try {
      const response = await fetch("/api/ai-smart-data-table", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          data: data.slice(0, 100), // Send sample for processing
          columns: columns.map(col => ({
            id: col.id,
            key: col.key,
            label: col.label,
            type: col.type
          }))
        }),
      });

      if (!response.ok) {
        throw new Error(`Query failed: ${response.statusText}`);
      }

      const result = await response.json();
      return result.result;
    } catch (error) {
      console.error("Query execution error:", error);
      throw error;
    }
  }, [data, columns]);

  // Handle insights generation
  const handleInsightGenerate = useCallback(async (tableData: any[]) => {
    try {
      const response = await fetch("/api/ai-smart-data-table/insights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: tableData.slice(0, 100), // Send sample for analysis
          columns: columns.map(col => ({
            id: col.id,
            key: col.key,
            label: col.label,
            type: col.type
          }))
        }),
      });

      if (!response.ok) {
        throw new Error(`Insight generation failed: ${response.statusText}`);
      }

      const result = await response.json();
      return result.insights;
    } catch (error) {
      console.error("Insight generation error:", error);
      throw error;
    }
  }, [columns]);

  // Handle data changes
  const handleDataChange = useCallback((newData: any[]) => {
    setData(newData);
  }, []);

  return (
    <div className="w-full">
      <AISmartDataTable
        data={data}
        columns={columns}
        onDataChange={handleDataChange}
        onQueryExecute={handleQueryExecute}
        onInsightGenerate={handleInsightGenerate}
        enableAIQuery={mode !== "basic"}
        enableVoiceInput={mode === "advanced" || mode === "enterprise"}
        enableInsights={true}
        enableExport={true}
        enableImport={mode === "enterprise"}
        enableRealtime={mode === "enterprise"}
        pageSize={mode === "basic" ? 10 : mode === "advanced" ? 15 : 20}
        maxRows={mode === "basic" ? 100 : mode === "advanced" ? 500 : 1000}
        title={`AI Smart Data Table - ${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode`}
        description={
          mode === "basic" 
            ? "Basic data table with sorting and filtering"
            : mode === "advanced"
            ? "Advanced AI-powered data analysis with natural language queries"
            : "Enterprise-grade data intelligence platform with full AI capabilities"
        }
        apiEndpoint="/api/ai-smart-data-table"
        className="shadow-lg"
      />
    </div>
  );
};

export default AISmartDataTableExample;
