"use client";
import React from "react";
import { PageLayout } from "@/components/layout/page-layout";
import { ProductShowcase } from "@/components/common/product-showcase";
import { NewComponentsCard, WavyColoursCard } from "@/components/common/feature-cards";
import { FeaturesSection } from "@/components/common/features-section";
import { ProductHighlights } from "@/components/common/product-highlights";
import { WhyEmpireUI } from "@/components/common/why-empire-ui";

const HomePage = () => {
  return (
    <PageLayout>
      {/* Home Page Content */}
      <div className="pt-2">
        {/* Main content */}
        <div className="w-[1450px] max-w-[95%] mx-auto grid grid-cols-[3fr_0.8fr] gap-4">
          {/* Left column - Main product */}
          <div className="h-full">
            <ProductShowcase />
          </div>
          
          {/* Right column - Features */}
          <div className="feature-cards-container h-full mt-0">
            <div className="h-[40%] mb-4">
              <NewComponentsCard />
            </div>
            <div className="h-[60%]">
              <WavyColoursCard />
            </div>
          </div>
        </div>
        
        {/* Features Section - Full width below main content */}
        <FeaturesSection />
        
        {/* Product Highlights Section */}
        <ProductHighlights />
        
        {/* Why Empire UI Section */}
        <WhyEmpireUI />
      </div>
    </PageLayout>
  );
};

export default HomePage;
