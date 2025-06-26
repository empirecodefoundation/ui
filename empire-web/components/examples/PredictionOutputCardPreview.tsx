"use client";

import React from "react";
import { BarChart3, Download, TrendingUp } from "lucide-react";

export default function PredictionOutputCardPreview() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
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
              <span className="text-gray-800 font-bold">Positive Sentiment</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-green-500 h-3 rounded-full transition-all duration-500" style={{ width: '87%' }}></div>
            </div>
            <p className="text-green-600 text-sm mt-1 font-medium">Confidence: 87.3%</p>
          </div>

          {/* Alternative Predictions */}
          <div className="space-y-3">
            <h4 className="text-gray-800 font-semibold flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              Alternative Predictions
            </h4>
            
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-600 text-sm">Neutral</span>
                <span className="text-gray-500 text-sm">8.9%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full transition-all duration-500" style={{ width: '8.9%' }}></div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-600 text-sm">Negative</span>
                <span className="text-gray-500 text-sm">3.8%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full transition-all duration-500" style={{ width: '3.8%' }}></div>
              </div>
            </div>
          </div>

          {/* Model Info */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center mb-2">
              <TrendingUp className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-blue-800 font-medium">Model Performance</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-600">Accuracy:</span>
                <span className="text-blue-800 ml-2 font-semibold">94.2%</span>
              </div>
              <div>
                <span className="text-blue-600">F1 Score:</span>
                <span className="text-blue-800 ml-2 font-semibold">0.91</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t border-gray-200">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Details
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 