import React from 'react';
import { SmartDataTable } from '../SmartDataTable';

// Sample data for demonstration
const sampleData = [
  { id: 1, name: 'John Smith', age: 32, department: 'Engineering', salary: 95000, joinDate: '2020-01-15', performance: 4.5 },
  { id: 2, name: 'Sarah Johnson', age: 28, department: 'Marketing', salary: 85000, joinDate: '2021-03-20', performance: 4.2 },
  { id: 3, name: 'Michael Brown', age: 35, department: 'Engineering', salary: 110000, joinDate: '2019-11-05', performance: 4.8 },
  { id: 4, name: 'Emily Davis', age: 26, department: 'Sales', salary: 78000, joinDate: '2022-02-10', performance: 4.0 },
  { id: 5, name: 'David Wilson', age: 31, department: 'Engineering', salary: 105000, joinDate: '2020-06-15', performance: 4.7 },
  { id: 6, name: 'Lisa Anderson', age: 29, department: 'Marketing', salary: 88000, joinDate: '2021-08-01', performance: 4.3 },
  { id: 7, name: 'James Taylor', age: 33, department: 'Sales', salary: 92000, joinDate: '2020-09-20', performance: 4.6 },
  { id: 8, name: 'Emma Martinez', age: 27, department: 'Engineering', salary: 98000, joinDate: '2022-01-05', performance: 4.4 },
  { id: 9, name: 'Robert Garcia', age: 34, department: 'Marketing', salary: 89000, joinDate: '2021-05-15', performance: 4.1 },
  { id: 10, name: 'Jennifer Lee', age: 30, department: 'Sales', salary: 86000, joinDate: '2020-11-10', performance: 4.5 },
];

const columns = [
  { key: 'id', label: 'ID', type: 'number' },
  { key: 'name', label: 'Name', type: 'string' },
  { key: 'age', label: 'Age', type: 'number' },
  { key: 'department', label: 'Department', type: 'string' },
  { key: 'salary', label: 'Salary', type: 'number' },
  { key: 'joinDate', label: 'Join Date', type: 'date' },
  { key: 'performance', label: 'Performance', type: 'number' },
];

export function DemoPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Smart Data Table Demo</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Example Queries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Try these queries:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>"Show me all employees over 30 years old"</li>
              <li>"Find people in the Engineering department"</li>
              <li>"List employees with salary above 90000"</li>
              <li>"Show me the highest performing employees"</li>
              <li>"Find employees who joined in 2021"</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Features to try:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Click column headers to sort</li>
              <li>Use the Settings button to show/hide columns</li>
              <li>Click Visualization to see data trends</li>
              <li>Export data to Excel</li>
              <li>Check query history</li>
            </ul>
          </div>
        </div>
      </div>

      <SmartDataTable
        data={sampleData}
        columns={columns}
        title="Employee Database"
        onDataChange={(filteredData) => {
          console.log('Filtered data:', filteredData);
        }}
      />
    </div>
  );
} 