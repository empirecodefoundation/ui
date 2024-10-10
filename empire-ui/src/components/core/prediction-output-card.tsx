"use client";

import React from "react";
import { motion } from "framer-motion";
import { Download, Sparkles } from "lucide-react";

interface PredictionOutputCardProps {
  title: string;
  confidenceLevel: number;
  onExport: () => void;
  children: React.ReactNode;
}

export const PredictionOutputCard: React.FC<PredictionOutputCardProps> = ({
  title,
  confidenceLevel,
  onExport,
  children,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-secondary to-primary p-6">
          <h2 className="flex items-center justify-between text-white text-xl font-semibold">
            <span>{title}</span>
            <Sparkles className="w-6 h-6" />
          </h2>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-black">
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Confidence Level
            </h3>
            <div className="flex items-center justify-between mb-2">
              <div className="w-4/5 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-black dark:bg-white h-2.5 rounded-full"
                  style={{ width: `${confidenceLevel}%` }}
                ></div>
              </div>
              <span className="text-sm font-bold">
                {confidenceLevel.toFixed(2)}%
              </span>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {children}
          </motion.div>
          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <button
              onClick={onExport}
              className="w-full bg-black dark:bg-white text-white dark:text-black py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center transition duration-150 ease-in-out"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Results
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
