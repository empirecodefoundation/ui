"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Zap, Shield, ArrowRight, CheckCircle, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MinecartLCD } from "@/lib/fonts";

// Live Demo Landing Page Component
export default function LandingPageDemo() {
  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Built for speed and performance with modern web technologies."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure by Default", 
      description: "Enterprise-grade security features built into every component."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team Collaboration",
      description: "Work together seamlessly with real-time collaboration tools."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO, TechCorp",
      content: "This platform transformed how our team works. Incredible results!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Lead Developer",
      content: "The best development experience I've ever had. Highly recommended!",
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$19",
      features: ["5 Projects", "10GB Storage", "Email Support"],
      popular: false
    },
    {
      name: "Professional",
      price: "$49", 
      features: ["Unlimited Projects", "100GB Storage", "Priority Support", "Advanced Analytics"],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99",
      features: ["Everything in Pro", "Custom Integrations", "Dedicated Manager", "SLA"],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-green-50">
      {/* Demo Header Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-orange-200 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/templates/landing"
              className={cn("flex items-center text-gray-800 hover:text-orange-600 transition-colors", MinecartLCD.className)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              BACK TO TEMPLATE
            </Link>
            <div className="h-4 w-px bg-gray-300" />
            <span className={cn("text-gray-800 font-medium", MinecartLCD.className)}>LIVE DEMO - LANDING PAGE TEMPLATE</span>
          </div>
          <div className="flex items-center gap-3">
            <Badge className={cn("bg-green-100 text-green-800 border border-green-200", MinecartLCD.className)}>
              ● LIVE DEMO
            </Badge>
            <Link 
              href="/templates/landing"
              className={cn("text-sm text-orange-600 hover:text-gray-800 transition-colors", MinecartLCD.className)}
            >
              VIEW CODE
            </Link>
          </div>
        </div>
      </div>

      {/* Add top padding to account for fixed header */}
      <div className="pt-16">
                 {/* Hero Section */}
         <section className="relative px-6 pt-20 pb-32">
           <div className="container mx-auto max-w-6xl">
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1.2, ease: "easeOut" }}
               className="text-center"
             >
               <Badge className={cn("mb-8 bg-yellow-100 text-yellow-800 border border-yellow-200", MinecartLCD.className)}>
                 🚀 NEW RELEASE AVAILABLE
               </Badge>
               
               <h1 className={cn("text-6xl md:text-8xl font-bold text-gray-800 mb-8 leading-tight", MinecartLCD.className)}>
                 BUILD THE 
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-green-500">
                   {" "}FUTURE
                 </span>
               </h1>
               
               <p className={cn("text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed", MinecartLCD.className)}>
                 THE MOST POWERFUL PLATFORM FOR BUILDING MODERN APPLICATIONS. 
                 START SHIPPING FASTER WITH OUR COMPREHENSIVE TOOLKIT AND AI-POWERED FEATURES.
               </p>
               
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <Button size="lg" className={cn("bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg transition-colors", MinecartLCD.className)}>
                   GET STARTED FREE
                   <ArrowRight className="ml-2 h-5 w-5" />
                 </Button>
                 <Button size="lg" variant="outline" className={cn("border-gray-400 text-gray-700 hover:bg-gray-100 px-8 py-4 text-lg transition-colors", MinecartLCD.className)}>
                   WATCH DEMO
                 </Button>
               </div>
             </motion.div>
           </div>
         </section>

                 {/* Features Section */}
         <section className="py-24 px-6">
           <div className="container mx-auto max-w-6xl">
             <motion.div
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               transition={{ duration: 1.2, ease: "easeOut" }}
               className="text-center mb-16"
             >
               <h2 className={cn("text-4xl md:text-5xl font-bold text-gray-800 mb-6", MinecartLCD.className)}>
                 WHY CHOOSE OUR PLATFORM?
               </h2>
               <p className={cn("text-xl text-gray-600 max-w-3xl mx-auto", MinecartLCD.className)}>
                 BUILT BY DEVELOPERS, FOR DEVELOPERS. EVERY FEATURE IS DESIGNED TO ENHANCE YOUR WORKFLOW.
               </p>
             </motion.div>

             <div className="grid md:grid-cols-3 gap-8">
               {features.map((feature, index) => (
                 <motion.div
                   key={feature.title}
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   transition={{ duration: 1.0, delay: index * 0.3, ease: "easeOut" }}
                 >
                   <Card className="bg-white/70 border-orange-200 hover:bg-white/90 transition-all duration-500 shadow-sm">
                     <CardHeader>
                       <div className="text-orange-500 mb-4">{feature.icon}</div>
                       <CardTitle className={cn("text-gray-800 text-xl", MinecartLCD.className)}>{feature.title.toUpperCase()}</CardTitle>
                     </CardHeader>
                     <CardContent>
                       <p className={cn("text-gray-600", MinecartLCD.className)}>{feature.description.toUpperCase()}</p>
                     </CardContent>
                   </Card>
                 </motion.div>
               ))}
             </div>
           </div>
         </section>

                 {/* Testimonials Section */}
         <section className="py-24 px-6 bg-gradient-to-r from-yellow-100/50 to-green-100/50">
           <div className="container mx-auto max-w-6xl">
             <motion.div
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               transition={{ duration: 1.2, ease: "easeOut" }}
               className="text-center mb-16"
             >
               <h2 className={cn("text-4xl md:text-5xl font-bold text-gray-800 mb-6", MinecartLCD.className)}>
                 LOVED BY DEVELOPERS
               </h2>
             </motion.div>

             <div className="grid md:grid-cols-2 gap-8">
               {testimonials.map((testimonial, index) => (
                 <motion.div
                   key={testimonial.name}
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   transition={{ duration: 1.0, delay: index * 0.3, ease: "easeOut" }}
                 >
                   <Card className="bg-white/80 border-yellow-200 shadow-sm">
                     <CardContent className="pt-6">
                       <div className="flex mb-4">
                         {[...Array(testimonial.rating)].map((_, i) => (
                           <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                         ))}
                       </div>
                       <p className={cn("text-gray-700 mb-4 text-lg", MinecartLCD.className)}>"{testimonial.content.toUpperCase()}"</p>
                       <div>
                         <p className={cn("text-gray-800 font-semibold", MinecartLCD.className)}>{testimonial.name.toUpperCase()}</p>
                         <p className={cn("text-gray-600", MinecartLCD.className)}>{testimonial.role.toUpperCase()}</p>
                       </div>
                     </CardContent>
                   </Card>
                 </motion.div>
               ))}
             </div>
           </div>
         </section>

        {/* Pricing Section */}
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-center mb-16"
            >
              <h2 className={cn("text-4xl md:text-5xl font-bold text-gray-800 mb-6", MinecartLCD.className)}>
                SIMPLE, TRANSPARENT PRICING
              </h2>
              <p className={cn("text-xl text-gray-600", MinecartLCD.className)}>
                CHOOSE THE PLAN THAT WORKS BEST FOR YOUR TEAM
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1.0, delay: index * 0.3, ease: "easeOut" }}
                >
                  <Card className={`bg-white/70 border-orange-200 relative shadow-sm ${plan.popular ? 'ring-2 ring-green-400' : ''}`}>
                    {plan.popular && (
                      <Badge className={cn("absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-800 border border-green-200", MinecartLCD.className)}>
                        MOST POPULAR
                      </Badge>
                    )}
                    <CardHeader>
                      <CardTitle className={cn("text-gray-800 text-2xl", MinecartLCD.className)}>{plan.name.toUpperCase()}</CardTitle>
                      <div className={cn("text-4xl font-bold text-gray-800", MinecartLCD.className)}>
                        {plan.price}
                        <span className="text-lg text-gray-600">/MONTH</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, i) => (
                          <li key={i} className={cn("flex items-center text-gray-600", MinecartLCD.className)}>
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                            {feature.toUpperCase()}
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className={cn(`w-full transition-colors ${plan.popular ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`, MinecartLCD.className)}
                        size="lg"
                      >
                        GET STARTED
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 bg-gradient-to-r from-orange-100 to-green-100">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <h2 className={cn("text-4xl md:text-5xl font-bold text-gray-800 mb-6", MinecartLCD.className)}>
                READY TO GET STARTED?
              </h2>
              <p className={cn("text-xl text-gray-700 mb-8", MinecartLCD.className)}>
                JOIN THOUSANDS OF DEVELOPERS BUILDING THE FUTURE WITH OUR PLATFORM
              </p>
              <Button size="lg" className={cn("bg-orange-500 text-white hover:bg-orange-600 px-8 py-4 text-lg transition-colors", MinecartLCD.className)}>
                START BUILDING TODAY
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Demo Footer */}
        <footer className="bg-gray-100 py-12 px-6 border-t border-gray-200">
          <div className="container mx-auto max-w-6xl text-center">
            <h3 className={cn("text-2xl font-bold text-gray-800 mb-4", MinecartLCD.className)}>
              THIS IS A LIVE DEMO
            </h3>
            <p className={cn("text-gray-600 mb-6", MinecartLCD.className)}>
              YOU'RE VIEWING THE ACTUAL LANDING PAGE COMPONENT IN ACTION. ALL INTERACTIONS AND ANIMATIONS ARE FULLY FUNCTIONAL.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/templates/landing">
                <Button variant="outline" className={cn("border-orange-400 text-orange-600 hover:bg-orange-500 hover:text-white transition-colors", MinecartLCD.className)}>
                  VIEW TEMPLATE CODE
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/templates">
                <Button className={cn("bg-orange-500 hover:bg-orange-600 text-white transition-colors", MinecartLCD.className)}>
                  BROWSE MORE TEMPLATES
                </Button>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
} 