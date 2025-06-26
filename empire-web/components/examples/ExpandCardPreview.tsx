"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, FileText, Code, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ExpandCardDemoProps {
  title: string;
  icon?: React.ReactNode;
  defaultExpanded?: boolean;
  children?: React.ReactNode;
}

function ExpandCardDemo({ title, icon, defaultExpanded = false, children }: ExpandCardDemoProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center space-x-3">
          {icon}
          <span className="font-medium text-gray-800">{title}</span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 border-t border-gray-200">
              {children || (
                <div className="space-y-3">
                  <p className="text-gray-600 text-sm">
                    This is the expandable content for "{title}". You can include any type of content here - text, images, forms, or other components.
                  </p>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-gray-700 text-sm font-medium">Key Features:</p>
                    <ul className="text-gray-600 text-sm mt-2 space-y-1">
                      <li>• Smooth animations</li>
                      <li>• Accessible keyboard navigation</li>
                      <li>• Customizable styling</li>
                      <li>• Support for any content type</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ExpandCardPreview() {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <ExpandCardDemo 
        title="Documentation" 
        icon={<FileText className="w-5 h-5 text-blue-600" />}
        defaultExpanded={true}
      >
        <div className="space-y-3">
          <p className="text-gray-600 text-sm">
            Comprehensive documentation for the Empire UI component library. Learn how to implement, customize, and optimize your components.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
              <h4 className="font-medium text-blue-800 text-sm">Getting Started</h4>
              <p className="text-blue-600 text-xs mt-1">Installation and setup guide</p>
            </div>
            <div className="bg-green-50 p-3 rounded-md border border-green-200">
              <h4 className="font-medium text-green-800 text-sm">API Reference</h4>
              <p className="text-green-600 text-xs mt-1">Complete API documentation</p>
            </div>
          </div>
        </div>
      </ExpandCardDemo>
      
      <ExpandCardDemo 
        title="Code Examples" 
        icon={<Code className="w-5 h-5 text-green-600" />}
      >
        <div className="space-y-3">
          <p className="text-gray-600 text-sm">
            Ready-to-use code snippets and examples for common use cases.
          </p>
          <div className="bg-gray-900 rounded-md p-3">
            <pre className="text-green-400 text-xs">
{`import { ExpandCard } from "@empire-ui/components";

<ExpandCard title="My Section">
  <p>Content goes here...</p>
</ExpandCard>`}
            </pre>
          </div>
        </div>
      </ExpandCardDemo>
      
      <ExpandCardDemo 
        title="Advanced Configuration" 
        icon={<Settings className="w-5 h-5 text-purple-600" />}
      >
        <div className="space-y-3">
          <p className="text-gray-600 text-sm">
            Advanced customization options and configuration settings for power users.
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm text-gray-700">Animation Duration</span>
              <span className="text-sm text-gray-500">300ms</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm text-gray-700">Default State</span>
              <span className="text-sm text-gray-500">Collapsed</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm text-gray-700">Keyboard Support</span>
              <span className="text-sm text-green-600">Enabled</span>
            </div>
          </div>
        </div>
      </ExpandCardDemo>
    </div>
  );
} 