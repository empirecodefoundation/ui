"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink, Calendar, BarChart3, FileCode, Layout, Layers, Shield, Zap, MessageSquare } from "lucide-react";
import { Navbar } from "@/components/common/navbar";
import { EmpireFooter } from "@/components/common/empire-footer";
import { MinecartLCD } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import PixelTransition from "@/components/ui/PixelTransition";
import Particles from "@/components/ui/particles";
import { ResponsiveWrapper } from "@/components/common/responsive-wrapper";
import Dither from "@/components/ui/Dither";

// Import illustrations
import img1 from "@/illustrations/img1.png";
import img2 from "@/illustrations/img2.png";
import img3 from "@/illustrations/img3.png";
import img4 from "@/illustrations/img4.png";
import img5 from "@/illustrations/img5.png";
import img6 from "@/illustrations/img6.png";
import img7 from "@/illustrations/img7.png";
import img8 from "@/illustrations/img8.png";

// Import hello.jpg for the pixel transition effect
import helloImage from "@/images/hello.jpg";

const templates = [
  {
    id: "landing",
    title: "Landing Page",
    description: "A modern landing page with animations, pricing tables, and testimonials sections for AI-powered products.",
    image: "/assets/images/landing-template.jpg",
    icon: <Image src={img1} alt="Landing Page" width={180} height={180} className="object-contain" />,
    category: "Marketing",
    tags: ["Featured", "UI/UX"],
    href: "/templates/landing"
  },
  {
    id: "dashboard",
    title: "AI Dashboard", 
    description: "A comprehensive analytics dashboard for monitoring AI models, usage stats, and performance metrics.",
    image: "/assets/images/dashboard-template.jpg",
    icon: <Image src={img2} alt="AI Dashboard" width={180} height={180} className="object-contain" />,
    category: "Admin",
    tags: ["Popular", "Analytics"],
    href: "/templates/dashboard"
  },
  {
    id: "ocr",
    title: "OCR Application",
    description: "Image text extraction app with AI-powered analysis for processing documents and images.",
    image: "/assets/images/ocr-template.jpg", 
    icon: <Image src={img3} alt="OCR Application" width={180} height={180} className="object-contain" />,
    category: "Tool",
    tags: ["Utility"],
    href: "/templates/ocr"
  },
  {
    id: "ai-interface",
    title: "AI Interface",
    description: "A clean, modern interface for interacting with AI assistants and large language models.",
    image: "/assets/images/ai-interface-template.jpg",
    icon: <Image src={img4} alt="AI Interface" width={180} height={180} className="object-contain" />,
    category: "AI", 
    tags: ["Featured", "Chat"],
    href: "/templates/ai-interface"
  },
  {
    id: "analytics",
    title: "Analytics Platform",
    description: "Data visualization and analytics platform for monitoring AI model performance and user engagement.",
    image: "/assets/images/analytics-template.jpg",
    icon: <Image src={img5} alt="Analytics Platform" width={180} height={180} className="object-contain" />,
    category: "Analytics",
    tags: ["Data", "Charts"],
    href: "/templates/analytics"
  },
  {
    id: "startup",
    title: "Startup Launch", 
    description: "Beautiful startup landing page with subscription forms, feature highlights, and responsive design.",
    image: "/assets/images/startup-template.jpg",
    icon: <Image src={img6} alt="Startup Launch" width={180} height={180} className="object-contain" />,
    category: "Marketing",
    tags: ["New", "Features"],
    href: "/templates/startup"
  },
  {
    id: "admin",
    title: "Admin Portal",
    description: "Comprehensive admin interface for managing users, content, and settings for AI applications.",
    image: "/assets/images/admin-template.jpg",
    icon: <Image src={img7} alt="Admin Portal" width={180} height={180} className="object-contain" />,
    category: "Admin",
    tags: ["Management", "Settings"],
    href: "/templates/admin"
  },
  {
    id: "calendar",
    title: "AI Calendar",
    description: "Smart calendar application with AI scheduling assistant and intuitive event management.",
    image: "/assets/images/calendar-template.jpg",
    icon: <Image src={img8} alt="AI Calendar" width={180} height={180} className="object-contain" />,
    category: "Tool",
    tags: ["Productivity", "New"],
    href: "/templates/calendar"
  }
];

// For placeholder images when real ones aren't available
function getPlaceholderGradient(id: string): string {
  const gradients = [
    "from-indigo-900/40 via-indigo-800/30 to-purple-900/40",
    "from-blue-900/40 via-blue-800/30 to-cyan-900/40", 
    "from-purple-900/40 via-purple-800/30 to-pink-900/40",
    "from-green-900/40 via-green-800/30 to-emerald-900/40",
    "from-yellow-900/40 via-yellow-800/30 to-orange-900/40",
    "from-red-900/40 via-red-800/30 to-pink-900/40",
    "from-emerald-900/40 via-emerald-800/30 to-teal-900/40",
    "from-orange-900/40 via-orange-800/30 to-red-900/40"
  ];
  
  return gradients[templates.findIndex(t => t.id === id) % gradients.length];
}

