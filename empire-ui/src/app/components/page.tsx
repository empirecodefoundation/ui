"use client";
import React from "react";
import { PageLayout } from "@/components/layout/page-layout";

const ComponentsPage = () => {
  return (
    <PageLayout>
      {/* Components Page Content */}
      <div className="pt-2">
        {/* Hero Section */}
        <div className="w-[1450px] max-w-[95%] mx-auto">
          <div className="text-center py-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Empire UI Components
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our comprehensive collection of modern, customizable UI components
              built with React, TypeScript, and Tailwind CSS.
            </p>
          </div>
        </div>

        {/* Components Grid - We'll add this step by step */}
        <div className="w-[1450px] max-w-[95%] mx-auto pb-16">
          <div className="text-center text-gray-400">
            <p>Components grid will be added here step by step...</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ComponentsPage; 