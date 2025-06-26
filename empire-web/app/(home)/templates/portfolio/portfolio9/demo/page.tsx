"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Palette, Lightbulb, Star, Brush, Award, Users } from "lucide-react";
import { MinecartLCD } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/lib/hooks/use-navigation";
import { LoadingProvider } from "@/components/core/loading-provider";

export default function Portfolio9Demo() {
  const { navigateTo } = useNavigation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100
      }
    }
  };

  return (
    <LoadingProvider>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-orange-600 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Button
            onClick={() => navigateTo("/templates/portfolio/portfolio9")}
            variant="outline"
            size="sm"
            className={cn("border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white", MinecartLCD.className)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            BACK TO TEMPLATE
          </Button>
          
          <div className={cn("text-lg font-bold text-orange-600", MinecartLCD.className)}>
            CREATIVE DESIGNER PORTFOLIO
          </div>
          
          <Button
            onClick={() => window.open("/templates/portfolio/portfolio9", "_blank")}
            variant="outline"
            size="sm"
            className={cn("border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white", MinecartLCD.className)}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            VIEW CODE
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1 
                variants={itemVariants}
                className={cn("text-6xl md:text-7xl font-bold text-amber-900 mb-6", MinecartLCD.className)}
              >
                MAYA PATEL
              </motion.h1>
              <motion.p 
                variants={itemVariants}
                className={cn("text-2xl text-amber-700 mb-8", MinecartLCD.className)}
              >
                CREATIVE DESIGNER & BRAND STRATEGIST
              </motion.p>
              
              <motion.div 
                variants={itemVariants}
                className="bg-white p-8 rounded-xl max-w-4xl mx-auto border border-amber-200 mb-8 shadow-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    className="space-y-2"
                  >
                    <div className={cn("text-4xl font-bold text-amber-600", MinecartLCD.className)}>50+</div>
                    <div className={cn("text-sm text-gray-600", MinecartLCD.className)}>BRANDS TRANSFORMED</div>
                    <Palette className="h-8 w-8 text-amber-600 mx-auto" />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: -5 }}
                    className="space-y-2"
                  >
                    <div className={cn("text-4xl font-bold text-orange-600", MinecartLCD.className)}>200+</div>
                    <div className={cn("text-sm text-gray-600", MinecartLCD.className)}>CREATIVE PROJECTS</div>
                    <Lightbulb className="h-8 w-8 text-orange-600 mx-auto" />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    className="space-y-2"
                  >
                    <div className={cn("text-4xl font-bold text-red-600", MinecartLCD.className)}>5+</div>
                    <div className={cn("text-sm text-gray-600", MinecartLCD.className)}>YEARS EXPERIENCE</div>
                    <Star className="h-8 w-8 text-red-600 mx-auto" />
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button className={cn("bg-amber-600 text-white hover:bg-amber-700", MinecartLCD.className)}>
                  <Palette className="mr-2 h-4 w-4" />
                  VIEW PORTFOLIO
                </Button>
                <Button variant="outline" className={cn("border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white", MinecartLCD.className)}>
                  <Brush className="mr-2 h-4 w-4" />
                  START PROJECT
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className={cn("text-4xl font-bold text-center mb-12 text-amber-900", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              FEATURED PROJECTS
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "BRAND IDENTITY",
                  client: "Tech Startup",
                  category: "Logo & Visual Identity",
                  color: "from-amber-400 to-yellow-400",
                  year: "2024"
                },
                {
                  title: "WEB DESIGN", 
                  client: "Fashion Brand",
                  category: "UI/UX Design",
                  color: "from-orange-400 to-red-400",
                  year: "2024"
                },
                {
                  title: "PACKAGING",
                  client: "Organic Foods",
                  category: "Product Design",
                  color: "from-red-400 to-pink-400",
                  year: "2023"
                },
                {
                  title: "DIGITAL CAMPAIGN",
                  client: "Non-Profit",
                  category: "Social Media Design",
                  color: "from-yellow-400 to-amber-400",
                  year: "2023"
                },
                {
                  title: "MOBILE APP",
                  client: "Food Delivery",
                  category: "App Interface",
                  color: "from-orange-400 to-amber-400",
                  year: "2024"
                },
                {
                  title: "PRINT DESIGN",
                  client: "Art Gallery",
                  category: "Exhibition Materials",
                  color: "from-red-400 to-orange-400",
                  year: "2023"
                }
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, rotateZ: 2 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className={`h-48 bg-gradient-to-br ${project.color} relative`}>
                      <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                        <Palette className="h-12 w-12 text-white/80" />
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/90 text-gray-800">
                          {project.year}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className={cn("text-lg font-bold text-amber-900 mb-2", MinecartLCD.className)}>
                        {project.title}
                      </h3>
                      <p className={cn("text-amber-700 text-sm mb-1", MinecartLCD.className)}>
                        {project.client}
                      </p>
                      <p className={cn("text-gray-600 text-xs", MinecartLCD.className)}>
                        {project.category}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 px-6 bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className={cn("text-4xl font-bold text-center mb-12 text-amber-900", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              CREATIVE SERVICES
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "BRAND IDENTITY", icon: <Palette className="h-8 w-8" />, desc: "Logo & Visual Systems" },
                { title: "WEB DESIGN", icon: <Lightbulb className="h-8 w-8" />, desc: "UI/UX & Development" },
                { title: "PRINT DESIGN", icon: <Brush className="h-8 w-8" />, desc: "Marketing Materials" },
                { title: "STRATEGY", icon: <Star className="h-8 w-8" />, desc: "Brand Consulting" }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, rotateY: 10 }}
                >
                  <Card className="bg-white border-amber-200 p-6 text-center hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="text-amber-600 mb-4 flex justify-center">{service.icon}</div>
                      <h3 className={cn("text-lg font-bold text-amber-900 mb-2", MinecartLCD.className)}>
                        {service.title}
                      </h3>
                      <p className={cn("text-gray-600 text-sm", MinecartLCD.className)}>
                        {service.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-6 bg-gradient-to-br from-amber-900 to-orange-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className={cn("text-4xl font-bold mb-6", MinecartLCD.className)}>
                LET'S CREATE SOMETHING AMAZING
              </h2>
              <p className={cn("text-xl mb-8 text-amber-200", MinecartLCD.className)}>
                READY TO TRANSFORM YOUR BRAND?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className={cn("bg-white text-amber-900 hover:bg-gray-100", MinecartLCD.className)}>
                  <Palette className="mr-2 h-4 w-4" />
                  START PROJECT
                </Button>
                <Button variant="outline" className={cn("border-white text-white hover:bg-white hover:text-amber-900", MinecartLCD.className)}>
                  <Star className="mr-2 h-4 w-4" />
                  VIEW PORTFOLIO
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
    </LoadingProvider>
  );
} 