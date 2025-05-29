"use client";

import { OcrTemplate } from ".";
import { motion } from "framer-motion";

const StarryBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Dot grid background */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `
            radial-gradient(circle at 2px 2px, rgb(55 65 81 / 0.5) 2px, transparent 0)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '-2px -2px'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default function TemplatesPage() {
  return (
    <StarryBackground>
      <div className="py-8 pt-28">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="flex flex-col items-center justify-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-blue-600">
                Annual Report Generator
              </span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-gray-400 text-center"
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
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl"
          >
            <OcrTemplate />
          </motion.div>
        </div>
      </div>
    </StarryBackground>
  );
}