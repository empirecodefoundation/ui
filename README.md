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

# AuraTheme - AI-Powered Theme Generator

AuraTheme is a modern web application that uses AI to generate beautiful color themes based on your descriptions. Built with Next.js, TypeScript, and Google's Gemini AI.

## Features

- AI-powered theme generation using Google's Gemini AI
- Real-time theme preview
- Color palette visualization
- Responsive design
- Easy-to-use interface

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/auratheme.git
cd auratheme
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your Gemini API key:
```
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter a description of your desired theme in the input field
2. Click "Generate Theme"
3. View the generated color palette
4. The theme will be automatically applied to the preview

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── ui/             # UI components
│   └── ThemeGenerator.tsx  # Main theme generator component
├── lib/                # Utility functions
└── styles/             # Global styles
```

## Technologies Used

- Next.js 14
- TypeScript
- Google Gemini AI
- Tailwind CSS
- React

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for theme generation
- React Color for color picker integration
- Vite for build tooling

## 🎨 Using Gemini-Generated Theme Colors

When you receive a theme from Gemini AI, it returns a JSON object with the following structure:

```json
{
  "primary": "hex color",
  "secondary": "hex color",
  "background": "hex color",
  "text": "hex color"
}
```

### CSS Variables Usage

To use these colors in your project, add the following CSS variables to your root styles:

```css
:root {
  --primary-color: var(--primary);
  --secondary-color: var(--secondary);
  --background-color: var(--background);
  --text-color: var(--text);
}
```

### Example Usage in CSS

```css
/* Primary color usage */
.button {
  background-color: var(--primary-color);
  color: var(--text-color);
}

/* Secondary color usage */
.card {
  background-color: var(--secondary-color);
  border: 1px solid var(--primary-color);
}

/* Background color usage */
body {
  background-color: var(--background-color);
  color: var(--text-color);
}
```

### JavaScript Usage

To apply the theme programmatically:

```javascript
function applyTheme(themeData) {
  document.documentElement.style.setProperty('--primary-color', themeData.primary);
  document.documentElement.style.setProperty('--secondary-color', themeData.secondary);
  document.documentElement.style.setProperty('--background-color', themeData.background);
  document.documentElement.style.setProperty('--text-color', themeData.text);
}
```

### Tailwind CSS Usage

If you're using Tailwind CSS, you can extend your theme in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        background: 'var(--background-color)',
        text: 'var(--text-color)',
      },
    },
  },
}
```

Then use these colors in your Tailwind classes:

```html
<div class="bg-primary text-text">
  <button class="bg-secondary hover:bg-primary">
    Click me
  </button>
</div>
```

### Best Practices

1. Always provide fallback colors in case the theme generation fails
2. Use CSS variables for easy theme switching
3. Consider adding transition effects for smooth theme changes
4. Test color contrast ratios for accessibility
5. Implement dark mode variations of the theme
