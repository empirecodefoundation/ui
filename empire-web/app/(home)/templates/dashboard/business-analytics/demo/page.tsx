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
  DollarSign, 
  Users, 
  Target, 
  Settings, 
  Bell,
  Search,
  Calendar,
  FileText,
  ArrowLeft,
  Sun,
  Moon
} from "lucide-react";
import { MinecartLCD } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/lib/hooks/use-navigation";

// Revenue data for the chart
const revenueData = [30, 45, 25, 60, 40, 35, 50, 65, 30, 45, 55, 70];

// Projects data
const projectsData = [
  { name: "Not Started", count: 6, color: "bg-gray-500", percentage: 18.75 },
  { name: "In Progress", count: 4, color: "bg-blue-500", percentage: 12.5 },
  { name: "Done", count: 12, color: "bg-green-500", percentage: 37.5 },
  { name: "Deadline", count: 10, color: "bg-red-500", percentage: 31.25 }
];

// Goals data
const goalsData = [
  { label: "4 Startups", progress: 84, color: "bg-blue-500" },
  { label: "MRR Reach to $5000", progress: 52, color: "bg-purple-500" },
  { label: "Build a Company", progress: 36, color: "bg-blue-500" },
  { label: "Start Trading", progress: 11, color: "bg-gray-500" }
];

// Navigation items
const navItems = [
  { icon: BarChart3, label: "Dashboard", active: true },
  { icon: Users, label: "Team" },
  { icon: Users, label: "Clients" },
  { icon: Target, label: "Decision Making" },
  { icon: DollarSign, label: "Finance" },
  { icon: TrendingUp, label: "Data Analysis" },
  { icon: Settings, label: "AI Advisor" },
  { icon: Users, label: "Users" },
  { icon: Bell, label: "Settings" },
  { icon: Bell, label: "Notifications" }
];

