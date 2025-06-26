"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, BarChart3, Brain, Database, TrendingUp, Zap, Award } from "lucide-react";
import { MinecartLCD } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/lib/hooks/use-navigation";
import { LoadingProvider } from "@/components/core/loading-provider";

export default function Portfolio10Demo() {
  const { navigateTo } = useNavigation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-orange-600 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Button
            onClick={() => navigateTo("/templates/portfolio/portfolio10")}
            variant="outline"
            size="sm"
            className={cn("border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white", MinecartLCD.className)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            BACK TO TEMPLATE
          </Button>
          
          <div className={cn("text-lg font-bold text-orange-600", MinecartLCD.className)}>
            DATA SCIENTIST PORTFOLIO
          </div>
          
          <Button
            onClick={() => window.open("/templates/portfolio/portfolio10", "_blank")}
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
                className={cn("text-6xl md:text-7xl font-bold text-slate-900 mb-6", MinecartLCD.className)}
              >
                DR. SARAH CHEN
              </motion.h1>
              <motion.p 
                variants={itemVariants}
                className={cn("text-2xl text-slate-700 mb-8", MinecartLCD.className)}
              >
                DATA SCIENTIST & ML ENGINEER
              </motion.p>
              
              <motion.div 
                variants={itemVariants}
                className="bg-white p-8 rounded-xl max-w-4xl mx-auto border border-slate-200 mb-8 shadow-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="space-y-2"
                  >
                    <div className={cn("text-4xl font-bold text-blue-600", MinecartLCD.className)}>99.2%</div>
                    <div className={cn("text-sm text-gray-600", MinecartLCD.className)}>MODEL ACCURACY</div>
                    <Brain className="h-8 w-8 text-blue-600 mx-auto" />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="space-y-2"
                  >
                    <div className={cn("text-4xl font-bold text-indigo-600", MinecartLCD.className)}>50+</div>
                    <div className={cn("text-sm text-gray-600", MinecartLCD.className)}>ML MODELS DEPLOYED</div>
                    <BarChart3 className="h-8 w-8 text-indigo-600 mx-auto" />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="space-y-2"
                  >
                    <div className={cn("text-4xl font-bold text-slate-600", MinecartLCD.className)}>5TB</div>
                    <div className={cn("text-sm text-gray-600", MinecartLCD.className)}>DATA PROCESSED</div>
                    <Database className="h-8 w-8 text-slate-600 mx-auto" />
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button className={cn("bg-blue-600 text-white hover:bg-blue-700", MinecartLCD.className)}>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  VIEW PROJECTS
                </Button>
                <Button variant="outline" className={cn("border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white", MinecartLCD.className)}>
                  <Brain className="mr-2 h-4 w-4" />
                  ML MODELS
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Projects */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className={cn("text-4xl font-bold text-center mb-12 text-slate-900", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              FEATURED PROJECTS
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "FRAUD DETECTION",
                  desc: "Advanced ML model for real-time financial fraud detection using ensemble methods",
                  accuracy: "99.2%",
                  tech: ["Python", "TensorFlow", "Scikit-learn"],
                  icon: <Brain className="h-8 w-8" />,
                  year: "2024"
                },
                {
                  title: "PREDICTIVE ANALYTICS", 
                  desc: "Customer behavior prediction system for e-commerce optimization",
                  accuracy: "96.8%",
                  tech: ["Python", "XGBoost", "Pandas"],
                  icon: <BarChart3 className="h-8 w-8" />,
                  year: "2024"
                },
                {
                  title: "NLP SENTIMENT",
                  desc: "Large-scale social media sentiment analysis using transformer models",
                  accuracy: "94.5%",
                  tech: ["Python", "BERT", "PyTorch"],
                  icon: <Database className="h-8 w-8" />,
                  year: "2023"
                },
                {
                  title: "TIME SERIES FORECASTING",
                  desc: "Stock market prediction using LSTM networks and technical indicators",
                  accuracy: "91.3%",
                  tech: ["Python", "Keras", "NumPy"],
                  icon: <TrendingUp className="h-8 w-8" />,
                  year: "2023"
                },
                {
                  title: "COMPUTER VISION",
                  desc: "Medical image classification for early disease detection",
                  accuracy: "97.8%",
                  tech: ["Python", "OpenCV", "ResNet"],
                  icon: <Zap className="h-8 w-8" />,
                  year: "2024"
                },
                {
                  title: "RECOMMENDATION ENGINE",
                  desc: "Personalized content recommendation using collaborative filtering",
                  accuracy: "93.6%",
                  tech: ["Python", "Spark", "Matrix Factorization"],
                  icon: <Award className="h-8 w-8" />,
                  year: "2023"
                }
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="bg-slate-50 border-slate-200 p-6 hover:shadow-lg transition-all duration-300 h-full">
                    <CardContent className="p-0 h-full flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-blue-600">{project.icon}</div>
                        <div className="text-right">
                          <div className={cn("text-lg font-bold text-green-600", MinecartLCD.className)}>{project.accuracy}</div>
                          <Badge className="bg-slate-200 text-slate-700 text-xs">{project.year}</Badge>
                        </div>
                      </div>
                      <h3 className={cn("text-lg font-bold text-slate-900 mb-2", MinecartLCD.className)}>
                        {project.title}
                      </h3>
                      <p className={cn("text-gray-600 text-sm mb-4 flex-1", MinecartLCD.className)}>
                        {project.desc}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {project.tech.map(tech => (
                          <Badge key={tech} className="bg-blue-100 text-blue-700 text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="py-16 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className={cn("text-4xl font-bold text-center mb-12 text-slate-900", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              TECHNICAL EXPERTISE
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "MACHINE LEARNING", tech: ["TensorFlow", "PyTorch", "Scikit-learn"], icon: <Brain className="h-8 w-8" /> },
                { title: "DATA ANALYSIS", tech: ["Pandas", "NumPy", "R"], icon: <BarChart3 className="h-8 w-8" /> },
                { title: "BIG DATA", tech: ["Spark", "Hadoop", "Kafka"], icon: <Database className="h-8 w-8" /> },
                { title: "DEEP LEARNING", tech: ["CNNs", "RNNs", "Transformers"], icon: <Zap className="h-8 w-8" /> }
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="bg-white border-slate-200 p-6 text-center hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="text-blue-600 mb-4 flex justify-center">{skill.icon}</div>
                      <h3 className={cn("text-lg font-bold text-slate-900 mb-3", MinecartLCD.className)}>
                        {skill.title}
                      </h3>
                      <div className="space-y-1">
                        {skill.tech.map(tech => (
                          <Badge key={tech} className="bg-slate-100 text-slate-700 text-xs mr-1">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-6 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className={cn("text-4xl font-bold mb-6", MinecartLCD.className)}>
                LET'S SOLVE DATA CHALLENGES
              </h2>
              <p className={cn("text-xl mb-8 text-slate-200", MinecartLCD.className)}>
                READY TO UNLOCK YOUR DATA'S POTENTIAL?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className={cn("bg-white text-slate-900 hover:bg-gray-100", MinecartLCD.className)}>
                  <Brain className="mr-2 h-4 w-4" />
                  DISCUSS PROJECT
                </Button>
                <Button variant="outline" className={cn("border-white text-white hover:bg-white hover:text-slate-900", MinecartLCD.className)}>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  VIEW CASE STUDIES
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