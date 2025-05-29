"use client";

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/ui/code-block";
import { Button } from "@/components/ui/button";
import { FilePlus, Download, Copy, Check } from "lucide-react";

interface TemplateCodeViewerProps {
  html?: string;
  css?: string;
  javascript?: string;
  fullCode?: string;
  title?: string;
}

export function TemplateCodeViewer({ 
  html, 
  css, 
  javascript, 
  fullCode,
  title = "Template Code" 
}: TemplateCodeViewerProps) {
  const [copied, setCopied] = useState(false);
  
  const handleCopyAll = () => {
    if (fullCode) {
      navigator.clipboard.writeText(fullCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const handleDownload = () => {
    if (!fullCode) return;
    
    const blob = new Blob([fullCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template-code.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden mb-8">
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleCopyAll}
            className="bg-zinc-900 border-zinc-700 hover:bg-zinc-800"
          >
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                <span>Copy All</span>
              </>
            )}
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleDownload}
            className="bg-zinc-900 border-zinc-700 hover:bg-zinc-800"
          >
            <Download className="mr-2 h-4 w-4" />
            <span>Download</span>
          </Button>
        </div>
      </div>
      
      {fullCode ? (
        <div className="p-4">
          <CodeBlock 
            code={fullCode} 
            language="jsx" 
            showLineNumbers
            showCopyButton={false} 
          />
        </div>
      ) : (
        <Tabs defaultValue={html ? "html" : css ? "css" : "javascript"} className="w-full">
          <div className="border-b border-zinc-800 px-6">
            <TabsList className="bg-transparent border-b-0">
              {html && <TabsTrigger value="html" className="data-[state=active]:bg-zinc-800">HTML</TabsTrigger>}
              {css && <TabsTrigger value="css" className="data-[state=active]:bg-zinc-800">CSS</TabsTrigger>}
              {javascript && <TabsTrigger value="javascript" className="data-[state=active]:bg-zinc-800">JavaScript</TabsTrigger>}
            </TabsList>
          </div>
          
          <div className="p-4">
            {html && (
              <TabsContent value="html">
                <CodeBlock code={html} language="html" showLineNumbers showCopyButton />
              </TabsContent>
            )}
            
            {css && (
              <TabsContent value="css">
                <CodeBlock code={css} language="css" showLineNumbers showCopyButton />
              </TabsContent>
            )}
            
            {javascript && (
              <TabsContent value="javascript">
                <CodeBlock code={javascript} language="javascript" showLineNumbers showCopyButton />
              </TabsContent>
            )}
          </div>
        </Tabs>
      )}
      
      <div className="px-6 py-4 border-t border-zinc-800 flex justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-zinc-400 hover:text-white hover:bg-zinc-800"
          onClick={() => window.open('https://github.com/empirecodefoundation/ui/tree/main/templates', '_blank')}
        >
          <FilePlus className="mr-2 h-4 w-4" />
          <span>View More Templates</span>
        </Button>
      </div>
    </div>
  );
}

export default TemplateCodeViewer; 