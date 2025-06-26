"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, BarChart3, Monitor, Zap, Users } from "lucide-react";
import { Navbar } from "@/components/common/navbar";
import { EmpireFooter } from "@/components/common/empire-footer";
import { MinecartLCD } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ResponsiveWrapper } from "@/components/common/responsive-wrapper";
import { useNavigation } from "@/lib/hooks/use-navigation";
import PixelTransition from "@/components/ui/PixelTransition";
import Dither from "@/components/ui/Dither";

// Dashboard templates data
const dashboardTemplates = [
  {
    id: "business-analytics",
    title: "Business Analytics Dashboard",
    description: "Comprehensive business dashboard with revenue tracking, project management, and goal monitoring. Features dark mode optimized for financial data.",
    category: "Business",
    tags: ["Revenue", "Projects", "Goals"],
    href: "/templates/dashboard/business-analytics",
    theme: "Dark",
    features: [
      "Revenue tracking with charts",
      "Project status management", 
      "Goal progress monitoring",
      "Earnings overview",
      "Client status tracking"
    ],
    preview: "Dark theme with blue/green accents, perfect for financial and business data visualization"
  },
  {
    id: "sports-analytics", 
    title: "Sports Analytics Dashboard",
    description: "Athletic performance dashboard with behavior analysis, leadership metrics, and training data. Optimized for sports coaching and athlete management.",
    category: "Sports",
    tags: ["Athletics", "Performance", "Coaching"],
    href: "/templates/dashboard/sports-analytics", 
    theme: "Dark",
    features: [
      "Athlete behavior analysis",
      "Performance score tracking",
      "Leadership metrics",
      "Training progress",
      "Team management tools"
    ],
    preview: "Dark theme with purple/pink accents, designed for sports analytics and performance tracking"
  }
];

export default function DashboardPage() {
  const { navigateTo } = useNavigation();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ResponsiveWrapper>
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigateTo("/templates")}
                variant="outline"
                size="sm"
                className={cn("border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white", MinecartLCD.className)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                BACK TO TEMPLATES
              </Button>
              <div>
                <h1 className={cn("text-3xl font-bold text-gray-900", MinecartLCD.className)}>
                  AI DASHBOARD TEMPLATES
                </h1>
                <p className={cn("text-gray-600 mt-1", MinecartLCD.className)}>
                  COMPREHENSIVE ANALYTICS DASHBOARDS WITH DARK/LIGHT MODE SUPPORT
                </p>
              </div>
            </div>
          </div>

          {/* Dashboard Templates Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {dashboardTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group"
              >
                <PixelTransition
                  firstContent={
                    <Card className="h-full overflow-hidden bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-0">
                        {/* Template Preview */}
                        <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <BarChart3 className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                              <h3 className={cn("text-xl font-bold text-white mb-2", MinecartLCD.className)}>
                                {template.title}
                              </h3>
                              <div className="text-blue-400 text-sm">
                                {template.theme} Theme
                              </div>
                            </div>
                          </div>
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-blue-600 text-white">
                              {template.theme}
                            </Badge>
                          </div>
                        </div>
                        
                        {/* Template Info */}
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Monitor className="h-5 w-5 text-gray-600" />
                            <span className={cn("text-sm text-gray-600 uppercase", MinecartLCD.className)}>
                              {template.category} DASHBOARD
                            </span>
                          </div>
                          
                          <p className={cn("text-gray-700 text-sm mb-4 leading-relaxed", MinecartLCD.className)}>
                            {template.description}
                          </p>
                          
                          {/* Features List */}
                          <div className="mb-4">
                            <h4 className={cn("text-sm font-bold text-gray-900 mb-2", MinecartLCD.className)}>
                              KEY FEATURES:
                            </h4>
                            <ul className="space-y-1">
                              {template.features.slice(0, 3).map((feature, idx) => (
                                <li key={idx} className={cn("text-xs text-gray-600", MinecartLCD.className)}>
                                  • {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-5">
                            {template.tags.map(tag => (
                              <Badge key={tag} className="bg-gray-100 text-gray-700 text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          {/* View Template Button */}
                          <Button 
                            onClick={() => navigateTo(template.href)}
                            className={cn("w-full bg-gray-900 text-white hover:bg-gray-800", MinecartLCD.className)}
                          >
                            VIEW TEMPLATE
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  }
                  secondContent={
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className="absolute inset-0">
                        <Dither
                          waveColor={[0.2, 0.4, 0.8]}
                          disableAnimation={false}
                          enableMouseInteraction={true}
                          mouseRadius={0.3}
                          colorNum={4}
                          waveAmplitude={0.3}
                          waveFrequency={3}
                          waveSpeed={0.05}
                        />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <Button 
                          onClick={() => navigateTo(template.href)}
                          className={cn(
                            "bg-white text-gray-900 hover:bg-gray-100 hover:scale-105 hover:shadow-lg transition-all duration-300 px-6 py-3 text-lg font-bold group",
                            MinecartLCD.className
                          )}
                        >
                          VIEW DASHBOARD
                          <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </div>
                    </div>
                  }
                  gridSize={12}
                  pixelColor="#3b82f6"
                  animationStepDuration={0.4}
                  className="w-full h-full"
                />
              </motion.div>
            ))}
          </div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-lg mb-16"
          >
            <div className="text-center mb-8">
              <h2 className={cn("text-3xl font-bold text-white mb-4", MinecartLCD.className)}>
                DASHBOARD FEATURES
              </h2>
              <p className={cn("text-gray-300 max-w-2xl mx-auto", MinecartLCD.className)}>
                All dashboards include dark/light mode switching, responsive design, and comprehensive analytics
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Monitor className="h-8 w-8" />,
                  title: "DARK/LIGHT MODES",
                  description: "Toggle between themes with smooth transitions"
                },
                {
                  icon: <BarChart3 className="h-8 w-8" />,
                  title: "REAL-TIME CHARTS",
                  description: "Interactive data visualization components"
                },
                {
                  icon: <Zap className="h-8 w-8" />,
                  title: "RESPONSIVE DESIGN",
                  description: "Optimized for all screen sizes and devices"
                }
              ].map((feature, index) => (
                <Card key={index} className="bg-white/10 border-white/20 text-white">
                  <CardContent className="p-6 text-center">
                    <div className="text-blue-400 mb-4 flex justify-center">{feature.icon}</div>
                    <h3 className={cn("text-lg font-bold mb-2", MinecartLCD.className)}>
                      {feature.title}
                    </h3>
                    <p className={cn("text-gray-300 text-sm", MinecartLCD.className)}>
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <h2 className={cn("text-2xl font-bold text-gray-900 mb-4", MinecartLCD.className)}>
              READY TO BUILD YOUR DASHBOARD?
            </h2>
            <p className={cn("text-gray-600 mb-6 max-w-xl mx-auto", MinecartLCD.className)}>
              Choose from our professionally designed dashboard templates and customize them for your needs
            </p>
            <Button
              onClick={() => navigateTo("/templates")}
              className={cn("bg-orange-600 text-white hover:bg-orange-700 px-8 py-3", MinecartLCD.className)}
            >
              <Users className="mr-2 h-5 w-5" />
              EXPLORE ALL TEMPLATES
            </Button>
          </motion.div>
        </div>
      </ResponsiveWrapper>
      <EmpireFooter />
    </div>
  );
} 