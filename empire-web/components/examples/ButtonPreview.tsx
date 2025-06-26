"use client";

import React, { useState } from "react";
import { Download, Heart, Share2, ShoppingCart, Loader2, Plus, Check } from "lucide-react";

export default function ButtonPreview() {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [likedStates, setLikedStates] = useState<Record<string, boolean>>({});

  const handleClick = (id: string, action?: () => void) => {
    if (action) {
      action();
    } else {
      setLoadingStates(prev => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setLoadingStates(prev => ({ ...prev, [id]: false }));
      }, 2000);
    }
  };

  const toggleLike = (id: string) => {
    setLikedStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="space-y-8">
        
        {/* Primary Buttons */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Primary Buttons</h3>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => handleClick('primary-1')}
              disabled={loadingStates['primary-1']}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {loadingStates['primary-1'] ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>Download</span>
            </button>
            
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Create New</span>
            </button>
            
            <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>

        {/* Secondary Buttons */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Secondary Buttons</h3>
          <div className="flex flex-wrap gap-3">
            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            
            <button className="px-6 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-2">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            
            <button className="px-6 py-2 border border-green-300 text-green-700 rounded-lg hover:bg-green-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>

        {/* Button Sizes */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Button Sizes</h3>
          <div className="flex flex-wrap items-center gap-3">
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Small
            </button>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Medium
            </button>
            
            <button className="px-6 py-3 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Large
            </button>
            
            <button className="px-8 py-4 text-xl bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
              Extra Large
            </button>
          </div>
        </div>

        {/* Interactive Buttons */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Interactive Buttons</h3>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => toggleLike('heart-1')}
              className={`px-4 py-2 border rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                likedStates['heart-1'] 
                  ? 'border-red-300 bg-red-50 text-red-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${likedStates['heart-1'] ? 'fill-current' : ''}`} />
              <span>{likedStates['heart-1'] ? 'Liked' : 'Like'}</span>
            </button>
            
            <button 
              onClick={() => handleClick('loading-btn')}
              disabled={loadingStates['loading-btn']}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-75 transition-colors flex items-center space-x-2"
            >
              {loadingStates['loading-btn'] ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Submit</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Button States */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Button States</h3>
          <div className="flex flex-wrap gap-3">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Normal
            </button>
            
            <button className="px-6 py-2 bg-blue-700 text-white rounded-lg">
              Hover State
            </button>
            
            <button className="px-6 py-2 bg-blue-800 text-white rounded-lg">
              Active State
            </button>
            
            <button 
              disabled 
              className="px-6 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
            >
              Disabled
            </button>
            
            <button 
              disabled 
              className="px-6 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed flex items-center space-x-2"
            >
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Loading</span>
            </button>
          </div>
        </div>

        {/* Rounded Variants */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Border Radius Variants</h3>
          <div className="flex flex-wrap gap-3">
            <button className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              No Radius
            </button>
            
            <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Small Radius
            </button>
            
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Medium Radius
            </button>
            
            <button className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
              Large Radius
            </button>
            
            <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
              Full Rounded
            </button>
          </div>
        </div>

      </div>
    </div>
  );
} 