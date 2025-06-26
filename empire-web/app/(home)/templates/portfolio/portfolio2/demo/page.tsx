"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Mail, Instagram, Dribbble, Palette, Sparkles } from "lucide-react";
import { MinecartLCD } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/lib/hooks/use-navigation";

export default function Portfolio2Demo() {
  const { navigateTo } = useNavigation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-pink-200 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Button
            onClick={() => navigateTo("/templates/portfolio/portfolio2")}
            variant="outline"
            size="sm"
            className={cn("border-pink-300 text-pink-600 hover:bg-pink-100", MinecartLCD.className)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            BACK TO TEMPLATE
          </Button>
          
          <div className={cn("text-lg font-bold text-purple-800", MinecartLCD.className)}>
            CREATIVE DESIGNER
          </div>
          
          <Button
            onClick={() => window.open("/templates/portfolio/portfolio2", "_blank")}
            variant="outline"
            size="sm"
            className={cn("border-pink-300 text-pink-600 hover:bg-pink-100", MinecartLCD.className)}
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="relative inline-block">
                <h1 className={cn("text-6xl md:text-7xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-4", MinecartLCD.className)}>
                  SARAH MARTINEZ
                </h1>
                <Sparkles className="absolute -top-4 -right-4 text-pink-400 h-8 w-8 animate-pulse" />
              </div>
            </motion.div>
            
            <motion.p 
              className={cn("text-2xl text-purple-600 mb-8", MinecartLCD.className)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              CREATIVE DESIGNER & VISUAL STORYTELLER
            </motion.p>
            
            <motion.p 
              className={cn("text-lg text-purple-500 mb-12 max-w-4xl mx-auto leading-relaxed", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              TRANSFORMING IDEAS INTO VIBRANT VISUAL EXPERIENCES THAT CAPTIVATE, INSPIRE, AND DRIVE RESULTS
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button className={cn("bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 px-8 py-3", MinecartLCD.className)}>
                <Palette className="mr-2 h-4 w-4" />
                VIEW MY WORK
              </Button>
              <Button variant="outline" className={cn("border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-3", MinecartLCD.className)}>
                <Mail className="mr-2 h-4 w-4" />
                LET'S COLLABORATE
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              className={cn("text-4xl font-bold text-purple-800 mb-12 text-center", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              FEATURED WORK
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "REBRAND PROJECT",
                  category: "BRAND IDENTITY",
                  desc: "Complete visual identity system for innovative tech startup",
                  gradient: "from-pink-400 via-rose-400 to-red-400",
                  accent: "text-pink-600"
                },
                {
                  title: "DIGITAL ARTWORK",
                  category: "ILLUSTRATION",
                  desc: "Custom digital illustrations for children's book series",
                  gradient: "from-purple-400 via-violet-400 to-indigo-400",
                  accent: "text-purple-600"
                },
                {
                  title: "PACKAGE DESIGN",
                  category: "PRODUCT DESIGN",
                  desc: "Eco-friendly packaging design for organic skincare brand",
                  gradient: "from-green-400 via-emerald-400 to-teal-400",
                  accent: "text-green-600"
                },
                {
                  title: "WEB EXPERIENCE",
                  category: "UI/UX DESIGN",
                  desc: "Interactive website design for creative agency portfolio",
                  gradient: "from-blue-400 via-cyan-400 to-sky-400",
                  accent: "text-blue-600"
                },
                {
                  title: "POSTER SERIES",
                  category: "PRINT DESIGN",
                  desc: "Concert poster collection for indie music festival",
                  gradient: "from-orange-400 via-amber-400 to-yellow-400",
                  accent: "text-orange-600"
                },
                {
                  title: "LOGO COLLECTION",
                  category: "BRAND DESIGN",
                  desc: "Modern logo designs for diverse client portfolio",
                  gradient: "from-violet-400 via-purple-400 to-fuchsia-400",
                  accent: "text-violet-600"
                }
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <Card className="border-2 border-purple-200 hover:border-purple-400 transition-all hover:scale-105 overflow-hidden h-full bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-0 h-full">
                      <div className={cn("h-48 bg-gradient-to-br", project.gradient, "relative overflow-hidden")}>
                        <div className="absolute inset-0 bg-white/20 group-hover:bg-white/10 transition-all"></div>
                        <div className="absolute top-4 right-4">
                          <Badge className={cn("bg-white/90 backdrop-blur-sm border-0", project.accent)}>
                            {project.category}
                          </Badge>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg">
                            <h3 className={cn("text-lg font-bold mb-1", MinecartLCD.className, project.accent)}>
                              {project.title}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {project.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 px-6 bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className={cn("text-4xl font-bold text-purple-800 mb-12 text-center", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              CREATIVE SERVICES
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "BRAND IDENTITY",
                  icon: "🎨",
                  desc: "Logo design, brand guidelines, visual identity systems",
                  color: "from-pink-500 to-rose-500"
                },
                {
                  title: "DIGITAL ART",
                  icon: "✨",
                  desc: "Custom illustrations, digital paintings, character design",
                  color: "from-purple-500 to-violet-500"
                },
                {
                  title: "PRINT DESIGN",
                  icon: "📄",
                  desc: "Posters, brochures, packaging, editorial layouts",
                  color: "from-indigo-500 to-blue-500"
                },
                {
                  title: "UI/UX DESIGN",
                  icon: "💻",
                  desc: "Website design, mobile apps, interactive experiences",
                  color: "from-teal-500 to-green-500"
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="text-center p-6 border-2 border-purple-200 hover:border-purple-400 transition-all h-full bg-white/80 backdrop-blur-sm group hover:scale-105">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className={cn("text-lg font-bold text-purple-800 mb-3", MinecartLCD.className)}>
                      {service.title}
                    </h3>
                    <p className={cn("text-purple-600 text-sm leading-relaxed", MinecartLCD.className)}>
                      {service.desc}
                    </p>
                    <div className={cn("h-1 bg-gradient-to-r rounded-full mt-4 group-hover:h-2 transition-all", service.color)}></div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="grid md:grid-cols-3 gap-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {[
                { number: "200+", label: "PROJECTS COMPLETED", color: "text-pink-600" },
                { number: "85+", label: "HAPPY CLIENTS", color: "text-purple-600" },
                { number: "6+", label: "YEARS EXPERIENCE", color: "text-indigo-600" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border-2 border-purple-200"
                >
                  <div className={cn("text-5xl font-bold mb-2", MinecartLCD.className, stat.color)}>
                    {stat.number}
                  </div>
                  <div className={cn("text-purple-600 font-medium", MinecartLCD.className)}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 px-6 bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className={cn("text-4xl font-bold mb-6", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              LET'S CREATE MAGIC TOGETHER
            </motion.h2>
            <motion.p 
              className={cn("text-purple-100 mb-8 text-lg max-w-2xl mx-auto leading-relaxed", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              READY TO BRING YOUR WILDEST CREATIVE VISIONS TO LIFE? LET'S COLLABORATE ON SOMETHING EXTRAORDINARY
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Button className={cn("bg-white text-purple-600 hover:bg-purple-50 px-8 py-3", MinecartLCD.className)}>
                <Mail className="mr-2 h-4 w-4" />
                START A PROJECT
              </Button>
              <Button variant="outline" className={cn("border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3", MinecartLCD.className)}>
                <Palette className="mr-2 h-4 w-4" />
                VIEW FULL PORTFOLIO
              </Button>
            </motion.div>
            
            <motion.div 
              className="flex justify-center gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Button variant="ghost" size="sm" className="text-purple-100 hover:text-white hover:bg-white/10">
                <Instagram className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="sm" className="text-purple-100 hover:text-white hover:bg-white/10">
                <Dribbble className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="sm" className="text-purple-100 hover:text-white hover:bg-white/10">
                <Mail className="h-6 w-6" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
} 