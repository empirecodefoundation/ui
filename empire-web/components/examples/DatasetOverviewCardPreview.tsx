"use client";

import React from "react";
import { Database, Download, Eye, FileText, TrendingUp } from "lucide-react";

export default function DatasetOverviewCardPreview() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <Database className="w-5 h-5 mr-2" />
              Customer Dataset
            </h3>
            <p className="text-gray-500 text-sm">
              Last updated: 2 hours ago
            </p>
          </div>
          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
            Ready
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Total Records */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">15,847</p>
            <p className="text-blue-800 text-sm font-medium">Total Records</p>
          </div>

          {/* Features */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-600">23</p>
            <p className="text-green-800 text-sm font-medium">Features</p>
          </div>

          {/* Missing Values */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">2.3%</p>
            <p className="text-yellow-800 text-sm font-medium">Missing Values</p>
          </div>

          {/* Data Quality */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-600">97.7%</p>
            <p className="text-green-800 text-sm font-medium">Data Quality</p>
          </div>
        </div>

        {/* Feature Types */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="text-gray-800 font-semibold mb-3 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Feature Distribution
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-600 text-sm">Numerical</span>
                <span className="text-gray-800 text-sm font-semibold">15</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: '65%' }}></div>
              </div>
              <span className="text-xs text-gray-500">65%</span>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-600 text-sm">Categorical</span>
                <span className="text-gray-800 text-sm font-semibold">6</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{ width: '26%' }}></div>
              </div>
              <span className="text-xs text-gray-500">26%</span>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-600 text-sm">DateTime</span>
                <span className="text-gray-800 text-sm font-semibold">2</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full transition-all duration-500" style={{ width: '9%' }}></div>
              </div>
              <span className="text-xs text-gray-500">9%</span>
            </div>
          </div>
        </div>

        {/* Sample Data Preview */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="text-gray-800 font-semibold mb-3 flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            Data Sample
          </h4>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-3 py-2 text-left text-gray-700">ID</th>
                  <th className="px-3 py-2 text-left text-gray-700">Name</th>
                  <th className="px-3 py-2 text-left text-gray-700">Age</th>
                  <th className="px-3 py-2 text-left text-gray-700">Category</th>
                  <th className="px-3 py-2 text-left text-gray-700">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-white">
                  <td className="px-3 py-2 text-gray-800">001</td>
                  <td className="px-3 py-2 text-gray-800">John Doe</td>
                  <td className="px-3 py-2 text-gray-800">28</td>
                  <td className="px-3 py-2 text-gray-800">Premium</td>
                  <td className="px-3 py-2 text-gray-800">85.3</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-3 py-2 text-gray-800">002</td>
                  <td className="px-3 py-2 text-gray-800">Jane Smith</td>
                  <td className="px-3 py-2 text-gray-800">34</td>
                  <td className="px-3 py-2 text-gray-800">Standard</td>
                  <td className="px-3 py-2 text-gray-800">92.1</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-3 py-2 text-gray-800">003</td>
                  <td className="px-3 py-2 text-gray-800">Mike Johnson</td>
                  <td className="px-3 py-2 text-gray-800">42</td>
                  <td className="px-3 py-2 text-gray-800">Premium</td>
                  <td className="px-3 py-2 text-gray-800">78.9</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Eye className="w-4 h-4 mr-2" />
            Explore Data
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Download Sample
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            View Schema
          </button>
        </div>
      </div>
    </div>
  );
} 