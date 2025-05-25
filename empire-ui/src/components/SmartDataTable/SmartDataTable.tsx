import React, { useState, useEffect, useMemo, useRef } from 'react';
import { OpenAI } from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search, Download, BarChart2, History, Settings, ArrowUpDown } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import * as XLSX from 'xlsx';

interface SmartDataTableProps {
  data: any[];
  columns: {
    key: string;
    label: string;
    type?: 'string' | 'number' | 'date' | 'boolean';
    visible?: boolean;
  }[];
  openaiApiKey?: string;
  geminiApiKey?: string;
  title?: string;
  onDataChange?: (data: any[]) => void;
}

interface QueryHistory {
  query: string;
  timestamp: Date;
  resultCount: number;
  analysis?: string;
}

const SmartDataTable: React.FC<SmartDataTableProps> = ({
  data,
  columns,
  openaiApiKey,
  geminiApiKey,
  title = 'Smart Data Table',
  onDataChange,
}) => {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [queryHistory, setQueryHistory] = useState<QueryHistory[]>([]);
  const [visibleColumns, setVisibleColumns] = useState(columns.map(c => ({ ...c, visible: c.visible !== false })));
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [showVisualization, setShowVisualization] = useState(false);
  const [lastQueryTime, setLastQueryTime] = useState<number>(0);
  const queryCache = useRef<Map<string, any>>(new Map());
  const [lastRequestTime, setLastRequestTime] = useState<number>(0);
  const MIN_REQUEST_INTERVAL = 2000; // 2 seconds between requests

  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const processedData = useMemo(() => {
    let result = [...filteredData];
    if (sortConfig) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return result;
  }, [filteredData, sortConfig]);

  const parseLocalQuery = (query: string) => {
    const lowerQuery = query.toLowerCase();
    const filters: any[] = [];
    let sortConfig: { column: string; direction: 'asc' | 'desc' } | null = null;
    const patterns = [
      {
        regex: /(?:show|find|list|get|display|search|what|who).*(?:over|above|greater than|more than|higher than)\s+(\d+)/i,
        operator: '>',
        value: (match: RegExpMatchArray) => parseInt(match[1])
      },
      {
        regex: /(?:show|find|list|get|display|search|what|who).*(?:under|below|less than|lesser than|lower than)\s+(\d+)/i,
        operator: '<',
        value: (match: RegExpMatchArray) => parseInt(match[1])
      },
      {
        regex: /(?:show|find|list|get|display|search|what|who).*(?:equal to|exactly|equals|is)\s+(\d+)/i,
        operator: '==',
        value: (match: RegExpMatchArray) => parseInt(match[1])
      },
      {
        regex: /(?:show|find|list|get|display|search|what|who).*(?:contains|with|having|includes|in)\s+["']?([^"']+)["']?/i,
        operator: 'contains',
        value: (match: RegExpMatchArray) => match[1]
      },
      {
        regex: /(?:show|find|list|get|display|search|what|who).*(?:between)\s+(\d+)\s+(?:and|to)\s+(\d+)/i,
        operator: 'between',
        value: (match: RegExpMatchArray) => ({
          min: parseInt(match[1]),
          max: parseInt(match[2])
        })
      }
    ];
    const columnMappings: { [key: string]: string[] } = {
      'age': ['age', 'years', 'year', 'old', 'older', 'younger'],
      'salary': ['salary', 'pay', 'income', 'earnings', 'compensation', 'wage'],
      'name': ['name', 'person', 'employee', 'staff', 'worker'],
      'department': ['department', 'dept', 'team', 'division', 'unit', 'group'],
      'position': ['position', 'role', 'job', 'title', 'designation'],
      'performance': ['performance', 'rating', 'score', 'evaluation', 'review']
    };
    for (const pattern of patterns) {
      const match = query.match(pattern.regex);
      if (match) {
        const column = columns.find(col => {
          const colKey = col.key.toLowerCase();
          const colLabel = col.label.toLowerCase();
          if (lowerQuery.includes(colKey) || lowerQuery.includes(colLabel)) {
            return true;
          }
          const synonyms = columnMappings[colKey] || [];
          return synonyms.some(synonym => lowerQuery.includes(synonym));
        });
        if (column) {
          if (pattern.operator === 'between') {
            const { min, max } = pattern.value(match);
            filters.push(
              { column: column.key, operator: '>=', value: min },
              { column: column.key, operator: '<=', value: max }
            );
          } else {
            filters.push({
              column: column.key,
              operator: pattern.operator,
              value: pattern.value(match)
            });
          }
        }
      }
    }
    if (filters.length === 0) {
      for (const col of columns) {
        const colKey = col.key.toLowerCase();
        const colLabel = col.label.toLowerCase();
        const synonyms = columnMappings[colKey] || [];
        if (lowerQuery.includes(colKey) || lowerQuery.includes(colLabel) ||
          synonyms.some(synonym => lowerQuery.includes(synonym))) {
          return { filters: [] };
        }
      }
    }
    return filters.length > 0 ? { filters } : null;
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const processQuery = async () => {
    if (!query.trim()) {
      setFilteredData(data);
      return;
    }
    setIsLoading(true);
    setError(null);

    // Rate limiting check
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
      await sleep(MIN_REQUEST_INTERVAL - timeSinceLastRequest);
    }
    setLastRequestTime(Date.now());

    try {
      // Use Google AI (Gemini) to get the filter rules
      const genAI = new GoogleGenerativeAI(geminiApiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const sampleData = data.slice(0, 2).map(row => JSON.stringify(row)).join('\n');
      const prompt = `Analyze this query about employee data: "${query}"
Available columns: ${columns.map(c => c.key).join(', ')}
Sample data:
${sampleData}
Return ONLY a JSON object with filter conditions, no explanation, no markdown, no extra text. Use the most relevant column for the value. Example format:
{
  "filters": [
    {"column": "age", "operator": ">", "value": 30},
    {"column": "department", "operator": "contains", "value": "IT"}
  ],
  "sort": {"column": "salary", "direction": "desc"},
  "analysis": "This query shows IT department employees over 30, sorted by salary"
}`;

      // Retry logic with exponential backoff
      let retries = 3;
      let lastError = null;
      
      while (retries > 0) {
        try {
          const result = await model.generateContent({
            contents: [{
              parts: [{
                text: prompt
              }]
            }]
          });
          const response = await result.response;
          const text = response.text();
          console.log('Raw Gemini response:', text);
          let jsonText = text;
          
          // Remove markdown code block if present
          if (text.includes('```json')) {
            jsonText = text.split('```json')[1].split('```')[0].trim();
          } else if (text.includes('```')) {
            jsonText = text.split('```')[1].split('```')[0].trim();
          } else {
            const firstBrace = text.indexOf('{');
            const lastBrace = text.lastIndexOf('}');
            if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
              jsonText = text.substring(firstBrace, lastBrace + 1);
            }
          }

          try {
            console.log('Attempting to parse JSON:', jsonText);
            let parsedResult = JSON.parse(jsonText);
            
            // Handle responses that only contain sort or only contain filters
            if (!parsedResult.filters) {
              parsedResult.filters = []; // Initialize empty filters if none provided
            }
            if (!parsedResult.sort) {
              parsedResult.sort = null; // Initialize null sort if none provided
            }
            
            // Apply filters to data
            if (parsedResult.filters) {
              console.log('Applying filters:', JSON.stringify(parsedResult.filters, null, 2));
              console.log('Data before filtering:', data);
              let filtered = data.filter(item => {
                return parsedResult.filters.every((filter: any) => {
                  const value = item[filter.column];
                  const filterValue = filter.value;
                  if (filter.operator === 'max') {
                    const maxValue = Math.max(...data.map(row => row[filter.column]));
                    return value === maxValue;
                  }
                  if (filter.operator === 'min') {
                    const minValue = Math.min(...data.map(row => row[filter.column]));
                    return value === minValue;
                  }
                  if (typeof value === 'number' && typeof filterValue === 'number') {
                    switch (filter.operator) {
                      case '>': return value > filterValue;
                      case '<': return value < filterValue;
                      case '>=': return value >= filterValue;
                      case '<=': return value <= filterValue;
                      case '==': return value === filterValue;
                      case '!=': return value !== filterValue;
                      default: return true;
                    }
                  } else {
                    const strValue = String(value).toLowerCase();
                    const strFilterValue = String(filterValue).toLowerCase();
                    switch (filter.operator) {
                      case 'contains': return strValue.includes(strFilterValue);
                      case 'starts_with': return strValue.startsWith(strFilterValue);
                      case 'ends_with': return strValue.endsWith(strFilterValue);
                      case '==': return strValue === strFilterValue;
                      case '!=': return strValue !== strFilterValue;
                      default: return true;
                    }
                  }
                });
              });

              // Apply sorting if provided
              if (parsedResult.sort) {
                filtered.sort((a, b) => {
                  const aValue = a[parsedResult.sort.column];
                  const bValue = b[parsedResult.sort.column];
                  if (parsedResult.sort.direction === 'desc') {
                    return bValue > aValue ? 1 : -1;
                  }
                  return aValue > bValue ? 1 : -1;
                });
              }

              console.log('Filtered results:', filtered);
              setFilteredData(filtered);
              setQueryHistory(prev => [{
                query,
                timestamp: new Date(),
                resultCount: filtered.length,
                analysis: parsedResult.analysis
              }, ...prev].slice(0, 10));
              onDataChange?.(filtered);
              if (parsedResult.analysis) {
                toast.success(parsedResult.analysis);
              } else {
                toast.success(`Found ${filtered.length} results`);
              }
              break; // Success, exit retry loop
            } else {
              throw new Error('Invalid response format from Gemini API');
            }
          } catch (parseError) {
            console.error('Failed to parse Gemini response:', text);
            console.error('Attempted to parse:', jsonText);
            console.error('Parse error:', parseError);
            throw new Error('Invalid response format from Gemini API');
          }
        } catch (error: any) {
          lastError = error;
          if (error.message?.includes('429') || error.message?.includes('quota')) {
            console.log(`Rate limited, retrying in ${(4 - retries) * 2} seconds...`);
            await sleep((4 - retries) * 2000); // Exponential backoff: 2s, 4s, 6s
            retries--;
          } else {
            throw error; // Non-rate-limit error, don't retry
          }
        }
      }

      if (retries === 0 && lastError) {
        throw new Error('Rate limit exceeded. Please wait a few minutes before trying again.');
      }
    } catch (err) {
      console.error('Error processing query:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to process query';
      setError(errorMessage);
      setFilteredData(data);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedProcessQuery = useMemo(
    () => debounce(processQuery, 500),
    [query, data, columns]
  );

  const handleSort = (key: string) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(processedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, `${title}.xlsx`);
  };

  const toggleColumnVisibility = (key: string) => {
    setVisibleColumns(prev =>
      prev.map(col =>
        col.key === key ? { ...col, visible: !col.visible } : col
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowVisualization(!showVisualization)}
            className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
          >
            <BarChart2 className="h-4 w-4 mr-2" />
            Visualization
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={exportToExcel}
            className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </DialogTrigger>
            <DialogContent
              className="bg-gray-800 text-white border-gray-700"
              aria-describedby="dialog-description"
            >
              <DialogHeader>
                <DialogTitle className="text-white">Column Settings</DialogTitle>
                <p id="dialog-description" className="text-sm text-gray-400">
                  Toggle the visibility of columns in the data table
                </p>
              </DialogHeader>
              <div className="space-y-3">
                {visibleColumns.map(column => (
                  <div key={column.key} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={column.visible}
                      onChange={() => toggleColumnVisibility(column.key)}
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                    <label className="text-gray-200">{column.label}</label>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Ask a question about the data..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              debouncedProcessQuery();
            }}
            className="bg-gray-700 text-white border-gray-600 placeholder-gray-400 focus:border-blue-500"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
        <Button
          onClick={processQuery}
          disabled={isLoading}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            'Search'
          )}
        </Button>
      </div>
      {error && (
        <div className="p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
          {error}
        </div>
      )}
      <div className="rounded-lg border border-gray-700 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-800">
            <TableRow>
              {visibleColumns
                .filter(col => col.visible)
                .map(column => (
                  <TableHead
                    key={column.key}
                    className="text-gray-200 cursor-pointer hover:bg-gray-700"
                    onClick={() => handleSort(column.key)}
                  >
                    <div className="flex items-center gap-2">
                      {column.label}
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                ))}
            </TableRow>
          </TableHeader>
          <TableBody className="bg-gray-800/50">
            {processedData.map((row, index) => (
              <TableRow key={index} className="hover:bg-gray-700/50">
                {visibleColumns
                  .filter(col => col.visible)
                  .map(column => (
                    <TableCell key={column.key} className="text-gray-200">
                      {row[column.key]}
                    </TableCell>
                  ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {showVisualization && (
        <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
          <h3 className="text-xl font-semibold mb-4 text-white">Data Visualization</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={processedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    color: '#F3F4F6'
                  }}
                />
                <Line type="monotone" dataKey="salary" stroke="#60A5FA" />
                <Line type="monotone" dataKey="performance" stroke="#34D399" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      {queryHistory.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Recent Queries</h3>
          <div className="space-y-2">
            {queryHistory.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
              >
                <div className="flex items-center space-x-2">
                  <History className="h-4 w-4 text-gray-500" />
                  <span className="bg-white text-black px-2 py-1 rounded font-medium">{item.query}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {item.resultCount} results • {item.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { SmartDataTable }; 