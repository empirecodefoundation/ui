"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Mail, Linkedin, Building, Users, Award, TrendingUp } from "lucide-react";
import { MinecartLCD } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/lib/hooks/use-navigation";

export default function Portfolio3Demo() {
  const { navigateTo } = useNavigation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Button
            onClick={() => navigateTo("/templates/portfolio/portfolio3")}
            variant="outline"
            size="sm"
            className={cn("border-blue-300 text-blue-600 hover:bg-blue-50", MinecartLCD.className)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            BACK TO TEMPLATE
          </Button>
          
          <div className={cn("text-lg font-bold text-gray-800", MinecartLCD.className)}>
            PROFESSIONAL BUSINESS
          </div>
          
          <Button
            onClick={() => window.open("/templates/portfolio/portfolio3", "_blank")}
            variant="outline"
            size="sm"
            className={cn("border-blue-300 text-blue-600 hover:bg-blue-50", MinecartLCD.className)}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            VIEW CODE
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className={cn("text-5xl md:text-6xl font-bold text-gray-900 mb-6", MinecartLCD.className)}>
                  ROBERT ANDERSON
                </h1>
                <p className={cn("text-xl text-blue-600 mb-4", MinecartLCD.className)}>
                  CHIEF EXECUTIVE OFFICER
                </p>
                <p className={cn("text-lg text-gray-700 mb-8 leading-relaxed", MinecartLCD.className)}>
                  LEADING STRATEGIC INITIATIVES AND DRIVING BUSINESS EXCELLENCE 
                  FOR OVER 15 YEARS IN TECHNOLOGY AND FINANCE SECTORS
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className={cn("bg-blue-600 text-white hover:bg-blue-700 px-8 py-3", MinecartLCD.className)}>
                    <Building className="mr-2 h-4 w-4" />
                    ABOUT COMPANY
                  </Button>
                  <Button variant="outline" className={cn("border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3", MinecartLCD.className)}>
                    <Mail className="mr-2 h-4 w-4" />
                    GET IN TOUCH
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-2xl text-white">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className={cn("text-3xl font-bold mb-2", MinecartLCD.className)}>15+</div>
                      <div className={cn("text-blue-200 text-sm", MinecartLCD.className)}>YEARS EXPERIENCE</div>
                    </div>
                    <div className="text-center">
                      <div className={cn("text-3xl font-bold mb-2", MinecartLCD.className)}>500M+</div>
                      <div className={cn("text-blue-200 text-sm", MinecartLCD.className)}>REVENUE GENERATED</div>
                    </div>
                    <div className="text-center">
                      <div className={cn("text-3xl font-bold mb-2", MinecartLCD.className)}>50+</div>
                      <div className={cn("text-blue-200 text-sm", MinecartLCD.className)}>TEAM MEMBERS</div>
                    </div>
                    <div className="text-center">
                      <div className={cn("text-3xl font-bold mb-2", MinecartLCD.className)}>10+</div>
                      <div className={cn("text-blue-200 text-sm", MinecartLCD.className)}>INDUSTRIES</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className={cn("text-4xl font-bold text-gray-900 mb-12 text-center", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              CORE SERVICES
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "STRATEGIC PLANNING",
                  icon: <TrendingUp className="h-8 w-8" />,
                  desc: "Comprehensive business strategy development"
                },
                {
                  title: "LEADERSHIP CONSULTING",
                  icon: <Users className="h-8 w-8" />,
                  desc: "Executive coaching and development programs"
                },
                {
                  title: "OPERATIONAL EXCELLENCE",
                  icon: <Award className="h-8 w-8" />,
                  desc: "Process optimization and efficiency improvement"
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white border border-gray-200 hover:border-blue-300 transition-all h-full">
                    <CardContent className="p-6 text-center">
                      <div className="text-blue-600 mb-4">{service.icon}</div>
                      <h3 className={cn("text-lg font-bold text-gray-900 mb-3", MinecartLCD.className)}>
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

        {/* Experience */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className={cn("text-4xl font-bold text-gray-900 mb-12 text-center", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              PROFESSIONAL EXPERIENCE
            </motion.h2>
            <div className="space-y-8">
              {[
                {
                  title: "CHIEF EXECUTIVE OFFICER",
                  company: "TECHNOVA ENTERPRISES",
                  period: "2020 - PRESENT",
                  achievements: [
                    "Led company through 300% revenue growth in 4 years",
                    "Expanded operations to 15 international markets",
                    "Successfully completed 3 strategic acquisitions",
                    "Built and managed team of 200+ employees"
                  ]
                },
                {
                  title: "CHIEF OPERATING OFFICER",
                  company: "GLOBAL DYNAMICS CORP",
                  period: "2016 - 2020",
                  achievements: [
                    "Streamlined operations reducing costs by 25%",
                    "Implemented digital transformation initiatives",
                    "Improved customer satisfaction scores by 40%",
                    "Led cross-functional teams across 8 departments"
                  ]
                },
                {
                  title: "VP OF STRATEGIC DEVELOPMENT",
                  company: "INNOVATE SOLUTIONS",
                  period: "2012 - 2016",
                  achievements: [
                    "Developed market entry strategy for Asian markets",
                    "Launched 5 new product lines generating $50M ARR",
                    "Established strategic partnerships with industry leaders",
                    "Created innovation lab driving product development"
                  ]
                }
              ].map((role, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="border-l-4 border-blue-600 pl-6 pb-8"
                >
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className={cn("text-xl font-bold text-gray-900 mb-2", MinecartLCD.className)}>
                      {role.title}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-4">
                      <p className={cn("text-blue-600 font-medium", MinecartLCD.className)}>{role.company}</p>
                      <p className={cn("text-gray-500 text-sm", MinecartLCD.className)}>{role.period}</p>
                    </div>
                    <ul className="space-y-2">
                      {role.achievements.map(achievement => (
                        <li key={achievement} className={cn("text-gray-700 text-sm flex items-start", MinecartLCD.className)}>
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Awards & Recognition */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className={cn("text-4xl font-bold text-gray-900 mb-12 text-center", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              AWARDS & RECOGNITION
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  year: "2023",
                  award: "CEO OF THE YEAR",
                  organization: "Business Excellence Awards",
                  icon: "🏆"
                },
                {
                  year: "2022",
                  award: "INNOVATION LEADER",
                  organization: "Tech Industry Association",
                  icon: "🚀"
                },
                {
                  year: "2021",
                  award: "EXECUTIVE OF THE YEAR",
                  organization: "Fortune Business Council",
                  icon: "⭐"
                },
                {
                  year: "2020",
                  award: "GROWTH CHAMPION",
                  organization: "Entrepreneur Magazine",
                  icon: "📈"
                }
              ].map((award, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white text-center p-6 border border-gray-200 hover:border-blue-300 transition-all group hover:shadow-lg">
                    <div className="text-4xl mb-4">{award.icon}</div>
                    <div className={cn("text-2xl font-bold text-blue-600 mb-2", MinecartLCD.className)}>
                      {award.year}
                    </div>
                    <h3 className={cn("text-lg font-bold text-gray-900 mb-2", MinecartLCD.className)}>
                      {award.award}
                    </h3>
                    <p className={cn("text-gray-600 text-sm", MinecartLCD.className)}>
                      {award.organization}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 px-6 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className={cn("text-4xl font-bold mb-6", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              LET'S DRIVE SUCCESS TOGETHER
            </motion.h2>
            <motion.p 
              className={cn("text-blue-100 mb-8 text-lg", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              READY TO TAKE YOUR BUSINESS TO THE NEXT LEVEL?
            </motion.p>
            
            <Button className={cn("bg-white text-blue-600 hover:bg-blue-50 px-8 py-3", MinecartLCD.className)}>
              <Mail className="mr-2 h-4 w-4" />
              SCHEDULE CONSULTATION
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
} 