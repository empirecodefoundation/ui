"use client";

import React, { createContext, useContext, useState } from 'react';
import { Lanyard } from './lanyard';

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
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  thickness?: 'thin' | 'normal' | 'thick';
}

export const LoadingProvider = ({
  children,
  color = "#00aaff", // Using the neon-blue color from your globals.css
  size = "md",
  thickness = "normal",
}: LoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
      {isLoading && (
        <Lanyard 
          fullScreen
          color={color}
          size={size} 
          thickness={thickness} 
        />
      )}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider; 