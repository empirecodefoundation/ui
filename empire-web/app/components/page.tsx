"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/common/navbar";
import { EmpireFooter } from "@/components/common/empire-footer";
import { MinecartLCD } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Copy, Check, Download, Play, Code2, Terminal, BookOpen, Palette } from "lucide-react";
import Particles from "@/components/ui/particles";
import { ResponsiveWrapper } from "@/components/common/responsive-wrapper";
import { docsConfig } from "@/config/docs";
import FlowingMenu from "@/components/ui/FlowingMenu";
import { ClassifiedSidebar } from "@/components/ui/ClassifiedSidebar";

// Component imports for previews
import AIChatboxPreview from "@/components/examples/AIChatboxPreview";
import CaptionGeneratorPreview from "@/components/examples/CaptionGeneratorPreview";
import PredictionOutputCardPreview from "@/components/examples/PredictionOutputCardPreview";
import TrainingSummaryCardPreview from "@/components/examples/TrainingSummaryCardPreview";
import DatasetOverviewCardPreview from "@/components/examples/DatasetOverviewCardPreview";
import ExpandCardPreview from "@/components/examples/ExpandCardPreview";
import PasscodeCardPreview from "@/components/examples/PasscodeCardPreview";
import PredictiveSearchbarPreview from "@/components/examples/PredictiveSearchbarPreview";
import WavyBackgroundPreview from "@/components/examples/WavyBackgroundPreview";
import ToastNotificationPreview from "@/components/examples/ToastNotificationPreview";
import ButtonPreview from "@/components/examples/ButtonPreview";

type TabType = "preview" | "cli" | "code" | "usage" | "css";

interface ComponentData {
  name: string;
  description: string;
  preview: React.ComponentType;
  cliInstall: string;
  code: string;
  usage: string;
  css?: string;
  dependencies?: string[];
}

