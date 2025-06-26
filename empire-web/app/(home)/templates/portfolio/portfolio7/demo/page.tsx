"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, TrendingUp, Users, Award, Rocket, DollarSign, Building } from "lucide-react";
import { MinecartLCD } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/lib/hooks/use-navigation";
import { LoadingProvider } from "@/components/core/loading-provider";

export default function Portfolio7Demo() {
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

  return (
    <LoadingProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-orange-600 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Button
            onClick={() => navigateTo("/templates/portfolio/portfolio7")}
            variant="outline"
            size="sm"
            className={cn("border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white", MinecartLCD.className)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            BACK TO TEMPLATE
          </Button>
          
          <div className={cn("text-lg font-bold text-orange-600", MinecartLCD.className)}>
            STARTUP FOUNDER PORTFOLIO
          </div>
          
          <Button
            onClick={() => window.open("/templates/portfolio/portfolio7", "_blank")}
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
                className={cn("text-6xl md:text-7xl font-bold text-blue-900 mb-6", MinecartLCD.className)}
              >
                ALEX THOMPSON
              </motion.h1>
              <motion.p 
                variants={itemVariants}
                className={cn("text-2xl text-blue-700 mb-8", MinecartLCD.className)}
              >
                STARTUP FOUNDER & ENTREPRENEUR
              </motion.p>
              
              <motion.div 
                variants={itemVariants}
                className="bg-white p-8 rounded-xl max-w-4xl mx-auto border border-blue-200 mb-8 shadow-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="space-y-2"
                  >
                    <div className={cn("text-4xl font-bold text-green-600", MinecartLCD.className)}>$2M</div>
                    <div className={cn("text-sm text-gray-600", MinecartLCD.className)}>TOTAL RAISED</div>
                    <DollarSign className="h-8 w-8 text-green-600 mx-auto" />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="space-y-2"
                  >
                    <div className={cn("text-4xl font-bold text-blue-600", MinecartLCD.className)}>50K</div>
                    <div className={cn("text-sm text-gray-600", MinecartLCD.className)}>ACTIVE USERS</div>
                    <Users className="h-8 w-8 text-blue-600 mx-auto" />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="space-y-2"
                  >
                    <div className={cn("text-4xl font-bold text-purple-600", MinecartLCD.className)}>3</div>
                    <div className={cn("text-sm text-gray-600", MinecartLCD.className)}>COMPANIES FOUNDED</div>
                    <Building className="h-8 w-8 text-purple-600 mx-auto" />
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button className={cn("bg-blue-600 text-white hover:bg-blue-700", MinecartLCD.className)}>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  VIEW COMPANIES
                </Button>
                <Button variant="outline" className={cn("border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white", MinecartLCD.className)}>
                  <Rocket className="mr-2 h-4 w-4" />
                  INVEST NOW
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Company History */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className={cn("text-4xl font-bold text-center mb-12 text-blue-900", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              ENTREPRENEURIAL JOURNEY
            </motion.h2>
            <div className="space-y-8">
              {[
                {
                  year: "2024",
                  title: "TECHFLOW AI",
                  desc: "AI-powered business automation platform revolutionizing workflow management",
                  status: "CURRENT",
                  metrics: "$2M Series A",
                  color: "green",
                  icon: <Rocket className="h-6 w-6" />
                },
                {
                  year: "2021",
                  title: "DATASTREAM",
                  desc: "Advanced analytics platform providing insights for startup growth",
                  status: "ACQUIRED",
                  metrics: "$5M Exit",
                  color: "blue",
                  icon: <TrendingUp className="h-6 w-6" />
                },
                {
                  year: "2019",
                  title: "APPBUILDER",
                  desc: "No-code mobile app development platform for entrepreneurs",
                  status: "SOLD",
                  metrics: "$1.2M Exit",
                  color: "purple",
                  icon: <Building className="h-6 w-6" />
                }
              ].map((company, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="bg-blue-50 border-blue-200 p-6 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-4">
                          <div className={`text-${company.color}-600`}>
                            {company.icon}
                          </div>
                          <div>
                            <div className={cn("text-sm text-blue-600 font-bold mb-1", MinecartLCD.className)}>{company.year}</div>
                            <h3 className={cn("text-xl font-bold text-blue-900 mb-2", MinecartLCD.className)}>{company.title}</h3>
                            <p className={cn("text-gray-600", MinecartLCD.className)}>{company.desc}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={cn("text-lg font-bold text-green-600", MinecartLCD.className)}>{company.metrics}</div>
                          <Badge className={`bg-${company.color}-100 text-${company.color}-700 border-${company.color}-300`}>
                            {company.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills & Expertise */}
        <section className="py-16 px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className={cn("text-4xl font-bold text-center mb-12 text-blue-900", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              CORE EXPERTISE
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "FUNDRAISING", desc: "Series A-C funding rounds", icon: <DollarSign className="h-8 w-8" /> },
                { title: "PRODUCT STRATEGY", desc: "Market-fit validation", icon: <TrendingUp className="h-8 w-8" /> },
                { title: "TEAM BUILDING", desc: "Scaling engineering teams", icon: <Users className="h-8 w-8" /> },
                { title: "EXIT STRATEGY", desc: "M&A and IPO planning", icon: <Award className="h-8 w-8" /> },
                { title: "AI/ML INTEGRATION", desc: "Machine learning products", icon: <Rocket className="h-8 w-8" /> },
                { title: "VENTURE PARTNERSHIPS", desc: "Strategic alliances", icon: <Building className="h-8 w-8" /> }
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                >
                  <Card className="bg-white border-blue-200 p-6 text-center hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="text-blue-600 mb-4 flex justify-center">{skill.icon}</div>
                      <h3 className={cn("text-lg font-bold text-blue-900 mb-2", MinecartLCD.className)}>
                        {skill.title}
                      </h3>
                      <p className={cn("text-gray-600 text-sm", MinecartLCD.className)}>
                        {skill.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-6 bg-blue-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className={cn("text-4xl font-bold mb-6", MinecartLCD.className)}>
                LET'S BUILD THE FUTURE
              </h2>
              <p className={cn("text-xl mb-8 text-blue-200", MinecartLCD.className)}>
                READY TO SCALE YOUR STARTUP?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className={cn("bg-white text-blue-900 hover:bg-gray-100", MinecartLCD.className)}>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  SCHEDULE CONSULTATION
                </Button>
                <Button variant="outline" className={cn("border-white text-white hover:bg-white hover:text-blue-900", MinecartLCD.className)}>
                  <Award className="mr-2 h-4 w-4" />
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