"use client";
import React from "react";
import { Navbar } from "@/components/common/navbar";
import { EmpireFooter } from "@/components/common/empire-footer";
import ScrollProgressLine from "@/components/ui/scroll-progress-line";

interface PageLayoutProps {
  children: React.ReactNode;
  showScrollProgress?: boolean;
  scrollProgressColor?: string;
  scrollProgressDotSize?: number;
  scrollProgressDotSpacing?: number;
}

export const PageLayout = ({ 
  children, 
  showScrollProgress = true,
  scrollProgressColor = "#ffffff",
  scrollProgressDotSize = 5,
  scrollProgressDotSpacing = 20
}: PageLayoutProps) => {
  return (
    <>
      {/* Scroll Progress Line */}
      {showScrollProgress && (
        <ScrollProgressLine 
          color={scrollProgressColor}
          dotSize={scrollProgressDotSize}
          dotSpacing={scrollProgressDotSpacing}
        />
      )}
      
      {/* Main Layout Container */}
      <main className="industrial-layout mt-0 pt-0" style={{ marginTop: '-15px' }}>
        {/* Navigation - Constant across all pages */}
        <Navbar />
        
        {/* Page Content */}
        <div className="min-h-screen bg-[#202020]">
          {children}
        </div>
        
        {/* Footer - Constant across all pages */}
        <EmpireFooter />
      </main>
    </>
  );
}; 