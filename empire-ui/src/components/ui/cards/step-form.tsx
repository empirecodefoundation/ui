"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Step {
  title: string;
  content: ReactNode;
}

interface StepperContextType {
  steps: Step[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const StepperContext = createContext<StepperContextType | undefined>(undefined);

export function Stepper({
  children,
  steps,
}: {
  children: ReactNode;
  steps: Step[];
}) {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <StepperContext.Provider value={{ steps, currentStep, setCurrentStep }}>
      <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        {children}
      </div>
    </StepperContext.Provider>
  );
}

export function StepperHeader() {
  const context = useContext(StepperContext);
  if (!context) throw new Error("StepperHeader must be used within a Stepper");
  const { steps, currentStep, setCurrentStep } = context;
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center relative">
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
                index < currentStep
                  ? "bg-primary text-primary-foreground"
                  : index === currentStep
                  ? "bg-primary-foreground text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
              whileHover={{ scale: 1.1 }}
              onHoverStart={() => setHoveredStep(index)}
              onHoverEnd={() => setHoveredStep(null)}
              onClick={() => setCurrentStep(index)}
            >
              {index < currentStep ? (
                <Check className="w-6 h-6" />
              ) : (
                <span className="text-sm font-semibold">{index + 1}</span>
              )}
            </motion.div>
            <motion.div
              className="absolute -bottom-10 bg-popover text-popover-foreground px-3 py-1 rounded text-xs whitespace-nowrap"
              initial={{ opacity: 0, y: -10 }}
              animate={{
                opacity: hoveredStep === index ? 1 : 0,
                y: hoveredStep === index ? 0 : -10,
              }}
              transition={{ duration: 0.2 }}
            >
              {step.title}
            </motion.div>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 h-1 bg-muted mx-2 relative">
              <motion.div
                className="absolute top-0 left-0 h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: index < currentStep ? "100%" : "0%" }}
                transition={{ duration: 0.5 }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export function StepperContent() {
  const context = useContext(StepperContext);
  if (!context) throw new Error("StepperContent must be used within a Stepper");
  const { steps, currentStep } = context;

  return <div className="mt-8">{steps[currentStep].content}</div>;
}

export function StepperFooter({ onSubmit }: { onSubmit: () => void }) {
  const context = useContext(StepperContext);
  if (!context) throw new Error("StepperFooter must be used within a Stepper");
  const { steps, currentStep, setCurrentStep } = context;

  return (
    <div className="mt-8 flex justify-between">
      <Button
        variant="default"
        onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
        disabled={currentStep === 0}
      >
        Previous
      </Button>
      {currentStep === steps.length - 1 ? (
        <Button onClick={onSubmit} variant="default">
          Submit
        </Button>
      ) : (
        <Button
          variant="default"
          onClick={() =>
            setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
          }
        >
          Next
          <ChevronRight className="ml-1 w-4 h-4" />
        </Button>
      )}
    </div>
  );
}

export { StepperContext };
