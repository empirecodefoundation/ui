"use client";
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const TestCursor = dynamic(() => import('@/components/ui/TestCursor'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-black flex items-center justify-center text-white">
      Loading liquid cursor effect...
    </div>
  )
});

export default function CursorTestPage() {
  return (
    <div className="w-full h-screen">
      <Suspense 
        fallback={
          <div className="w-full h-screen bg-black flex items-center justify-center text-white">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p>Loading Three.js cursor effect...</p>
            </div>
          </div>
        }
      >
        <TestCursor />
      </Suspense>
    </div>
  );
} 