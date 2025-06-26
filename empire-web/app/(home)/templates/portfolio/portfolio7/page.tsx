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
      <div className="relative w-full h-[600px] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-4 border-dotted border-orange-600 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h3 className={cn("text-4xl font-bold text-blue-900 mb-4", MinecartLCD.className)}>
              ALEX THOMPSON
            </h3>
            <p className={cn("text-blue-700 mb-6", MinecartLCD.className)}>
              STARTUP FOUNDER & ENTREPRENEUR
            </p>
            <div className="bg-white p-4 rounded-lg max-w-md mx-auto border border-blue-200">
              <div className="text-2xl font-bold text-green-600">$2M RAISED</div>
              <div className="text-sm text-gray-600">SERIES A FUNDING</div>
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
        <div className="mb-2">npx create-next-app@latest startup-portfolio</div>
        <div className="mb-2">cd startup-portfolio</div>
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
{`// Startup Founder Portfolio Component
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TrendingUp, Users, Award } from 'lucide-react';

export default function StartupPortfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-6xl font-bold text-blue-900 mb-6">
              ALEX THOMPSON
            </h1>
            <p className="text-2xl text-blue-700 mb-8">
              STARTUP FOUNDER & ENTREPRENEUR
            </p>
            
            <div className="bg-white p-6 rounded-xl max-w-2xl mx-auto border border-blue-200 mb-8">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600">$2M</div>
                  <div className="text-sm text-gray-600">RAISED</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">50K</div>
                  <div className="text-sm text-gray-600">USERS</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">3</div>
                  <div className="text-sm text-gray-600">COMPANIES</div>
                </div>
              </div>
            </div>
            
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              <TrendingUp className="mr-2 h-4 w-4" />
              VIEW COMPANIES
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Company History */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">
            ENTREPRENEURIAL JOURNEY
          </h2>
          <div className="space-y-8">
            {[
              {
                year: "2024",
                title: "TECHFLOW AI",
                desc: "AI-powered business automation platform",
                status: "CURRENT",
                metrics: "$2M Series A"
              },
              {
                year: "2021",
                title: "DATASTREAM",
                desc: "Analytics platform for startups",
                status: "ACQUIRED",
                metrics: "$5M Exit"
              },
              {
                year: "2019",
                title: "APPBUILDER",
                desc: "No-code mobile app development",
                status: "SOLD",
                metrics: "$1.2M Exit"
              }
            ].map((company, index) => (
              <Card key={index} className="bg-blue-50 border-blue-200 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm text-blue-600 font-bold">{company.year}</div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">{company.title}</h3>
                    <p className="text-gray-600">{company.desc}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{company.metrics}</div>
                    <div className="text-sm text-gray-500">{company.status}</div>
                  </div>
                </div>
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
{`/* Startup Founder Portfolio Styles */
:root {
  --gradient-blue: linear-gradient(135deg, #3b82f6, #8b5cf6);
  --bg-light: #f8fafc;
  --bg-white: #ffffff;
  --text-blue: #1e40af;
  --text-purple: #7c3aed;
}

.startup-portfolio {
  background: linear-gradient(135deg, #eff6ff, #e0e7ff, #f3e8ff);
  font-family: 'Inter', sans-serif;
}

/* Light entrepreneurial theme */
.hero-section {
  padding: 5rem 1.5rem;
  text-align: center;
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  color: var(--text-blue);
  margin-bottom: 1.5rem;
}

/* Stats Cards */
.stats-card {
  background: var(--bg-white);
  border: 2px solid #dbeafe;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin: 0 auto;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

/* Company Timeline */
.timeline-section {
  padding: 4rem 1.5rem;
  background: var(--bg-white);
}

.company-card {
  background: #eff6ff;
  border: 2px solid #dbeafe;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
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
}

.btn-primary:hover {
  background: #1d4ed8;
}`}
        </pre>
      </div>
    )
  }
];

export default function Portfolio7Page() {
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
              STARTUP FOUNDER PORTFOLIO
            </motion.h1>
            <motion.p 
              className={cn("text-lg text-orange-800 max-w-3xl mx-auto", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              ENTREPRENEURIAL LIGHT PORTFOLIO FOR STARTUP FOUNDERS WITH COMPANY HISTORY AND ACHIEVEMENTS
            </motion.p>
            
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Badge className="bg-blue-100 text-blue-800 border border-dotted border-blue-600 rounded-none">
                ENTREPRENEURIAL
              </Badge>
              <Badge className="bg-orange-200 text-orange-900 border border-dotted border-orange-600 rounded-none">
                STARTUP
              </Badge>
              <Badge className="bg-orange-200 text-orange-900 border border-dotted border-orange-600 rounded-none">
                BUSINESS
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={() => navigateTo("/templates/portfolio/portfolio7/demo")}
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
                      ? "npx create-next-app@latest startup-portfolio\ncd startup-portfolio\nnpm install framer-motion lucide-react\nnpm install @empire-ui/components\nnpm install tailwindcss postcss autoprefixer\nnpm run dev"
                      : activeTab === "code"
                      ? "// Startup Founder Portfolio Component Code"
                      : "/* Startup Founder Portfolio CSS Styles */";
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