const componentData: Record<string, ComponentData> = {
  "AI Chatbox": {
    name: "AI Chatbox",
    description: "Interactive AI chatbox component with real-time messaging, streaming responses, and customizable UI.",
    preview: AIChatboxPreview,
    cliInstall: "npx @empireui/empire-ui add AIChatbox",
    code: `"use client";

import { useChat } from "ai/react";
import { ArrowUp, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AIChatboxProps {
  className?: string;
  isOpen?: boolean;
  title?: string;
  placeholder?: string;
}

export const AIChatbox: React.FC<AIChatboxProps> = ({ 
  className, 
  isOpen = true,
  title = "AI Assistant",
  placeholder = "Ask me anything..." 
}) => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat" // You'll need to implement this endpoint
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

        return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.3 }}
          className={cn("w-full max-w-md mx-auto", className)}
        >
          <Card className="h-[500px] flex flex-col bg-white shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-white text-blue-600">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                      <div>
                  <h3 className="font-semibold">{title}</h3>
                        <p className="text-blue-100 text-xs">Online</p>
                      </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-full p-4">
                <div className="space-y-4">
                  {messages.length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                      <Bot className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>Start a conversation with your AI assistant</p>
                    </div>
                  )}
                  
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={\`flex \${message.role === 'user' ? 'justify-end' : 'justify-start'}\`}
                    >
                      <div className="flex items-start space-x-2 max-w-[80%]">
                        {message.role === 'assistant' && (
                          <Avatar className="w-6 h-6 mt-1">
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              <Bot className="w-3 h-3" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div className={\`px-4 py-2 rounded-lg \${
                          message.role === 'user' 
                            ? 'bg-blue-600 text-white rounded-br-sm'
                            : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                        }\`}>
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                        
                        {message.role === 'user' && (
                          <Avatar className="w-6 h-6 mt-1">
                            <AvatarFallback className="bg-gray-100 text-gray-600">
                              <User className="w-3 h-3" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </motion.div>
                    ))}
                  
                    {isLoading && (
                      <div className="flex justify-start">
                      <div className="flex items-start space-x-2">
                        <Avatar className="w-6 h-6 mt-1">
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            <Bot className="w-3 h-3" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-gray-100 px-4 py-2 rounded-lg rounded-bl-sm">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                <div ref={messagesEndRef} />
              </ScrollArea>
            </CardContent>
            
            <CardFooter className="p-4 bg-gray-50 border-t">
              <form onSubmit={handleSubmit} className="flex w-full space-x-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder={placeholder}
                  className="flex-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  disabled={!input.trim() || isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4"
                >
                  <ArrowUp className="w-4 h-4" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};`,
    usage: `import { AIChatbox } from "@/components/ui/AIChatbox";

export default function ChatPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">AI Assistant</h1>
      <AIChatbox 
        title="My AI Assistant"
        placeholder="Type your message here..."
        className="max-w-lg"
      />
          </div>
        );
}`,
    dependencies: ["ai", "framer-motion", "@radix-ui/react-avatar", "@radix-ui/react-scroll-area"],
  },

  "Caption Generator Button": {
    name: "Caption Generator Button",
    description: "AI-powered button that generates captions for images with customizable styles and animations.",
    preview: CaptionGeneratorPreview,
    cliInstall: "npx @empireui/empire-ui add CaptionGeneratorButton",
    code: `"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ImageIcon, Loader2, Copy, Check } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

interface CaptionGeneratorButtonProps {
  className?: string;
  buttonClassName?: string;
  tooltipClassName?: string;
  captionClassName?: string;
  imageFile?: File | null;
  onCaptionGenerated?: (caption: string) => void;
}

const useCaptionGenerator = () => {
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [caption, setCaption] = React.useState<string>("");
  const [copied, setCopied] = React.useState(false);
  const captionRef = React.useRef<HTMLDivElement>(null);

  const generateCaption = async (file: File) => {
    if (!file) return;

    setIsGenerating(true);
    setCaption("");

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch("/api/caption-generator", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }

      const data = await response.json();
      setCaption(data.caption);
    } catch (error) {
      console.error("Error generating caption:", error);
      setCaption("Error generating caption. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyCaption = async () => {
    if (caption) {
      await navigator.clipboard.writeText(caption);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (captionRef.current && !captionRef.current.contains(event.target as Node)) {
      setCaption("");
    }
  };

  React.useEffect(() => {
    if (caption) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [caption]);

  return { isGenerating, caption, generateCaption, copyCaption, copied, captionRef };
};

const CaptionGeneratorButton: React.FC<CaptionGeneratorButtonProps> = ({
  className,
  buttonClassName,
  tooltipClassName,
  captionClassName,
  imageFile,
  onCaptionGenerated,
  ...props
}) => {
  const { isGenerating, caption, generateCaption, copyCaption, copied, captionRef } = useCaptionGenerator();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (imageFile) {
      generateCaption(imageFile);
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      generateCaption(file);
    }
  };

  React.useEffect(() => {
    if (caption && onCaptionGenerated) {
      onCaptionGenerated(caption);
    }
  }, [caption, onCaptionGenerated]);

        return (
    <div className={cn("relative", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <motion.button
              onClick={handleClick}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className={cn(
                "p-3 bg-white text-zinc-800 border-2 border-black rounded-full transition-all duration-200 hover:bg-zinc-100 hover:text-zinc-700 hover:shadow-lg",
                buttonClassName
              )}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <ImageIcon className="h-6 w-6" />
              )}
              <span className="sr-only">Generate image caption</span>
            </motion.button>
          </Tooltip.Trigger>
          <Tooltip.Content
            className={cn(
              "bg-zinc-950 text-white px-4 py-2 rounded-xl shadow-lg text-sm",
              "transition-opacity duration-200 ease-in-out",
              tooltipClassName
            )}
            sideOffset={8}
            {...props}
          >
            {imageFile ? "Generate caption for selected image" : "Select image to generate caption"}
          </Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>

      {caption && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          ref={captionRef}
          className={cn(
            "absolute top-full mt-4 w-80 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-lg z-10",
            "overflow-hidden break-words text-sm",
            captionClassName
          )}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Generated Caption:</h3>
            <button
              onClick={copyCaption}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Copy caption"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-gray-600" />
              )}
            </button>
                    </div>
          <p className="text-gray-700 leading-relaxed">{caption}</p>
        </motion.div>
      )}
                    </div>
  );
};

export { CaptionGeneratorButton };`,
    usage: `import { CaptionGeneratorButton } from "@/components/ui/CaptionGeneratorButton";
import { useState } from "react";

export default function ImageCaptionDemo() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [generatedCaption, setGeneratedCaption] = useState("");

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Image Caption Generator</h2>
      
      <div className="flex items-center space-x-4">
        <CaptionGeneratorButton
          imageFile={selectedImage}
          onCaptionGenerated={setGeneratedCaption}
          className="flex-shrink-0"
        />
        
        <div className="flex-1">
          <p className="text-gray-600">
            {selectedImage ? selectedImage.name : "No image selected"}
          </p>
          {generatedCaption && (
            <p className="mt-2 text-green-600">Caption generated successfully!</p>
          )}
              </div>
            </div>
          </div>
        );
}`,
    dependencies: ["framer-motion", "@radix-ui/react-tooltip"],
  },

  "Prediction Output Card": {
    name: "Prediction Output Card",
    description: "Display AI model predictions with confidence scores, alternative predictions, and interactive elements for detailed analysis.",
    preview: PredictionOutputCardPreview,
    cliInstall: "npx @empireui/empire-ui add PredictionOutputCard",
    code: `"use client";

import React from "react";
import { BarChart3, Download, TrendingUp, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface PredictionResult {
  label: string;
  confidence: number;
  color?: string;
}

interface PredictionOutputCardProps {
  className?: string;
  prediction: PredictionResult;
  alternatives?: PredictionResult[];
  modelInfo?: {
    accuracy?: number;
    f1Score?: number;
    name?: string;
  };
  onExport?: () => void;
  onViewDetails?: () => void;
  isLoading?: boolean;
}

export const PredictionOutputCard: React.FC<PredictionOutputCardProps> = ({
  className,
  prediction,
  alternatives = [],
  modelInfo,
  onExport,
  onViewDetails,
  isLoading = false,
}) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "text-green-600 bg-green-500";
    if (confidence >= 0.6) return "text-yellow-600 bg-yellow-500";
    return "text-red-600 bg-red-500";
  };

  return (
    <div className={cn("bg-white border border-gray-200 rounded-lg p-6 shadow-lg", className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
                        Prediction Results
                      </h3>
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Complete
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Main Prediction */}
        <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 font-medium">Classification:</span>
            <span className="text-gray-800 font-bold">{prediction.label}</span>
                        </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={\`h-3 rounded-full transition-all duration-500 \${getConfidenceColor(prediction.confidence).split(' ')[1]}\`}
              style={{ width: \`\${prediction.confidence * 100}%\` }}
            ></div>
                        </div>
          <p className={\`text-sm mt-1 font-medium \${getConfidenceColor(prediction.confidence).split(' ')[0]}\`}>
            Confidence: {(prediction.confidence * 100).toFixed(1)}%
          </p>
                      </div>

                      {/* Alternative Predictions */}
        {alternatives.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-gray-800 font-semibold flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              Alternative Predictions
            </h4>
            
            {alternatives.map((alt, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-600 text-sm">{alt.label}</span>
                  <span className="text-gray-500 text-sm">{(alt.confidence * 100).toFixed(1)}%</span>
                          </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={\`h-2 rounded-full transition-all duration-500 \${getConfidenceColor(alt.confidence).split(' ')[1]}\`}
                    style={{ width: \`\${alt.confidence * 100}%\` }}
                  ></div>
                          </div>
                        </div>
            ))}
          </div>
        )}

        {/* Model Info */}
        {modelInfo && (
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center mb-2">
              <TrendingUp className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-blue-800 font-medium">Model Performance</span>
                          </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {modelInfo.accuracy && (
                <div>
                  <span className="text-blue-600">Accuracy:</span>
                  <span className="text-blue-800 ml-2 font-semibold">{(modelInfo.accuracy * 100).toFixed(1)}%</span>
                          </div>
              )}
              {modelInfo.f1Score && (
                <div>
                  <span className="text-blue-600">F1 Score:</span>
                  <span className="text-blue-800 ml-2 font-semibold">{modelInfo.f1Score.toFixed(2)}</span>
                        </div>
              )}
                      </div>
          </div>
        )}

                      {/* Action Buttons */}
        <div className="flex space-x-3 pt-4 border-t border-gray-200">
          {onViewDetails && (
            <button 
              onClick={onViewDetails}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
                          View Details
                        </button>
          )}
          {onExport && (
            <button 
              onClick={onExport}
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
                          Export Results
                        </button>
          )}
                      </div>
                    </div>
                  </div>
  );
};`,
    usage: `import { PredictionOutputCard } from "@/components/ui/PredictionOutputCard";

export default function PredictionDemo() {
  const predictionData = {
    label: "Positive Sentiment",
    confidence: 0.873
  };

  const alternatives = [
    { label: "Neutral", confidence: 0.089 },
    { label: "Negative", confidence: 0.038 }
  ];

  const modelInfo = {
    accuracy: 0.942,
    f1Score: 0.91,
    name: "BERT Sentiment Classifier"
  };

  return (
    <div className="p-6">
      <PredictionOutputCard
        prediction={predictionData}
        alternatives={alternatives}
        modelInfo={modelInfo}
        onViewDetails={() => console.log("View details")}
        onExport={() => console.log("Export results")}
      />
          </div>
        );
}`,
    dependencies: ["lucide-react"],
  },

  "Training Summary Card": {
    name: "Training Summary Card",
    description: "Monitor ML model training progress with real-time metrics, visualizations, and training controls.",
    preview: TrainingSummaryCardPreview,
    cliInstall: "npx @empireui/empire-ui add TrainingSummaryCard",
    code: `"use client";

import React from "react";
import { Play, Pause, BarChart3, Clock, Database, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrainingMetrics {
  epoch: { current: number; total: number };
  loss: number;
  accuracy: number;
  learningRate: number;
  batchSize: number;
  datasetSize: number;
  estimatedTimeRemaining?: string;
}

interface TrainingSummaryCardProps {
  className?: string;
  metrics: TrainingMetrics;
  isTraining: boolean;
  onStop?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onViewLogs?: () => void;
  lossHistory?: number[];
  accuracyHistory?: number[];
}

export const TrainingSummaryCard: React.FC<TrainingSummaryCardProps> = ({
  className,
  metrics,
  isTraining,
  onStop,
  onPause,
  onResume,
  onViewLogs,
  lossHistory = [],
  accuracyHistory = [],
}) => {
  const progressPercentage = (metrics.epoch.current / metrics.epoch.total) * 100;

  return (
    <div className={cn("bg-white border border-gray-200 rounded-lg p-6 shadow-lg", className)}>
                    <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
                        Model Training Progress
                      </h3>
                      <div className="flex items-center space-x-2">
          <div className={\`w-2 h-2 rounded-full \${isTraining ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}\`}></div>
          <span className={\`text-sm font-medium \${isTraining ? 'text-green-600' : 'text-gray-600'}\`}>
            {isTraining ? 'Training' : 'Stopped'}
          </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      {/* Epoch Progress */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-gray-800 font-semibold mb-2 flex items-center">
            <BarChart3 className="w-4 h-4 mr-2" />
            Epoch
          </h4>
          <p className="text-2xl font-bold text-blue-600">
            {metrics.epoch.current}/{metrics.epoch.total}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
              style={{ width: \`\${progressPercentage}%\` }}
            ></div>
                        </div>
          <p className="text-gray-500 text-sm mt-1">{progressPercentage.toFixed(0)}% Complete</p>
                      </div>

                      {/* Loss */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-gray-800 font-semibold mb-2">Loss</h4>
          <p className="text-2xl font-bold text-red-500">{metrics.loss.toFixed(4)}</p>
          {lossHistory.length > 1 && (
            <p className="text-green-600 text-sm">
              ↓ {(((lossHistory[lossHistory.length - 2] - metrics.loss) / lossHistory[lossHistory.length - 2]) * 100).toFixed(1)}% from last epoch
            </p>
          )}
                      </div>

                      {/* Accuracy */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-gray-800 font-semibold mb-2">Accuracy</h4>
          <p className="text-2xl font-bold text-green-600">{(metrics.accuracy * 100).toFixed(1)}%</p>
          {accuracyHistory.length > 1 && (
            <p className="text-green-600 text-sm">
              ↑ {(((metrics.accuracy - accuracyHistory[accuracyHistory.length - 2]) / accuracyHistory[accuracyHistory.length - 2]) * 100).toFixed(1)}% improvement
            </p>
          )}
                      </div>
                    </div>

                    {/* Training Details */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <h4 className="text-gray-800 font-semibold mb-3 flex items-center">
          <Database className="w-4 h-4 mr-2" />
          Training Configuration
        </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Dataset Size:</span>
            <span className="text-gray-800 font-medium">{metrics.datasetSize.toLocaleString()} samples</span>
                        </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Batch Size:</span>
            <span className="text-gray-800 font-medium">{metrics.batchSize}</span>
                        </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Learning Rate:</span>
            <span className="text-gray-800 font-medium">{metrics.learningRate}</span>
                        </div>
          {metrics.estimatedTimeRemaining && (
            <div className="flex justify-between">
              <span className="text-gray-600">Est. Time:</span>
              <span className="text-orange-600 font-medium flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {metrics.estimatedTimeRemaining}
              </span>
                        </div>
          )}
                      </div>
                    </div>

                    {/* Action Buttons */}
      <div className="flex space-x-3">
        {isTraining ? (
          <button 
            onClick={onPause}
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors flex items-center"
          >
            <Pause className="w-4 h-4 mr-2" />
            Pause Training
          </button>
        ) : (
          <button 
            onClick={onResume}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
          >
            <Play className="w-4 h-4 mr-2" />
            Resume Training
          </button>
        )}
        
        <button 
          onClick={onStop}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
        >
          <Pause className="w-4 h-4 mr-2" />
                        Stop Training
                      </button>
        
        {onViewLogs && (
          <button 
            onClick={onViewLogs}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
                        View Logs
                      </button>
        )}
                    </div>
                  </div>
  );
};`,
    usage: `import { TrainingSummaryCard } from "@/components/ui/TrainingSummaryCard";
import { useState } from "react";

export default function TrainingDemo() {
  const [isTraining, setIsTraining] = useState(true);
  
  const metrics = {
    epoch: { current: 47, total: 100 },
    loss: 0.0234,
    accuracy: 0.947,
    learningRate: 0.001,
    batchSize: 32,
    datasetSize: 10000,
    estimatedTimeRemaining: "23 min"
  };

  return (
    <div className="p-6">
      <TrainingSummaryCard
        metrics={metrics}
        isTraining={isTraining}
        onStop={() => setIsTraining(false)}
        onPause={() => setIsTraining(false)}
        onResume={() => setIsTraining(true)}
        onViewLogs={() => console.log("View logs")}
        lossHistory={[0.05, 0.04, 0.035, 0.0234]}
        accuracyHistory={[0.92, 0.935, 0.94, 0.947]}
      />
          </div>
        );
}`,
    dependencies: ["lucide-react"],
  },

  "Dataset Overview Card": {
    name: "Dataset Overview Card",
    description: "Comprehensive dataset overview with statistics, visualizations, data quality metrics, and sample data preview.",
    preview: DatasetOverviewCardPreview,
    cliInstall: "npx @empireui/empire-ui add DatasetOverviewCard",
    code: `"use client";

import React from "react";
import { Database, Download, Eye, FileText, TrendingUp, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatasetFeature {
  name: string;
  type: "numerical" | "categorical" | "datetime" | "text";
  missingCount?: number;
  uniqueCount?: number;
}

interface DatasetStats {
  totalRecords: number;
  totalFeatures: number;
  missingValuePercentage: number;
  dataQuality: number;
  features: DatasetFeature[];
  sampleData?: Record<string, any>[];
}

interface DatasetOverviewCardProps {
  className?: string;
  dataset: {
    name: string;
    lastUpdated?: string;
    status?: "ready" | "processing" | "error";
  };
  stats: DatasetStats;
  onExplore?: () => void;
  onDownload?: () => void;
  onViewSchema?: () => void;
}

export const DatasetOverviewCard: React.FC<DatasetOverviewCardProps> = ({
  className,
  dataset,
  stats,
  onExplore,
  onDownload,
  onViewSchema,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready": return "bg-green-600";
      case "processing": return "bg-yellow-600";
      case "error": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  const getFeatureTypeColor = (type: string) => {
    switch (type) {
      case "numerical": return "bg-blue-500";
      case "categorical": return "bg-green-500";
      case "datetime": return "bg-purple-500";
      case "text": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  const featureTypeCounts = stats.features.reduce((acc, feature) => {
    acc[feature.type] = (acc[feature.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className={cn("bg-white border border-gray-200 rounded-lg p-6 shadow-lg", className)}>
                    <div className="flex items-center justify-between mb-6">
                      <div>
          <h3 className="text-xl font-semibold text-gray-800 flex items-center">
            <Database className="w-5 h-5 mr-2" />
            {dataset.name}
                        </h3>
          {dataset.lastUpdated && (
            <p className="text-gray-500 text-sm">
              Last updated: {dataset.lastUpdated}
                        </p>
          )}
                      </div>
        <span className={\`text-white px-3 py-1 rounded-full text-sm \${getStatusColor(dataset.status || 'ready')}\`}>
          {(dataset.status || 'ready').charAt(0).toUpperCase() + (dataset.status || 'ready').slice(1)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                      {/* Total Records */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{stats.totalRecords.toLocaleString()}</p>
          <p className="text-blue-800 text-sm font-medium">Total Records</p>
                      </div>

                      {/* Features */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{stats.totalFeatures}</p>
          <p className="text-green-800 text-sm font-medium">Features</p>
                      </div>

                      {/* Missing Values */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-yellow-600">{stats.missingValuePercentage.toFixed(1)}%</p>
          <p className="text-yellow-800 text-sm font-medium">Missing Values</p>
                      </div>

                      {/* Data Quality */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{(stats.dataQuality * 100).toFixed(1)}%</p>
          <p className="text-green-800 text-sm font-medium">Data Quality</p>
                      </div>
                    </div>

                    {/* Feature Types */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="text-gray-800 font-semibold mb-3 flex items-center">
          <TrendingUp className="w-4 h-4 mr-2" />
          Feature Distribution
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(featureTypeCounts).map(([type, count]) => (
            <div key={type}>
                          <div className="flex items-center justify-between mb-1">
                <span className="text-gray-600 text-sm capitalize">{type}</span>
                <span className="text-gray-800 text-sm font-semibold">{count}</span>
                          </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={\`h-2 rounded-full transition-all duration-500 \${getFeatureTypeColor(type)}\`}
                  style={{ width: \`\${(count / stats.totalFeatures) * 100}%\` }}
                ></div>
                          </div>
              <span className="text-xs text-gray-500">{((count / stats.totalFeatures) * 100).toFixed(0)}%</span>
                        </div>
          ))}
                          </div>
                          </div>

      {/* Sample Data Preview */}
      {stats.sampleData && stats.sampleData.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="text-gray-800 font-semibold mb-3 flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            Data Sample
          </h4>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-200">
                <tr>
                  {Object.keys(stats.sampleData[0]).slice(0, 5).map((key) => (
                    <th key={key} className="px-3 py-2 text-left text-gray-700 font-medium">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {stats.sampleData.slice(0, 3).map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    {Object.entries(row).slice(0, 5).map(([key, value]) => (
                      <td key={key} className="px-3 py-2 text-gray-800">
                        {String(value)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
                        </div>
                          </div>
      )}

      {/* Data Quality Warnings */}
      {stats.missingValuePercentage > 10 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
            <span className="text-yellow-800 font-medium">Data Quality Warning</span>
                          </div>
          <p className="text-yellow-700 text-sm mt-1">
            This dataset has a high percentage of missing values ({stats.missingValuePercentage.toFixed(1)}%). 
            Consider data cleaning before analysis.
          </p>
                        </div>
      )}

                    {/* Actions */}
                    <div className="flex space-x-3">
        {onExplore && (
          <button 
            onClick={onExplore}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Eye className="w-4 h-4 mr-2" />
                        Explore Data
                      </button>
        )}
        {onDownload && (
          <button 
            onClick={onDownload}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
                        Download Sample
                      </button>
        )}
        {onViewSchema && (
          <button 
            onClick={onViewSchema}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <FileText className="w-4 h-4 mr-2" />
                        View Schema
                      </button>
        )}
                    </div>
                  </div>
  );
};`,
    usage: `import { DatasetOverviewCard } from "@/components/ui/DatasetOverviewCard";

export default function DatasetDemo() {
  const dataset = {
    name: "Customer Dataset",
    lastUpdated: "2 hours ago",
    status: "ready" as const
  };

  const stats = {
    totalRecords: 15847,
    totalFeatures: 23,
    missingValuePercentage: 2.3,
    dataQuality: 0.977,
    features: [
      { name: "age", type: "numerical" as const },
      { name: "category", type: "categorical" as const },
      { name: "created_at", type: "datetime" as const }
    ],
    sampleData: [
      { id: "001", name: "John Doe", age: 28, category: "Premium", score: 85.3 },
      { id: "002", name: "Jane Smith", age: 34, category: "Standard", score: 92.1 }
    ]
  };

  return (
    <div className="p-6">
      <DatasetOverviewCard
        dataset={dataset}
        stats={stats}
        onExplore={() => console.log("Explore data")}
        onDownload={() => console.log("Download sample")}
        onViewSchema={() => console.log("View schema")}
      />
                </div>
  );
}`,
    dependencies: ["lucide-react"],
  },

  

  "Expand Card": {
    name: "Expand Card",
    description: "Collapsible card component with smooth animations and customizable content sections.",
    preview: ExpandCardPreview,
    cliInstall: "npx @empireui/empire-ui add ExpandCard",
    code: `"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ExpandCardProps {
  className?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  icon?: React.ReactNode;
  onExpandChange?: (expanded: boolean) => void;
}

export const ExpandCard: React.FC<ExpandCardProps> = ({
  className,
  title,
  description,
  children,
  defaultExpanded = false,
  icon,
  onExpandChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    onExpandChange?.(newExpanded);
  };

  return (
    <div className={cn("bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden", className)}>
      <button
        onClick={toggleExpanded}
        className="w-full p-6 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {icon && (
              <div className="text-blue-600 flex-shrink-0">
                {icon}
                </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
              {description && (
                <p className="text-gray-600 text-sm mt-1">{description}</p>
              )}
              </div>
            </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-gray-400"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="border-t border-gray-200"
          >
            <div className="p-6 bg-gray-50">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
          </div>
        );
};`,
    usage: `import { ExpandCard } from "@/components/ui/ExpandCard";
import { FileText, Settings, Users } from "lucide-react";

export default function ExpandCardDemo() {
        return (
    <div className="space-y-4 p-6">
      <ExpandCard
        title="Project Details"
        description="View comprehensive project information"
        icon={<FileText className="w-5 h-5" />}
        defaultExpanded={true}
      >
        <div className="space-y-3">
          <p className="text-gray-700">
            This project includes multiple components and features designed to enhance user experience.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Real-time collaboration</li>
            <li>Advanced analytics</li>
            <li>Custom integrations</li>
          </ul>
        </div>
      </ExpandCard>

      <ExpandCard
        title="Settings"
        description="Configure application preferences"
        icon={<Settings className="w-5 h-5" />}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Notifications</span>
            <input type="checkbox" className="rounded" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Dark Mode</span>
            <input type="checkbox" className="rounded" />
          </div>
        </div>
      </ExpandCard>
    </div>
  );
}`,
    dependencies: ["framer-motion", "lucide-react"],
  },

  "Passcode Card": {
    name: "Passcode Card",
    description: "Secure passcode input component with customizable design and validation.",
    preview: PasscodeCardPreview,
    cliInstall: "npx @empireui/empire-ui add PasscodeCard",
    code: `"use client";

import React, { useState, useRef, useEffect } from "react";
import { Lock, Check, X, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface PasscodeCardProps {
  className?: string;
  length?: number;
  title?: string;
  description?: string;
  onComplete?: (passcode: string) => void;
  onValidate?: (passcode: string) => boolean | Promise<boolean>;
  showToggle?: boolean;
  autoSubmit?: boolean;
  correctPasscode?: string;
}

export const PasscodeCard: React.FC<PasscodeCardProps> = ({
  className,
  length = 6,
  title = "Enter Passcode",
  description = "Please enter your security code",
  onComplete,
  onValidate,
  showToggle = true,
  autoSubmit = true,
  correctPasscode,
}) => {
  const [passcode, setPasscode] = useState<string[]>(new Array(length).fill(""));
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [showPasscode, setShowPasscode] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (index: number, value: string) => {
    if (isNaN(Number(value)) && value !== "") return;

    const newPasscode = [...passcode];
    newPasscode[index] = value.slice(-1); // Take only the last character
    setPasscode(newPasscode);
    setIsValid(null);

    // Move to next input
    if (value !== "" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (autoSubmit && newPasscode.every(digit => digit !== "")) {
      validatePasscode(newPasscode.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && passcode[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const validatePasscode = async (code: string) => {
    setIsValidating(true);

    try {
      let valid = false;

      if (onValidate) {
        valid = await onValidate(code);
      } else if (correctPasscode) {
        valid = code === correctPasscode;
      } else {
        valid = true; // Default to valid if no validation provided
      }

      setIsValid(valid);
      
      if (valid && onComplete) {
        onComplete(code);
      }
    } catch (error) {
      setIsValid(false);
    } finally {
      setIsValidating(false);
    }
  };

  const resetPasscode = () => {
    setPasscode(new Array(length).fill(""));
    setIsValid(null);
    inputRefs.current[0]?.focus();
  };

  const getStatusIcon = () => {
    if (isValidating) {
      return <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
    }
    if (isValid === true) {
      return <Check className="w-5 h-5 text-green-500" />;
    }
    if (isValid === false) {
      return <X className="w-5 h-5 text-red-500" />;
    }
    return <Lock className="w-5 h-5 text-gray-400" />;
  };

  const getStatusMessage = () => {
    if (isValidating) return "Validating...";
    if (isValid === true) return "Access granted!";
    if (isValid === false) return "Invalid passcode. Please try again.";
    return "";
  };

  const getStatusColor = () => {
    if (isValid === true) return "text-green-600";
    if (isValid === false) return "text-red-600";
    return "text-gray-600";
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className={cn("bg-white border border-gray-200 rounded-lg p-8 shadow-lg max-w-md mx-auto", className)}>
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          {getStatusIcon()}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
              </div>

      <div className="mb-6">
        <div className="flex justify-center space-x-3 mb-4">
          {passcode.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type={showPasscode ? "text" : "password"}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={cn(
                "w-12 h-12 text-center text-xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors",
                isValid === true && "border-green-500 bg-green-50",
                isValid === false && "border-red-500 bg-red-50",
                isValid === null && "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              )}
              maxLength={1}
            />
          ))}
                </div>

        {showToggle && (
          <div className="flex justify-center">
            <button
              onClick={() => setShowPasscode(!showPasscode)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              {showPasscode ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
              <span className="text-sm">
                {showPasscode ? "Hide" : "Show"} passcode
              </span>
            </button>
              </div>
        )}
      </div>

      <AnimatePresence>
        {getStatusMessage() && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn("text-center mb-6", getStatusColor())}
          >
            <p className="text-sm font-medium">{getStatusMessage()}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex space-x-3">
        <button
          onClick={resetPasscode}
          className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Clear
        </button>
        
        {!autoSubmit && (
          <button
            onClick={() => validatePasscode(passcode.join(""))}
            disabled={passcode.some(digit => digit === "") || isValidating}
            className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isValidating ? "Validating..." : "Submit"}
          </button>
        )}
            </div>
          </div>
        );
};`,
    usage: `import { PasscodeCard } from "@/components/ui/PasscodeCard";
import { useState } from "react";

export default function PasscodeDemo() {
  const [result, setResult] = useState("");

  const handlePasscodeComplete = (passcode: string) => {
    setResult(\`Passcode entered: \${passcode}\`);
  };

  const validatePasscode = (passcode: string) => {
    // Simulate API validation
    return passcode === "123456";
  };

        return (
    <div className="p-6">
      <PasscodeCard
        title="Security Check"
        description="Enter the 6-digit code sent to your device"
        correctPasscode="123456"
        onComplete={handlePasscodeComplete}
        onValidate={validatePasscode}
        autoSubmit={true}
        showToggle={true}
      />
      
      {result && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800">{result}</p>
        </div>
      )}
    </div>
  );
}`,
    dependencies: ["framer-motion", "lucide-react"],
  },

  "Predictive Searchbar": {
    name: "Predictive Searchbar",
    description: "AI-powered search component with real-time suggestions, autocomplete, and smart filtering.",
    preview: PredictiveSearchbarPreview,
    cliInstall: "npx @empireui/empire-ui add PredictiveSearchbar",
    code: `"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, X, Loader2, Clock, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SearchSuggestion {
  id: string;
  text: string;
  type: "suggestion" | "recent" | "trending";
  category?: string;
  metadata?: any;
}

interface PredictiveSearchbarProps {
  className?: string;
  placeholder?: string;
  suggestions?: SearchSuggestion[];
  onSearch?: (query: string) => void;
  onSuggestionSelect?: (suggestion: SearchSuggestion) => void;
  fetchSuggestions?: (query: string) => Promise<SearchSuggestion[]>;
  showCategories?: boolean;
  maxSuggestions?: number;
  debounceMs?: number;
}

export const PredictiveSearchbar: React.FC<PredictiveSearchbarProps> = ({
  className,
  placeholder = "Search anything...",
  suggestions = [],
  onSearch,
  onSuggestionSelect,
  fetchSuggestions,
  showCategories = true,
  maxSuggestions = 8,
  debounceMs = 300,
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState<SearchSuggestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query.trim() === "") {
      setCurrentSuggestions(suggestions.filter(s => s.type === "recent" || s.type === "trending"));
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        if (fetchSuggestions) {
          const fetchedSuggestions = await fetchSuggestions(query);
          setCurrentSuggestions(fetchedSuggestions.slice(0, maxSuggestions));
        } else {
          const filtered = suggestions
            .filter(s => s.text.toLowerCase().includes(query.toLowerCase()))
            .slice(0, maxSuggestions);
          setCurrentSuggestions(filtered);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setCurrentSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, debounceMs);
  }, [query, suggestions, fetchSuggestions, maxSuggestions, debounceMs]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);
    setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < currentSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => prev > -1 ? prev - 1 : prev);
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(currentSuggestions[selectedIndex]);
        } else if (query.trim()) {
          handleSearch();
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch?.(query.trim());
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    setIsOpen(false);
    onSuggestionSelect?.(suggestion);
  };

  const clearSearch = () => {
    setQuery("");
    setCurrentSuggestions(suggestions.filter(s => s.type === "recent" || s.type === "trending"));
    inputRef.current?.focus();
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case "recent":
        return <Clock className="w-4 h-4 text-gray-400" />;
      case "trending":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      default:
        return <Search className="w-4 h-4 text-gray-400" />;
    }
  };

  const groupedSuggestions = showCategories 
    ? currentSuggestions.reduce((acc, suggestion) => {
        const category = suggestion.category || "General";
        if (!acc[category]) acc[category] = [];
        acc[category].push(suggestion);
        return acc;
      }, {} as Record<string, SearchSuggestion[]>)
    : { "All": currentSuggestions };

  return (
    <div ref={containerRef} className={cn("relative w-full max-w-2xl", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
        />
        
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          {isLoading && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
          {query && (
            <button
              onClick={clearSearch}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
                </div>
              </div>

      <AnimatePresence>
        {isOpen && currentSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-auto"
          >
            {Object.entries(groupedSuggestions).map(([category, suggestions], categoryIndex) => (
              <div key={category}>
                {showCategories && Object.keys(groupedSuggestions).length > 1 && (
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                    {category}
                </div>
                )}
                
                {suggestions.map((suggestion, index) => {
                  const globalIndex = Object.entries(groupedSuggestions)
                    .slice(0, categoryIndex)
                    .reduce((acc, [, items]) => acc + items.length, 0) + index;
                  
                  return (
                    <motion.button
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={cn(
                        "w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors",
                        selectedIndex === globalIndex && "bg-blue-50"
                      )}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="flex items-center space-x-3">
                        {getSuggestionIcon(suggestion.type)}
                        <div className="flex-1">
                          <p className="text-gray-800">{suggestion.text}</p>
                          {suggestion.metadata?.description && (
                            <p className="text-sm text-gray-500 mt-1">
                              {suggestion.metadata.description}
                            </p>
                          )}
              </div>
                        {suggestion.type === "trending" && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Trending
                          </span>
                        )}
            </div>
                    </motion.button>
                  );
                })}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
          </div>
        );
};`,
    usage: `import { PredictiveSearchbar } from "@/components/ui/PredictiveSearchbar";
import { useState } from "react";

export default function SearchDemo() {
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const suggestions = [
    { id: "1", text: "React components", type: "recent" as const, category: "Frontend" },
    { id: "2", text: "JavaScript tutorials", type: "trending" as const, category: "Learning" },
    { id: "3", text: "API documentation", type: "suggestion" as const, category: "Development" },
    { id: "4", text: "Design patterns", type: "recent" as const, category: "Architecture" },
  ];

  const handleSearch = (query: string) => {
    setSearchResults([query]);
    console.log("Searching for:", query);
  };

  const handleSuggestionSelect = (suggestion: any) => {
    console.log("Selected suggestion:", suggestion);
  };

  const fetchSuggestions = async (query: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return suggestions.filter(s => 
      s.text.toLowerCase().includes(query.toLowerCase())
    );
  };

        return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Predictive Search</h2>
      
      <PredictiveSearchbar
        placeholder="Search documentation, tutorials, and more..."
        suggestions={suggestions}
        onSearch={handleSearch}
        onSuggestionSelect={handleSuggestionSelect}
        fetchSuggestions={fetchSuggestions}
        showCategories={true}
        maxSuggestions={6}
      />
      
      {searchResults.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800">Search Results:</h3>
          <ul className="mt-2 text-blue-700">
            {searchResults.map((result, index) => (
              <li key={index}>• {result}</li>
            ))}
          </ul>
              </div>
      )}
    </div>
  );
}`,
    dependencies: ["framer-motion", "lucide-react"],
  },



  "Toast Notifications": {
    name: "Toast Notifications",
    description: "Elegant notification system with customizable types, animations, and positioning.",
    preview: ToastNotificationPreview,
    cliInstall: "npx @empireui/empire-ui add ToastNotification",
    code: `"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "warning" | "info";
type ToastPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = "top-right",
  maxToasts = 5,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    
    setToasts(prevToasts => {
      const updatedToasts = [newToast, ...prevToasts];
      return updatedToasts.slice(0, maxToasts);
    });

    if (toast.duration !== 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 5000);
    }
  };

  const removeToast = (id: string) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };

  const getPositionClasses = () => {
    switch (position) {
      case "top-left":
        return "top-4 left-4";
      case "top-right":
        return "top-4 right-4";
      case "top-center":
        return "top-4 left-1/2 transform -translate-x-1/2";
      case "bottom-left":
        return "bottom-4 left-4";
      case "bottom-right":
        return "bottom-4 right-4";
      case "bottom-center":
        return "bottom-4 left-1/2 transform -translate-x-1/2";
      default:
        return "top-4 right-4";
    }
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className={\`fixed z-50 \${getPositionClasses()}\`}>
        <AnimatePresence>
          {toasts.map((toast) => (
            <ToastComponent
              key={toast.id}
              toast={toast}
              onRemove={() => removeToast(toast.id)}
            />
          ))}
        </AnimatePresence>
                </div>
    </ToastContext.Provider>
  );
};

interface ToastComponentProps {
  toast: Toast;
  onRemove: () => void;
}

const ToastComponent: React.FC<ToastComponentProps> = ({ toast, onRemove }) => {
  const getToastIcon = () => {
    switch (toast.type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getToastStyles = () => {
    switch (toast.type) {
      case "success":
        return "border-green-200 bg-green-50";
      case "error":
        return "border-red-200 bg-red-50";
      case "warning":
        return "border-yellow-200 bg-yellow-50";
      case "info":
        return "border-blue-200 bg-blue-50";
      default:
        return "border-gray-200 bg-white";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={\`mb-4 w-96 max-w-sm border rounded-lg shadow-lg p-4 \${getToastStyles()}\`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {getToastIcon()}
              </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-800">{toast.title}</h4>
          {toast.description && (
            <p className="text-sm text-gray-600 mt-1">{toast.description}</p>
          )}
          
          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 mt-2"
            >
              {toast.action.label}
            </button>
          )}
            </div>
        
        <button
          onClick={onRemove}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
          </div>
    </motion.div>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};`,
    usage: `import { ToastProvider, useToast } from "@/components/ui/ToastNotification";

function ToastDemo() {
  const { addToast } = useToast();

  const showSuccessToast = () => {
    addToast({
      type: "success",
      title: "Success!",
      description: "Your action was completed successfully.",
      duration: 5000,
    });
  };

  const showErrorToast = () => {
    addToast({
      type: "error",
      title: "Error occurred",
      description: "Something went wrong. Please try again.",
      action: {
        label: "Retry",
        onClick: () => console.log("Retrying..."),
      },
    });
  };

        return (
    <div className="space-x-4">
      <button onClick={showSuccessToast} className="bg-green-600 text-white px-4 py-2 rounded">
        Show Success
      </button>
      <button onClick={showErrorToast} className="bg-red-600 text-white px-4 py-2 rounded">
        Show Error
      </button>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider position="top-right" maxToasts={5}>
                <ToastDemo />
    </ToastProvider>
  );
}`,
    dependencies: ["framer-motion", "lucide-react"],
  },

  "Button": {
    name: "Button",
    description: "Versatile button component with multiple variants, sizes, states, and animations.",
    preview: ButtonPreview,
    cliInstall: "npx @empireui/empire-ui add Button",
    code: `"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "primary" | "secondary" | "ghost" | "outline" | "destructive" | "success";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  animate?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  animate = true,
  children,
  className,
  disabled,
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 border-transparent";
      case "secondary":
        return "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 border-transparent";
      case "outline":
        return "bg-transparent text-gray-700 border-gray-300 hover:bg-gray-50 focus:ring-gray-500";
      case "ghost":
        return "bg-transparent text-gray-700 border-transparent hover:bg-gray-100 focus:ring-gray-500";
      case "destructive":
        return "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border-transparent";
      case "success":
        return "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 border-transparent";
      default:
        return "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 focus:ring-blue-500";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-3 py-1.5 text-sm";
      case "lg":
        return "px-6 py-3 text-lg";
      case "xl":
        return "px-8 py-4 text-xl";
      default:
        return "px-4 py-2 text-base";
    }
  };

  const buttonClasses = cn(
    "inline-flex items-center justify-center font-medium rounded-lg border transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    getVariantClasses(),
    getSizeClasses(),
    fullWidth && "w-full",
    className
  );

  const ButtonComponent = animate ? motion.button : "button";

  const animationProps = animate ? {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.1 }
  } : {};

  return (
    <ButtonComponent
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...(animate ? animationProps : {})}
      {...props}
    >
      {isLoading && (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      )}
      
      {!isLoading && leftIcon && (
        <span className="mr-2">{leftIcon}</span>
      )}
      
      <span>{children}</span>
      
      {!isLoading && rightIcon && (
        <span className="ml-2">{rightIcon}</span>
      )}
    </ButtonComponent>
  );
};

// Additional button variants
export const IconButton: React.FC<Omit<ButtonProps, "children"> & { icon: React.ReactNode; "aria-label": string }> = ({
  icon,
  size = "md",
  variant = "ghost",
  className,
  ...props
}) => {
  const getIconSizeClasses = () => {
    switch (size) {
      case "sm":
        return "p-1.5";
      case "lg":
        return "p-3";
      case "xl":
        return "p-4";
      default:
        return "p-2";
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("aspect-square", getIconSizeClasses(), className)}
      {...props}
    >
      {icon}
    </Button>
  );
};`,
    usage: `import { Button, IconButton } from "@/components/ui/Button";
import { Download, Heart, Settings } from "lucide-react";
import { useState } from "react";

export default function ButtonDemo() {
  const [isLoading, setIsLoading] = useState(false);

  const handleAsyncAction = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-4">
        <h3 className="font-semibold">Button Variants</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="default">Default</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="success">Success</Button>
        </div>
              </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Button Sizes</h3>
        <div className="flex items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
                </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">With Icons</h3>
        <div className="flex gap-3">
          <Button variant="primary" leftIcon={<Download className="w-4 h-4" />}>
            Download
          </Button>
          <Button variant="outline" rightIcon={<Heart className="w-4 h-4" />}>
            Like
          </Button>
          <IconButton icon={<Settings className="w-4 h-4" />} aria-label="Settings" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">States</h3>
        <div className="flex gap-3">
          <Button 
            variant="primary" 
            isLoading={isLoading} 
            onClick={handleAsyncAction}
          >
            {isLoading ? "Loading..." : "Start Loading"}
          </Button>
          <Button disabled>Disabled</Button>
          <Button variant="primary" fullWidth>
            Full Width
          </Button>
              </div>
            </div>
          </div>
        );
}`,
    dependencies: ["framer-motion", "lucide-react"],
  },

  "Flowing Menu": {
    name: "Flowing Menu",
    description: "Animated sidebar menu with flowing marquee effects using GSAP animations.",
    preview: () => (
      <div style={{ height: '400px', width: '300px', position: 'relative' }}>
        <FlowingMenu 
          items={[
            { link: '#', text: 'Components' },
            { link: '#', text: 'Documentation' },
            { link: '#', text: 'Examples' },
            { link: '#', text: 'Templates' },
          ]}
        />
      </div>
    ),
    cliInstall: "npm install gsap",
    code: `"use client";

import React from "react";
import { gsap } from "gsap";
import "./FlowingMenu.css";

interface MenuItemProps {
  link: string;
  text: string;
  image?: string;
  onClick?: () => void;
}

interface FlowingMenuProps {
  items?: MenuItemProps[];
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [] }) => {
        return (
    <div className="menu-wrap">
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({ link, text, image, onClick }) => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);

  const animationDefaults: gsap.TweenVars = { duration: 0.6, ease: "expo" };

  const distMetric = (x: number, y: number, x2: number, y2: number): number => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  const findClosestEdge = (
    mouseX: number,
    mouseY: number,
    width: number,
    height: number
  ): "top" | "bottom" => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
  };

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    const tl = gsap.timeline({ defaults: animationDefaults });

    tl.set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" }, 0);
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    const tl = gsap.timeline({ defaults: animationDefaults });

    tl.to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0).to(
      marqueeInnerRef.current,
      { y: edge === "top" ? "101%" : "-101%" },
      0
    );
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    }
  };

  const repeatedMarqueeContent = React.useMemo(() => {
    return Array.from({ length: 4 }).map((_, idx) => (
      <React.Fragment key={idx}>
        <span>{text}</span>
        {image && (
          <div
            className="marquee__img"
            style={{ backgroundImage: \`url(\${image})\` }}
          />
        )}
      </React.Fragment>
    ));
  }, [text, image]);

  return (
    <div className="menu__item" ref={itemRef}>
      <a
        className="menu__item-link"
        href={link}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </a>
      <div className="marquee" ref={marqueeRef}>
        <div className="marquee__inner-wrap" ref={marqueeInnerRef}>
          <div className="marquee__inner" aria-hidden="true">
            {repeatedMarqueeContent}
          </div>
        </div>
            </div>
          </div>
        );
};

export default FlowingMenu;`,
    usage: `import FlowingMenu from './FlowingMenu'

const demoItems = [
  { link: '#', text: 'Home', onClick: () => console.log('Home clicked') },
  { link: '#', text: 'About', onClick: () => console.log('About clicked') },
  { link: '#', text: 'Services', onClick: () => console.log('Services clicked') },
  { link: '#', text: 'Contact', onClick: () => console.log('Contact clicked') }
];

export default function MenuDemo() {
  return (
    <div style={{ height: '600px', position: 'relative' }}>
      <FlowingMenu items={demoItems} />
    </div>
  );
}`,
    css: `.menu-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.menu {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0;
  padding: 0;
}

.menu__item {
  flex: 1;
  position: relative;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 -1px #333;
}

.menu__item-link {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
  cursor: pointer;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  font-weight: 600;
  color: #fff;
  font-size: 14px;
  transition: color 0.3s ease;
}

.menu__item-link:hover {
  color: #060010;
}

.menu__item-link:focus:not(:focus-visible) {
  color: #fff;
}

.marquee {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: #fff;
  transform: translate3d(0, 101%, 0);
  transition: transform 0.6s ease;
}

.marquee__inner-wrap {
  height: 100%;
  width: 200%;
  display: flex;
  transform: translateX(0);
}

.marquee__inner {
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
  width: 200%;
  will-change: transform;
  animation: marquee 8s linear infinite;
}

.marquee span {
  color: #060010;
  white-space: nowrap;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.2;
  padding: 0 1rem;
}

.marquee__img {
  width: 30px;
  height: 30px;
  margin: 0 0.5rem;
  border-radius: 50%;
  background-size: cover;
  background-position: 50% 50%;
  flex-shrink: 0;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}`,
    dependencies: ["gsap"],
  },
  "Wavy Background": {
    name: "Wavy Background",
    description: "Interactive wavy background animation with mouse tracking and customizable wave properties.",
    preview: WavyBackgroundPreview,
    cliInstall: "npx @empireui/empire-ui add Waves",
    code: `import React, { useRef, useEffect, CSSProperties } from "react";
import "./Waves.css";

class Grad {
  x: number;
  y: number;
  z: number;
  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  dot2(x: number, y: number): number {
    return this.x * x + this.y * y;
  }
}

class Noise {
  grad3: Grad[];
  p: number[];
  perm: number[];
  gradP: Grad[];

  constructor(seed = 0) {
    this.grad3 = [
      new Grad(1, 1, 0),
      new Grad(-1, 1, 0),
      new Grad(1, -1, 0),
      new Grad(-1, -1, 0),
      new Grad(1, 0, 1),
      new Grad(-1, 0, 1),
      new Grad(1, 0, -1),
      new Grad(-1, 0, -1),
      new Grad(0, 1, 1),
      new Grad(0, -1, 1),
      new Grad(0, 1, -1),
      new Grad(0, -1, -1),
    ];
    this.p = [
      151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225,
      140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247,
      120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177,
      33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165,
      71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211,
      133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25,
      63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196,
      135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217,
      226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206,
      59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248,
      152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22,
      39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218,
      246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241,
      81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157,
      184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93,
      222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180,
    ];
    this.perm = new Array(512);
    this.gradP = new Array(512);
    this.seed(seed);
  }
  seed(seed: number) {
    if (seed > 0 && seed < 1) seed *= 65536;
    seed = Math.floor(seed);
    if (seed < 256) seed |= seed << 8;
    for (let i = 0; i < 256; i++) {
      let v =
        i & 1 ? this.p[i] ^ (seed & 255) : this.p[i] ^ ((seed >> 8) & 255);
      this.perm[i] = this.perm[i + 256] = v;
      this.gradP[i] = this.gradP[i + 256] = this.grad3[v % 12];
    }
  }
  fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }
  lerp(a: number, b: number, t: number): number {
    return (1 - t) * a + t * b;
  }
  perlin2(x: number, y: number): number {
    let X = Math.floor(x),
      Y = Math.floor(y);
    x -= X;
    y -= Y;
    X &= 255;
    Y &= 255;
    const n00 = this.gradP[X + this.perm[Y]].dot2(x, y);
    const n01 = this.gradP[X + this.perm[Y + 1]].dot2(x, y - 1);
    const n10 = this.gradP[X + 1 + this.perm[Y]].dot2(x - 1, y);
    const n11 = this.gradP[X + 1 + this.perm[Y + 1]].dot2(x - 1, y - 1);
    const u = this.fade(x);
    return this.lerp(
      this.lerp(n00, n10, u),
      this.lerp(n01, n11, u),
      this.fade(y)
    );
  }
}

interface Point {
  x: number;
  y: number;
  wave: { x: number; y: number };
  cursor: { x: number; y: number; vx: number; vy: number };
}

interface Mouse {
  x: number;
  y: number;
  lx: number;
  ly: number;
  sx: number;
  sy: number;
  v: number;
  vs: number;
  a: number;
  set: boolean;
}

interface Config {
  lineColor: string;
  waveSpeedX: number;
  waveSpeedY: number;
  waveAmpX: number;
  waveAmpY: number;
  friction: number;
  tension: number;
  maxCursorMove: number;
  xGap: number;
  yGap: number;
}

interface WavesProps {
  lineColor?: string;
  backgroundColor?: string;
  waveSpeedX?: number;
  waveSpeedY?: number;
  waveAmpX?: number;
  waveAmpY?: number;
  xGap?: number;
  yGap?: number;
  friction?: number;
  tension?: number;
  maxCursorMove?: number;
  style?: CSSProperties;
  className?: string;
}

const Waves: React.FC<WavesProps> = ({
  lineColor = "black",
  backgroundColor = "transparent",
  waveSpeedX = 0.0125,
  waveSpeedY = 0.005,
  waveAmpX = 32,
  waveAmpY = 16,
  xGap = 10,
  yGap = 32,
  friction = 0.925,
  tension = 0.005,
  maxCursorMove = 100,
  style = {},
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const boundingRef = useRef<{
    width: number;
    height: number;
    left: number;
    top: number;
  }>({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  });
  const noiseRef = useRef(new Noise(Math.random()));
  const linesRef = useRef<Point[][]>([]);
  const mouseRef = useRef<Mouse>({
    x: -10,
    y: 0,
    lx: 0,
    ly: 0,
    sx: 0,
    sy: 0,
    v: 0,
    vs: 0,
    a: 0,
    set: false,
  });
  const configRef = useRef<Config>({
    lineColor,
    waveSpeedX,
    waveSpeedY,
    waveAmpX,
    waveAmpY,
    friction,
    tension,
    maxCursorMove,
    xGap,
    yGap,
  });
  const frameIdRef = useRef<number | null>(null);

  useEffect(() => {
    configRef.current = {
      lineColor,
      waveSpeedX,
      waveSpeedY,
      waveAmpX,
      waveAmpY,
      friction,
      tension,
      maxCursorMove,
      xGap,
      yGap,
    };
  }, [
    lineColor,
    waveSpeedX,
    waveSpeedY,
    waveAmpX,
    waveAmpY,
    friction,
    tension,
    maxCursorMove,
    xGap,
    yGap,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    ctxRef.current = canvas.getContext("2d");

    function setSize() {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      boundingRef.current = {
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top,
      };
      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    function setLines() {
      const { width, height } = boundingRef.current;
      linesRef.current = [];
      const oWidth = width + 200,
        oHeight = height + 30;
      const { xGap, yGap } = configRef.current;
      const totalLines = Math.ceil(oWidth / xGap);
      const totalPoints = Math.ceil(oHeight / yGap);
      const xStart = (width - xGap * totalLines) / 2;
      const yStart = (height - yGap * totalPoints) / 2;
      for (let i = 0; i <= totalLines; i++) {
        const pts: Point[] = [];
        for (let j = 0; j <= totalPoints; j++) {
          pts.push({
            x: xStart + xGap * i,
            y: yStart + yGap * j,
            wave: { x: 0, y: 0 },
            cursor: { x: 0, y: 0, vx: 0, vy: 0 },
          });
        }
        linesRef.current.push(pts);
      }
    }

    function movePoints(time: number) {
      const lines = linesRef.current;
      const mouse = mouseRef.current;
      const noise = noiseRef.current;
      const {
        waveSpeedX,
        waveSpeedY,
        waveAmpX,
        waveAmpY,
        friction,
        tension,
        maxCursorMove,
      } = configRef.current;
      lines.forEach((pts) => {
        pts.forEach((p) => {
          const move =
            noise.perlin2(
              (p.x + time * waveSpeedX) * 0.002,
              (p.y + time * waveSpeedY) * 0.0015
            ) * 12;
          p.wave.x = Math.cos(move) * waveAmpX;
          p.wave.y = Math.sin(move) * waveAmpY;

          const dx = p.x - mouse.sx,
            dy = p.y - mouse.sy;
          const dist = Math.hypot(dx, dy);
          const l = Math.max(175, mouse.vs);
          if (dist < l) {
            const s = 1 - dist / l;
            const f = Math.cos(dist * 0.001) * s;
            p.cursor.vx += Math.cos(mouse.a) * f * l * mouse.vs * 0.00065;
            p.cursor.vy += Math.sin(mouse.a) * f * l * mouse.vs * 0.00065;
          }

          p.cursor.vx += (0 - p.cursor.x) * tension;
          p.cursor.vy += (0 - p.cursor.y) * tension;
          p.cursor.vx *= friction;
          p.cursor.vy *= friction;
          p.cursor.x += p.cursor.vx * 2;
          p.cursor.y += p.cursor.vy * 2;
          p.cursor.x = Math.min(
            maxCursorMove,
            Math.max(-maxCursorMove, p.cursor.x)
          );
          p.cursor.y = Math.min(
            maxCursorMove,
            Math.max(-maxCursorMove, p.cursor.y)
          );
        });
      });
    }

    function moved(point: Point, withCursor = true): { x: number; y: number } {
      const x = point.x + point.wave.x + (withCursor ? point.cursor.x : 0);
      const y = point.y + point.wave.y + (withCursor ? point.cursor.y : 0);
      return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
    }

    function drawLines() {
      const { width, height } = boundingRef.current;
      const ctx = ctxRef.current;
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.strokeStyle = configRef.current.lineColor;
      linesRef.current.forEach((points) => {
        let p1 = moved(points[0], false);
        ctx.moveTo(p1.x, p1.y);
        points.forEach((p, idx) => {
          const isLast = idx === points.length - 1;
          p1 = moved(p, !isLast);
          const p2 = moved(
            points[idx + 1] || points[points.length - 1],
            !isLast
          );
          ctx.lineTo(p1.x, p1.y);
          if (isLast) ctx.moveTo(p2.x, p2.y);
        });
      });
      ctx.stroke();
    }

    function tick(t: number) {
      if (!container) return;
      const mouse = mouseRef.current;
      mouse.sx += (mouse.x - mouse.sx) * 0.1;
      mouse.sy += (mouse.y - mouse.sy) * 0.1;
      const dx = mouse.x - mouse.lx,
        dy = mouse.y - mouse.ly;
      const d = Math.hypot(dx, dy);
      mouse.v = d;
      mouse.vs += (d - mouse.vs) * 0.1;
      mouse.vs = Math.min(100, mouse.vs);
      mouse.lx = mouse.x;
      mouse.ly = mouse.y;
      mouse.a = Math.atan2(dy, dx);
      container.style.setProperty("--x", \`\${mouse.sx}px\`);
      container.style.setProperty("--y", \`\${mouse.sy}px\`);

      movePoints(t);
      drawLines();
      frameIdRef.current = requestAnimationFrame(tick);
    }

    function onResize() {
      setSize();
      setLines();
    }
    function onMouseMove(e: MouseEvent) {
      updateMouse(e.clientX, e.clientY);
    }
    function onTouchMove(e: TouchEvent) {
      const touch = e.touches[0];
      updateMouse(touch.clientX, touch.clientY);
    }
    function updateMouse(x: number, y: number) {
      const mouse = mouseRef.current;
      const b = boundingRef.current;
      mouse.x = x - b.left;
      mouse.y = y - b.top;
      if (!mouse.set) {
        mouse.sx = mouse.x;
        mouse.sy = mouse.y;
        mouse.lx = mouse.x;
        mouse.ly = mouse.y;
        mouse.set = true;
      }
    }

    setSize();
    setLines();
    frameIdRef.current = requestAnimationFrame(tick);
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={\`waves \${className}\`}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        margin: 0,
        padding: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor,
        ...style,
      }}
    >
      <canvas ref={canvasRef} className="waves-canvas" />
    </div>
  );
};

export default Waves;`,
    usage: `import Waves from './Waves';

<Waves
  lineColor="#fff"
  backgroundColor="rgba(255, 255, 255, 0.2)"
  waveSpeedX={0.02}
  waveSpeedY={0.01}
  waveAmpX={40}
  waveAmpY={20}
  friction={0.9}
  tension={0.01}
  maxCursorMove={120}
  xGap={12}
  yGap={36}
/>`,
    css: `.waves {
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.waves::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 0.5rem;
  height: 0.5rem;
  background: #160000;
  border-radius: 50%;
  transform: translate3d(calc(var(--x, 0px) - 50%), calc(var(--y, 0px) - 50%), 0);
  will-change: transform;
}

.waves-canvas {
  display: block;
  width: 100%;
  height: 100%;
}`,
  },
};

