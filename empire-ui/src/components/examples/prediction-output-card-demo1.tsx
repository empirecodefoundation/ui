"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PredictionOutputCard } from "@/components/core/prediction-output-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  RefreshCwIcon,
  InfoIcon,
  FileTextIcon,
} from "lucide-react";

//replace with your logic to fetch the realtime data
const mockPrediction = (ticker: string) => {
  const basePrice = Math.random() * 1000 + 50;
  const data = Array.from({ length: 7 }, (_, i) => ({
    day: i + 1,
    price: basePrice + (Math.random() - 0.5) * 50,
  }));
  const lastPrice = data[data.length - 1].price;
  const firstPrice = data[0].price;
  const change = ((lastPrice - firstPrice) / firstPrice) * 100;

  return {
    ticker,
    currentPrice: firstPrice.toFixed(2),
    predictedPrice: lastPrice.toFixed(2),
    change: change.toFixed(2),
    data,
  };
};

export const PredictionOutputCardDemo1 = () => {
  const [ticker, setTicker] = useState("");
  const [prediction, setPrediction] = useState<ReturnType<
    typeof mockPrediction
  > | null>(null);

  const handlePredict = () => {
    if (ticker) {
      setPrediction(mockPrediction(ticker.toUpperCase()));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-600 to-gray-300 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          📈 Stock Price Predictor
        </motion.h1>

        <div className="mb-8">
          <Label htmlFor="ticker" className="text-lg mb-2 block">
            Enter Stock Ticker:
          </Label>
          <div className="flex gap-3">
            <Input
              id="ticker"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder-white/50"
              placeholder="e.g., AAPL"
            />
            <Button onClick={handlePredict}>Predict</Button>
            {prediction && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  onClick={() =>
                    setPrediction(mockPrediction(prediction.ticker))
                  }
                >
                  <RefreshCwIcon className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {prediction && (
            <motion.div
              key={prediction.ticker}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <PredictionOutputCard
                title={`${prediction.ticker} Stock Prediction`}
                confidenceLevel={85 + Math.random() * 10}
                onExport={() => console.log("Exporting prediction...")}
              >
                <div className="space-y-4">
                  {/* Header Information */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold">{prediction.ticker}</h2>
                      <p className="text-sm">
                        Current Price: ${prediction.currentPrice}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm">
                        Confidence Level: {(85 + Math.random() * 10).toFixed(2)}
                        %
                      </p>
                    </div>
                  </div>

                  {/* Prediction Information */}
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Predicted Price:</span>
                    <span className="text-2xl font-bold">
                      ${prediction.predictedPrice}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg">7-Day Change:</span>
                    <Badge
                      variant={
                        Number(prediction.change) >= 0
                          ? "default"
                          : "destructive"
                      }
                      className="text-lg"
                    >
                      {Number(prediction.change) >= 0 ? (
                        <ArrowUpIcon className="inline mr-1" />
                      ) : (
                        <ArrowDownIcon className="inline mr-1" />
                      )}
                      {prediction.change}%
                    </Badge>
                  </div>

                  {/* Line Chart */}
                  <div className="h-64 mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={prediction.data}>
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="price"
                          stroke={`${
                            Number(prediction.change) >= 0 ? "green" : "red"
                          }`}
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </PredictionOutputCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
