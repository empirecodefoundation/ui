"use client";

import React from "react";
import { Play, Pause, BarChart3, Clock, Database } from "lucide-react";

export default function TrainingSummaryCardPreview() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Model Training Progress
          </h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-600 text-sm font-medium">Training</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Epoch Progress */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-gray-800 font-semibold mb-2 flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              Epoch
            </h4>
            <p className="text-2xl font-bold text-blue-600">47/100</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: '47%' }}></div>
            </div>
            <p className="text-gray-500 text-sm mt-1">47% Complete</p>
          </div>

          {/* Loss */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-gray-800 font-semibold mb-2">Loss</h4>
            <p className="text-2xl font-bold text-red-500">0.0234</p>
            <p className="text-green-600 text-sm">↓ 12% from last epoch</p>
          </div>

          {/* Accuracy */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-gray-800 font-semibold mb-2">Accuracy</h4>
            <p className="text-2xl font-bold text-green-600">94.7%</p>
            <p className="text-green-600 text-sm">↑ 0.3% improvement</p>
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
              <span className="text-gray-800 font-medium">10,000 samples</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Batch Size:</span>
              <span className="text-gray-800 font-medium">32</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Learning Rate:</span>
              <span className="text-gray-800 font-medium">0.001</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Est. Time:</span>
              <span className="text-orange-600 font-medium flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                23 min remaining
              </span>
            </div>
          </div>
        </div>

        {/* Progress Visualization */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h4 className="text-gray-800 font-semibold mb-3">Training History</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Loss Trend</span>
              <div className="flex space-x-1">
                {[0.8, 0.6, 0.4, 0.3, 0.2, 0.15, 0.1, 0.08, 0.05, 0.03].map((height, index) => (
                  <div 
                    key={index} 
                    className="w-2 bg-red-400 rounded-t" 
                    style={{ height: `${height * 40}px` }}
                  ></div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Accuracy Trend</span>
              <div className="flex space-x-1">
                {[0.3, 0.5, 0.7, 0.8, 0.85, 0.88, 0.91, 0.93, 0.945, 0.947].map((height, index) => (
                  <div 
                    key={index} 
                    className="w-2 bg-green-400 rounded-t" 
                    style={{ height: `${height * 40}px` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center">
            <Pause className="w-4 h-4 mr-2" />
            Stop Training
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            View Logs
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            Save Checkpoint
          </button>
        </div>
      </div>
    </div>
  );
} 