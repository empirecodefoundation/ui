# Empire UI Web Showcase

This is the official showcase website for **Empire UI** - an open-source UI component library built with React and Next.js, optimized for AI-powered applications.

![Empire UI](https://img.shields.io/badge/Empire_UI-Next.js_15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Three.js](https://img.shields.io/badge/Three.js-Physics-000000?style=for-the-badge&logo=three.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)

## 🚀 Features

- **Interactive 3D Components**: Physics-based Ballpit component with Three.js
- **Modern UI Effects**: Aurora backgrounds, particle systems, and animations
- **AI-Optimized Components**: Specialized components for AI applications
- **Responsive Design**: Optimized for desktop experiences (≥1280px)
- **Performance Focused**: Optimized rendering and animation systems

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/empirecodefoundation/ui.git
cd empire-web

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Development
You can start editing the page by modifying files in the `app/` directory. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 🎨 Components

### Interactive Physics
- **Ballpit Component**: Real-time physics simulation with Three.js
  - Configurable ball count, gravity, and physics properties
  - Mouse interaction and cursor following
  - Optimized for performance with proper boundary detection

### UI Effects
- **Aurora Backgrounds**: Dynamic gradient animations
- **Particle Systems**: Customizable particle effects
- **Loading Animations**: Smooth transitions and loaders

## 🏗️ Architecture

```
empire-web/
├── app/                 # Next.js App Router
├── components/
│   ├── ui/             # Reusable UI components
│   ├── common/         # Shared components
│   └── layout/         # Layout components
├── lib/                # Utility functions
└── public/             # Static assets
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](../CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## 📚 Learn More

### Empire UI Resources
- [Empire UI Documentation](https://empireui.com) - Complete component documentation
- [Component Examples](./examples/) - Interactive component examples
- [GitHub Repository](https://github.com/empirecodefoundation/ui) - Source code and issues

### Next.js Resources
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

---

**Empire Code Foundation** - Democratizing AI application development through open-source tools.
