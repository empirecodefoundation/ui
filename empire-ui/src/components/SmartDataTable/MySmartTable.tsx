import React, { useState, useEffect } from 'react';
import { SmartDataTable } from './SmartDataTable';
import { toast } from 'sonner';
import { sampleData, Employee } from '@/data/sampleData';

type FilterOperator = '>' | '<' | '=' | '>=' | '<=' | 'like' | 'max' | 'min';

interface Filter {
  column: keyof Employee;
  operator: FilterOperator;
  value: string | number;
}

export function MySmartTable() {
  const [apiKey, setApiKey] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (key) {
      setApiKey(key);
    } else {
      toast.error('API key not found. Some features may be limited.');
    }
    setIsLoading(false);
  }, []);

  const handleDataChange = (filteredData: Employee[]) => {
    console.log('Filtered data:', filteredData);
  };

  const processQuery = (responseText: string) => {
    try {
      const parsed = JSON.parse(responseText);
      if (!parsed.filters || !Array.isArray(parsed.filters)) {
        throw new Error('Invalid filters format');
      }

      let filteredData = [...sampleData];

      parsed.filters.forEach((filter: Filter) => {
        const { column, operator, value } = filter;
        switch (operator) {
          case '>':
            filteredData = filteredData.filter(item => Number(item[column]) > Number(value));
            break;
          case '<':
            filteredData = filteredData.filter(item => Number(item[column]) < Number(value));
            break;
          case '=':
            filteredData = filteredData.filter(item => String(item[column]) === String(value));
            break;
          case '>=':
            filteredData = filteredData.filter(item => Number(item[column]) >= Number(value));
            break;
          case '<=':
            filteredData = filteredData.filter(item => Number(item[column]) <= Number(value));
            break;
          case 'like':
            filteredData = filteredData.filter(item => String(item[column]).includes(String(value)));
            break;
          case 'max':
            const maxVal = Math.max(...filteredData.map(item => Number(item[column])));
            filteredData = filteredData.filter(item => Number(item[column]) === maxVal);
            break;
          case 'min':
            const minVal = Math.min(...filteredData.map(item => Number(item[column])));
            filteredData = filteredData.filter(item => Number(item[column]) === minVal);
            break;
          default:
            console.warn(`Unknown operator: ${operator}`);
        }
      });

      return filteredData;
    } catch (err) {
      console.error('Failed to parse Gemini response:', err);
      toast.error('Invalid response format from Gemini API.');
      return sampleData; // fallback to original data
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-4xl font-bold mb-8 text-white">Smart Data Table</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-200">Try These Queries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-gray-800/50 rounded-xl shadow-lg border border-gray-700">
            <h3 className="font-medium mb-4 text-gray-200">Example Queries:</h3>
            <ul className="list-disc list-inside space-y-3 text-gray-300">
              <li>"Show me all employees over 30 years old"</li>
              <li>"Find people in the Engineering department"</li>
              <li>"List employees with salary above 90000"</li>
              <li>"Show me the highest performing employees"</li>
              <li>"Find employees who joined in 2021"</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-xl shadow-lg border border-gray-700 p-6">
        <SmartDataTable
          data={sampleData}
          columns={[
            { key: 'name', label: 'Name', type: 'string' as const },
            { key: 'age', label: 'Age', type: 'number' as const },
            { key: 'salary', label: 'Salary', type: 'number' as const },
            { key: 'department', label: 'Department', type: 'string' as const },
            { key: 'position', label: 'Position', type: 'string' as const },
            { key: 'performance', label: 'Performance', type: 'number' as const },
            { key: 'joinDate', label: 'Join Date', type: 'date' as const }
          ]}
          title="Employee Data"
          geminiApiKey={process.env.NEXT_PUBLIC_GEMINI_API_KEY}
          onDataChange={handleDataChange}
        />
      </div>
    </div>
  );
}
