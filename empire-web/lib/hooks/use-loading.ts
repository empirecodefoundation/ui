"use client";

import { useLoading as useLoadingContext } from '@/components/core/loading-provider';

// Re-export the hook for easier access
export const useLoading = useLoadingContext;

// Utility function to wrap async functions with loading state
export const withLoading = <T extends (...args: any[]) => Promise<any>>(
  asyncFn: T,
  options?: { startMessage?: string; endMessage?: string }
) => {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    const { startLoading, stopLoading } = useLoadingContext();
    
    try {
      startLoading();
      if (options?.startMessage) {
        console.log(options.startMessage);
      }
      
      const result = await asyncFn(...args);
      
      if (options?.endMessage) {
        console.log(options.endMessage);
      }
      
      return result as ReturnType<T>;
    } finally {
      stopLoading();
    }
  };
};

export default useLoading; 