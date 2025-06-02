"use client";
import React from "react";
import { Navbar } from "@/components/common/navbar";
import { ProductShowcase } from "@/components/common/product-showcase";
import { NewComponentsCard, WavyColoursCard } from "@/components/common/feature-cards";

const HomePage = () => {
  return (
    <main className="industrial-layout mt-0 pt-0" style={{ marginTop: '-15px' }}>
      {/* Navigation */}
      <Navbar />
      
      {/* Main content */}
      <div className="w-[1450px] max-w-[95%] mx-auto mt-2 grid grid-cols-[3fr_0.8fr] gap-4">
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
    </main>
  );
};

export default HomePage;
