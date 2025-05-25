# VoiceCommandButton Component 🎤

A React component that provides a voice command interface for triggering actions through speech recognition using the Web Speech API.

## Features

- 🎯 Voice command recognition
- ⚡ Real-time processing
- 🌙 Dark mode support
- ♿ Accessibility compliant
- 🎨 Customizable styling
- ⚠️ Error handling
- 🔌 Event callbacks

## Installation

```bash
npm install @empireui/components
```

## Usage

```tsx
import { VoiceCommandButton } from "@empireui/components";

function App() {
  return (
    <VoiceCommandButton
      onCommand={(command) => console.log(command)}
      onError={(error) => console.error(error)}
      theme="light"
    />
  );
}
```

## Props

| Prop      | Type                      | Required | Default | Description                       |
| --------- | ------------------------- | -------- | ------- | --------------------------------- |
| onCommand | (command: string) => void | Yes      | -       | Callback when command is received |
| onError   | (error: string) => void   | No       | -       | Callback when an error occurs     |
| className | string                    | No       | ""      | Additional CSS class name         |
| theme     | "light" \| "dark"         | No       | "light" | UI theme                          |

## API Integration

The component uses the Web Speech API with the following settings:

- Language: en-US
- Interim results: false
- Continuous: false
- Error handling: enabled

## Voice Recognition

The component supports:

- Single command recognition
- Error handling
- Browser compatibility check
- Loading states
- Accessibility

## Error Handling

The component handles various error scenarios:

- Browser compatibility
- Network issues
- Recognition errors
- Permission errors

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
