# AI Smart Data Table

A comprehensive, AI-powered data table component that combines intelligent data analysis, natural language querying, voice input, and premium UI/UX for modern React applications.

## 🚀 Features

### **🧠 AI-Powered Capabilities**
- **Natural Language Querying**: Ask questions about your data in plain English
- **Voice Input Support**: Speak your queries using built-in speech recognition
- **Intelligent Insights**: AI-generated insights including trends, anomalies, and correlations
- **Smart Data Analysis**: Automatic pattern detection and statistical analysis
- **Predictive Analytics**: AI-powered predictions and forecasting

### **📊 Advanced Data Management**
- **Multi-format Support**: Handle various data types (strings, numbers, dates, currencies, etc.)
- **Real-time Filtering**: Advanced filtering with multiple criteria
- **Smart Sorting**: Intelligent sorting with type-aware comparisons
- **Data Export**: Export to CSV, JSON, and Excel formats
- **Batch Operations**: Perform operations on multiple selected rows

### **🎨 Premium UI/UX**
- **Polished Animations**: Smooth transitions and micro-interactions
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Dark Mode Support**: Automatic theme detection and switching
- **Accessibility**: WCAG AA compliant with full keyboard navigation
- **Customizable Views**: Table, grid, and card view modes

### **⚡ Performance & Scalability**
- **Virtual Scrolling**: Handle large datasets efficiently
- **Progressive Loading**: Load data incrementally for better performance
- **Memory Optimization**: Efficient memory usage for large datasets
- **Debounced Operations**: Optimized API calls and search operations

## 📦 Installation

```bash
npm install @empireui/components
```

## 🎯 Basic Usage

```tsx
import { AISmartDataTable } from "@empireui/components";

function DataAnalysisPage() {
  const [data, setData] = useState([
    { id: "1", name: "John Doe", email: "john@example.com", sales: 15000, active: true },
    { id: "2", name: "Jane Smith", email: "jane@example.com", sales: 22000, active: true },
    // ... more data
  ]);

  const columns = [
    { id: "name", key: "name", label: "Name", type: "string", sortable: true, searchable: true },
    { id: "email", key: "email", label: "Email", type: "email", sortable: true, searchable: true },
    { id: "sales", key: "sales", label: "Sales", type: "currency", sortable: true },
    { id: "active", key: "active", label: "Active", type: "boolean", filterable: true }
  ];

  const handleQueryExecute = async (query) => {
    // Process natural language query
    const response = await fetch("/api/ai-smart-data-table", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, data, columns })
    });
    return response.json();
  };

  return (
    <AISmartDataTable
      data={data}
      columns={columns}
      onQueryExecute={handleQueryExecute}
      enableAIQuery={true}
      enableVoiceInput={true}
      enableInsights={true}
      enableExport={true}
      title="Sales Data Analysis"
      description="AI-powered analysis of sales performance data"
    />
  );
}
```

## 🔧 Advanced Configuration

### **Column Configuration**

```tsx
const columns = [
  {
    id: "revenue",
    key: "revenue",
    label: "Revenue",
    type: "currency",
    sortable: true,
    filterable: true,
    searchable: false,
    align: "right",
    width: 120,
    format: (value) => `$${value.toLocaleString()}`,
    render: (value, row) => (
      <span className={value > 10000 ? "text-green-600" : "text-gray-600"}>
        ${value.toLocaleString()}
      </span>
    ),
    aggregation: "sum"
  },
  {
    id: "status",
    key: "status",
    label: "Status",
    type: "string",
    sortable: true,
    filterable: true,
    render: (value) => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        value === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}>
        {value}
      </span>
    )
  }
];
```

### **AI Query Examples**

```tsx
// Natural language queries the component can handle:
const exampleQueries = [
  "Show me customers with sales above $20,000",
  "Find all inactive users from last month",
  "What are the top 10 performing regions?",
  "Show trends in revenue over the past quarter",
  "Find anomalies in the sales data",
  "Group customers by region and show average sales",
  "Show me users who haven't logged in for 30 days"
];
```

