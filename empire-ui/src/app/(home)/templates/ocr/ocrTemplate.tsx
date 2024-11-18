'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {
  Upload,
  Book,
  Brain,
  Copy,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Download,
  Share,
  Maximize2,
  RotateCcw,
  X
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { Separator } from '@radix-ui/react-select';

interface Analysis {
  title: string;
  content: string;
}

interface ImagePreview {
  file: File;
  preview: string;
}

interface OcrTemplateProps {
  onProcessComplete?: (results: string) => void;
  apiKey?: string;
}

const FloatingActions = ({ onDownload, onShare, onReset }: {
  onDownload: () => void;
  onShare: () => void;
  onReset: () => void;
}) => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-40">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onDownload}
              className="rounded-full w-12 h-12 bg-purple-600 hover:bg-purple-700"
            >
              <Download className="h-5 w-5 text-white" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Download Report</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onShare}
              className="rounded-full w-12 h-12 bg-blue-600 hover:bg-blue-700"
            >
              <Share className="h-5 w-5 text-white" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share Report</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onReset}
              className="rounded-full w-12 h-12 bg-red-600 hover:bg-red-700"
            >
              <RotateCcw className="h-5 w-5 text-white" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Reset All</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

const AnalysisCard = ({ analysis, index }: { analysis: Analysis; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(analysis.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="bg-[#0A0B0D] border-[#1a1c1e] shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-purple-900/30 rounded-full w-8 h-8 flex items-center justify-center text-purple-400 font-semibold">
                {index + 1}
              </div>
              <CardTitle className="text-lg text-gray-200">{analysis.title}</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopy}
                      className="text-gray-400 hover:text-gray-200"
                    >
                      {copied ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{copied ? 'Copied!' : 'Copy content'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-gray-400 hover:text-gray-200"
              >
                {isExpanded ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <motion.div
            animate={{ height: isExpanded ? 'auto' : '100px' }}
            className={`overflow-hidden ${!isExpanded && 'mask-bottom'}`}
          >
            <div className="prose prose-sm max-w-none prose-invert">
              <Markdown className="text-gray-400">{analysis.content}</Markdown>
            </div>
          </motion.div>
          {!isExpanded && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(true)}
              className="mt-2 text-purple-400 hover:text-purple-300"
            >
              Read more
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Sidebar = ({ ocrResults, isOpen, onToggle }: {
  ocrResults: string;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <motion.div
    initial={false}
    animate={{ width: isOpen ? '400px' : '0px' }}
    className="fixed right-0 top-0 h-full bg-[#0A0B0D] border-l border-[#1a1c1e] shadow-lg z-40 overflow-hidden"
  >
    <div className="relative h-full flex flex-col">
      <Button
        variant="ghost"
        size="sm"
        className="absolute -left-10 top-4 text-gray-400 hover:text-gray-200"
        onClick={onToggle}
      >
        {isOpen ? <ChevronRight /> : <ChevronLeft />}
      </Button>
      
      <div className="p-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold m-0 text-gray-200">OCR Results</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={async () => {
                  await navigator.clipboard.writeText(ocrResults);
                }}
                className="text-gray-400 hover:text-gray-200"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy OCR results</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <Separator className="bg-gray-800" />
      
      <ScrollArea className="flex-1 p-4">
        <div className="prose prose-sm max-w-none prose-invert">
          <div className="text-gray-400 whitespace-pre-wrap">
            <Markdown>{ocrResults}</Markdown>
          </div>
        </div>
      </ScrollArea>
    </div>
  </motion.div>
);

const OcrTemplate: React.FC<OcrTemplateProps> = ({ onProcessComplete, apiKey }) => {
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [ocrResults, setOcrResults] = useState<string>('');
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: ImagePreview[] = [];

      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push({
            file,
            preview: reader.result as string
          });
          if (newImages.length === files.length) {
            setImages(prev => [...prev, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const content = `
OCR Results:
${ocrResults}

Analysis Reports:
${analyses.map(a => `
${a.title}
${a.content}
`).join('\n')}
    `;
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "annual-report-analysis.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Annual Report Analysis',
          text: `OCR Results:\n${ocrResults}\n\nAnalysis Reports:\n${analyses.map(a =>
            `${a.title}\n${a.content}`).join('\n')}`,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      await navigator.clipboard.writeText(`OCR Results:\n${ocrResults}\n\nAnalysis Reports:\n${analyses.map(a => `${a.title}\n${a.content}`).join('\n')
        }`);
    }
  };

  const handleReset = () => {
    setImages([]);
    setOcrResults('');
    setAnalyses([]);
    setLoading(false);
  };

  const processImages = async () => {
    if (images.length === 0) return;

    setLoading(true);
    try {
      const formData = new FormData();
      images.forEach((img, index) => {
        formData.append(`images`, img.file);
      });
      formData.append('apiKey', apiKey || process.env.TOGETHER_API_KEY || '');

      const response = await fetch('/api/ocr', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Processing failed');
      }

      const data = await response.json();
      setOcrResults(data.text);
      setAnalyses(data.analyses);

      if (onProcessComplete) {
        onProcessComplete(data.text);
      }
    } catch (error) {
      console.error('Error processing images:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative mt-16">
      <div className={`transition-all duration-300 ${sidebarOpen ? 'mr-[400px]' : 'mr-0'}`}>
        <div className="max-w-7xl mx-auto p-6 space-y-8">
          {/* Introduction Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-36 w-[800px]"> {/* Fixed width container */}
            <motion.div
              initial={{ opacity: 0, y: 20, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="w-full"
            >
              <Card className="w-full h-[280px] bg-[#0A0B0D] border-[#1a1c1e] shadow-lg"> {/* Fixed height and dark background */}
                <CardHeader>
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <Book className="w-8 h-8 mb-2 text-blue-500" />
                  </motion.div>
                  <CardTitle className="text-xl text-blue-500">
                    Llama 3.2 Vision OCR
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Document to Markdown OCR library powered by state-of-the-art Llama 3.2 Vision model
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <motion.ul
                    className="list-disc list-inside space-y-2 text-sm text-gray-400"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                  >
                    <motion.li variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}>High-accuracy text extraction</motion.li>
                    <motion.li variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}>Support for multiple document formats</motion.li>
                    <motion.li variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}>Structured Markdown output</motion.li>
                    <motion.li variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}>Advanced layout recognition</motion.li>
                  </motion.ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="w-full"
            >
              <Card className="w-full h-[280px] bg-[#0A0B0D] border-[#1a1c1e] shadow-lg"> {/* Fixed height and dark background */}
                <CardHeader>
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <Brain className="w-8 h-8 mb-2 text-purple-500" />
                  </motion.div>
                  <CardTitle className="text-xl text-purple-500">
                    Groq Processing
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Ultra-fast LLM inference powered by the GroqChip™
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <motion.ul
                    className="list-disc list-inside space-y-2 text-sm text-gray-400"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                  >
                    <motion.li variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}>Millisecond-level latency</motion.li>
                    <motion.li variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}>Advanced financial analysis</motion.li>
                    <motion.li variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}>Structured report generation</motion.li>
                    <motion.li variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}>High-throughput processing</motion.li>
                  </motion.ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Main Processing Card */}
          <Card className="w-[800px] ml-36 h-[280px] bg-[#0A0B0D] border-[#1a1c1e] shadow-lg"> {/* Changed mx-auto to ml-36 */}
            <CardHeader>
              <CardTitle className="text-xl text-gray-200">Annual Report Analysis</CardTitle>
              <CardDescription className="text-gray-400">
                Upload multiple pages from an annual report to extract text and generate comprehensive analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Section */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center bg-[#0D0E10] hover:border-purple-500/50 transition-colors duration-300"
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  multiple
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center space-y-3"
                >
                  <Upload className="h-12 w-12 text-purple-500" />
                  <span className="text-sm text-gray-400">
                    Click to upload multiple images or drag and drop
                  </span>
                </label>
              </motion.div>

              {/* Preview Section */}
              {images.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4"
                >
                  <p className="text-sm font-medium mb-2">Previews:</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img.preview}
                          alt={`Preview ${index + 1}`}
                          className="h-48 w-full rounded-lg object-cover"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg" />
                      </div>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={processImages}
                    disabled={loading}
                    className={`mt-4 px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''
                      } flex items-center justify-center gap-2 w-full md:w-auto`}
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span>Processing Documents...</span>
                      </>
                    ) : (
                      <>
                        <Brain className="w-5 h-5" />
                        <span>Analyze Reports</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}

              {/* Analysis Cards */}
              <AnimatePresence mode="wait">
                {analyses.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 gap-6 mt-8"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-purple-900">Analysis Results</h2>
                      <div className="flex items-center gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                              >
                                {sidebarOpen ? 'Hide' : 'Show'} OCR Results
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{sidebarOpen ? 'Hide' : 'Show'} original text</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>

                    {analyses.map((analysis, index) => (
                      <AnalysisCard
                        key={analysis.title}
                        analysis={analysis}
                        index={index}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sidebar */}
      {ocrResults && (
        <Sidebar
          ocrResults={ocrResults}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
      )}

      {/* Floating Action Buttons */}
      {analyses.length > 0 && (
        <FloatingActions
          onDownload={handleDownload}
          onShare={handleShare}
          onReset={handleReset}
        />
      )}
    </div>
  );
};

export default OcrTemplate;