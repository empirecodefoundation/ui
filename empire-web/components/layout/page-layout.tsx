"use client";
import React from "react";
import { Navbar } from "@/components/common/navbar";
import { EmpireFooter } from "@/components/common/empire-footer";
import ScrollProgressLine from "@/components/ui/scroll-progress-line";
import { ParticlesBackground } from "@/components/ui/particles-background";
import { ResponsiveWrapper } from "@/components/common/responsive-wrapper";

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
    <ResponsiveWrapper>
      {/* Scroll Progress Line */}
      {showScrollProgress && (
        <ScrollProgressLine 
          color={scrollProgressColor}
          dotSize={scrollProgressDotSize}
          dotSpacing={scrollProgressDotSpacing}
        />
      )}
      
      {/* Particles Background for all pages */}
      <ParticlesBackground>
        {/* Main Layout Container */}
        <main className="industrial-layout mt-0 pt-0" style={{ marginTop: '-15px' }}>
          {/* Navigation - Constant across all pages */}
          <Navbar />
          
          {/* Page Content */}
          <div className="min-h-screen">
            {children}
          </div>
          
          {/* Footer - Constant across all pages */}
          <EmpireFooter />
        </main>
      </ParticlesBackground>
    </ResponsiveWrapper>
  );
}; 