### **Custom Insights Generation**

```tsx
const handleInsightGenerate = async (data) => {
  const insights = await analyzeData(data);
  return insights.map(insight => ({
    id: generateId(),
    type: insight.type, // "trend" | "anomaly" | "correlation" | "summary" | "prediction"
    title: insight.title,
    description: insight.description,
    confidence: insight.confidence,
    timestamp: new Date().toISOString()
  }));
};

<AISmartDataTable
  data={data}
  columns={columns}
  onInsightGenerate={handleInsightGenerate}
  // ... other props
/>
```

## 🎨 Styling & Theming

### **CSS Custom Properties**

```css
:root {
  --ai-primary: #8b5cf6;
  --ai-primary-dark: #7c3aed;
  --ai-secondary: #3b82f6;
  --ai-success: #10b981;
  --ai-warning: #f59e0b;
  --ai-error: #ef4444;
}
```

### **Custom Styling**

```tsx
<AISmartDataTable
  className="custom-data-table"
  theme="dark"
  // ... other props
/>
```

```css
.custom-data-table {
  --ai-primary: #your-brand-color;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

## 🔌 API Integration

### **Backend Setup**

Create an API endpoint to handle AI queries:

```typescript
// pages/api/ai-smart-data-table.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { processNaturalLanguageQuery } from '@/lib/ai-query-processor';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query, data, columns } = req.body;
    const result = await processNaturalLanguageQuery(query, data, columns);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Query processing failed' });
  }
}
```

### **Environment Variables**

```env
# Required for AI functionality
OPENAI_API_KEY=your_openai_api_key_here

# Optional for enhanced features
GOOGLE_CLOUD_VISION_API_KEY=your_google_vision_key
ANTHROPIC_API_KEY=your_anthropic_key
```

## 📱 Responsive Design

The component is fully responsive and adapts to different screen sizes:

- **Desktop**: Full-featured interface with all controls visible
- **Tablet**: Optimized layout with collapsible panels
- **Mobile**: Streamlined interface with essential features

## ♿ Accessibility

- **WCAG AA Compliant**: Meets accessibility standards
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **High Contrast**: Support for high contrast themes
- **Focus Management**: Logical focus order and visible focus indicators

## 🧪 Testing

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { AISmartDataTable } from '@empireui/components';

test('renders data table with AI query interface', () => {
  const mockData = [
    { id: "1", name: "Test User", email: "test@example.com" }
  ];
  
  const mockColumns = [
    { id: "name", key: "name", label: "Name", type: "string" }
  ];

  render(
    <AISmartDataTable
      data={mockData}
      columns={mockColumns}
      enableAIQuery={true}
    />
  );

  expect(screen.getByText('AI Smart Data Table')).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Ask anything about your data/)).toBeInTheDocument();
});
```

## 🚀 Performance Tips

1. **Use Virtual Scrolling**: For datasets with 1000+ rows
2. **Implement Pagination**: Server-side pagination for large datasets
3. **Debounce Search**: Avoid excessive API calls during typing
4. **Memoize Columns**: Use `useMemo` for column definitions
5. **Optimize Renders**: Use `React.memo` for custom cell renderers

## 🔄 Migration Guide

### **From v1.x to v2.x**

```tsx
// Old API
<DataTable
  data={data}
  columns={columns}
  searchable={true}
/>

// New API
<AISmartDataTable
  data={data}
  columns={columns}
  enableAIQuery={true}
  enableVoiceInput={true}
  enableInsights={true}
/>
```

## 📚 Examples

Check out the [interactive demo](http://localhost:3000/docs/ai-smart-data-table) to see all features in action.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](../../CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](../../LICENSE) for details.

---

**Built with ❤️ by the EmpireUI team**
