// @ts-nocheck
"use client";

import React, { useState } from "react";
import { AISmartDataTableExample } from "@/components/examples/AISmartDataTableExample";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Database,
  Sparkles,
  Zap,
  Mic,
  Search,
  BarChart3,
  TrendingUp,
  Filter,
  Download,
  Upload,
  Eye,
  Smartphone,
  Globe,
  Shield,
  Layers,
  Target,
  Users,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Palette,
  MousePointer,
  Keyboard,
  MessageSquare,
  PieChart,
  LineChart,
  Activity
} from "lucide-react";

export default function AISmartDataTablePage() {
  const [demoMode, setDemoMode] = useState<"basic" | "advanced" | "enterprise">("advanced");
  const [isPlaying, setIsPlaying] = useState(false);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Querying",
      description: "Ask questions about your data in natural language and get instant, intelligent responses.",
      color: "purple"
    },
    {
      icon: Mic,
      title: "Voice Commands",
      description: "Speak your queries using built-in speech recognition for hands-free data exploration.",
      color: "blue"
    },
    {
      icon: Sparkles,
      title: "Smart Insights",
      description: "AI-generated insights reveal trends, anomalies, and correlations automatically.",
      color: "green"
    },
    {
      icon: TrendingUp,
      title: "Real-time Analysis",
      description: "Live data processing with streaming updates and progressive loading.",
      color: "yellow"
    },
    {
      icon: Filter,
      title: "Advanced Filtering",
      description: "Multi-criteria filtering with intelligent type-aware comparisons.",
      color: "red"
    },
    {
      icon: Download,
      title: "Smart Export",
      description: "Export data in multiple formats with metadata and formatting preservation.",
      color: "indigo"
    }
  ];

  const capabilities = [
    {
      category: "AI Features",
      items: [
        "Natural language querying with GPT-4 integration",
        "Voice input with speech-to-text recognition",
        "Automated insight generation and pattern detection",
        "Predictive analytics and trend forecasting",
        "Anomaly detection and correlation analysis"
      ]
    },
    {
      category: "Data Management",
      items: [
        "Multi-format data support (CSV, JSON, Excel)",
        "Real-time data synchronization",
        "Advanced filtering and sorting algorithms",
        "Batch operations and bulk editing",
        "Data validation and quality checks"
      ]
    },
    {
      category: "User Experience",
      items: [
        "Responsive design for all devices",
        "Dark mode and theme customization",
        "Keyboard navigation and accessibility",
        "Smooth animations and micro-interactions",
        "Progressive loading and virtual scrolling"
      ]
    },
    {
      category: "Enterprise Features",
      items: [
        "Role-based access control",
        "Audit logging and data lineage",
        "API integration and webhooks",
        "Custom visualization components",
        "Performance monitoring and analytics"
      ]
    }
  ];

  const useCases = [
    {
      title: "Sales Analytics",
      description: "Analyze sales performance, identify top performers, and track revenue trends.",
      queries: [
        "Show me top 10 sales reps by revenue",
        "Find customers with declining orders",
        "What are the seasonal sales patterns?"
      ]
    },
    {
      title: "Customer Intelligence",
      description: "Understand customer behavior, satisfaction, and engagement patterns.",
      queries: [
        "Show customers with high satisfaction scores",
        "Find users who haven't logged in recently",
        "What factors correlate with customer churn?"
      ]
    },
    {
      title: "Financial Analysis",
      description: "Monitor financial metrics, detect anomalies, and forecast trends.",
      queries: [
        "Show expenses above budget threshold",
        "Find unusual spending patterns",
        "Predict next quarter's revenue"
      ]
    },
    {
      title: "Operational Insights",
      description: "Optimize operations, track performance, and identify bottlenecks.",
      queries: [
        "Show projects behind schedule",
        "Find resource allocation inefficiencies",
        "What are the productivity trends?"
      ]
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Enhanced Header Section */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="relative">
            <Database className="h-16 w-16 text-purple-600" />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <Brain className="h-4 w-4 text-white" />
            </div>
          </div>
          <div className="text-left">
            <h1 className="text-5xl font-bold text-gray-900 mb-2">
              AI Smart Data Table
            </h1>
            <p className="text-lg text-purple-600 font-medium">
              Intelligent • Interactive • Enterprise-Ready
            </p>
          </div>
        </div>
        
        <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
          A revolutionary AI-powered data table that combines natural language querying, voice commands, 
          intelligent insights, and premium UI/UX for modern data analysis and visualization.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <Badge variant="secondary" className="text-sm px-3 py-1">
            <Brain className="h-3 w-3 mr-1" />
            AI-Powered Queries
          </Badge>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            <Mic className="h-3 w-3 mr-1" />
            Voice Commands
          </Badge>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            <Sparkles className="h-3 w-3 mr-1" />
            Smart Insights
          </Badge>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            <TrendingUp className="h-3 w-3 mr-1" />
            Real-time Analysis
          </Badge>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            <Smartphone className="h-3 w-3 mr-1" />
            Fully Responsive
          </Badge>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            <Shield className="h-3 w-3 mr-1" />
            Enterprise Security
          </Badge>
        </div>

        {/* Demo Mode Selector */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="text-sm font-medium text-gray-700 mr-2">Experience Mode:</span>
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            {[
              { key: "basic", label: "Basic", icon: Database, desc: "Essential features" },
              { key: "advanced", label: "Advanced", icon: Brain, desc: "AI-powered" },
              { key: "enterprise", label: "Enterprise", icon: Sparkles, desc: "Full-featured" }
            ].map(({ key, label, icon: Icon, desc }) => (
              <button
                key={key}
                onClick={() => setDemoMode(key)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                  demoMode === key
                    ? "bg-white text-purple-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon className="h-4 w-4" />
                <div className="text-left">
                  <div>{label}</div>
                  <div className="text-xs opacity-75">{desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {features.map((feature, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
            <CardHeader>
              <div className={`mx-auto w-12 h-12 rounded-lg bg-${feature.color}-100 flex items-center justify-center mb-4`}>
                <feature.icon className={`h-6 w-6 text-${feature.color}-600`} />
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Interactive Demo Section */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
            <Play className="h-8 w-8 text-purple-600" />
            Interactive Demo
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Experience the full power of AI-driven data analysis with real-time querying and insights
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              Natural language queries
            </span>
            <span className="flex items-center gap-1">
              <Mic className="h-4 w-4" />
              Voice input support
            </span>
            <span className="flex items-center gap-1">
              <Activity className="h-4 w-4" />
              Real-time processing
            </span>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-2xl p-8 border border-purple-100">
          <AISmartDataTableExample mode={demoMode} />
        </div>
        
        {/* Demo Features Highlight */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <h4 className="font-semibold text-green-900">AI Query Engine</h4>
                  <p className="text-sm text-green-700">Natural language to SQL conversion</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-blue-600" />
                <div>
                  <h4 className="font-semibold text-blue-900">Smart Insights</h4>
                  <p className="text-sm text-blue-700">Automated pattern recognition</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Sparkles className="h-8 w-8 text-purple-600" />
                <div>
                  <h4 className="font-semibold text-purple-900">Voice Interface</h4>
                  <p className="text-sm text-purple-700">Hands-free data exploration</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Real-World Use Cases</h2>
          <p className="text-lg text-gray-600">
            See how AI Smart Data Table transforms data analysis across different industries
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  {useCase.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Example Queries:</h4>
                  {useCase.queries.map((query, qIndex) => (
                    <div key={qIndex} className="flex items-center gap-2 text-sm">
                      <ArrowRight className="h-3 w-3 text-purple-600 flex-shrink-0" />
                      <span className="text-gray-700 italic">"{query}"</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Technical Capabilities */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Technical Capabilities</h2>
          <p className="text-lg text-gray-600">
            Built with cutting-edge technology for enterprise-grade performance and scalability
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {capabilities.map((category, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-purple-600" />
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="mb-16">
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Performance Metrics</h2>
              <p className="text-purple-100">
                Optimized for speed, scalability, and user experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: "Query Response", value: "<200ms", icon: Zap },
                { label: "Data Processing", value: "1M+ rows", icon: Database },
                { label: "Accuracy Rate", value: "99.5%", icon: Target },
                { label: "Uptime", value: "99.9%", icon: Shield }
              ].map((metric, index) => (
                <div key={index} className="text-center">
                  <metric.icon className="h-8 w-8 mx-auto mb-2 text-purple-200" />
                  <div className="text-2xl font-bold mb-1">{metric.value}</div>
                  <div className="text-sm text-purple-200">{metric.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Getting Started */}
      <div className="text-center">
        <Card className="bg-gradient-to-br from-gray-50 to-white border-2 border-dashed border-gray-300">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-6">
              Integrate AI Smart Data Table into your application and transform how users interact with data.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Download className="h-4 w-4 mr-2" />
                Install Component
              </Button>
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View Documentation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
