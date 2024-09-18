"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PredictionOutputCard } from "@/components/core/prediction-output-card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Moon, Sun, ChevronLeft, ChevronRight } from "lucide-react";

const predictionData = [
  {
    title: "Image Classification",
    confidenceLevel: 87.5,
    items: ["Cat", "Dog", "Bird", "Tree", "Car"],
  },
  {
    title: "Sentiment Analysis",
    confidenceLevel: 92.3,
    items: [
      "Positive",
      "Neutral",
      "Negative",
      "Very Positive",
      "Very Negative",
    ],
  },
  {
    title: "Object Detection",
    confidenceLevel: 78.9,
    items: ["Person", "Bicycle", "Car", "Traffic Light", "Stop Sign"],
  },
];

export default function SuperPrettyExample() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeCard, setActiveCard] = useState(0);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleExport = () => {
    console.log("exporting");
  };

  const nextCard = () =>
    setActiveCard((prev) => (prev + 1) % predictionData.length);
  const prevCard = () =>
    setActiveCard(
      (prev) => (prev - 1 + predictionData.length) % predictionData.length
    );

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
        <div className="absolute inset-0 overflow-hidden">
          <div className="jumbo absolute -inset-[10px] opacity-50"></div>
        </div>
        <div className="relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
          <nav className="w-full max-w-4xl mx-auto flex justify-between items-center mb-8">
            <motion.h1
              className="text-4xl font-bold text-primary"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              AI Prediction Showcase
            </motion.h1>
            <Button variant="outline" size="icon" onClick={toggleTheme}>
              {theme === "light" ? (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              )}
            </Button>
          </nav>

          <div className="w-full max-w-4xl mx-auto flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevCard}
              className="mr-4"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCard}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
              >
                <PredictionOutputCard
                  title={predictionData[activeCard].title}
                  confidenceLevel={predictionData[activeCard].confidenceLevel}
                  onExport={handleExport}
                >
                  <ScrollArea className="h-[200px] rounded-md border p-4">
                    <h4 className="font-semibold mb-2">Results:</h4>
                    <ul className="space-y-2">
                      {predictionData[activeCard].items.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-center justify-between"
                        >
                          <span>{item}</span>
                          <Badge variant={idx === 0 ? "default" : "secondary"}>
                            {(Math.random() * 100).toFixed(2)}%
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </PredictionOutputCard>
              </motion.div>
            </AnimatePresence>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextCard}
              className="ml-4"
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-lg text-muted-foreground mb-4">
              Swipe through different AI predictions. Export to see a surprise!
            </p>
            <div className="flex justify-center space-x-2">
              {predictionData.map((_, index) => (
                <Button
                  key={index}
                  variant={index === activeCard ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCard(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .jumbo {
          background-image: linear-gradient(
            to bottom right,
            var(--primary-light),
            var(--primary-dark)
          );
          filter: blur(70px);
          z-index: 0;
        }
        :root {
          --primary-light: #ff7e5f;
          --primary-dark: #feb47b;
        }
        .dark {
          --primary-light: #4a00e0;
          --primary-dark: #8e2de2;
        }
      `}</style>
    </div>
  );
}
