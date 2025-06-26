"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { LoadingProvider } from "@/components/core/loading-provider";
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Users, 
  Trophy, 
  Activity,
  Settings,
  MessageSquare,
  FileText,
  ArrowLeft,
  Sun,
  Moon,
  Search
} from "lucide-react";
import { MinecartLCD } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/lib/hooks/use-navigation";

// EQ Behavior data
const eqBehaviorData = [
  { name: "Arguing", percentage: 70, color: "stroke-purple-500", bgColor: "bg-purple-500" },
  { name: "Temper", percentage: 20, color: "stroke-pink-500", bgColor: "bg-pink-500" },
  { name: "Cooperation", percentage: 10, color: "stroke-yellow-500", bgColor: "bg-yellow-500" }
];

// Overall Athletes Score data points
const athleteScoreData = [
  { month: "JAN", value: 80 },
  { month: "FEB", value: 60 },
  { month: "MAR", value: 70 },
  { month: "APR", value: 50 },
  { month: "MAY", value: 60 },
  { month: "JUN", value: 45 },
  { month: "JUL", value: 55 },
  { month: "AUG", value: 50 },
  { month: "SEP", value: 65 },
  { month: "OCT", value: 70 },
  { month: "NOV", value: 55 },
  { month: "DEC", value: 45 }
];

// Grit chart data
const gritData = [60, 40, 80, 30, 70, 50, 90, 45, 75];

// Navigation items
const navItems = [
  { icon: BarChart3, label: "Dashboard", active: true },
  { icon: TrendingUp, label: "Statistics" },
  { icon: Users, label: "Team" },
  { icon: Target, label: "Assessments" },
  { icon: MessageSquare, label: "Chat" },
  { icon: Users, label: "Athletes" },
  { icon: FileText, label: "Reports" },
  { icon: Settings, label: "Settings" }
];

export default function SportsAnalyticsDemoPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { navigateTo } = useNavigation();

  return (
    <LoadingProvider>
      <div className={cn(
        "min-h-screen transition-all duration-300",
        isDarkMode ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-900",
        MinecartLCD.className
      )}>
        {/* Header */}
        <header className={cn(
          "p-6 border-b transition-colors duration-300",
          isDarkMode ? "border-slate-700 bg-slate-900" : "border-gray-200 bg-white"
        )}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4"
              >
                <Button
                  onClick={() => navigateTo("/templates/dashboard/sports-analytics")}
                  variant="outline"
                  size="sm"
                  className={cn(
                    "border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white transition-colors"
                  )}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  BACK TO TEMPLATE
                </Button>
                
                {/* Coach Profile */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    AS
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">Abubakar Shenazi</h2>
                    <p className="text-sm text-gray-400">theabubackathletic@gmail.com</p>
                    <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded mt-1 inline-block font-bold">
                      COACH
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl font-bold"
            >
              HITE EQ
            </motion.h1>
            
            <div className="flex items-center gap-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
              >
                {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                <span className="text-sm font-medium">
                  {isDarkMode ? "Dark" : "Light"} Mode
                </span>
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                  className="data-[state=checked]:bg-purple-600"
                />
              </motion.div>
              
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold">Dashboard</span>
                <Button variant="outline" size="sm" className="text-purple-400 border-purple-400">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
              "w-64 p-6 border-r transition-colors duration-300",
              isDarkMode ? "border-slate-700 bg-slate-900" : "border-gray-200 bg-white"
            )}
          >
            <nav className="space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200",
                    item.active
                      ? "bg-purple-600 text-white shadow-lg"
                      : isDarkMode
                      ? "hover:bg-slate-800 text-gray-300"
                      : "hover:bg-gray-100 text-gray-600"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.div>
              ))}
            </nav>
          </motion.aside>

          {/* Main Content */}
          <main className="flex-1 p-6">
            <div className="grid grid-cols-12 gap-6">
              {/* Athletes EQ Behavior Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="col-span-12 md:col-span-3"
              >
                <Card className={cn(
                  "border transition-colors duration-300",
                  isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
                )}>
                  <CardContent className="p-6">
                    <h3 className={cn(
                      "text-sm mb-6 font-medium",
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    )}>
                      Athletes EQ behavior
                    </h3>
                    
                    {/* Donut Chart */}
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="50"
                          stroke={isDarkMode ? "#374151" : "#e5e7eb"}
                          strokeWidth="12"
                          fill="none"
                        />
                        
                        {/* Arguing - 70% */}
                        <motion.circle
                          cx="64"
                          cy="64"
                          r="50"
                          stroke="#8b5cf6"
                          strokeWidth="12"
                          fill="none"
                          strokeDasharray="220 314"
                          strokeDashoffset="0"
                          initial={{ strokeDasharray: "0 314" }}
                          animate={{ strokeDasharray: "220 314" }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                        
                        {/* Temper - 20% */}
                        <motion.circle
                          cx="64"
                          cy="64"
                          r="50"
                          stroke="#ec4899"
                          strokeWidth="12"
                          fill="none"
                          strokeDasharray="63 314"
                          strokeDashoffset="-220"
                          initial={{ strokeDasharray: "0 314" }}
                          animate={{ strokeDasharray: "63 314" }}
                          transition={{ duration: 1, delay: 0.7 }}
                        />
                        
                        {/* Cooperation - 10% */}
                        <motion.circle
                          cx="64"
                          cy="64"
                          r="50"
                          stroke="#eab308"
                          strokeWidth="12"
                          fill="none"
                          strokeDasharray="31 314"
                          strokeDashoffset="-283"
                          initial={{ strokeDasharray: "0 314" }}
                          animate={{ strokeDasharray: "31 314" }}
                          transition={{ duration: 1, delay: 0.9 }}
                        />
                      </svg>
                      
                      {/* Center Labels */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-400">70%</div>
                          <div className="text-xs text-pink-400">20%</div>
                          <div className="text-xs text-yellow-400">10%</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Legend */}
                    <div className="space-y-2">
                      {eqBehaviorData.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <div className={cn("w-2 h-2 rounded-full", item.bgColor)} />
                          <span className={cn(
                            "text-sm",
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                          )}>
                            {item.name}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Overall Athletes Score Chart */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="col-span-12 md:col-span-6"
              >
                <Card className={cn(
                  "border transition-colors duration-300",
                  isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
                )}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className={cn(
                        "text-sm font-medium",
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      )}>
                        Overall Athletes Score
                      </h3>
                      <div className="flex gap-4 text-xs">
                        <span className={cn(isDarkMode ? "text-gray-400" : "text-gray-500")}>Daily</span>
                        <span className={cn(isDarkMode ? "text-gray-400" : "text-gray-500")}>Weekly</span>
                        <span className="text-purple-400 font-bold">Monthly</span>
                      </div>
                    </div>
                    
                    {/* Line Chart */}
                    <div className="h-32 relative mb-4">
                      <svg className="w-full h-full">
                        <defs>
                          <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.3"/>
                            <stop offset="100%" stopColor="#ec4899" stopOpacity="0"/>
                          </linearGradient>
                        </defs>
                        
                        <motion.path
                          d="M0,80 Q60,60 120,70 Q180,50 240,60 Q300,45 360,55 Q420,50 480,45"
                          stroke="#ec4899"
                          strokeWidth="3"
                          fill="url(#pinkGradient)"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 2, delay: 0.5 }}
                        />
                        
                        {/* Data Point */}
                        <motion.circle 
                          cx="450" 
                          cy="50" 
                          r="4" 
                          fill="#ec4899"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: 2.5 }}
                        />
                        
                        {/* Score Indicator */}
                        <motion.text
                          x="460"
                          y="45"
                          fill="#ec4899"
                          fontSize="14"
                          fontWeight="bold"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 2.5 }}
                        >
                          5%
                        </motion.text>
                      </svg>
                    </div>
                    
                    {/* Month Labels */}
                    <div className="flex justify-between text-xs text-gray-400">
                      {athleteScoreData.map(item => (
                        <span key={item.month}>{item.month}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Leadership & Positive Self Talk */}
              <div className="col-span-12 md:col-span-3 space-y-6">
                {/* Leadership Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Card className={cn(
                    "border transition-colors duration-300",
                    isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
                  )}>
                    <CardContent className="p-6">
                      <h3 className={cn(
                        "text-sm font-medium mb-4",
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      )}>
                        Leadership
                      </h3>
                      
                      <div className="h-20 relative">
                        <svg className="w-full h-full">
                          <motion.path
                            d="M0,40 Q60,20 120,30 Q180,15 240,25 Q300,20 360,25"
                            stroke="#ec4899"
                            strokeWidth="2"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: 1 }}
                          />
                          
                          {/* Data Points */}
                          {[
                            { x: 50, y: 30 },
                            { x: 150, y: 20 },
                            { x: 250, y: 25 }
                          ].map((point, index) => (
                            <motion.circle
                              key={index}
                              cx={point.x}
                              cy={point.y}
                              r="3"
                              fill="#ec4899"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.3, delay: 1.5 + index * 0.2 }}
                            />
                          ))}
                        </svg>
                        
                        <div className="absolute top-0 right-0">
                          <span className="text-purple-400 text-lg font-bold">$74</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                {/* Positive Self Talk */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Card className={cn(
                    "border transition-colors duration-300",
                    isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
                  )}>
                    <CardContent className="p-6 text-center">
                      <h3 className={cn(
                        "text-sm font-medium mb-4",
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      )}>
                        Positive Self Talk
                      </h3>
                      
                      <div className="relative w-20 h-20 mx-auto">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="40"
                            cy="40"
                            r="30"
                            stroke={isDarkMode ? "#374151" : "#e5e7eb"}
                            strokeWidth="8"
                            fill="none"
                          />
                          <motion.circle
                            cx="40"
                            cy="40"
                            r="30"
                            stroke="#ec4899"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray="135 188"
                            strokeDashoffset="0"
                            initial={{ strokeDasharray: "0 188" }}
                            animate={{ strokeDasharray: "135 188" }}
                            transition={{ duration: 1, delay: 1.2 }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">72%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Bottom Row - Grit, Coach Ability, Overall HITE */}
              <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Grit */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Card className={cn(
                    "border transition-colors duration-300",
                    isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
                  )}>
                    <CardContent className="p-6">
                      <h3 className={cn(
                        "text-sm font-medium mb-4",
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      )}>
                        Grit
                      </h3>
                      
                      <div className="h-20 flex items-end justify-between mb-4">
                        {gritData.map((height, i) => (
                          <motion.div
                            key={i}
                            className="w-3 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t"
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ duration: 0.8, delay: 1.5 + i * 0.1 }}
                          />
                        ))}
                        <motion.div 
                          className="w-3 h-3 bg-purple-500 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: 2.5 }}
                        />
                      </div>
                      
                      <div className={cn(
                        "text-xs",
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      )}>
                        300
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                {/* Coach Ability */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Card className={cn(
                    "border transition-colors duration-300",
                    isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
                  )}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className={cn(
                          "text-sm font-medium",
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        )}>
                          Coach Ability
                        </h3>
                        <motion.div 
                          className="bg-yellow-400 text-black text-xs px-2 py-1 rounded font-bold"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: 1.8 }}
                        >
                          24.3
                        </motion.div>
                      </div>
                      
                      <div className="text-yellow-400 text-lg font-bold mb-4">Brilliant</div>
                      
                      <div className="h-16 relative">
                        <svg className="w-full h-full">
                          <motion.path
                            d="M0,30 Q50,10 100,20 Q150,15 200,18 Q250,12 300,10"
                            stroke="#eab308"
                            strokeWidth="2"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: 1.5 }}
                          />
                        </svg>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                {/* Overall HITE */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <Card className={cn(
                    "border transition-colors duration-300",
                    isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
                  )}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className={cn(
                          "text-sm font-medium",
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        )}>
                          overall HITE
                        </h3>
                        <motion.div 
                          className="bg-green-400 text-black text-xs px-2 py-1 rounded font-bold"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: 2 }}
                        >
                          +24.3%
                        </motion.div>
                      </div>
                      
                      <div className="text-green-400 text-lg font-bold mb-4">2,900</div>
                      
                      <div className="h-16 relative">
                        <svg className="w-full h-full">
                          <motion.path
                            d="M0,40 Q50,30 100,35 Q150,25 200,28 Q250,22 300,20"
                            stroke="#22c55e"
                            strokeWidth="2"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: 1.8 }}
                          />
                        </svg>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </LoadingProvider>
  );
} 