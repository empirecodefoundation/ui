"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Camera, Award, Users, MapPin, Instagram, Globe, Heart } from "lucide-react";
import { MinecartLCD } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/lib/hooks/use-navigation";
import { LoadingProvider } from "@/components/core/loading-provider";

export default function Portfolio8Demo() {
  const { navigateTo } = useNavigation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 100
      }
    }
  };

  return (
    <LoadingProvider>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-orange-600 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Button
            onClick={() => navigateTo("/templates/portfolio/portfolio8")}
            variant="outline"
            size="sm"
            className={cn("border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white", MinecartLCD.className)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            BACK TO TEMPLATE
          </Button>
          
          <div className={cn("text-lg font-bold text-orange-600", MinecartLCD.className)}>
            PHOTOGRAPHER PORTFOLIO
          </div>
          
          <Button
            onClick={() => window.open("/templates/portfolio/portfolio8", "_blank")}
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
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <motion.h1 
                  variants={itemVariants}
                  className={cn("text-6xl md:text-7xl font-bold text-purple-900 mb-6", MinecartLCD.className)}
                >
                  SARAH WILSON
                </motion.h1>
                <motion.p 
                  variants={itemVariants}
                  className={cn("text-2xl text-purple-700 mb-6", MinecartLCD.className)}
                >
                  WEDDING PHOTOGRAPHER
                </motion.p>
                <motion.p 
                  variants={itemVariants}
                  className={cn("text-lg text-gray-600 mb-8 leading-relaxed", MinecartLCD.className)}
                >
                  CAPTURING LOVE STORIES ACROSS THE WORLD FOR OVER 8 YEARS. 
                  SPECIALIZING IN ROMANTIC, TIMELESS WEDDING PHOTOGRAPHY.
                </motion.p>
                
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-wrap gap-4 mb-8"
                >
                  <div className="flex items-center gap-2 text-purple-700">
                    <MapPin className="h-5 w-5" />
                    <span className={cn("", MinecartLCD.className)}>NEW YORK & WORLDWIDE</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-700">
                    <Award className="h-5 w-5" />
                    <span className={cn("", MinecartLCD.className)}>500+ WEDDINGS</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-700">
                    <Heart className="h-5 w-5" />
                    <span className={cn("", MinecartLCD.className)}>LOVE STORIES</span>
                  </div>
                </motion.div>
                
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button className={cn("bg-purple-600 text-white hover:bg-purple-700", MinecartLCD.className)}>
                    <Camera className="mr-2 h-4 w-4" />
                    VIEW GALLERY
                  </Button>
                  <Button variant="outline" className={cn("border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white", MinecartLCD.className)}>
                    <Instagram className="mr-2 h-4 w-4" />
                    FOLLOW JOURNEY
                  </Button>
                </motion.div>
              </div>
              
              <motion.div
                variants={imageVariants}
                className="relative"
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-gradient-to-br from-purple-200 to-pink-200 p-8 rounded-2xl shadow-2xl">
                  <div className="bg-white p-4 rounded-xl text-center">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mb-4 flex items-center justify-center">
                      <Camera className="h-16 w-16 text-white" />
                    </div>
                    <h3 className={cn("text-xl font-bold text-purple-900 mb-2", MinecartLCD.className)}>
                      SIGNATURE STYLE
                    </h3>
                    <p className={cn("text-purple-700 text-sm", MinecartLCD.className)}>
                      ROMANTIC • TIMELESS • AUTHENTIC
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Portfolio Gallery */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className={cn("text-4xl font-bold text-center mb-12 text-purple-900", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              FEATURED WEDDINGS
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { 
                  title: "EMMA & JAMES", 
                  location: "TUSCANY, ITALY", 
                  style: "VINEYARD WEDDING", 
                  color: "from-pink-400 to-rose-400",
                  season: "SUMMER 2024"
                },
                { 
                  title: "SOPHIA & MICHAEL", 
                  location: "SANTORINI, GREECE", 
                  style: "SUNSET CEREMONY", 
                  color: "from-blue-400 to-cyan-400",
                  season: "SPRING 2024"
                },
                { 
                  title: "ISABELLA & DAVID", 
                  location: "PARIS, FRANCE", 
                  style: "CLASSIC ELEGANCE", 
                  color: "from-purple-400 to-violet-400",
                  season: "FALL 2023"
                },
                { 
                  title: "LILY & ALEXANDER", 
                  location: "BALI, INDONESIA", 
                  style: "TROPICAL PARADISE", 
                  color: "from-green-400 to-emerald-400",
                  season: "WINTER 2023"
                },
                { 
                  title: "GRACE & WILLIAM", 
                  location: "NAPA VALLEY, CA", 
                  style: "RUSTIC ROMANCE", 
                  color: "from-orange-400 to-amber-400",
                  season: "SUMMER 2023"
                },
                { 
                  title: "CHARLOTTE & HENRY", 
                  location: "LAKE COMO, ITALY", 
                  style: "LAKESIDE LUXURY", 
                  color: "from-indigo-400 to-purple-400",
                  season: "SPRING 2023"
                }
              ].map((wedding, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, rotateZ: 1 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className={`h-64 bg-gradient-to-br ${wedding.color} relative`}>
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Camera className="h-16 w-16 text-white/80" />
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <Badge className="bg-white/90 text-gray-800 mb-2">
                          {wedding.season}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className={cn("text-lg font-bold text-purple-900 mb-2", MinecartLCD.className)}>
                        {wedding.title}
                      </h3>
                      <p className={cn("text-purple-700 text-sm mb-1", MinecartLCD.className)}>
                        {wedding.location}
                      </p>
                      <p className={cn("text-gray-600 text-xs", MinecartLCD.className)}>
                        {wedding.style}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 px-6 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className={cn("text-4xl font-bold text-center mb-12 text-purple-900", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              PHOTOGRAPHY SERVICES
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "WEDDING DAY",
                  price: "$3,500",
                  features: ["8 HOURS COVERAGE", "500+ EDITED PHOTOS", "ONLINE GALLERY", "PRINT RELEASE"],
                  icon: <Heart className="h-8 w-8" />
                },
                {
                  title: "ENGAGEMENT",
                  price: "$750",
                  features: ["2 HOURS SESSION", "50+ EDITED PHOTOS", "LOCATION SCOUTING", "STYLING GUIDE"],
                  icon: <Camera className="h-8 w-8" />
                },
                {
                  title: "DESTINATION",
                  price: "$5,000",
                  features: ["TRAVEL INCLUDED", "FULL DAY COVERAGE", "DRONE PHOTOGRAPHY", "SAME DAY PREVIEW"],
                  icon: <Globe className="h-8 w-8" />
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="bg-white border-purple-200 p-6 text-center hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="text-purple-600 mb-4 flex justify-center">{service.icon}</div>
                      <h3 className={cn("text-xl font-bold text-purple-900 mb-2", MinecartLCD.className)}>
                        {service.title}
                      </h3>
                      <div className={cn("text-3xl font-bold text-pink-600 mb-4", MinecartLCD.className)}>
                        {service.price}
                      </div>
                      <ul className="space-y-2 text-left">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className={cn("text-gray-600 text-sm", MinecartLCD.className)}>
                            • {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className={cn("text-4xl font-bold text-center mb-12 text-purple-900", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              LOVE STORIES
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  quote: "SARAH CAPTURED OUR WEDDING DAY PERFECTLY! EVERY EMOTION, EVERY DETAIL, EVERY MAGICAL MOMENT.",
                  couple: "EMMA & JAMES",
                  wedding: "TUSCANY VINEYARD"
                },
                {
                  quote: "HER ARTISTIC EYE AND WARM PERSONALITY MADE OUR PHOTO SESSION FEEL NATURAL AND FUN.",
                  couple: "SOPHIA & MICHAEL",
                  wedding: "SANTORINI SUNSET"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200 p-6">
                    <CardContent className="p-0">
                      <p className={cn("text-purple-800 mb-4 italic", MinecartLCD.className)}>
                        "{testimonial.quote}"
                      </p>
                      <div className="text-right">
                        <div className={cn("font-bold text-purple-900", MinecartLCD.className)}>
                          {testimonial.couple}
                        </div>
                        <div className={cn("text-sm text-purple-600", MinecartLCD.className)}>
                          {testimonial.wedding}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-6 bg-gradient-to-br from-purple-900 to-pink-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className={cn("text-4xl font-bold mb-6", MinecartLCD.className)}>
                LET'S CAPTURE YOUR LOVE STORY
              </h2>
              <p className={cn("text-xl mb-8 text-purple-200", MinecartLCD.className)}>
                READY TO CREATE TIMELESS MEMORIES?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className={cn("bg-white text-purple-900 hover:bg-gray-100", MinecartLCD.className)}>
                  <Heart className="mr-2 h-4 w-4" />
                  BOOK CONSULTATION
                </Button>
                <Button variant="outline" className={cn("border-white text-white hover:bg-white hover:text-purple-900", MinecartLCD.className)}>
                  <Instagram className="mr-2 h-4 w-4" />
                  SEE MORE WORK
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