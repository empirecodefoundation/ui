"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Mail, Star, Check } from "lucide-react";
import { MinecartLCD } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/lib/hooks/use-navigation";

export default function Portfolio5Demo() {
  const { navigateTo } = useNavigation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-cyan-200 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Button
            onClick={() => navigateTo("/templates/portfolio/portfolio5")}
            variant="outline"
            size="sm"
            className={cn("border-cyan-300 text-cyan-600 hover:bg-cyan-100", MinecartLCD.className)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            BACK TO TEMPLATE
          </Button>
          
          <div className={cn("text-lg font-bold text-blue-800", MinecartLCD.className)}>
            FREELANCER HUB
          </div>
          
          <Button
            onClick={() => window.open("/templates/portfolio/portfolio5", "_blank")}
            variant="outline"
            size="sm"
            className={cn("border-cyan-300 text-cyan-600 hover:bg-cyan-100", MinecartLCD.className)}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            VIEW CODE
          </Button>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className={cn("text-6xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-6", MinecartLCD.className)}>
                MIKE JOHNSON
              </h1>
              <p className={cn("text-2xl text-blue-600 mb-8", MinecartLCD.className)}>
                FULL-STACK FREELANCER & CONSULTANT
              </p>
              <div className="flex justify-center gap-2 mb-8">
                {[1,2,3,4,5].map(star => (
                  <Star key={star} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
                <span className={cn("ml-2 text-gray-600", MinecartLCD.className)}>5.0 (127 REVIEWS)</span>
              </div>
              
              <Button className={cn("bg-blue-600 text-white hover:bg-blue-700 px-8 py-3", MinecartLCD.className)}>
                <Mail className="mr-2 h-4 w-4" />
                HIRE ME NOW
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 px-6 bg-white/50">
          <div className="max-w-6xl mx-auto">
            <h2 className={cn("text-4xl font-bold text-center mb-12 text-blue-800", MinecartLCD.className)}>
              FREELANCE SERVICES
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "WEB DEVELOPMENT",
                  price: "$50/HOUR",
                  features: ["React Development", "Node.js Backend", "Database Design", "API Integration"]
                },
                {
                  title: "UI/UX DESIGN", 
                  price: "$40/HOUR",
                  features: ["Figma Design", "Prototyping", "User Research", "Design Systems"]
                },
                {
                  title: "CONSULTING",
                  price: "$75/HOUR", 
                  features: ["Tech Strategy", "Code Review", "Architecture", "Team Training"]
                }
              ].map((service, index) => (
                <Card key={index} className="bg-white border-2 border-cyan-200 hover:border-blue-400 transition-all">
                  <CardContent className="p-6">
                    <h3 className={cn("text-xl font-bold text-blue-800 mb-4", MinecartLCD.className)}>
                      {service.title}
                    </h3>
                    <div className={cn("text-3xl font-bold text-cyan-600 mb-6", MinecartLCD.className)}>
                      {service.price}
                    </div>
                    <ul className="space-y-2">
                      {service.features.map(feature => (
                        <li key={feature} className={cn("flex items-center text-gray-600", MinecartLCD.className)}>
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-6 bg-blue-600 text-white hover:bg-blue-700">
                      GET STARTED
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 px-6 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={cn("text-4xl font-bold mb-6", MinecartLCD.className)}>
              READY TO START YOUR PROJECT?
            </h2>
            <p className={cn("text-blue-100 mb-8 text-lg", MinecartLCD.className)}>
              LET'S DISCUSS YOUR REQUIREMENTS AND BUILD SOMETHING AMAZING TOGETHER
            </p>
            <Button className={cn("bg-white text-blue-600 hover:bg-blue-50 px-8 py-3", MinecartLCD.className)}>
              <Mail className="mr-2 h-4 w-4" />
              CONTACT ME
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
} 