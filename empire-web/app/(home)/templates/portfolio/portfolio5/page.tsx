"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Copy, CheckCircle } from "lucide-react";
import { Navbar } from "@/components/common/navbar";
import { EmpireFooter } from "@/components/common/empire-footer";
import { MinecartLCD } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ResponsiveWrapper } from "@/components/common/responsive-wrapper";
import { useNavigation } from "@/lib/hooks/use-navigation";

const tabsData = [
  {
    id: "preview",
    label: "PREVIEW",
    content: (
      <div className="relative w-full h-[600px] bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 border-4 border-dotted border-orange-600 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h3 className={cn("text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4", MinecartLCD.className)}>
              MIKE JOHNSON
            </h3>
            <p className={cn("text-blue-600 mb-6", MinecartLCD.className)}>
              FULL-STACK FREELANCER & CONSULTANT
            </p>
            <div className="bg-white p-4 rounded-lg max-w-md mx-auto border-2 border-cyan-200">
              <div className="text-2xl font-bold text-cyan-600">$50/HOUR</div>
              <div className="text-sm text-gray-600">WEB DEVELOPMENT</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "cli",
    label: "CLI",
    content: (
      <div className="bg-gray-900 text-green-400 p-6 rounded-none font-mono text-sm border-4 border-dotted border-orange-600">
        <div className="mb-4">
          <span className="text-gray-500"># Install dependencies</span>
        </div>
        <div className="mb-2">npx create-next-app@latest freelancer-portfolio</div>
        <div className="mb-2">cd freelancer-portfolio</div>
        <div className="mb-4">npm install framer-motion lucide-react</div>
        <div className="mb-4">
          <span className="text-gray-500"># Install Empire UI</span>
        </div>
        <div className="mb-2">npm install @empire-ui/components</div>
        <div className="mb-4">npm install tailwindcss postcss autoprefixer</div>
        <div className="mb-4">
          <span className="text-gray-500"># Run development server</span>
        </div>
        <div>npm run dev</div>
      </div>
    )
  },
  {
    id: "code",
    label: "CODE", 
    content: (
      <div className="bg-gray-900 text-gray-300 p-6 rounded-none font-mono text-sm border-4 border-dotted border-orange-600 max-h-[600px] overflow-y-auto">
        <pre className="whitespace-pre-wrap">
{`// Freelancer Portfolio Component
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, Check, Mail } from 'lucide-react';

export default function FreelancerPortfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-6">
              MIKE JOHNSON
            </h1>
            <p className="text-2xl text-blue-600 mb-8">
              FULL-STACK FREELANCER & CONSULTANT
            </p>
            <div className="flex justify-center gap-2 mb-8">
              {[1,2,3,4,5].map(star => (
                <Star key={star} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
              <span className="ml-2 text-gray-600">5.0 (127 REVIEWS)</span>
            </div>
            
            <Button className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3">
              <Mail className="mr-2 h-4 w-4" />
              HIRE ME NOW
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-800">
            FREELANCE SERVICES
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "WEB DEVELOPMENT",
                price: "$50/HOUR",
                features: ["React Development", "Node.js Backend", "Database Design"]
              },
              {
                title: "UI/UX DESIGN", 
                price: "$40/HOUR",
                features: ["Figma Design", "Prototyping", "User Research"]
              },
              {
                title: "CONSULTING",
                price: "$75/HOUR", 
                features: ["Tech Strategy", "Code Review", "Architecture"]
              }
            ].map((service, index) => (
              <Card key={index} className="bg-white border-2 border-cyan-200 p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4">
                  {service.title}
                </h3>
                <div className="text-3xl font-bold text-cyan-600 mb-6">
                  {service.price}
                </div>
                <ul className="space-y-2">
                  {service.features.map(feature => (
                    <li key={feature} className="flex items-center text-gray-600">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6 bg-blue-600 text-white">
                  GET STARTED
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}`}
        </pre>
      </div>
    )
  },
  {
    id: "css",
    label: "CSS",
    content: (
      <div className="bg-gray-900 text-gray-300 p-6 rounded-none font-mono text-sm border-4 border-dotted border-orange-600 max-h-[600px] overflow-y-auto">
        <pre className="whitespace-pre-wrap">
{`/* Freelancer Portfolio Styles */
:root {
  --gradient-cyan: linear-gradient(135deg, #0891b2, #0284c7);
  --bg-light: #f0f9ff;
  --bg-white: #ffffff;
  --text-blue: #1e40af;
  --text-cyan: #0891b2;
  --border-cyan: #22d3ee;
}

.freelancer-portfolio {
  background: linear-gradient(135deg, #ecfeff, #dbeafe, #e0e7ff);
  font-family: 'Inter', sans-serif;
}

/* Hero Section */
.hero-section {
  padding: 5rem 1.5rem;
  text-align: center;
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  background: var(--gradient-cyan);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: var(--text-blue);
  margin-bottom: 2rem;
}

/* Rating Stars */
.rating-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 2rem;
}

.star-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #fbbf24;
  fill: currentColor;
}

/* Service Cards */
.services-section {
  padding: 4rem 1.5rem;
  background: rgba(255, 255, 255, 0.5);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.service-card {
  background: var(--bg-white);
  border: 2px solid var(--border-cyan);
  border-radius: 0.5rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.service-card:hover {
  border-color: var(--text-blue);
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(14, 165, 233, 0.15);
}

.service-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-blue);
  margin-bottom: 1rem;
}

.service-price {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-cyan);
  margin-bottom: 1.5rem;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
}

.feature-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  color: #6b7280;
}

.check-icon {
  width: 1rem;
  height: 1rem;
  color: #10b981;
  margin-right: 0.5rem;
}

/* Buttons */
.btn-primary {
  background: var(--text-blue);
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  transition: background 0.3s ease;
  cursor: pointer;
}

.btn-primary:hover {
  background: #1d4ed8;
}

.btn-full-width {
  width: 100%;
  margin-top: 1.5rem;
}

/* Contact Section */
.contact-section {
  background: var(--text-blue);
  color: white;
  padding: 4rem 1.5rem;
  text-align: center;
}

.contact-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.contact-description {
  font-size: 1.125rem;
  color: rgba(147, 197, 253, 1);
  margin-bottom: 2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .service-price {
    font-size: 1.5rem;
  }
}`}
        </pre>
      </div>
    )
  }
];

export default function Portfolio5Page() {
  const [activeTab, setActiveTab] = React.useState("preview");
  const [copied, setCopied] = React.useState<string | null>(null);
  const { navigateTo } = useNavigation();

  const copyToClipboard = (content: string, type: string) => {
    navigator.clipboard.writeText(content);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const activeTabData = tabsData.find(tab => tab.id === activeTab);

  return (
    <ResponsiveWrapper>
      <div className="min-h-screen relative bg-gradient-to-br from-yellow-50 via-orange-50 to-green-50" style={{ marginTop: '-15px' }}>
        <Navbar />
      
        <div className="container mx-auto px-6 py-16 max-w-7xl relative z-10">
          {/* Back Navigation */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              onClick={() => navigateTo("/templates/portfolio")}
              variant="outline" 
              className={cn(
                "bg-orange-100 text-orange-900 hover:bg-orange-200 border-2 border-dotted border-orange-600 rounded-none transition-all",
                MinecartLCD.className
              )}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              BACK TO PORTFOLIO TEMPLATES
            </Button>
          </motion.div>

          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1 
              className={cn("text-4xl md:text-5xl font-bold mb-4 text-orange-900", MinecartLCD.className)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              FREELANCER HUB PORTFOLIO
            </motion.h1>
            <motion.p 
              className={cn("text-lg text-orange-800 max-w-3xl mx-auto", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              LIGHT MODERN PORTFOLIO FOR FREELANCERS WITH SERVICE PACKAGES AND TESTIMONIALS
            </motion.p>
            
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Badge className="bg-cyan-100 text-cyan-800 border border-dotted border-cyan-600 rounded-none">
                LIGHT MODERN
              </Badge>
              <Badge className="bg-orange-200 text-orange-900 border border-dotted border-orange-600 rounded-none">
                FREELANCER
              </Badge>
              <Badge className="bg-orange-200 text-orange-900 border border-dotted border-orange-600 rounded-none">
                SERVICES
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={() => navigateTo("/templates/portfolio/portfolio5/demo")}
              className={cn(
                "bg-orange-600 text-white hover:bg-orange-700 border-2 border-dotted border-orange-800 rounded-none transition-all",
                MinecartLCD.className
              )}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              VIEW LIVE DEMO
            </Button>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              {tabsData.map(tab => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "outline"}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    activeTab === tab.id 
                      ? "bg-orange-600 text-white" 
                      : "bg-orange-100 text-orange-900 hover:bg-orange-200",
                    "px-6 py-3 rounded-none transition-all border-2 border-dotted border-orange-600",
                    MinecartLCD.className
                  )}
                >
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-12"
          >
            <div className="relative">
              {activeTabData?.content}
              
              {/* Copy Button for Code/CLI/CSS tabs */}
              {(activeTab === "cli" || activeTab === "code" || activeTab === "css") && (
                <Button
                  onClick={() => {
                    const content = activeTab === "cli" 
                      ? "npx create-next-app@latest freelancer-portfolio\ncd freelancer-portfolio\nnpm install framer-motion lucide-react\nnpm install @empire-ui/components\nnpm install tailwindcss postcss autoprefixer\nnpm run dev"
                      : activeTab === "code"
                      ? "// Freelancer Portfolio Component Code"
                      : "/* Freelancer Portfolio CSS Styles */";
                    copyToClipboard(content as string, activeTab);
                  }}
                  className={cn(
                    "absolute top-4 right-4 bg-orange-600 text-white hover:bg-orange-700 border border-dotted border-white rounded-none",
                    MinecartLCD.className
                  )}
                  size="sm"
                >
                  {copied === activeTab ? (
                    <>
                      <CheckCircle className="mr-1 h-3 w-3" />
                      COPIED
                    </>
                  ) : (
                    <>
                      <Copy className="mr-1 h-3 w-3" />
                      COPY
                    </>
                  )}
                </Button>
              )}
            </div>
          </motion.div>
        </div>
        
        <EmpireFooter />
      </div>
    </ResponsiveWrapper>
  );
} 