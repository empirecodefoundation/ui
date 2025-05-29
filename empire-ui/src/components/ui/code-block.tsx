"use client";

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  showLineNumbers = false,
  showCopyButton = true,
  className,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Custom style to match Empire UI's theme
  const customStyle = {
    ...dracula,
    'pre[class*="language-"]': {
      ...dracula['pre[class*="language-"]'],
      background: 'hsl(240 10% 3.9%)',
      borderRadius: '0.5rem',
      padding: '1.5rem',
      margin: '0',
      overflow: 'auto',
    },
  };

  return (
    <div className={cn("relative group rounded-md overflow-hidden mb-4", className)}>
      <div className="flex items-center justify-between bg-zinc-900 px-4 py-2 border-b border-zinc-800">
        <div className="text-xs font-mono text-zinc-400 uppercase">{language}</div>
        {showCopyButton && (
          <button
            onClick={handleCopy}
            className="text-zinc-400 hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-zinc-900 transition-all"
          >
            {copied ? (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="flex items-center"
              >
                <Check className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-xs">Copied!</span>
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center"
              >
                <Copy className="h-4 w-4 mr-1" />
                <span className="text-xs">Copy</span>
              </motion.div>
            )}
          </button>
        )}
      </div>
      <SyntaxHighlighter
        language={language}
        style={customStyle}
        showLineNumbers={showLineNumbers}
        wrapLines={true}
        customStyle={{
          margin: 0,
          padding: '1rem',
          fontSize: '0.9rem',
          backgroundColor: 'hsl(240 10% 3.9%)',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock; 