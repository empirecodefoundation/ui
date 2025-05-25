# SmartDataTable Component 📊

A React component that provides natural language querying of tabular data using OpenAI's GPT model for intelligent data analysis and filtering.

## Features

- 🤖 AI-powered data querying
- 📊 Tabular data display
- 🔍 Natural language search
- 🌙 Dark mode support
- ♿ Accessibility compliant
- 🎨 Customizable styling
- ⚡ Error handling
- 🔌 Event callbacks

## Installation

```bash
npm install @empireui/components
```

## Usage

```tsx
import { SmartDataTable } from "@empireui/components";

function App() {
  const data = [
    { name: "John", age: 30, city: "New York" },
    { name: "Jane", age: 25, city: "London" },
  ];

  const columns = ["name", "age", "city"];

  return (
    <SmartDataTable
      openAIApiKey="your-openai-api-key"
      data={data}
      columns={columns}
      onQuery={(query, result) => console.log(result)}
      onError={(error) => console.error(error)}
      theme="light"
    />
  );
}
```

## Props

| Prop         | Type                                   | Required | Default | Description                     |
| ------------ | -------------------------------------- | -------- | ------- | ------------------------------- |
| openAIApiKey | string                                 | Yes      | -       | Your OpenAI API key             |
| data         | any[]                                  | Yes      | -       | Array of data objects           |
| columns      | string[]                               | Yes      | -       | Array of column names           |
| onQuery      | (query: string, result: any[]) => void | No       | -       | Callback when query is executed |
| onError      | (error: string) => void                | No       | -       | Callback when an error occurs   |
| className    | string                                 | No       | ""      | Additional CSS class name       |
| theme        | "light" \| "dark"                      | No       | "light" | UI theme                        |

## API Integration

The component uses OpenAI's Chat Completions API with the following settings:

- Model: GPT-3.5 Turbo
- Max tokens: 1024
- Temperature: 0
- System prompt: Data analysis focused

## Query Capabilities

The component supports:

- Natural language queries
- Complex filtering
- Data analysis
- Real-time results
- Error handling

## Error Handling

The component handles various error scenarios:

- API errors
- Network issues
- Invalid queries
- Data format errors
- Rate limiting

## Styling

The component uses inline styles by default but can be customized through:

- `className` prop for additional CSS classes
- `theme` prop for light/dark mode
- Custom style overrides

## Browser Support

- Chrome
- Firefox
- Safari
- Edge

## Contributing

Contributions are welcome! Please read our [Contributing Guide](../../../../CONTRIBUTING.md) for details.

## License

MIT License - see the [LICENSE](../../../../LICENSE) file for details.
