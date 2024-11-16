'use client';

import { OcrTemplate } from '.';
import { motion } from 'framer-motion';

export default function TemplatesPage() {
  return (
    <div className="container relative mx-auto py-8 pt-28">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="mb-16 -ml-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center" // Added text-center
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-blue-600">
              Annual Report Generator
            </span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-400 text-center" // Added text-center
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Upload your relevant images of company and get instant annual report
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <OcrTemplate />
        </motion.div>
      </div>
    </div>
  );
}