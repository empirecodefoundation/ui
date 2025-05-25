# SpeechToText Component 🎤

A React component that provides real-time speech-to-text functionality using OpenAI's Whisper API. This component offers a modern, accessible interface for voice input with visual feedback and error handling.

## Features

- 🎯 Real-time speech recording
- ⚡ OpenAI Whisper integration
- 🌙 Dark mode support
- ♿ Accessibility compliant
- 🎨 Customizable styling
- ⚠️ Error handling
- 🔌 Event callbacks
- 🌍 Multi-language support

## Installation

```bash
npm install @empireui/components
```

## Usage

```tsx
import { SpeechToText } from "@empireui/components";

function App() {
  return (
    <SpeechToText
      openAIApiKey="your-openai-api-key"
      onTranscription={(text) => console.log(text)}
      onError={(error) => console.error(error)}
      theme="light"
      language="en-US"
      continuous={false}
    />
  );
}
```

## Props

| Prop            | Type                    | Required | Default | Description                                            |
| --------------- | ----------------------- | -------- | ------- | ------------------------------------------------------ |
| openAIApiKey    | string                  | Yes      | -       | Your OpenAI API key                                    |
| onTranscription | (text: string) => void  | Yes      | -       | Callback when transcription is received                |
| onError         | (error: string) => void | Yes      | -       | Callback when an error occurs                          |
| theme           | "light" \| "dark"       | No       | "light" | UI theme                                               |
| className       | string                  | No       | ""      | Additional CSS class name                              |
| language        | string                  | No       | "en-US" | Language code for transcription                        |
| continuous      | boolean                 | No       | false   | Whether to continue recording after each transcription |

## API Integration

The component uses OpenAI's Whisper API with the following settings:

- Model: whisper-1
- Language: Configurable (default: en-US)
- Format: audio/webm
- Real-time processing

## Voice Recognition

The component supports:

- Single recording sessions
- Continuous recording mode
- Multiple languages
- Error handling
- Browser compatibility check
- Loading states
- Accessibility

## Error Handling

The component handles various error scenarios:

- API key validation
- Microphone access
- Network issues
- Transcription errors
- Browser compatibility

## Styling

The component uses inline styles by default but can be customized through:

- `className` prop for additional CSS classes
- `theme` prop for light/dark mode
- Custom style overrides

## Browser Support

- Chrome (recommended)
- Edge
- Safari
- Firefox

## Contributing

Contributions are welcome! Please read our [Contributing Guide](../../../../CONTRIBUTING.md) for details.

## License

MIT License - see the [LICENSE](../../../../LICENSE) file for details.
