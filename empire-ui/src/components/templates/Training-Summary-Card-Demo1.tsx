"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Menu,
  Settings,
  User,
  BarChart,
  Database,
  Grid,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrainingSummaryCard } from "@/components/ui/cards/training-summary-card";

export const TrainingSummaryCardDemo1 = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const sidebarItems = [
    { icon: <Grid className="w-5 h-5" />, label: "Dashboard" },
    { icon: <BarChart className="w-5 h-5" />, label: "Analytics" },
    { icon: <Database className="w-5 h-5" />, label: "Datasets" },
    { icon: <Settings className="w-5 h-5" />, label: "Settings" },
  ];

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
    {
      accuracy: 0.95,
      loss: 0.12,
      epoch: 50,
      timeTaken: "2h 34m",
      modelName: "Neural Network",
      modelType: "Neural Network",
      datasetUsed: "CIFAR-10",
    },
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
    <div className="min-h-screen bg-black/90 text-white">
      {/* Header */}
      <header className="bg-black p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold">AI Training Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="w-6 h-6" />
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          className={`bg-black w-64 p-4 fixed h-full transition-all duration-200 ease-in-out ${
            isSidebarOpen ? "left-0" : "-left-64"
          }`}
          initial={false}
          animate={{ x: isSidebarOpen ? 0 : -1 }}
        >
          <nav>
            <ul className="space-y-4">
              {sidebarItems.map((item, index) => (
                <li key={index}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-lg"
                  >
                    {item.icon}
                    <span className="ml-4">{item.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </motion.aside>

        {/* Main content */}
        <main
          className={`flex-1 p-8 transition-all duration-200 ease-in-out ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          <h2 className="text-3xl font-bold mb-8">Recent Training Sessions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </div>
  );
};
