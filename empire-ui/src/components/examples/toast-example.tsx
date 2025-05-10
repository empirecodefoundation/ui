"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

export function ToastExample() {
  const { addToast } = useToast();

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
      duration: 1000,
    });
  };

  const showWarningToast = () => {
    addToast({
      title: "Asteroid Proximity Alert",
      description: "Space debris detected in nearby sector. Shields activated.",
      variant: "warning",
      duration: 1000,
    });
  };

  const showErrorToast = () => {
    addToast({
      title: "System Malfunction",
      description: "Life support systems compromised. Emergency protocol initiated.",
      variant: "error",
      duration: 1000,
    });
  };

  const showInfoToast = () => {
    addToast({
      title: "Hyperspace Jump",
      description: "Coordinates set for next interstellar journey.",
      variant: "info",
      duration: 1000,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button onClick={showDefaultToast}>Default Toast</Button>
        <Button onClick={showSuccessToast} className="text-[#18CCFC]">
          Success Toast
        </Button>
        <Button onClick={showWarningToast} className="text-[#FF9900]">
          Warning Toast
        </Button>
        <Button onClick={showErrorToast} className="text-[#FF4444]">
          Error Toast
        </Button>
        <Button onClick={showInfoToast} className="text-[#6344F5]">
          Info Toast
        </Button>
      </div>
    </div>
  );
}

