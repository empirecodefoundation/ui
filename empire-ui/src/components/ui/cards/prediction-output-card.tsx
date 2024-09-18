"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Download, Sparkles } from "lucide-react";

interface PredictionOutputCardProps {
  title: string;
  confidenceLevel: number;
  onExport: () => void;
  children: React.ReactNode;
}

export const PredictionOutputCard: React.FC<PredictionOutputCardProps> = ({
  title,
  confidenceLevel,
  onExport,
  children,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="w-full max-w-md mx-auto overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary to-secondary p-6">
          <CardTitle className="flex items-center justify-between text-primary-foreground">
            <span>{title}</span>
            <Sparkles className="w-6 h-6" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 bg-card">
          <div className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Confidence Level
            </h3>
            <div className="flex items-center justify-between mb-2">
              <Progress value={confidenceLevel} className="w-4/5" />
              <span className="text-sm font-bold">
                {confidenceLevel.toFixed(2)}%
              </span>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {children}
          </motion.div>
          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button onClick={onExport} className="w-full" variant="default">
              <Download className="w-4 h-4 mr-2" />
              Export Results
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
