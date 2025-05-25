# Smart Data Table Component

A powerful React component that allows users to query and filter data using natural language. The component integrates with OpenAI's GPT-3.5 and Google's Gemini AI to understand and process natural language queries.

## Features

- 🔍 Natural language querying of tabular data
- 🤖 AI-powered query understanding using OpenAI GPT-3.5 or Google Gemini
- 📊 Clean and responsive table display
- ⚡ Real-time filtering and updates
- 🎨 Modern UI with loading states and error handling
- 🔄 Fallback support between OpenAI and Gemini
- 📈 Interactive data visualization with charts
- 📥 Export data to Excel
- 🔄 Column sorting and visibility controls
- 📝 Query history tracking
- 🎯 Advanced filtering capabilities

## Installation

```bash
npm install @empire-ui/smart-data-table
```

## Usage

```tsx
import { SmartDataTable } from '@empire-ui/smart-data-table';

const data = [
  { id: 1, name: 'John', age: 30, department: 'Engineering', salary: 80000 },
  { id: 2, name: 'Jane', age: 25, department: 'Marketing', salary: 75000 },
  // ... more data
];

const columns = [
  { key: 'id', label: 'ID', type: 'number' },
  { key: 'name', label: 'Name', type: 'string' },
  { key: 'age', label: 'Age', type: 'number' },
  { key: 'department', label: 'Department', type: 'string' },
  { key: 'salary', label: 'Salary', type: 'number' },
];

function App() {
  return (
    <SmartDataTable
      data={data}
      columns={columns}
      openaiApiKey="your-openai-api-key"
      geminiApiKey="your-gemini-api-key"
      title="Employee Database"
      onDataChange={(filteredData) => console.log('Filtered data:', filteredData)}
    />
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| data | any[] | Yes | Array of data objects to display in the table |
| columns | Column[] | Yes | Array of column definitions |
| openaiApiKey | string | No | OpenAI API key for query processing |
| geminiApiKey | string | No | Google Gemini API key for fallback processing |
| title | string | No | Title of the data table |
| onDataChange | function | No | Callback when filtered data changes |

## Column Configuration

Each column can be configured with the following properties:

```typescript
interface Column {
  key: string;        // Unique identifier for the column
  label: string;      // Display name for the column
  type?: 'string' | 'number' | 'date' | 'boolean';  // Data type for proper sorting
  visible?: boolean;  // Whether the column is visible by default
}
```

## Features in Detail

### 1. Natural Language Querying
Ask questions about your data in plain English:
- "Show me all employees over 30 years old"
- "Find people in the Engineering department"
- "List employees whose names start with 'J'"
- "Show me the highest paid employees"

### 2. Data Visualization
- Toggle visualization mode to see data trends
- Interactive line charts
- Multiple series support
- Responsive design

### 3. Export Capabilities
- Export to Excel (.xlsx)
- Preserves all data and formatting
- Custom filename based on table title

### 4. Column Management
- Show/hide columns
- Sort by any column
- Custom column types for proper sorting
- Persistent column visibility settings

### 5. Query History
- Tracks recent queries
- Shows result counts
- Timestamps for each query
- Quick access to previous searches

## API Keys Setup

1. **OpenAI API Key**
   - Sign up at [OpenAI Platform](https://platform.openai.com)
   - Create an API key in your account settings
   - Use the key in the `openaiApiKey` prop

2. **Google Gemini API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create an API key
   - Use the key in the `geminiApiKey` prop

## Error Handling

The component includes built-in error handling for:
- Invalid API keys
- Failed API requests
- Malformed queries
- Network issues
- Data validation
- Export errors

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT 