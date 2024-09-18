// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DatasetOverviewCard } from "@/components/core/datset-overview-card";

const datasets = [
  {
    datasetName: "Healthcare Analytics",
    size: "1.2M records",
    numberOfFeatures: 15,
    featureData: [
      { name: "Numerical", value: 10 },
      { name: "Categorical", value: 4 },
      { name: "Text", value: 1 },
    ],
    sampleData: [
      { name: "Heart Rate", value: 78 },
      { name: "Blood Pressure", value: 120 },
      { name: "Cholesterol", value: 180 },
    ],
  },
  {
    datasetName: "Sales Forecasting",
    size: "900k records",
    numberOfFeatures: 8,
    featureData: [
      { name: "Numerical", value: 6 },
      { name: "Categorical", value: 2 },
    ],
    sampleData: [
      { name: "Sales", value: 1200 },
      { name: "Profit", value: 450 },
      { name: "Growth Rate", value: 3.4 },
    ],
  },
  {
    datasetName: "Customer Segmentation",
    size: "300k records",
    numberOfFeatures: 10,
    featureData: [
      { name: "Numerical", value: 7 },
      { name: "Categorical", value: 3 },
    ],
    sampleData: [
      { name: "Spending Score", value: 90 },
      { name: "Annual Income", value: 75 },
      { name: "Age", value: 35 },
    ],
  },
];

export const DatasetOverviewCardDemo1 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleViewDataset = () => {
    console.log("Navigating to dataset details...");
    // Add navigation to the dataset's detailed page here
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === datasets.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? datasets.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 10000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="min-h-screen bg-black text-white p-8 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            backgroundImage: [
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              "radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)",
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Page Header */}
        <header className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="inline-block"
          >
            <h1 className="pb-2 text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-600">
              AI-Powered Data Insights
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-2xl text-gray-300"
          >
            Unlock the power of your datasets with advanced analytics
          </motion.p>
        </header>

        <main className="relative max-w-4xl mx-auto">
          {/* Dataset Cards Carousel */}
          <div className="overflow-hidden">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={{
                enter: (direction) => ({
                  x: direction > 0 ? 1000 : -1000,
                  opacity: 0,
                  scale: 0.8,
                  y: 0,
                }),
                center: {
                  zIndex: 1,
                  x: 0,
                  opacity: 1,
                  scale: 1,
                  y: 0,
                },
                exit: (direction) => ({
                  zIndex: 0,
                  x: direction < 0 ? 1000 : -1000,
                  opacity: 0,
                  scale: 0.8,
                  y: 0,
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 200, damping: 70 },
                opacity: { duration: 1 },
                scale: { duration: 1 },
              }}
              className="w-full"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  nextSlide();
                } else if (swipe > swipeConfidenceThreshold) {
                  prevSlide();
                }
              }}
            >
              <div className="flex justify-center items-center">
                <DatasetOverviewCard
                  {...datasets[currentIndex]}
                  onViewDataset={handleViewDataset}
                />
              </div>
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <motion.div
            className="absolute top-1/2 left-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              onClick={prevSlide}
              variant="outline"
              size="icon"
              className="rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </motion.div>
          <motion.div
            className="absolute top-1/2 right-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              onClick={nextSlide}
              variant="outline"
              size="icon"
              className="rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </motion.div>
        </main>

        {/* Activity Indicator */}
        <motion.div
          className="fixed bottom-8 right-8 bg-white/10 backdrop-blur-lg rounded-full p-4 shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Activity className="h-6 w-6 animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
};

// Swipe handler
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: any, velocity: any) => {
  return Math.abs(offset) * velocity;
};
