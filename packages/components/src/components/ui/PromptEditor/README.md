# PromptEditor Component

A powerful and flexible component for creating, editing, and testing AI prompts with variable support. This component is designed to help developers and users create and manage AI prompts in a user-friendly interface.

## Features

- 📝 Visual prompt editing with syntax highlighting
- 🔄 Real-time variable extraction and management
- 🎯 Prompt testing with OpenAI integration
- 💾 Save and load prompt templates
- 🌓 Dark/Light theme support
- ♿ Full accessibility support
- 📱 Responsive design
- 🎨 Customizable styling

## Installation

```bash
npm install @empireui/components
```

## Usage

```tsx
import { PromptEditor } from "@empireui/components";

function App() {
  const handleSave = (template) => {
    console.log("Saved template:", template);
  };

  const handleTest = (result) => {
    console.log("Test result:", result);
  };

  return (
    <PromptEditor
      openAIApiKey="your-openai-api-key"
      onSave={handleSave}
      onTest={handleTest}
      theme="light"
    />
  );
}
```

## Props

| Prop            | Type                               | Required | Default | Description                     |
| --------------- | ---------------------------------- | -------- | ------- | ------------------------------- |
| openAIApiKey    | string                             | Yes      | -       | Your OpenAI API key             |
| onSave          | (template: PromptTemplate) => void | No       | -       | Callback when template is saved |
| onTest          | (result: string) => void           | No       | -       | Callback with test results      |
| theme           | 'light' \| 'dark'                  | No       | 'light' | Theme mode                      |
| className       | string                             | No       | ''      | Additional CSS class            |
| initialTemplate | PromptTemplate                     | No       | -       | Initial template data           |

### PromptTemplate Interface

```typescript
interface PromptTemplate {
  id: string;
  name: string;
  content: string;
  variables: string[];
}
```

## API Integration

The component uses OpenAI's API for testing prompts. It supports:

- Text completion using GPT-3.5
- Variable substitution in prompts
- Error handling and loading states

## Variable Syntax

Use double curly braces to define variables in your prompts:

```
Hello {{name}}, welcome to {{place}}!
```

The component will automatically extract these variables and create input fields for them.

## Error Handling

The component handles various error scenarios:

- API key validation
- Network issues
- Response errors
- Input validation
- Rate limiting

## Styling

The component uses TailwindCSS for styling and supports:

- Custom themes
- Responsive design
- Dark/Light mode
- Custom class names

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details
