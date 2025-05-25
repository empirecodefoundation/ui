# 🚀 Empire UI: AI-Ready Component Library for Next.js

Welcome to **Empire UI**, a modern, feature-rich component library designed specifically for AI-powered applications. Built with React, Next.js, and TypeScript, our components leverage the latest in AI technology to help you create sophisticated, intelligent interfaces with minimal effort.

## 🔥 Features

- **AI-Ready Components**: Pre-built components optimized for AI applications
- **Next.js Integration**: Seamless integration with Next.js applications
- **TypeScript Support**: Full type safety for all components
- **Modern Design**: Clean, responsive design with customizable themes
- **Accessibility**: WCAG compliant components for inclusive applications
- **Open Source**: 100% open source, community-driven development

## 📦 Installation

```bash
# Install via npm
npm install @empireui/empire-ui

# Or using yarn
yarn add @empireui/empire-ui

# Or using pnpm
pnpm add @empireui/empire-ui
```

## 🚀 Quick Start Guide

Initialize Empire UI in your project:

```bash
npx @empireui/empire-ui init
```

Add components to your project:

```bash
npx @empireui/empire-ui add Button
npx @empireui/empire-ui add AIChatbox
```

## 📚 Components

### Core UI Components
- Button, Card, Input, Dialog, Dropdown, etc.
- Responsive layouts and grids
- Form elements with validation

### AI-Specific Components
- **AIChatbox**: Interactive chat interface for AI assistants
- **AIGrammarCheckButton**: One-click grammar checking
- **AIImageCaptionButton**: Generate captions for images
- **AIParaphraserButton**: Instantly rephrase text
- **AISummarizerButton**: Summarize long content
- **AITranslatorButton**: Translate text between languages

### Advanced AI Components (New!)
- **AgentWorkflow**: Visual workflow builder for AI agents
- **MCPInterface**: Model Context Protocol integration
- **NodeCanvas**: Drag-and-drop node editor for AI pipelines
- **ARVisualizer**: Augmented reality data visualization
- **VRInteractionSpace**: Virtual reality AI interaction environment
- **SemanticSearchBar**: AI-powered semantic search with auto-suggestions

## 💻 Usage Example

```jsx
import { AIChatbox } from '@empireui/empire-ui';

function MyAIApp() {
  return (
    <div>
      <h1>My AI Assistant</h1>
      <AIChatbox isOpen={true} />
    </div>
  );
}
```

## 📖 Documentation

For detailed documentation, examples, and API references, visit our [documentation site](https://www.empireui.com/docs).

## 🤝 Contributing

We welcome contributions from the community! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute to Empire UI.

## 📄 License

Empire UI is [MIT licensed](./LICENSE).

## 🌟 Community

Join our community of developers building the future of AI interfaces:

- [GitHub Discussions](https://github.com/empirecodefoundation/ui/discussions)
- [Discord Community](https://discord.gg/empireui)
- [Twitter](https://twitter.com/empireui)

---

## 📖 Table of Contents

- [About Empire UI](#about-empire-ui)
- [Features](#features)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)
- [Community](#community)
- [Acknowledgments](#acknowledgments)

---

## 🔍 About Empire UI

Empire UI is more than just a component library—it's a complete solution for developers building AI-powered applications on Next.js. Whether you're creating a chatbot interface, an AI-driven dashboard, or any other AI-infused project, Empire UI provides the tools and components you need to build stunning, performant applications.

### 🎨 Design Philosophy

- **Minimalist:** Simple, elegant, and modern design.
- **AI-Ready:** Seamlessly integrate AI features using Vercel AI SDK and other tools.
- **Developer-Friendly:** Easy to use, extend, and customize.

---

## ✨ Features

- **AI-Ready Components:** Pre-built components ready for AI integration.
- **Next.js Optimized:** Components optimized for use with Next.js applications.
- **Vercel AI SDK Integration:** Out-of-the-box support for Vercel AI SDK.
- **Responsive Design:** Fully responsive components for all screen sizes.
- **Customizable:** Easily extend and customize components to suit your needs.
- **Open Source:** 100% open source, community-driven.

---

## ⚙️ Installation

Install Empire UI in your Next.js project with the following commands:

```bash
npm install @empire-ui/core
# or
yarn add @empire-ui/core
# or
pnpm add @empire-ui/core

```

# AuraTheme - Dynamic Theme Generator

AuraTheme is a powerful React component that generates and applies adaptive themes for websites using AI. It leverages Google's Gemini AI to create beautiful, context-aware color schemes and patterns based on user prompts.

## 🌟 Features

### AI-Powered Theme Generation
- Generate themes using Gemini 2.0 Flash AI
- Context-aware color palette generation
- Intelligent pattern suggestions
- Fallback themes for reliability

### Theme Customization
- Custom color picker integration
- Pattern upload support
- Predefined theme options
- Real-time theme preview

### User Interface
- Floating action button design
- Modal-based theme customization
- Intuitive color selection
- Responsive layout

### Theme Application
- CSS variable-based theming
- Global theme application
- Smooth theme transitions
- Pattern overlay support

## 🛠️ Installation

1. Install the required dependencies:
```bash
npm install @google/generative-ai react-color
```

2. Create a `.env` file in your project root:
```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

## 📦 Component Structure

```
src/
├── components/
│   └── ai/
│       └── AuraTheme/
│           ├── AuraTheme.tsx      # Main component
│           └── useAuraTheme.ts    # Custom hook
├── lib/
│   └── gemini.ts                  # Gemini AI integration
└── env.d.ts                       # Type declarations
```

## 🎨 Usage

```tsx
import { AuraTheme } from '@/components/ai/AuraTheme/AuraTheme';

function App() {
  return (
    <div>
      <AuraTheme />
      {/* Your app content */}
    </div>
  );
}
```

## 🔧 Configuration

### Theme Generation
The component supports three theme generation modes:
1. **AI Generation**: Uses Gemini AI to generate themes based on prompts
2. **Custom Colors**: Manual color selection with color picker
3. **Predefined Themes**: Quick selection from preset themes

### CSS Variables
The generated theme is applied using CSS variables:
```css
:root {
  --aura-primary: #color;
  --aura-secondary: #color;
  --aura-background: #color;
  --aura-text: #color;
  --aura-pattern: pattern-name;
}
```

## 🤖 AI Integration

The component uses Gemini 2.0 Flash AI to generate themes. The AI considers:
- Primary color for attention-grabbing elements
- Secondary color for complementary elements
- Background color for subtle contrast
- Text color for readability
- Pattern suggestions for visual interest

## 🎯 Features in Detail

### Theme Generation
- **AI-Powered**: Uses Gemini AI to generate context-aware themes
- **Custom Colors**: Manual color selection with color picker
- **Pattern Upload**: Support for custom pattern uploads
- **Predefined Themes**: Quick selection from preset themes

### User Interface
- **Floating Button**: Easy access to theme customization
- **Modal Interface**: Clean, organized theme options
- **Color Picker**: Intuitive color selection
- **Pattern Preview**: Visual pattern selection

### Theme Application
- **Global Theming**: Applies theme to entire application
- **CSS Variables**: Easy theme customization
- **Smooth Transitions**: Animated theme changes
- **Pattern Overlay**: Background pattern support

## 🔒 Security

- API key stored in environment variables
- Secure API communication
- No client-side API key exposure

## 🚀 Performance

- Optimized theme generation
- Efficient CSS variable updates
- Smooth theme transitions
- Minimal bundle size

## 📝 License

MIT License - feel free to use in your projects!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- Google Gemini AI for theme generation
- React Color for color picker integration
- Vite for build tooling
