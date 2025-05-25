# ChatInterface Component 💬

A React component that provides a modern, interactive chat interface with OpenAI integration. This component offers real-time messaging, message history, and smooth animations.

## Features

- 🎯 Real-time chat with OpenAI
- ⚡ Message history management
- 🌙 Dark mode support
- ♿ Accessibility compliant
- 🎨 Customizable styling
- ⚠️ Error handling
- 🔌 Event callbacks
- 📱 Responsive design
- ✨ Smooth animations

## Installation

```bash
npm install @empireui/components
```

## Usage

```tsx
import { ChatInterface } from "@empireui/components";

function App() {
  return (
    <ChatInterface
      openAIApiKey="your-openai-api-key"
      systemPrompt="You are a helpful assistant."
      onMessage={(message) => console.log(message)}
      onError={(error) => console.error(error)}
      theme="light"
      maxMessages={50}
    />
  );
}
```

## Props

| Prop         | Type                       | Required | Default | Description                                   |
| ------------ | -------------------------- | -------- | ------- | --------------------------------------------- |
| openAIApiKey | string                     | Yes      | -       | Your OpenAI API key                           |
| systemPrompt | string                     | Yes      | -       | Initial system prompt for the AI              |
| onMessage    | (message: Message) => void | Yes      | -       | Callback when a message is sent/received      |
| onError      | (error: string) => void    | Yes      | -       | Callback when an error occurs                 |
| theme        | "light" \| "dark"          | No       | "light" | UI theme                                      |
| className    | string                     | No       | ""      | Additional CSS class name                     |
| maxMessages  | number                     | No       | 50      | Maximum number of messages to keep in history |

## Message Interface

```typescript
interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
```

## API Integration

The component uses OpenAI's Chat Completions API with the following settings:

- Model: gpt-3.5-turbo
- System prompt: Configurable
- Message history: Maintained in state
- Real-time responses

## Features

The component includes:

- Message history management
- Real-time typing
- Loading states
- Error handling
- Smooth animations
- Auto-scrolling
- Enter to send
- Message timestamps

## Error Handling

The component handles various error scenarios:

- API key validation
- Network issues
- Response errors
- Input validation
- Rate limiting

## Styling

The component uses inline styles by default but can be customized through:

- `className` prop for additional CSS classes
- `theme` prop for light/dark mode
- Custom style overrides

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

Contributions are welcome! Please read our [Contributing Guide](../../../../CONTRIBUTING.md) for details.

## License

MIT License - see the [LICENSE](../../../../LICENSE) file for details.
