"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Eye, File, List, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DatasetOverviewCardProps {
  datasetName: string;
  size: string;
  numberOfFeatures: number;
  featureData: Array<{ name: string; value: number }>;
  sampleData: Array<{ name: string; value: number }>;
  onViewDataset: () => void;
}

const COLORS = ["#5e5e5c", "#474744", "#878783", "#5e5e5c", "#2b2b29"];

export const DatasetOverviewCard = ({
  datasetName,
  size,
  numberOfFeatures,
  featureData,
  sampleData,
  onViewDataset,
}: DatasetOverviewCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [expandedChart, setExpandedChart] = useState<
    "feature" | "sample" | null
  >(null);

  return (
    <Card
      className="w-full max-w-lg mx-auto bg-black text-white rounded-2xl shadow-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={false}
        animate={isHovered ? { height: "auto" } : { height: "100%" }}
        transition={{ duration: 0.3 }}
      >
        <CardHeader className="relative">
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-white opacity-10 rounded-t-2xl"
            initial={false}
            animate={isHovered ? { scaleY: 1.1 } : { scaleY: 1 }}
            transition={{ duration: 0.3 }}
          />
          <CardTitle className="text-2xl font-bold my-2 flex items-center gap-2 z-10 relative">
            <File className="w-6 h-6" />
            {datasetName}
          </CardTitle>
          <motion.div
            className="flex justify-between items-center text-sm pt-1 z-10 relative"
            initial={false}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <List className="w-5 h-5" />
              <span>Size: {size}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Features: {numberOfFeatures}</span>
            </div>
          </motion.div>
        </CardHeader>
        <CardContent className="mt-1 p-3 space-y-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={false}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {/* Feature Data Chart */}
            <motion.div
              className="relative"
              initial={false}
              animate={
                expandedChart === "feature" ? { height: 300 } : { height: 150 }
              }
            >
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-0 right-0 z-10"
                onClick={() =>
                  setExpandedChart(
                    expandedChart === "feature" ? null : "feature"
                  )
                }
              >
                {expandedChart === "feature" ? <ChevronUp /> : <ChevronDown />}
              </Button>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={featureData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={expandedChart === "feature" ? 100 : 50}
                    label={expandedChart === "feature"}
                  >
                    {featureData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(256, 256, 256, 0.7)",
                      border: "none",
                      borderRadius: "30px",
                      color: "white",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
            {/* Sample Data Bar Chart */}
            <motion.div
              className="relative"
              initial={false}
              animate={
                expandedChart === "sample" ? { height: 300 } : { height: 150 }
              }
            >
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-0 right-0 z-10"
                onClick={() =>
                  setExpandedChart(expandedChart === "sample" ? null : "sample")
                }
              >
                {expandedChart === "sample" ? <ChevronUp /> : <ChevronDown />}
              </Button>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sampleData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255, 255, 255, 0.4)"
                  />
                  <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.7)" />
                  <YAxis stroke="rgba(255, 255, 255, 0.7)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      border: "none",
                      borderRadius: "4px",
                      color: "white",
                    }}
                  />
                  <Bar dataKey="value" fill="white" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </motion.div>
        </CardContent>
        <CardFooter className="mt-4">
          <Button
            onClick={onViewDataset}
            className="w-full bg-white text-black font-semibold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-white/90"
          >
            <Eye className="w-5 h-5 mr-2" />
            View Dataset
          </Button>
        </CardFooter>
      </motion.div>
    </Card>
  );
};
