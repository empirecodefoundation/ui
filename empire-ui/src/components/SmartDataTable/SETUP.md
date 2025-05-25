# Getting Started with SmartDataTable

This guide will help you set up and start using the SmartDataTable component in your project.

## Prerequisites

1. Node.js (v14 or higher)
2. npm or yarn
3. React project (Next.js, Create React App, etc.)

## Installation

1. Install the component and its dependencies:

```bash
npm install @empire-ui/smart-data-table recharts xlsx @radix-ui/react-dialog @radix-ui/react-dropdown-menu
```

2. Install peer dependencies if not already installed:

```bash
npm install react react-dom
```

## Basic Setup

1. Create a new component file (e.g., `MyDataTable.tsx`):

```tsx
import React from 'react';
import { SmartDataTable } from '@empire-ui/smart-data-table';

// Your data
const data = [
  { id: 1, name: 'John', age: 30, department: 'Engineering' },
  { id: 2, name: 'Jane', age: 25, department: 'Marketing' },
];

// Column definitions
const columns = [
  { key: 'id', label: 'ID', type: 'number' },
  { key: 'name', label: 'Name', type: 'string' },
  { key: 'age', label: 'Age', type: 'number' },
  { key: 'department', label: 'Department', type: 'string' },
];

function MyDataTable() {
  return (
    <SmartDataTable
      data={data}
      columns={columns}
      title="My Data Table"
    />
  );
}

export default MyDataTable;
```

## Adding AI Capabilities

To enable natural language querying, you'll need to add API keys:

1. Get an OpenAI API key from [OpenAI Platform](https://platform.openai.com)
2. Get a Google Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

Then update your component:

```tsx
<SmartDataTable
  data={data}
  columns={columns}
  openaiApiKey="your-openai-api-key"
  geminiApiKey="your-gemini-api-key"
/>
```

## Styling

The component uses Tailwind CSS for styling. Make sure your project has Tailwind CSS configured:

1. Install Tailwind CSS:

```bash
npm install -D tailwindcss postcss autoprefixer
```

2. Initialize Tailwind CSS:

```bash
npx tailwindcss init -p
```

3. Configure your `tailwind.config.js`:

```js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@empire-ui/smart-data-table/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Example Usage

Here's a complete example showing various features:

```tsx
import React, { useState } from 'react';
import { SmartDataTable } from '@empire-ui/smart-data-table';

function App() {
  const [data, setData] = useState([
    { id: 1, name: 'John', age: 30, department: 'Engineering', salary: 80000 },
    { id: 2, name: 'Jane', age: 25, department: 'Marketing', salary: 75000 },
  ]);

  const columns = [
    { key: 'id', label: 'ID', type: 'number' },
    { key: 'name', label: 'Name', type: 'string' },
    { key: 'age', label: 'Age', type: 'number' },
    { key: 'department', label: 'Department', type: 'string' },
    { key: 'salary', label: 'Salary', type: 'number' },
  ];

  const handleDataChange = (filteredData) => {
    console.log('Filtered data:', filteredData);
    // You can update your state or perform other actions here
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Smart Data Table</h1>
      
      <SmartDataTable
        data={data}
        columns={columns}
        title="Employee Database"
        openaiApiKey="your-openai-api-key"
        geminiApiKey="your-gemini-api-key"
        onDataChange={handleDataChange}
      />
    </div>
  );
}

export default App;
```

## Testing the Component

1. Try these example queries:
   - "Show me all employees over 30"
   - "Find people in the Engineering department"
   - "List employees with salary above 75000"

2. Test the features:
   - Click column headers to sort
   - Use the Settings button to show/hide columns
   - Click Visualization to see data trends
   - Export data to Excel
   - Check query history

## Troubleshooting

1. If you see styling issues:
   - Make sure Tailwind CSS is properly configured
   - Check if all required dependencies are installed

2. If AI queries aren't working:
   - Verify your API keys are correct
   - Check the browser console for errors
   - Ensure you have an active internet connection

3. If the table isn't rendering:
   - Check if your data and columns are properly formatted
   - Verify that all required props are provided

## Next Steps

1. Customize the styling to match your application
2. Add more data and columns
3. Implement custom data processing
4. Add error boundaries for better error handling
5. Create custom visualizations

## Support

If you encounter any issues or have questions:
1. Check the documentation
2. Look for similar issues in the GitHub repository
3. Create a new issue if needed 