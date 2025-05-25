# AISummarizer Component

A powerful React component that uses OpenAI's GPT model to generate summaries from text documents. Features a modern, responsive UI with dark mode support and smooth animations.

## Features

- 📝 **Multiple File Formats**: Supports .txt, .md, .json, .csv, and .log files
- 🎨 **Theme Support**: Light and dark mode with customizable styling
- 📊 **Progress Tracking**: Visual progress indicator for file uploads
- ⚡ **Enhanced Summarization**: Customizable summary length, style, and focus areas
- 🌐 **Multi-language Support**: Generate summaries in any language
- 🔒 **Error Handling**: Comprehensive error handling with user feedback
- 🎭 **Animations**: Smooth transitions and loading states using Framer Motion
- 📱 **Responsive Design**: Works on all screen sizes
- ♿ **Accessibility**: WCAG compliant with keyboard navigation

## Installation

```bash
npm install @empireui/components
# or
yarn add @empireui/components
# or
pnpm add @empireui/components
```

## Usage

```tsx
import { AISummarizer } from "@empireui/components";

function MyApp() {
  return (
    <AISummarizer
      openAIApiKey="your-openai-api-key"
      options={{
        maxLength: 200,
        style: "concise",
        language: "English",
        focus: ["key points", "main ideas"],
      }}
      onSummaryGenerated={(summary) => console.log(summary)}
      onError={(error) => console.error(error)}
      theme="light"
    />
  );
}
```

## Props

| Prop                 | Type                      | Required | Default | Description                        |
| -------------------- | ------------------------- | -------- | ------- | ---------------------------------- |
| `openAIApiKey`       | string                    | Yes      | -       | Your OpenAI API key                |
| `options`            | SummarizationOptions      | No       | {}      | Configuration for summarization    |
| `onSummaryGenerated` | (summary: string) => void | No       | -       | Callback when summary is generated |
| `onError`            | (error: string) => void   | No       | -       | Callback when an error occurs      |
| `className`          | string                    | No       | ""      | Additional CSS class name          |
| `theme`              | "light" \| "dark"         | No       | "light" | UI theme                           |

### SummarizationOptions

| Option      | Type                                       | Default   | Description                                 |
| ----------- | ------------------------------------------ | --------- | ------------------------------------------- |
| `maxLength` | number                                     | 200       | Maximum length of summary in words          |
| `style`     | "concise" \| "detailed" \| "bullet-points" | "concise" | Style of the summary                        |
| `language`  | string                                     | "English" | Language for the summary                    |
| `focus`     | string[]                                   | []        | Specific aspects to focus on in the summary |

## API Integration

The component uses OpenAI's GPT-3.5 Turbo model with the following settings:

- Model: gpt-3.5-turbo
- Max tokens: 512
- Temperature: 0.7

## Error Handling

The component handles various error scenarios:

- Missing API key
- File size limits (max 5MB)
- Unsupported file types
- File reading errors
- API errors
- Network issues

## Styling

The component uses a combination of inline styles and CSS classes for styling. You can customize the appearance by:

1. Passing a `className` prop for additional CSS classes
2. Using the `theme` prop to switch between light and dark modes
3. Overriding specific styles using CSS custom properties

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](../../../../LICENSE) file for details.
