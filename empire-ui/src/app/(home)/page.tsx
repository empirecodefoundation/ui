"use client";
import React from "react";
import { Navbar } from "@/components/common/navbar";
import { ProductShowcase } from "@/components/common/product-showcase";
import { NewComponentsCard, WavyColoursCard } from "@/components/common/feature-cards";

const HomePage = () => {
  return (
    <main className="industrial-layout">
      {/* Navigation */}
      <Navbar />
      
      {/* Main content */}
      <div className="main-container mt-4">
        {/* Left column - Main product */}
        <div className="h-full">
          <ProductShowcase />
        </div>
        
        {/* Right column - Features */}
        <div className="feature-cards-container">
          <NewComponentsCard />
          <div className="my-4"></div>
          <WavyColoursCard />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
