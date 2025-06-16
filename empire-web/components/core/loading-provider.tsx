"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PageLoader } from '@/components/ui/page-loader';

interface LoadingContextType {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: React.ReactNode;
}

export const LoadingProvider = ({
  children,
}: LoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState(true); // Start with loading true for initial load
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => {
    setIsLoading(false);
    if (isInitialLoad) {
      setIsInitialLoad(false);
    }
  };

  // Handle initial page load
  useEffect(() => {
    if (isInitialLoad) {
      // Simulate initial load completion after a short delay
      const timer = setTimeout(() => {
        // The PageLoader component will handle the 1.5s duration
        // We just need to ensure it starts
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isInitialLoad]);

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      <div className={isLoading ? "opacity-0 pointer-events-none" : "opacity-100 transition-opacity duration-300"}>
        {children}
      </div>
      <PageLoader isLoading={isLoading} onComplete={stopLoading} />
    </LoadingContext.Provider>
  );
};

export default LoadingProvider; 