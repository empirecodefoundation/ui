# 🚀 Empire UI: AI-Ready Component Library for Next.js

Welcome to **Empire UI**, a modern, feature-rich component library designed specifically for AI-powered applications. Built with React, Next.js, and TypeScript, our components leverage the latest in AI technology to help you create sophisticated, intelligent interfaces with minimal effort.

## 🔥 Features

- **AI-Ready Components**: Pre-built components optimized for AI applications
- **3D Interactive Elements**: Advanced Three.js components for immersive experiences
- **Physics Simulations**: Real-time physics effects with cursor interactions
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
npx @empireui/empire-ui add TestCursor
npx @empireui/empire-ui add FluidGlass
```

## 📚 Components

### Core UI Components
- Button, Card, Input, Dialog, Dropdown, etc.
- Responsive layouts and grids
- Form elements with validation

### 🎮 Interactive 3D Components (New!)
- **TestCursor**: Liquid glass cursor effect with Three.js physics
- **FluidGlass**: Advanced liquid cursor with multiple modes (lens, bar, cube)
- **Ballpit**: Physics-based ball simulation with boundary containment
- **AuroraBackgrounds**: Dynamic aurora effect backgrounds

### AI-Specific Components
- **AIChatbox**: Interactive chat interface for AI assistants
- **AIGrammarCheckButton**: One-click grammar checking
- **AIImageCaptionButton**: Generate captions for images
- **AIParaphraserButton**: Instantly rephrase text
- **AISummarizerButton**: Summarize long content
- **AITranslatorButton**: Translate text between languages

### Advanced AI Components
- **AgentWorkflow**: Visual workflow builder for AI agents
- **MCPInterface**: Model Context Protocol integration
- **NodeCanvas**: Drag-and-drop node editor for AI pipelines
- **ARVisualizer**: Augmented reality data visualization
- **VRInteractionSpace**: Virtual reality AI interaction environment
- **SemanticSearchBar**: AI-powered semantic search with auto-suggestions

## 💻 Usage Examples

### Basic AI Chat Integration
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

### Interactive 3D Cursor Effect
```jsx
import { TestCursor } from '@empireui/empire-ui';

function InteractiveDemo() {
  return (
    <div className="w-full h-screen">
      <TestCursor />
    </div>
  );
}
```

### Advanced Liquid Glass Effect
```jsx
import { FluidGlass } from '@empireui/empire-ui';

function FluidDemo() {
  return (
    <FluidGlass 
      mode="lens"
      lensProps={{
        scale: 0.5,
        ior: 1.15,
        thickness: 5,
        chromaticAberration: 0.1
      }}
    />
  );
}
```

## 🎨 Demo Pages

Visit our demo pages to see the components in action:
- `/cursor-test` - TestCursor liquid glass effect demo
- `/components` - Complete component showcase
- `/templates` - Pre-built template examples

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
- [Components](#components)
- [Demo Pages](#demo-pages)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)
- [Community](#community)

---

## 🔍 About Empire UI

Empire UI is more than just a component library—it's a complete solution for developers building AI-powered applications on Next.js. Whether you're creating a chatbot interface, an AI-driven dashboard, or immersive 3D experiences, Empire UI provides the tools and components you need to build stunning, performant applications.

### 🎨 Design Philosophy

- **Minimalist:** Simple, elegant, and modern design.
- **AI-Ready:** Seamlessly integrate AI features using Vercel AI SDK and other tools.
- **Interactive:** Advanced 3D and physics-based components for engaging UX.
- **Developer-Friendly:** Easy to use, extend, and customize.

---

## ✨ Key Features

- **AI-Ready Components:** Pre-built components ready for AI integration.
- **3D Interactive Elements:** Three.js powered components with physics simulation.
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

## 🆕 Latest Updates
- **NEW**: TestCursor component with liquid glass physics simulation
- **NEW**: FluidGlass component with multiple interaction modes
- **NEW**: Ballpit physics simulation with containment boundaries
- Enhanced UI with improved segment heights
- Optimized image positioning for better display
- Refined styling for better visual appeal
- Improved vertical positioning of UI segments
- Fixed Empire UI title placement in header notch
- Added comprehensive TypeScript support
- Repository cleanup with proper .gitignore configuration


- [Empire Code Foundation](https://github.com/empirecodefoundation)

---

Built with ❤️ by the Empire Code Foundation team
