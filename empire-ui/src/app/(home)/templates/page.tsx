"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink, Calendar, BarChart3, FileCode, Layout, Layers, Shield, Zap } from "lucide-react";

const templates = [
  {
    id: "landing",
    title: "Landing Page",
    description: "A modern landing page with animations, pricing tables, and testimonials sections for AI-powered products.",
    image: "/assets/images/landing-template.jpg",
    icon: <Layout className="w-10 h-10 text-indigo-500" />,
    category: "Marketing",
    tags: ["Featured", "UI/UX"],
    href: "/templates/landing"
  },
  {
    id: "dashboard",
    title: "AI Dashboard",
    description: "A comprehensive analytics dashboard for monitoring AI models, usage stats, and performance metrics.",
    image: "/assets/images/dashboard-template.jpg",
    icon: <BarChart3 className="w-10 h-10 text-blue-500" />,
    category: "Admin",
    tags: ["Popular", "Analytics"],
    href: "/templates/dashboard"
  },
  {
    id: "ocr",
    title: "OCR Application",
    description: "Image text extraction app with AI-powered analysis for processing documents and images.",
    image: "/assets/images/ocr-template.jpg",
    icon: <FileCode className="w-10 h-10 text-purple-500" />,
    category: "Tool",
    tags: ["Utility"],
    href: "/templates/ocr"
  },
  {
    id: "ai-interface",
    title: "AI Interface",
    description: "A clean, modern interface for interacting with AI assistants and large language models.",
    image: "/assets/images/ai-interface-template.jpg",
    icon: <MessageSquare className="w-10 h-10 text-green-500" />,
    category: "AI",
    tags: ["Featured", "Chat"],
    href: "/templates/ai-interface"
  },
  {
    id: "analytics",
    title: "Analytics Platform",
    description: "Data visualization and analytics platform for monitoring AI model performance and user engagement.",
    image: "/assets/images/analytics-template.jpg",
    icon: <Layers className="w-10 h-10 text-yellow-500" />,
    category: "Analytics",
    tags: ["Data", "Charts"],
    href: "/templates/analytics"
  },
  {
    id: "startup",
    title: "Startup Launch",
    description: "Beautiful startup landing page with subscription forms, feature highlights, and responsive design.",
    image: "/assets/images/startup-template.jpg",
    icon: <Zap className="w-10 h-10 text-red-500" />,
    category: "Marketing",
    tags: ["New", "Features"],
    href: "/templates/startup"
  },
  {
    id: "admin",
    title: "Admin Portal",
    description: "Comprehensive admin interface for managing users, content, and settings for AI applications.",
    image: "/assets/images/admin-template.jpg",
    icon: <Shield className="w-10 h-10 text-emerald-500" />,
    category: "Admin",
    tags: ["Management", "Settings"],
    href: "/templates/admin"
  },
  {
    id: "calendar",
    title: "AI Calendar",
    description: "Smart calendar application with AI scheduling assistant and intuitive event management.",
    image: "/assets/images/calendar-template.jpg",
    icon: <Calendar className="w-10 h-10 text-orange-500" />,
    category: "Tool",
    tags: ["Productivity", "New"],
    href: "/templates/calendar"
  }
];

// For placeholder images when real ones aren't available
function getPlaceholderGradient(id: string): string {
  const gradients = [
    "from-slate-800 to-slate-900",
    "from-gray-900 to-blue-950",
    "from-slate-900 to-zinc-900",
    "from-zinc-900 to-neutral-900",
    "from-neutral-900 to-stone-900",
    "from-stone-900 to-gray-900",
    "from-gray-900 to-slate-950",
    "from-slate-950 to-zinc-950"
  ];
  
  return gradients[templates.findIndex(t => t.id === id) % gradients.length];
}

// Tag colors - using more subtle space-themed colors
function getTagColor(tag: string): string {
  switch(tag) {
    case "Featured": return "bg-indigo-900/60 text-indigo-300 dark:bg-indigo-950 dark:text-indigo-300";
    case "Popular": return "bg-purple-900/60 text-purple-300 dark:bg-purple-950 dark:text-purple-300";
    case "New": return "bg-blue-900/60 text-blue-300 dark:bg-blue-950 dark:text-blue-300";
    default: return "bg-gray-800/60 text-gray-300 dark:bg-gray-900 dark:text-gray-300";
  }
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
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 background-stars">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Ready-to-Use Templates
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Jump-start your next project with our beautiful, responsive templates
            powered by Empire UI components.
          </motion.p>
        </div>
        
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-12">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search templates..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-800 focus:ring-2 focus:ring-indigo-600 bg-gray-900 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-indigo-900 hover:bg-indigo-800 text-white" : "border-gray-700 text-gray-400 hover:text-white"}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-gray-900 border-gray-800 hover:border-gray-700">
                <CardContent className="p-0">
                  <div className="relative h-48 w-full overflow-hidden">
                    {/* Replace with actual images when available */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${getPlaceholderGradient(template.id)}`}></div>
                    <div className="absolute inset-0 flex items-center justify-center text-white opacity-50">
                      {template.icon}
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-white">{template.title}</h3>
                      <span className="text-xs text-gray-500 px-2 py-1 bg-gray-800 rounded-full ml-2">
                        {template.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {template.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {template.tags.map(tag => (
                        <span 
                          key={tag} 
                          className={`text-xs px-2 py-1 rounded-full ${getTagColor(tag)}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Link href={template.href} passHref>
                        <Button variant="default" className="bg-gray-800 hover:bg-gray-700 text-white">
                          View Template
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* No Results */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-20">
            <div className="text-gray-600 mb-4">
              <SearchX className="mx-auto h-12 w-12" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">No templates found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="border-gray-700 text-gray-400 hover:text-white"
            >
              Clear Filters
            </Button>
          </div>
        )}
        
        {/* Call to Action */}
        <div className="mt-20 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white border border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Create Your Own Template</h2>
              <p className="text-gray-400 max-w-lg">
                Have an idea for a new template? We welcome contributions from the community.
                Build your own template using Empire UI components and share it with others.
              </p>
            </div>
            <Button 
              variant="secondary" 
              size="lg" 
              className="bg-indigo-900 hover:bg-indigo-800 text-white py-6 px-8 border-none"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Missing components
function MessageSquare(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function SearchX(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}

function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* Add CSS for space background */
const styles = `
  .background-stars {
    background-color: #000;
    background-image: 
      radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 40px),
      radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 30px),
      radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 40px),
      radial-gradient(rgba(255,255,255,.4), rgba(255,255,255,.1) 2px, transparent 30px);
    background-size: 550px 550px, 350px 350px, 250px 250px, 150px 150px;
    background-position: 0 0, 40px 60px, 130px 270px, 70px 100px;
  }
`;
