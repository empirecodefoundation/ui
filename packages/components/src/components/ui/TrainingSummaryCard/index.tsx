// @ts-nocheck
"use client";

import { motion } from "framer-motion";

import { TrainingSummaryCard } from "@/components/core/training-summary-card";

export const TrainingSummaryCardExample = () => {
  const trainingSummaries = [
    {
      accuracy: 0.95,
      loss: 0.12,
      epoch: 50,
      timeTaken: "2h 34m",
      modelName: "Neural Network",
      modelType: "Neural Network",
      datasetUsed: "CIFAR-10",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Main content */}
      <main className={`p-8 transition-all duration-200 ease-in-out`}>
        <h2 className="text-3xl font-bold mb-8">Recent Training Sessions</h2>
        <div className="w-full max-w-md">
          {trainingSummaries.map((summary, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <TrainingSummaryCard
                accuracy={summary.accuracy}
                loss={summary.loss}
                epoch={summary.epoch}
                timeTaken={summary.timeTaken}
                modelName={summary.modelName}
                modelType={summary.modelType}
                datasetUsed={summary.datasetUsed}
                onViewFullReport={() =>
                  console.log(`View report for session ${index + 1}`)
                }
              />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};