// Tag colors - Black and white only
function getTagColor(tag: string): string {
  return "bg-white text-black border border-dotted border-white";
}

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  
  // Get unique categories
  const categories = ["All", ...Array.from(new Set(templates.map(template => template.category)))];
  
  // Filter templates based on search and category
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = 
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <ResponsiveWrapper>
      <div className="min-h-screen relative" style={{ marginTop: '-15px' }}>
        {/* Particles Background - Fixed position behind everything */}
        <div className="fixed inset-0 w-full h-full z-[-1]">
          <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
            className="w-full h-full"
          />
        </div>
        
        {/* Navigation */}
        <Navbar />
      
      <div className="container mx-auto px-6 py-16 max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1 
            className={cn("text-5xl md:text-6xl font-bold mb-6 text-white", MinecartLCD.className)}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Ready-to-Use Templates
          </motion.h1>
          <motion.p 
            className={cn("text-xl text-white max-w-4xl mx-auto leading-relaxed", MinecartLCD.className)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Jump-start your next project with our beautiful, responsive templates powered by Empire UI components.
          </motion.p>
        </div>
        
        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-16">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" size={20} />
            <input
              type="text"
              placeholder="Search templates..."
              className={cn(
                "w-full pl-12 pr-4 py-3 rounded-none bg-black text-white placeholder-white transition-all",
                MinecartLCD.className
              )}
              style={{
                border: '4px dotted white'
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  selectedCategory === category 
                    ? "bg-white text-black" 
                    : "bg-black text-white hover:bg-white hover:text-black",
                  "px-4 py-2 rounded-none transition-all",
                  MinecartLCD.className
                )}
                style={{
                  border: '2px dotted white'
                }}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Templates Grid - Responsive 4 columns on large screens, 3 on medium, 2 on small, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <PixelTransition
                firstContent={
                  <Card 
                    className="template-card h-full overflow-hidden bg-black border-4 border-dotted border-white rounded-none"
                  >
                    <CardContent className="p-0">
                      {/* Template Preview Image */}
                      <div className="relative h-52 w-full overflow-hidden bg-black">
                        <div className="absolute inset-0 flex items-center justify-center">
                          {template.icon}
                        </div>
                        <div className="absolute top-3 right-3">
                          <span 
                            className={cn("text-xs px-2 py-1 bg-white text-black rounded-none", MinecartLCD.className)}
                            style={{
                              border: '2px dotted white'
                            }}
                          >
                            {template.category}
                          </span>
                        </div>
                      </div>
                      
                      {/* Template Info */}
                      <div className="p-6">
                        <h3 className={cn("text-xl font-bold text-white mb-3 group-hover:text-white transition-colors", MinecartLCD.className)}>
                          {template.title}
                        </h3>
                        
                        <p className={cn("text-white text-sm mb-4 leading-relaxed line-clamp-3", MinecartLCD.className)}>
                          {template.description}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-5">
                          {template.tags.map(tag => (
                            <span 
                              key={tag} 
                              className={cn("text-xs px-3 py-1 rounded-none bg-white text-black", MinecartLCD.className)}
                              style={{
                                border: '2px dotted white'
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        {/* View Template Button */}
                        <Link href={template.href} passHref>
                          <Button 
                            variant="default" 
                            className={cn(
                              "w-full bg-black text-white hover:bg-white hover:text-black transition-all rounded-none",
                              MinecartLCD.className
                            )}
                            style={{
                              border: '2px dotted white'
                            }}
                          >
                            View Template
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                }
                secondContent={
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0">
                      <Dither
                        waveColor={[0.3, 0.3, 0.3]}
                        disableAnimation={false}
                        enableMouseInteraction={true}
                        mouseRadius={0.3}
                        colorNum={4}
                        waveAmplitude={0.3}
                        waveFrequency={3}
                        waveSpeed={0.05}
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <Link href={template.href} passHref>
                        <Button 
                          variant="default" 
                          className={cn(
                            "bg-white text-black hover:bg-gray-200 hover:scale-105 hover:shadow-lg transition-all duration-300 rounded-none px-6 py-3 text-lg font-bold group",
                            MinecartLCD.className
                          )}
                          style={{
                            border: '2px solid white'
                          }}
                        >
                          VIEW TEMPLATE
                          <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                }
                gridSize={12}
                pixelColor="#ffffff"
                animationStepDuration={0.4}
                className="w-full h-full"
                style={{ width: "100%", height: "100%" }}
              />
            </motion.div>
          ))}
        </div>
        
        {/* No Results */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-20">
            <div className="text-white mb-6">
              <Search className="mx-auto h-16 w-16" />
            </div>
            <h3 className={cn("text-2xl font-bold mb-4 text-white", MinecartLCD.className)}>
              No templates found
            </h3>
            <p className={cn("text-white mb-6 max-w-md mx-auto", MinecartLCD.className)}>
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className={cn("bg-black text-white hover:bg-white hover:text-black rounded-none", MinecartLCD.className)}
              style={{
                border: '2px dotted white'
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
        
        {/* Create Your Own Template Section */}
        <motion.div 
          className="mt-24 bg-black p-8 md:p-12 rounded-none"
          style={{
            border: '6px dotted white'
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h2 className={cn("text-3xl md:text-4xl font-bold mb-4 text-white", MinecartLCD.className)}>
                Create Your Own Template
              </h2>
              <p className={cn("text-white text-lg leading-relaxed max-w-2xl", MinecartLCD.className)}>
                Have an idea for a new template? We welcome contributions from the community. 
                Build your own template using Empire UI components and share it with others.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button 
                size="lg" 
                className={cn(
                  "bg-white text-black hover:bg-black hover:text-white py-4 px-8 text-lg rounded-none transition-all",
                  MinecartLCD.className
                )}
                style={{
                  border: '3px dotted white'
                }}
              >
                Get Started
                <ExternalLink className="ml-3 h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <EmpireFooter />
      </div>
    </ResponsiveWrapper>
  );
}
