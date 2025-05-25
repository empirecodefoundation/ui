// @ts-nocheck
"use client";

import React, { useState } from "react";
import { AIDocumentAnalyzer } from "@/components/core/AIDocumentAnalyzer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Brain,
  FileText,
  Sparkles,
  Zap,
  Eye,
  Download,
  Shield,
  Smartphone,
  Upload,
  BarChart3,
  Users,
  Tag,
  Clock,
  TrendingUp,
  Layers,
  Palette,
  MousePointer,
  Keyboard,
  Globe,
  Settings,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";

export default function AIDocumentAnalyzerPage() {
  const [demoMode, setDemoMode] = useState<"basic" | "advanced" | "batch">("advanced");
  const [analysisResults, setAnalysisResults] = useState([]);

  const handleAnalysisComplete = (result) => {
    setAnalysisResults(prev => [result, ...prev.slice(0, 4)]);
  };

  const handleBatchComplete = (results) => {
    setAnalysisResults(prev => [...results, ...prev.slice(0, 2)]);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Enhanced Header Section */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="relative">
            <Brain className="h-16 w-16 text-purple-600" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
          </div>
          <div className="text-left">
            <h1 className="text-5xl font-bold text-gray-900 mb-2">
              AI Document Analyzer
            </h1>
            <p className="text-lg text-purple-600 font-medium">
              Enhanced • Intelligent • Production-Ready
            </p>
          </div>
        </div>

        <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
          A comprehensive AI-powered component featuring batch processing, real-time progress tracking,
          advanced animations, and intelligent content analysis using state-of-the-art language models.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <Badge variant="secondary" className="text-sm px-3 py-1">
            <Zap className="h-3 w-3 mr-1" />
            AI-Powered Analysis
          </Badge>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            <Layers className="h-3 w-3 mr-1" />
            Batch Processing
          </Badge>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            <Eye className="h-3 w-3 mr-1" />
            OCR Integration
          </Badge>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            <BarChart3 className="h-3 w-3 mr-1" />
            Real-time Progress
          </Badge>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            <Palette className="h-3 w-3 mr-1" />
            Enhanced UI/UX
          </Badge>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            <Smartphone className="h-3 w-3 mr-1" />
            Fully Responsive
          </Badge>
        </div>

        {/* Demo Mode Selector */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="text-sm font-medium text-gray-700 mr-2">Demo Mode:</span>
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            {[
              { key: "basic", label: "Basic", icon: FileText },
              { key: "advanced", label: "Advanced", icon: Sparkles },
              { key: "batch", label: "Batch", icon: Layers }
            ].map(({ key, label, icon: Icon }) => (
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
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card className="text-center">
          <CardHeader>
            <FileText className="h-8 w-8 text-blue-600 mx-auto" />
            <CardTitle className="text-lg">Multi-Format Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              PDF, images, text files with automatic format detection and processing
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Brain className="h-8 w-8 text-purple-600 mx-auto" />
            <CardTitle className="text-lg">AI Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              GPT-4 powered analysis for summaries, sentiment, and entity extraction
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Sparkles className="h-8 w-8 text-green-600 mx-auto" />
            <CardTitle className="text-lg">Smart Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Key points, topics, readability scores, and confidence metrics
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Shield className="h-8 w-8 text-red-600 mx-auto" />
            <CardTitle className="text-lg">Secure Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              File validation, size limits, and secure text processing
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Live Demo Section */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
            <Play className="h-8 w-8 text-purple-600" />
            Interactive Demo
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Experience the enhanced AI Document Analyzer with all new features
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Keyboard className="h-4 w-4" />
              Keyboard shortcuts enabled
            </span>
            <span className="flex items-center gap-1">
              <MousePointer className="h-4 w-4" />
              Enhanced drag & drop
            </span>
            <span className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              Real-time processing
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100">
          <AIDocumentAnalyzer
            onAnalysisComplete={handleAnalysisComplete}
            onBatchComplete={handleBatchComplete}
            maxFileSize={15}
            maxFiles={demoMode === "batch" ? 5 : demoMode === "advanced" ? 3 : 1}
            enableBatch={demoMode === "batch" || demoMode === "advanced"}
            enableHistory={true}
            acceptedFileTypes={[".pdf", ".png", ".jpg", ".jpeg", ".txt", ".docx", ".rtf"]}
            apiEndpoint="/api/ai-document-analyzer"
            className="max-w-none"
          />
        </div>

        {/* Demo Features Highlight */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <h4 className="font-semibold text-green-900">Enhanced UX</h4>
                  <p className="text-sm text-green-700">Smooth animations and micro-interactions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Layers className="h-8 w-8 text-blue-600" />
                <div>
                  <h4 className="font-semibold text-blue-900">Batch Processing</h4>
                  <p className="text-sm text-blue-700">Process multiple files simultaneously</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div>
                  <h4 className="font-semibold text-purple-900">Real-time Progress</h4>
                  <p className="text-sm text-purple-700">Live updates and streaming feedback</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Technical Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Key Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm"><strong>Smart Summarization:</strong> AI-generated concise summaries</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm"><strong>Sentiment Analysis:</strong> Detect emotional tone and context</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm"><strong>Entity Extraction:</strong> Identify people, places, organizations</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm"><strong>Topic Detection:</strong> Discover main themes and subjects</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm"><strong>OCR Integration:</strong> Extract text from images</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm"><strong>Export Results:</strong> Download analysis in JSON format</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Supported Formats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm mb-2">Text Documents</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">.txt</Badge>
                  <Badge variant="outline">.docx</Badge>
                  <Badge variant="outline">.rtf</Badge>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">PDF Documents</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">.pdf</Badge>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">Images (OCR)</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">.png</Badge>
                  <Badge variant="outline">.jpg</Badge>
                  <Badge variant="outline">.jpeg</Badge>
                  <Badge variant="outline">.gif</Badge>
                  <Badge variant="outline">.bmp</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Installation and Usage */}
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Installation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
              <div className="text-green-400"># Install the component</div>
              <div>npx @empireui/empire-ui add AIDocumentAnalyzer</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Basic Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <div className="text-blue-400">import</div> {`{ AIDocumentAnalyzer }`} <div className="text-blue-400">from</div> <div className="text-green-400">"@/components/ui/AIDocumentAnalyzer"</div>;<br/><br/>
              <div className="text-blue-400">function</div> <div className="text-yellow-400">DocumentPage</div>() {`{`}<br/>
              &nbsp;&nbsp;<div className="text-blue-400">const</div> handleAnalysis = (result) {`=>`} {`{`}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;console.log(<div className="text-green-400">"Analysis:"</div>, result);<br/>
              &nbsp;&nbsp;{`}`};<br/><br/>
              &nbsp;&nbsp;<div className="text-blue-400">return</div> (<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{`<AIDocumentAnalyzer`}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onAnalysisComplete={`{handleAnalysis}`}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;maxFileSize={`{10}`}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{`/>`}<br/>
              &nbsp;&nbsp;);<br/>
              {`}`}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Environment Setup</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm mb-2">Required Environment Variables</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                  <div className="text-green-400"># Required for AI analysis</div>
                  <div>OPENAI_API_KEY=your_openai_api_key_here</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">Optional (for enhanced OCR)</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                  <div className="text-green-400"># Optional for enhanced OCR capabilities</div>
                  <div>OCR_API_KEY=your_ocr_service_api_key</div><br/>
                  <div>GOOGLE_CLOUD_VISION_API_KEY=your_google_vision_key</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Note */}
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500">
          This component is part of EmpireUI - an AI-focused component library for modern web applications.
          <br />
          For more information, visit our{" "}
          <a href="/docs" className="text-purple-600 hover:text-purple-700 underline">
            documentation
          </a>.
        </p>
      </div>
    </div>
  );
}
