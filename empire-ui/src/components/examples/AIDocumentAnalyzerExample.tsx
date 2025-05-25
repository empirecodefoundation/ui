// @ts-nocheck
"use client";

import React, { useState } from "react";
import { AIDocumentAnalyzer } from "@/components/core/AIDocumentAnalyzer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Brain, 
  Sparkles, 
  Download,
  RefreshCw,
  Info
} from "lucide-react";

interface AnalysisResult {
  summary: string;
  keyPoints: string[];
  sentiment: "positive" | "negative" | "neutral";
  entities: string[];
  topics: string[];
  readabilityScore: number;
  wordCount: number;
  confidence: number;
}

export function AIDocumentAnalyzerExample() {
  const [analysisHistory, setAnalysisHistory] = useState<Array<{
    id: string;
    fileName: string;
    timestamp: string;
    result: AnalysisResult;
  }>>([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<string | null>(null);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    const newAnalysis = {
      id: Date.now().toString(),
      fileName: "Document", // This would come from the file
      timestamp: new Date().toLocaleString(),
      result
    };
    
    setAnalysisHistory(prev => [newAnalysis, ...prev.slice(0, 4)]); // Keep last 5
    setSelectedAnalysis(newAnalysis.id);
  };

  const clearHistory = () => {
    setAnalysisHistory([]);
    setSelectedAnalysis(null);
  };

  const exportAnalysis = (analysis: any) => {
    const dataStr = JSON.stringify(analysis, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analysis-${analysis.fileName}-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Brain className="h-10 w-10 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            AI Document Analyzer Demo
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Upload documents to extract text, analyze content, and generate AI-powered insights. 
          Supports PDFs, images (with OCR), and text files.
        </p>
      </div>

      {/* Features Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center">
          <CardHeader>
            <FileText className="h-8 w-8 text-blue-600 mx-auto" />
            <CardTitle className="text-lg">Multi-Format Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              PDF, images, text files with automatic text extraction and OCR
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
              Powered by GPT-4 for summaries, sentiment, and entity extraction
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
      </div>

      {/* Main Component */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Analyzer */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Document Analyzer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AIDocumentAnalyzer
                onAnalysisComplete={handleAnalysisComplete}
                maxFileSize={10}
                acceptedFileTypes={[".pdf", ".png", ".jpg", ".jpeg", ".txt", ".docx"]}
                apiEndpoint="/api/ai-document-analyzer"
              />
            </CardContent>
          </Card>
        </div>

        {/* Analysis History */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">Analysis History</CardTitle>
              {analysisHistory.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearHistory}
                  className="h-8 px-2"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {analysisHistory.length === 0 ? (
                <div className="text-center py-8">
                  <Info className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">
                    No analyses yet. Upload a document to get started.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {analysisHistory.map((analysis) => (
                    <div
                      key={analysis.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        selectedAnalysis === analysis.id
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedAnalysis(analysis.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {analysis.fileName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {analysis.timestamp}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            exportAnalysis(analysis);
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="mt-2 flex flex-wrap gap-1">
                        <Badge
                          variant={
                            analysis.result.sentiment === "positive"
                              ? "default"
                              : analysis.result.sentiment === "negative"
                              ? "destructive"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {analysis.result.sentiment}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {analysis.result.wordCount} words
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {Math.round(analysis.result.confidence * 100)}% confidence
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          {selectedAnalysis && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const analysis = analysisHistory.find(a => a.id === selectedAnalysis);
                  if (!analysis) return null;
                  
                  return (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            {analysis.result.wordCount}
                          </div>
                          <div className="text-xs text-blue-700">Words</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            {analysis.result.readabilityScore}/10
                          </div>
                          <div className="text-xs text-green-700">Readability</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-700">
                          Key Topics ({analysis.result.topics.length})
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {analysis.result.topics.slice(0, 3).map((topic, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                          {analysis.result.topics.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{analysis.result.topics.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-700">
                          Entities ({analysis.result.entities.length})
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {analysis.result.entities.slice(0, 3).map((entity, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {entity}
                            </Badge>
                          ))}
                          {analysis.result.entities.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{analysis.result.entities.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Usage Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Setup Instructions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <h4>Environment Variables Required:</h4>
            <ul>
              <li><code>OPENAI_API_KEY</code> - Your OpenAI API key for AI analysis</li>
              <li><code>OCR_API_KEY</code> - Optional: For enhanced OCR capabilities</li>
            </ul>
            
            <h4>Supported File Types:</h4>
            <ul>
              <li><strong>Text Files:</strong> .txt (direct text extraction)</li>
              <li><strong>PDFs:</strong> .pdf (requires pdf-parse library)</li>
              <li><strong>Images:</strong> .png, .jpg, .jpeg (OCR extraction)</li>
            </ul>
            
            <h4>Features:</h4>
            <ul>
              <li>Drag & drop file upload with validation</li>
              <li>Real-time analysis progress tracking</li>
              <li>Comprehensive AI-powered content analysis</li>
              <li>Export results in JSON format</li>
              <li>Responsive design with dark mode support</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
