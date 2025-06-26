"use client";

import React, { useState } from "react";
import { ImageIcon, Loader2, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function CaptionGeneratorPreview() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [caption, setCaption] = useState("");
  const [copied, setCopied] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const generateCaption = () => {
    setIsGenerating(true);
    setCaption("");
    
    // Simulate caption generation
    setTimeout(() => {
      const captions = [
        "A beautiful sunset over the ocean with vibrant orange and pink colors reflecting on the water.",
        "A modern workspace with a laptop, coffee cup, and plants creating a productive environment.",
        "A group of friends enjoying a picnic in a sunny park surrounded by green trees.",
        "A cozy living room with warm lighting, comfortable furniture, and decorative elements.",
        "A stunning mountain landscape with snow-capped peaks and a clear blue sky."
      ];
      
      const randomCaption = captions[Math.floor(Math.random() * captions.length)];
      setCaption(randomCaption);
      setIsGenerating(false);
    }, 2000);
  };

  const copyCaption = () => {
    navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      {/* Image Upload Area */}
      <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors bg-gray-800">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="image-upload"
        />
        
        {selectedImage ? (
          <div className="space-y-4">
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-48 mx-auto rounded-lg object-cover"
            />
            <label
              htmlFor="image-upload"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
            >
              Change Image
            </label>
          </div>
        ) : (
          <label htmlFor="image-upload" className="cursor-pointer">
            <div className="space-y-3">
              <div className="w-16 h-16 bg-gray-700 rounded-lg mx-auto flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <p className="text-white font-medium">Drop an image here</p>
                <p className="text-gray-400 text-sm">or click to browse</p>
              </div>
            </div>
          </label>
        )}
      </div>
      
      {/* Generate Button */}
      <motion.button
        onClick={generateCaption}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isGenerating}
      >
        <div className="flex items-center justify-center space-x-2">
          {isGenerating ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <ImageIcon className="w-5 h-5" />
          )}
          <span>{isGenerating ? "Generating..." : "Generate Caption"}</span>
        </div>
      </motion.button>
      
      {/* Caption Output */}
      {caption && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-semibold text-gray-800">Generated Caption:</h4>
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
} 