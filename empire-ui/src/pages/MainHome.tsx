import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/base/Button";
import {
  Sparkles,
  MessageSquare,
  Image as ImageIcon,
  Code2,
  ArrowRight,
  Zap,
  Brain,
  Cpu,
} from "lucide-react";

export const MainHome: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-500/20 via-blue-500/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
            <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
            <span className="text-blue-400 font-medium">
              Empire UI - AI-Powered Interface
            </span>
          </div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Welcome to the Future of AI
          </h1>
          <p className="text-xl text-zinc-300/80 max-w-2xl mx-auto mb-8">
            Experience the power of artificial intelligence with our
            cutting-edge tools for chat, image generation, and code assistance.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/ai-tools">
              <Button className="group bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/docs">
              <Button
                variant="outline"
                className="px-8 py-6 text-lg rounded-xl border-white/20 hover:bg-white/5"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* AI Chat Card */}
          <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">AI Chat</h3>
              <p className="text-zinc-400 mb-6">
                Engage in natural conversations with our advanced AI assistant.
                Get instant responses and intelligent insights.
              </p>
              <Link to="/ai-tools">
                <Button className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400">
                  Try AI Chat
                </Button>
              </Link>
            </div>
          </div>

          {/* Image Generator Card */}
          <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
                <ImageIcon className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Image Generator
              </h3>
              <p className="text-zinc-400 mb-6">
                Create stunning, unique images using our AI-powered generation
                tool. Transform your ideas into visual masterpieces.
              </p>
              <Link to="/ai-tools">
                <Button className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400">
                  Generate Images
                </Button>
              </Link>
            </div>
          </div>

          {/* Code Assistant Card */}
          <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-6">
                <Code2 className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Code Assistant
              </h3>
              <p className="text-zinc-400 mb-6">
                Get intelligent coding help and generate code snippets with our
                AI-powered code assistant.
              </p>
              <Link to="/ai-tools">
                <Button className="w-full bg-pink-500/20 hover:bg-pink-500/30 text-pink-400">
                  Try Code Assistant
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-32 text-center">
          <h2 className="text-4xl font-bold text-white mb-16">
            Why Choose Empire UI?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Lightning Fast
              </h3>
              <p className="text-zinc-400">
                Instant responses and real-time interactions with our AI tools.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Intelligent</h3>
              <p className="text-zinc-400">
                Advanced AI models powering every interaction and generation.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center mx-auto">
                <Cpu className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Powerful</h3>
              <p className="text-zinc-400">
                State-of-the-art technology for the best possible results.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};
