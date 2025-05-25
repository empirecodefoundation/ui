# AIImageGenerator Component

A modern, interactive image generation component that integrates with OpenAI's DALL·E API. This component provides a user-friendly interface for generating AI images with customizable options and smooth animations.

## Features

- 🎨 Real-time image generation using DALL·E
- 🌓 Dark mode support
- ⚡ Smooth animations and transitions
- 🎯 Multiple image size options (256x256, 512x512, 1024x1024)
- 🎭 Style options (vivid and natural)
- ⌨️ Keyboard support (Enter to generate)
- 📱 Responsive design
- ♿ Accessibility compliance
- 🎨 Customizable styling
- ⚠️ Comprehensive error handling
- 🔄 Loading states with visual feedback

## Installation

```bash
npm install @empireui/components
```

## Usage Example

```tsx
import { AIImageGenerator } from "@empireui/components";

function App() {
  const handleImageGenerated = (url: string) => {
    console.log("Generated image URL:", url);
  };

  const handleError = (error: string) => {
    console.error("Error:", error);
  };

  return (
    <AIImageGenerator
      openAIApiKey="your-openai-api-key"
      onImageGenerated={handleImageGenerated}
      onError={handleError}
      theme="light"
      defaultSize="512x512"
      defaultStyle="vivid"
    />
  );
}
```

## Props

| Prop             | Type                                  | Required | Default   | Description                      |
| ---------------- | ------------------------------------- | -------- | --------- | -------------------------------- |
| openAIApiKey     | string                                | Yes      | -         | Your OpenAI API key              |
| onImageGenerated | (url: string) => void                 | Yes      | -         | Callback when image is generated |
| onError          | (error: string) => void               | Yes      | -         | Callback for error handling      |
| theme            | 'light' \| 'dark'                     | No       | 'light'   | Theme of the component           |
| className        | string                                | No       | ''        | Additional CSS class name        |
| defaultSize      | '256x256' \| '512x512' \| '1024x1024' | No       | '512x512' | Default image size               |
| defaultStyle     | 'vivid' \| 'natural'                  | No       | 'vivid'   | Default image style              |

## API Integration

The component uses OpenAI's DALL·E API for image generation. The API endpoint used is:

```
POST https://api.openai.com/v1/images/generations
```

### Request Parameters

- `prompt`: The text description of the image to generate
- `n`: Number of images to generate (fixed at 1)
- `size`: Image size (256x256, 512x512, or 1024x1024)
- `style`: Image style (vivid or natural)

## Error Handling

The component handles various error scenarios:

- Invalid API key
- Network errors
- API rate limiting
- Invalid prompt
- Server errors
- Response parsing errors

All errors are passed to the `onError` callback for handling.

## Styling

The component uses inline styles for consistent appearance across different environments. You can customize the appearance by:

1. Using the `theme` prop to switch between light and dark modes
2. Adding custom styles through the `className` prop
3. Overriding specific styles using CSS

## Browser Support

The component is compatible with:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This component is part of the EmpireUI library and is licensed under the MIT License.