export default function ComponentsPage() {
  const [selectedItem, setSelectedItem] = useState("Introduction");
  const [activeTab, setActiveTab] = useState<TabType>("preview");
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const copyToClipboard = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const flattenMenuItems = (items: any[]): string[] => {
    const result: string[] = [];
    
    items.forEach(item => {
      if (item.items && item.items.length > 0) {
        if (item.title && !item.href) {
          // This is a category, add its children
          result.push(...flattenMenuItems(item.items));
        } else {
          // This has a title and might have children
          if (item.title) result.push(item.title);
          result.push(...flattenMenuItems(item.items));
        }
      } else if (item.title) {
        result.push(item.title);
      }
    });
    
    return result;
  };

  const menuItems = flattenMenuItems(docsConfig.sidebarNav);

  const sidebarCategories = [
    {
      title: "Getting Started",
      items: [
        { title: "Introduction", label: "", labelColor: "" },
        { title: "Installation", label: "Updated", labelColor: "green" },
        { title: "Wiki", label: "New", labelColor: "blue" },
      ],
    },
    {
      title: "AI Components",
      items: [
        { title: "AI Chatbox", label: "Popular", labelColor: "orange" },
        { title: "Caption Generator Button", label: "", labelColor: "" },
      ],
    },
    {
      title: "Data Visualization",
      items: [
        { title: "Prediction Output Card", label: "Popular", labelColor: "orange" },
        { title: "Training Summary Card", label: "", labelColor: "" },
        { title: "Dataset Overview Card", label: "", labelColor: "" },
        { title: "Expand Card", label: "", labelColor: "" },
        { title: "Passcode Card", label: "", labelColor: "" },
        { title: "Predictive Searchbar", label: "New", labelColor: "blue" },
      ],
    },
    {
      title: "UI Elements",
      items: [
        { title: "Wavy Background", label: "", labelColor: "" },
        { title: "Toast Notifications", label: "", labelColor: "" },
        { title: "Button", label: "Core", labelColor: "purple" },
        { title: "Flowing Menu", label: "New", labelColor: "blue" },
      ],
    },
  ];

  const renderComponentContent = () => {
    if (["Introduction", "Installation", "Wiki"].includes(selectedItem)) {
      return renderStaticContent();
    }

    const component = componentData[selectedItem];
    if (!component) {
  return (
        <div className="bg-black border border-white p-8 rounded-3xl">
          <p className={cn("text-white text-lg", MinecartLCD.className)}>
            Component documentation coming soon...
          </p>
        </div>
      );
    }

          return (
        <div className="bg-black border border-white rounded-3xl overflow-hidden">
        {/* Component Header */}
        <div className="p-6 border-b border-white">
          <h2 className={cn("text-2xl font-bold text-white mb-2", MinecartLCD.className)}>
            {component.name}
          </h2>
          <p className={cn("text-white", MinecartLCD.className)}>
            {component.description}
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-white">
          <div className="flex space-x-0">
            {[
              { id: "preview", label: "Preview", icon: Play },
              { id: "cli", label: "CLI", icon: Terminal },
              { id: "code", label: "Code", icon: Code2 },
              { id: "usage", label: "Usage", icon: BookOpen },
              ...(component.css ? [{ id: "css" as TabType, label: "CSS", icon: Palette }] : []),
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as TabType)}
                className={cn(
                  "flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-colors border-b-2",
                  activeTab === id
                    ? "text-white border-white bg-black"
                    : "text-white border-transparent hover:text-white hover:bg-black/50",
                  MinecartLCD.className
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "preview" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className={cn("text-lg font-semibold text-white", MinecartLCD.className)}>
                  Live Preview
                </h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-gray-800 text-gray-300 rounded-md text-sm hover:bg-gray-700 transition-colors">
                    Fullscreen
                  </button>
                  <button className="px-3 py-1 bg-gray-800 text-gray-300 rounded-md text-sm hover:bg-gray-700 transition-colors">
                    Reset
                  </button>
                </div>
              </div>
              <div className="bg-white border border-white rounded-lg p-8 min-h-[400px] flex items-center justify-center">
                <component.preview />
              </div>
            </div>
          )}

          {activeTab === "cli" && (
            <div className="space-y-4">
              <h3 className={cn("text-lg font-semibold text-white", MinecartLCD.className)}>
                Install with CLI
              </h3>
              <div className="bg-white border border-white rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={cn("text-black text-sm", MinecartLCD.className)}>Installation Command</span>
                  <button
                    onClick={() => copyToClipboard(component.cliInstall, "cli")}
                    className="flex items-center space-x-1 text-black hover:text-black transition-colors"
                  >
                    {copiedStates.cli ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    <span className={cn("text-sm", MinecartLCD.className)}>Copy</span>
                  </button>
                </div>
                <code className={cn("text-green-400 font-mono bg-black p-2 rounded block", MinecartLCD.className)}>{component.cliInstall}</code>
              </div>

              {component.dependencies && (
                <div className="bg-white border border-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={cn("text-black text-sm", MinecartLCD.className)}>Dependencies</span>
                  </div>
                  <div className="space-y-1">
                    {component.dependencies.map((dep, index) => (
                      <code key={index} className={cn("block text-green-400 font-mono text-sm bg-black p-2 rounded mb-1", MinecartLCD.className)}>
                        npm install {dep}
                      </code>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "code" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className={cn("text-lg font-semibold text-white", MinecartLCD.className)}>
                  Component Code
                </h3>
                <button
                  onClick={() => copyToClipboard(component.code, "code")}
                  className="flex items-center space-x-1 text-white hover:text-white transition-colors"
                >
                  {copiedStates.code ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span className={cn("text-sm", MinecartLCD.className)}>Copy Code</span>
                </button>
                </div>
              <div className="bg-black border border-white rounded-lg overflow-hidden">
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className={cn("text-green-400", MinecartLCD.className)}>{component.code}</code>
                </pre>
              </div>
            </div>
          )}

          {activeTab === "usage" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className={cn("text-lg font-semibold text-white", MinecartLCD.className)}>
                  Usage Example
                </h3>
                <button
                  onClick={() => copyToClipboard(component.usage, "usage")}
                  className="flex items-center space-x-1 text-white hover:text-white transition-colors"
                >
                  {copiedStates.usage ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span className={cn("text-sm", MinecartLCD.className)}>Copy Usage</span>
                </button>
              </div>
              <div className="bg-black border border-white rounded-lg overflow-hidden">
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className={cn("text-green-400", MinecartLCD.className)}>{component.usage}</code>
                </pre>
              </div>
            </div>
          )}

          {activeTab === "css" && component.css && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className={cn("text-lg font-semibold text-white", MinecartLCD.className)}>
                  Custom CSS
                </h3>
                <button
                  onClick={() => copyToClipboard(component.css || "", "css")}
                  className="flex items-center space-x-1 text-white hover:text-white transition-colors"
                >
                  {copiedStates.css ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span className={cn("text-sm", MinecartLCD.className)}>Copy CSS</span>
                </button>
              </div>
              <div className="bg-black border border-white rounded-lg overflow-hidden">
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className={cn("text-green-400", MinecartLCD.className)}>{component.css}</code>
                </pre>
              </div>
            </div>
          )}
            </div>
          </div>
        );
  };

  const renderStaticContent = () => {
    // Static content for Introduction, Installation, Wiki
    switch (selectedItem) {
      case "Introduction":
        return (
          <div className="bg-black border border-white p-8 rounded-3xl">
            <div className="text-center space-y-6">
              <h2 className={cn("text-3xl font-bold text-white", MinecartLCD.className)}>
                Welcome to Empire UI
              </h2>
              <p className={cn("text-white text-lg max-w-2xl mx-auto", MinecartLCD.className)}>
                A comprehensive, AI-ready component library built for modern web applications. 
                Create stunning interfaces with our production-ready components.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <div className="bg-white border border-white p-6 rounded-lg">
                  <div className="text-black mb-4">
                    <Terminal className="w-8 h-8" />
                  </div>
                  <h3 className={cn("text-black font-bold mb-2", MinecartLCD.className)}>Easy Installation</h3>
                  <p className={cn("text-black text-sm", MinecartLCD.className)}>
                    Get started quickly with our CLI tool and comprehensive documentation.
                  </p>
                </div>
                
                <div className="bg-white border border-white p-6 rounded-lg">
                  <div className="text-black mb-4">
                    <Code2 className="w-8 h-8" />
                  </div>
                  <h3 className={cn("text-black font-bold mb-2", MinecartLCD.className)}>Production Ready</h3>
                  <p className={cn("text-black text-sm", MinecartLCD.className)}>
                    All components are thoroughly tested and optimized for production use.
                  </p>
                </div>
                
                <div className="bg-white border border-white p-6 rounded-lg">
                  <div className="text-black mb-4">
                    <Palette className="w-8 h-8" />
                  </div>
                  <h3 className={cn("text-black font-bold mb-2", MinecartLCD.className)}>Fully Customizable</h3>
                  <p className={cn("text-black text-sm", MinecartLCD.className)}>
                    Customize every aspect of the components to match your brand.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case "Installation":
        return (
          <div className="bg-black border border-white p-8 rounded-3xl space-y-6">
            <h2 className={cn("text-2xl font-bold text-white mb-6", MinecartLCD.className)}>
              Installation Guide
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white border border-white p-6 rounded-lg">
                <h3 className={cn("text-black text-xl font-bold mb-4", MinecartLCD.className)}>
                  Quick Start
                </h3>
                <div className="bg-black p-4 rounded-lg font-mono text-green-400 space-y-2">
                  <p className={MinecartLCD.className}># Install Empire UI CLI</p>
                  <p className={MinecartLCD.className}>npm install -g @empireui/empire-ui</p>
                  <br />
                  <p className={MinecartLCD.className}># Initialize in your project</p>
                  <p className={MinecartLCD.className}>npx @empireui/empire-ui init</p>
                  <br />
                  <p className={MinecartLCD.className}># Add components</p>
                  <p className={MinecartLCD.className}>npx @empireui/empire-ui add Button</p>
                </div>
              </div>

              <div className="bg-white border border-white p-6 rounded-lg">
                <h3 className={cn("text-black text-xl font-bold mb-4", MinecartLCD.className)}>
                  Manual Installation
                </h3>
                <div className="bg-black p-4 rounded-lg font-mono text-green-400 space-y-2">
                  <p className={MinecartLCD.className}>npm install @empireui/components</p>
                  <p className={MinecartLCD.className}>npm install framer-motion lucide-react</p>
                  <p className={MinecartLCD.className}>npm install @radix-ui/react-dialog</p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case "Wiki":
        return (
          <div className="bg-black border border-white p-8 rounded-3xl space-y-6">
            <h2 className={cn("text-2xl font-bold text-white mb-6", MinecartLCD.className)}>
              Documentation & Guides
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Component API",
                  description: "Detailed documentation for all component props, methods, and events.",
                  icon: Code2,
                },
                {
                  title: "Theming Guide",
                  description: "Learn how to customize Empire UI components to match your brand.",
                  icon: Palette,
                },
                {
                  title: "Best Practices",
                  description: "Tips and recommendations for optimal component usage.",
                  icon: BookOpen,
                },
                {
                  title: "Migration Guide",
                  description: "Step-by-step guide for migrating from other UI libraries.",
                  icon: Download,
                },
              ].map((item, index) => (
                <div key={index} className="bg-white border border-white p-6 rounded-lg">
                  <div className="text-black mb-4">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className={cn("text-black text-xl font-bold mb-2", MinecartLCD.className)}>
                    {item.title}
                  </h3>
                  <p className={cn("text-black", MinecartLCD.className)}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <ResponsiveWrapper>
      <div className={cn("min-h-screen relative", MinecartLCD.className)} style={{ marginTop: '-15px' }}>
      {/* Particles Background */}
        <div className="fixed inset-0 w-full h-full z-[-1]">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
          className="w-full h-full"
        />
      </div>

          <Navbar />
          
                {/* Fixed Sidebar */}
        <div className="fixed left-6 top-20 w-80 lg:w-96 bg-black border border-white rounded-[40px] z-20 overflow-hidden" style={{ height: 'calc(100vh - 120px)', minHeight: '600px' }}>
          <div className="p-4 lg:p-6 border-b border-white">
            <h2 className={cn("text-xl lg:text-2xl font-bold text-white text-center", MinecartLCD.className)}>
              Components
            </h2>
          </div>
          <ClassifiedSidebar
            categories={sidebarCategories}
            selectedItem={selectedItem}
            onItemClick={(item) => {
              setSelectedItem(item);
              setActiveTab("preview");
            }}
          />
            </div>

            {/* Main Content */}
        <div className="ml-[340px] lg:ml-[420px] container mx-auto px-6 py-16 max-w-4xl relative z-10">
          <div className="w-full">
{renderComponentContent()}
            </div>
          </div>
          
          <EmpireFooter />
        </div>
      </ResponsiveWrapper>
  );
} 