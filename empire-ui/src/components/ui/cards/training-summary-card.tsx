"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Brain,
  Clock,
  Target,
  TrendingDown,
  Eye,
  Cpu,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TrainingSummaryCardProps {
  accuracy: number;
  loss: number;
  epoch: number;
  timeTaken: string;
  modelName: string;
  modelType: string;
  datasetUsed: string;
  onViewFullReport: () => void;
}

export const TrainingSummaryCard = ({
  accuracy,
  loss,
  epoch,
  timeTaken,
  modelName,
  modelType,
  datasetUsed,
  onViewFullReport,
}: TrainingSummaryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const chartData = Array.from({ length: 10 }, (_, i) => ({
    name: (i + 1) * 5,
    accuracy: Math.random() * 0.2 + 0.8,
    loss: Math.random() * 0.3,
  }));

  return (
    <Card
      className="w-full max-w-md mx-auto overflow-hidden bg-black text-white border-gray-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gray-300/10" />
        <CardTitle className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Brain className="w-6 h-6" />
          Training Summary
        </CardTitle>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5" />
            <span className="text-sm">Model: {modelName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5" />
            <span className="text-sm">Type: {modelType}</span>
          </div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            <span className="text-sm">Dataset: {datasetUsed}</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            <span className="text-sm">Accuracy: {accuracy.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5" />
            <span className="text-sm">Loss: {loss.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Clock className="w-5 h-5" />
            </motion.div>
            <span className="text-sm">Time: {timeTaken}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-md font-semibold text-white">
              Epoch: {epoch}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-48 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 255, 255, 0.1)"
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
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="white"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="loss"
                stroke="white"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={onViewFullReport}
          className="w-full text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
        >
          <Eye className="w-5 h-5 mr-2" />
          View Full Report
        </Button>
      </CardFooter>
    </Card>
  );
};
