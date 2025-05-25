"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ToastProvider, useToast } from "@/components/ui/toast";

interface SpaceToastDemoProps {
  autoShow?: boolean; // Whether to show a toast automatically when component mounts
  delay?: number;     // Delay in ms before showing automatic toast
}

/**
 * Space-themed Toast Notification Demo Component
 * 
 * This component demonstrates the space-themed toast notifications
 * that can be used throughout your application.
 * 
 * Usage:
 * 1. Make sure you have the ToastProvider wrapped around your app or component
 * 2. Use the useToast hook to show notifications from anywhere in your app
 */
export function SpaceToastDemo({ 
  autoShow = false, 
  delay = 1500 
}: SpaceToastDemoProps) {
  const { addToast } = useToast();

  // Show a welcome toast automatically if autoShow is true
  useEffect(() => {
    if (autoShow) {
      const timer = setTimeout(() => {
        addToast({
          title: "Cosmic Connection Established",
          description: "Welcome to the space-themed toast notifications system.",
          variant: "success",
        });
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [autoShow, delay, addToast]);

  const showDefaultToast = () => {
    addToast({
      title: "Space Launch Initiated",
      description: "Your mission has been successfully launched into orbit.",
      variant: "default",
    });
  };

  const showSuccessToast = () => {
    addToast({
      title: "Planet Discovery",
      description: "New habitable exoplanet found in Andromeda galaxy.",
      variant: "success",
    });
  };

  const showWarningToast = () => {
    addToast({
      title: "Asteroid Proximity Alert",
      description: "Space debris detected in nearby sector. Shields activated.",
      variant: "warning",
    });
  };

  const showErrorToast = () => {
    addToast({
      title: "System Malfunction",
      description: "Life support systems compromised. Emergency protocol initiated.",
      variant: "error",
    });
  };

  const showInfoToast = () => {
    addToast({
      title: "Hyperspace Jump",
      description: "Coordinates set for next interstellar journey.",
      variant: "info",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row flex-wrap">
        <Button onClick={showDefaultToast} variant="outline">
          Default Toast
        </Button>
        <Button onClick={showSuccessToast} className="bg-[#18CCFC] hover:bg-[#18CCFC]/90 text-zinc-950">
          Success Toast
        </Button>
        <Button onClick={showWarningToast} className="bg-[#FF9900] hover:bg-[#FF9900]/90 text-zinc-950">
          Warning Toast
        </Button>
        <Button onClick={showErrorToast} className="bg-[#FF4444] hover:bg-[#FF4444]/90 text-zinc-950">
          Error Toast
        </Button>
        <Button onClick={showInfoToast} className="bg-[#6344F5] hover:bg-[#6344F5]/90">
          Info Toast
        </Button>
      </div>
    </div>
  );
}

/**
 * A standalone component that includes both the provider and demo buttons
 * Use this for quick integration when you don't have a provider already set up
 */
export function SpaceToastStandalone(props: SpaceToastDemoProps) {
  return (
    <ToastProvider>
      <SpaceToastDemo {...props} />
    </ToastProvider>
  );
} 