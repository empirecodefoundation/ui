"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Camera, Mail, Instagram, Filter } from "lucide-react";
import { MinecartLCD } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/lib/hooks/use-navigation";

export default function Portfolio4Demo() {
  const { navigateTo } = useNavigation();
  const [selectedFilter, setSelectedFilter] = React.useState("ALL");

  const filters = ["ALL", "PORTRAITS", "LANDSCAPES", "EVENTS", "COMMERCIAL"];
  
  const photos = [
    { type: "PORTRAITS", bg: "from-gray-600 to-gray-800" },
    { type: "LANDSCAPES", bg: "from-green-600 to-blue-600" },
    { type: "EVENTS", bg: "from-purple-600 to-pink-600" },
    { type: "COMMERCIAL", bg: "from-orange-600 to-red-600" },
    { type: "PORTRAITS", bg: "from-indigo-600 to-purple-600" },
    { type: "LANDSCAPES", bg: "from-teal-600 to-green-600" }
  ];

  const filteredPhotos = selectedFilter === "ALL" 
    ? photos 
    : photos.filter(photo => photo.type === selectedFilter);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Button
            onClick={() => navigateTo("/templates/portfolio/portfolio4")}
            variant="outline"
            size="sm"
            className={cn("border-gray-600 text-gray-300 hover:bg-gray-800", MinecartLCD.className)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            BACK TO TEMPLATE
          </Button>
          
          <div className={cn("text-lg font-bold text-white", MinecartLCD.className)}>
            PHOTOGRAPHY SHOWCASE
          </div>
          
          <Button
            onClick={() => window.open("/templates/portfolio/portfolio4", "_blank")}
            variant="outline"
            size="sm"
            className={cn("border-gray-600 text-gray-300 hover:bg-gray-800", MinecartLCD.className)}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            VIEW CODE
          </Button>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className={cn("text-6xl md:text-7xl font-bold mb-6", MinecartLCD.className)}>
                EMMA WATSON
              </h1>
              <p className={cn("text-2xl text-gray-400 mb-8", MinecartLCD.className)}>
                PROFESSIONAL PHOTOGRAPHER
              </p>
              <p className={cn("text-lg text-gray-500 mb-12 max-w-2xl mx-auto", MinecartLCD.className)}>
                CAPTURING LIFE'S MOST BEAUTIFUL MOMENTS THROUGH THE LENS
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className={cn("bg-white text-black hover:bg-gray-200 px-8 py-3", MinecartLCD.className)}>
                  <Camera className="mr-2 h-4 w-4" />
                  VIEW PORTFOLIO
                </Button>
                <Button variant="outline" className={cn("border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3", MinecartLCD.className)}>
                  <Mail className="mr-2 h-4 w-4" />
                  BOOK SESSION
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              className={cn("text-4xl font-bold text-center mb-8", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              PORTFOLIO
            </motion.h2>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {filters.map(filter => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  onClick={() => setSelectedFilter(filter)}
                  className={cn(
                    selectedFilter === filter 
                      ? "bg-white text-black" 
                      : "border-gray-600 text-gray-300 hover:bg-gray-800",
                    "px-4 py-2",
                    MinecartLCD.className
                  )}
                >
                  {filter}
                </Button>
              ))}
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPhotos.map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <Card className="bg-gray-900 border border-gray-800 overflow-hidden">
                    <CardContent className="p-0">
                      <div className={cn("h-80 bg-gradient-to-br relative overflow-hidden", photo.bg)}>
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-black/60 text-white text-xs">
                            {photo.type}
                          </Badge>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Camera className="h-8 w-8 text-white" />
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
        <section className="py-16 px-6 bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className={cn("text-4xl font-bold text-center mb-12", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              PHOTOGRAPHY SERVICES
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "PORTRAIT PHOTOGRAPHY",
                  desc: "Professional headshots and personal portraits",
                  price: "FROM $150",
                  features: ["2-hour session", "20+ edited photos", "Online gallery"]
                },
                {
                  title: "EVENT PHOTOGRAPHY",
                  desc: "Weddings, parties, and corporate events",
                  price: "FROM $500",
                  features: ["Full-day coverage", "100+ photos", "Same-day highlights"]
                },
                {
                  title: "COMMERCIAL PHOTOGRAPHY",
                  desc: "Product and business photography",
                  price: "FROM $300",
                  features: ["Studio setup", "Product shots", "Commercial license"]
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-black border border-gray-700 h-full">
                    <CardContent className="p-6">
                      <h3 className={cn("text-lg font-bold mb-3", MinecartLCD.className)}>
                        {service.title}
                      </h3>
                      <p className={cn("text-gray-400 text-sm mb-4", MinecartLCD.className)}>
                        {service.desc}
                      </p>
                      <div className={cn("text-2xl font-bold text-white mb-4", MinecartLCD.className)}>
                        {service.price}
                      </div>
                      <ul className="space-y-2 mb-6">
                        {service.features.map(feature => (
                          <li key={feature} className={cn("text-gray-500 text-sm", MinecartLCD.className)}>
                            • {feature}
                          </li>
                        ))}
                      </ul>
                      <Button className="bg-white text-black hover:bg-gray-200 w-full">
                        BOOK NOW
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className={cn("text-4xl font-bold mb-6", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              LET'S CREATE SOMETHING BEAUTIFUL
            </motion.h2>
            <motion.p 
              className={cn("text-gray-400 mb-8 text-lg", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              READY TO CAPTURE YOUR SPECIAL MOMENTS?
            </motion.p>
            
            <Button className={cn("bg-white text-black hover:bg-gray-200 px-8 py-3", MinecartLCD.className)}>
              <Mail className="mr-2 h-4 w-4" />
              GET IN TOUCH
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
} 