export default function BusinessAnalyticsDemoPage() {
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
                  onClick={() => navigateTo("/templates/dashboard/business-analytics")}
                  variant="outline"
                  size="sm"
                  className={cn(
                    "border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white transition-colors"
                  )}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  BACK TO TEMPLATE
                </Button>
                <h1 className="text-2xl font-bold">LOGO HERE</h1>
              </motion.div>
              
              <nav className="hidden md:flex items-center">
                <span className="text-lg font-semibold">Dashboard</span>
              </nav>
            </div>
            
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
                  className="data-[state=checked]:bg-blue-600"
                />
              </motion.div>
              
              <div className="text-sm">
                <span className="text-blue-400">Goals 2024</span>
                <div className="w-24 bg-gray-600 rounded-full h-2 mt-1">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "70%" }}></div>
                </div>
                <span className="text-xs text-gray-400">70%</span>
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
                      ? "bg-blue-600 text-white shadow-lg"
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
              {/* Total Revenue Card */}
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
                    <div className="mb-4">
                      <h3 className={cn(
                        "text-sm mb-2 font-medium",
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      )}>
                        TOTAL REVENUE
                      </h3>
                      <div className="text-3xl font-bold mb-1">$136,265</div>
                      <div className="text-lg font-bold text-green-400">+$6,325</div>
                      <div className={cn(
                        "text-xs",
                        isDarkMode ? "text-gray-500" : "text-gray-400"
                      )}>
                        16.3% vs last month
                      </div>
                    </div>
                    
                    {/* Mini Revenue Chart */}
                    <div className="h-16 flex items-end justify-between gap-1">
                      {revenueData.map((height, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                          className="w-3 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t"
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Earning Overview Chart */}
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
                        EARNING OVERVIEW
                      </h3>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span className="text-xs text-gray-400">Cost</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="text-xs text-gray-400">Profit</span>
                        </div>
                        <select className={cn(
                          "text-xs px-2 py-1 rounded border-0 outline-none",
                          isDarkMode ? "bg-slate-700 text-white" : "bg-gray-100 text-gray-900"
                        )}>
                          <option>Weekly</option>
                          <option>Monthly</option>
                          <option>Yearly</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 mb-6">
                      <div className="bg-blue-600 px-4 py-2 rounded-lg text-white">
                        <div className="text-sm opacity-80">Cost</div>
                        <div className="font-bold">$24,342</div>
                      </div>
                      <div className="bg-green-600 px-4 py-2 rounded-lg text-white">
                        <div className="text-sm opacity-80">Profit</div>
                        <div className="font-bold">$546</div>
                      </div>
                    </div>
                    
                    {/* Chart Area */}
                    <div className="h-32 relative">
                      <svg className="w-full h-full">
                        <defs>
                          <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
                          </linearGradient>
                          <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
                          </linearGradient>
                        </defs>
                        
                        <motion.path
                          d="M0,80 Q60,60 120,70 T240,50 T360,60 T480,45 T600,55"
                          stroke="#10b981"
                          strokeWidth="3"
                          fill="url(#gradient1)"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 2, delay: 0.5 }}
                        />
                        <motion.path
                          d="M0,100 Q60,80 120,90 T240,70 T360,80 T480,65 T600,75"
                          stroke="#3b82f6"
                          strokeWidth="3"
                          fill="url(#gradient2)"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 2, delay: 0.7 }}
                        />
                      </svg>
                    </div>
                    
                    {/* Chart Labels */}
                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Goals 2024 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="col-span-12 md:col-span-3"
              >
                <Card className={cn(
                  "border transition-colors duration-300",
                  isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
                )}>
                  <CardContent className="p-6">
                    <h3 className={cn(
                      "text-sm font-medium mb-6",
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    )}>
                      GOALS 2024
                    </h3>
                    
                    <div className="space-y-6">
                      {goalsData.map((goal, index) => (
                        <div key={index}>
                          <div className="flex justify-between text-sm mb-2">
                            <span className={cn(
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            )}>
                              {goal.label}
                            </span>
                            <span className="text-blue-400 font-semibold">
                              {goal.progress}%
                            </span>
                          </div>
                          <div className={cn(
                            "w-full rounded-full h-2",
                            isDarkMode ? "bg-gray-700" : "bg-gray-200"
                          )}>
                            <motion.div
                              className={cn("h-2 rounded-full", goal.color)}
                              initial={{ width: 0 }}
                              animate={{ width: `${goal.progress}%` }}
                              transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Projects Status */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="col-span-12 md:col-span-4"
              >
                <Card className={cn(
                  "border transition-colors duration-300",
                  isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
                )}>
                  <CardContent className="p-6">
                    <h3 className={cn(
                      "text-sm font-medium mb-6",
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    )}>
                      PROJECTS
                    </h3>
                    
                    <div className="space-y-4 mb-6">
                      {projectsData.map((project, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                          className="flex justify-between items-center"
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn("w-2 h-2 rounded-full", project.color)} />
                            <span className={cn(
                              "text-sm",
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            )}>
                              {project.name}
                            </span>
                          </div>
                          <span className="text-sm font-bold">{project.count}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Donut Chart */}
                    <div className="flex justify-center">
                      <div className="relative w-32 h-32">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="64"
                            cy="64"
                            r="50"
                            stroke={isDarkMode ? "#374151" : "#e5e7eb"}
                            strokeWidth="12"
                            fill="none"
                          />
                          {projectsData.map((project, index) => {
                            const circumference = 2 * Math.PI * 50;
                            const strokeDasharray = `${(project.percentage / 100) * circumference} ${circumference}`;
                            const strokeDashoffset = -projectsData
                              .slice(0, index)
                              .reduce((acc, p) => acc + (p.percentage / 100) * circumference, 0);
                            
                            return (
                              <motion.circle
                                key={index}
                                cx="64"
                                cy="64"
                                r="50"
                                stroke={project.color.replace('bg-', '#').replace('gray-500', '6b7280').replace('blue-500', '3b82f6').replace('green-500', '10b981').replace('red-500', 'ef4444')}
                                strokeWidth="12"
                                fill="none"
                                strokeDasharray={strokeDasharray}
                                strokeDashoffset={strokeDashoffset}
                                initial={{ strokeDasharray: `0 ${circumference}` }}
                                animate={{ strokeDasharray }}
                                transition={{ duration: 1, delay: 0.8 + index * 0.2 }}
                              />
                            );
                          })}
                        </svg>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Client Status Chart */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="col-span-12 md:col-span-8"
              >
                <Card className={cn(
                  "border transition-colors duration-300",
                  isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
                )}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className={cn(
                        "text-sm font-medium",
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      )}>
                        CLIENTS STATUS
                      </h3>
                      <div className="flex items-center gap-6 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <span className="text-gray-400">Not Paid</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                          <span className="text-gray-400">In Progress</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span className="text-gray-400">Paid</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Chart placeholder */}
                    <div className="h-48 relative">
                      <svg className="w-full h-full">
                        <motion.path
                          d="M0,150 Q100,100 200,120 T400,90 T600,110 T800,80"
                          stroke="#ec4899"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="4,4"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 2, delay: 1 }}
                        />
                        <motion.path
                          d="M0,170 Q100,140 200,160 T400,130 T600,150 T800,120"
                          stroke="#8b5cf6"
                          strokeWidth="2"
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 2, delay: 1.2 }}
                        />
                        <motion.path
                          d="M0,180 Q100,160 200,170 T400,150 T600,160 T800,140"
                          stroke="#06b6d4"
                          strokeWidth="2"
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 2, delay: 1.4 }}
                        />
                      </svg>
                      
                      {/* Chart Grid */}
                      <div className="absolute inset-0 flex flex-col justify-between text-xs text-gray-400">
                        <div className="flex justify-between">
                          <span>Mon</span>
                          <span>Tue</span>
                          <span>Wed</span>
                          <span>Thu</span>
                          <span>Fri</span>
                          <span>Sat</span>
                          <span>Sun</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Decision & Decisions Priority */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="col-span-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Decisions */}
                  <Card className={cn(
                    "border transition-colors duration-300",
                    isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
                  )}>
                    <CardContent className="p-6">
                      <h3 className={cn(
                        "text-sm font-medium mb-4",
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      )}>
                        DECISIONS
                      </h3>
                      
                      <div className="space-y-4">
                        <div className={cn(
                          "p-4 rounded-lg border",
                          isDarkMode ? "bg-slate-700 border-slate-600" : "bg-blue-50 border-blue-200"
                        )}>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-xs text-green-500 font-medium">No Hurry</span>
                          </div>
                          <p className="text-sm">
                            Have a meeting with CEO of Samsung
                          </p>
                        </div>
                        
                        <div className={cn(
                          "p-4 rounded-lg border",
                          isDarkMode ? "bg-slate-700 border-slate-600" : "bg-green-50 border-green-200"
                        )}>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-xs text-green-500 font-medium">Business Decision to make</span>
                          </div>
                          <p className="text-sm">
                            Get payment of the new startup of a SaaS platform for CEOs and Entrepreneurs
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Decisions Priority */}
                  <Card className={cn(
                    "border transition-colors duration-300",
                    isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
                  )}>
                    <CardContent className="p-6">
                      <h3 className={cn(
                        "text-sm font-medium mb-4",
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      )}>
                        DECISIONS PRIORITY
                      </h3>
                      
                      <div className="space-y-4">
                        {[5, 8, 3, 6, 4, 7, 9].map((height, index) => (
                          <motion.div
                            key={index}
                            initial={{ height: 0 }}
                            animate={{ height: `${height * 8}px` }}
                            transition={{ duration: 0.8, delay: 1.2 + index * 0.1 }}
                            className="flex items-end gap-2"
                          >
                            <div className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t"></div>
                            <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </div>
          </main>
        </div>
      </div>
    </LoadingProvider>
  );
} 