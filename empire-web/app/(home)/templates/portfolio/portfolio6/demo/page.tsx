"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Mail, Instagram, Palette, Eye } from "lucide-react";
import { MinecartLCD } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/lib/hooks/use-navigation";

export default function Portfolio6Demo() {
  const { navigateTo } = useNavigation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-indigo-900 text-white">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-purple-600 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Button
            onClick={() => navigateTo("/templates/portfolio/portfolio6")}
            variant="outline"
            size="sm"
            className={cn("border-purple-400 text-purple-300 hover:bg-purple-900", MinecartLCD.className)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            BACK TO TEMPLATE
          </Button>
          
          <div className={cn("text-lg font-bold text-white", MinecartLCD.className)}>
            ARTIST STUDIO
          </div>
          
          <Button
            onClick={() => window.open("/templates/portfolio/portfolio6", "_blank")}
            variant="outline"
            size="sm"
            className={cn("border-purple-400 text-purple-300 hover:bg-purple-900", MinecartLCD.className)}
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className={cn("text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6", MinecartLCD.className)}>
                LUNA MARTINEZ
              </h1>
              <p className={cn("text-2xl text-purple-300 mb-8", MinecartLCD.className)}>
                DIGITAL ARTIST & ILLUSTRATOR
              </p>
              <p className={cn("text-lg text-purple-400 mb-12 max-w-2xl mx-auto", MinecartLCD.className)}>
                CREATING IMMERSIVE DIGITAL WORLDS AND CHARACTERS THROUGH EXPERIMENTAL ART TECHNIQUES
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className={cn("bg-purple-600 text-white hover:bg-purple-700 px-8 py-3", MinecartLCD.className)}>
                  <Palette className="mr-2 h-4 w-4" />
                  VIEW GALLERY
                </Button>
                <Button variant="outline" className={cn("border-purple-400 text-purple-300 hover:bg-purple-900 px-8 py-3", MinecartLCD.className)}>
                  <Mail className="mr-2 h-4 w-4" />
                  COMMISSION
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Art Gallery */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              className={cn("text-4xl font-bold text-center mb-12", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              FEATURED ARTWORK
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { type: "DIGITAL", bg: "from-purple-600 to-pink-600" },
                { type: "ILLUSTRATION", bg: "from-blue-600 to-purple-600" },
                { type: "CONCEPT ART", bg: "from-pink-600 to-red-600" },
                { type: "CHARACTER", bg: "from-indigo-600 to-purple-600" },
                { type: "ENVIRONMENT", bg: "from-purple-600 to-blue-600" },
                { type: "ABSTRACT", bg: "from-red-600 to-pink-600" }
              ].map((art, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <Card className="bg-gray-900 border border-purple-600 overflow-hidden">
                    <CardContent className="p-0">
                      <div className={cn("h-64 bg-gradient-to-br relative overflow-hidden group-hover:scale-105 transition-transform duration-300", art.bg)}>
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                        <div className="absolute top-4 left-4">
                          <span className="bg-black/60 text-white text-xs px-2 py-1 rounded">
                            {art.type}
                          </span>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Eye className="h-8 w-8 text-white" />
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
        <section className="py-16 px-6 bg-black/50">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className={cn("text-4xl font-bold text-center mb-12", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              ART SERVICES
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "DIGITAL ILLUSTRATION",
                  desc: "Custom digital artwork and illustrations for books, games, and media",
                  price: "FROM $200",
                  icon: "🎨"
                },
                {
                  title: "CONCEPT ART",
                  desc: "Game and film concept art design for characters and environments",
                  price: "FROM $300",
                  icon: "🖌️"
                },
                {
                  title: "CHARACTER DESIGN",
                  desc: "Original character creation and design for various media projects",
                  price: "FROM $250",
                  icon: "👤"
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-purple-900/50 border border-purple-600 h-full">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-4">{service.icon}</div>
                      <h3 className={cn("text-lg font-bold mb-3", MinecartLCD.className)}>
                        {service.title}
                      </h3>
                      <p className={cn("text-purple-200 text-sm mb-4", MinecartLCD.className)}>
                        {service.desc}
                      </p>
                      <div className={cn("text-xl font-bold text-purple-300 mb-4", MinecartLCD.className)}>
                        {service.price}
                      </div>
                      <Button className="bg-purple-600 text-white hover:bg-purple-700 w-full">
                        REQUEST QUOTE
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
              LET'S CREATE TOGETHER
            </motion.h2>
            <motion.p 
              className={cn("text-purple-300 mb-8 text-lg", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              READY TO BRING YOUR ARTISTIC VISION TO LIFE?
            </motion.p>
            
            <Button className={cn("bg-purple-600 text-white hover:bg-purple-700 px-8 py-3", MinecartLCD.className)}>
              <Mail className="mr-2 h-4 w-4" />
              START PROJECT
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
} 