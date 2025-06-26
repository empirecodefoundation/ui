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
      <div className="relative w-full h-[600px] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 border-4 border-dotted border-orange-600 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h3 className={cn("text-4xl font-bold text-slate-900 mb-4", MinecartLCD.className)}>
              DR. SARAH CHEN
            </h3>
            <p className={cn("text-slate-700 mb-6", MinecartLCD.className)}>
              DATA SCIENTIST & ML ENGINEER
            </p>
            <div className="bg-white p-4 rounded-lg max-w-md mx-auto border border-slate-200">
              <div className="text-2xl font-bold text-blue-600">99.2% ACCURACY</div>
              <div className="text-sm text-gray-600">MODEL PERFORMANCE</div>
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
        <div className="mb-2">npx create-next-app@latest data-scientist-portfolio</div>
        <div className="mb-2">cd data-scientist-portfolio</div>
        <div className="mb-4">npm install framer-motion lucide-react recharts</div>
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
{`// Data Scientist Portfolio Component
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BarChart3, Brain, Database } from 'lucide-react';

export default function DataScientistPortfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-6xl font-bold text-slate-900 mb-6">
              DR. SARAH CHEN
            </h1>
            <p className="text-2xl text-slate-700 mb-8">
              DATA SCIENTIST & ML ENGINEER
            </p>
            
            <div className="bg-white p-6 rounded-xl max-w-2xl mx-auto border border-slate-200 mb-8">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600">99.2%</div>
                  <div className="text-sm text-gray-600">ACCURACY</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600">50+</div>
                  <div className="text-sm text-gray-600">MODELS</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-600">5TB</div>
                  <div className="text-sm text-gray-600">DATA</div>
                </div>
              </div>
            </div>
            
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              <BarChart3 className="mr-2 h-4 w-4" />
              VIEW PROJECTS
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-slate-900">
            FEATURED PROJECTS
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "FRAUD DETECTION",
                desc: "ML model for financial fraud detection",
                accuracy: "99.2%",
                icon: <Brain className="h-8 w-8" />
              },
              {
                title: "PREDICTIVE ANALYTICS", 
                desc: "Customer behavior prediction system",
                accuracy: "96.8%",
                icon: <BarChart3 className="h-8 w-8" />
              },
              {
                title: "NLP SENTIMENT",
                desc: "Social media sentiment analysis",
                accuracy: "94.5%",
                icon: <Database className="h-8 w-8" />
              }
            ].map((project, index) => (
              <Card key={index} className="bg-slate-50 border-slate-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-blue-600">{project.icon}</div>
                  <div className="text-green-600 font-bold">{project.accuracy}</div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                <p className="text-gray-600">{project.desc}</p>
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
{`/* Data Scientist Portfolio Styles */
:root {
  --gradient-tech: linear-gradient(135deg, #3b82f6, #6366f1);
  --bg-slate: #f8fafc;
  --bg-white: #ffffff;
  --text-slate: #1e293b;
  --text-blue: #2563eb;
}

.data-portfolio {
  background: linear-gradient(135deg, #f8fafc, #eff6ff, #eef2ff);
  font-family: 'Inter', sans-serif;
}

/* Professional tech theme */
.hero-section {
  padding: 5rem 1.5rem;
  text-align: center;
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  color: var(--text-slate);
  margin-bottom: 1.5rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
}

.project-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.15);
}`}
        </pre>
      </div>
    )
  }
];

export default function Portfolio10Page() {
  const [activeTab, setActiveTab] = React.useState("preview");
  const [copiedStates, setCopiedStates] = React.useState<{[key: string]: boolean}>({});
  const { navigateTo } = useNavigation();

  const copyToClipboard = (content: string, type: string) => {
    navigator.clipboard.writeText(content);
    setCopiedStates(prev => ({ ...prev, [type]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [type]: false }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ResponsiveWrapper>
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigateTo("/templates/portfolio")}
                variant="outline"
                size="sm"
                className={cn("border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white", MinecartLCD.className)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                BACK TO PORTFOLIO
              </Button>
              <div>
                <h1 className={cn("text-3xl font-bold text-gray-900", MinecartLCD.className)}>
                  DATA SCIENTIST PORTFOLIO
                </h1>
                <p className={cn("text-gray-600 mt-1", MinecartLCD.className)}>
                  PROFESSIONAL ML & DATA SCIENCE PORTFOLIO
                </p>
              </div>
            </div>
            
            <Button
              onClick={() => navigateTo("/templates/portfolio/portfolio10/demo")}
              className={cn("bg-orange-600 text-white hover:bg-orange-700", MinecartLCD.className)}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              VIEW LIVE DEMO
            </Button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Badge className="bg-blue-100 text-blue-800 border border-blue-300">DATA SCIENCE</Badge>
            <Badge className="bg-indigo-100 text-indigo-800 border border-indigo-300">MACHINE LEARNING</Badge>
            <Badge className="bg-slate-100 text-slate-800 border border-slate-300">ANALYTICS</Badge>
            <Badge className="bg-purple-100 text-purple-800 border border-purple-300">AI</Badge>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-8">
              {tabsData.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "py-2 px-1 border-b-2 font-medium text-sm transition-colors",
                    activeTab === tab.id
                      ? "border-orange-600 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                    MinecartLCD.className
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {activeTab !== "preview" && (
              <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
                <span className={cn("text-sm font-medium text-gray-700", MinecartLCD.className)}>
                  {activeTab === "cli" && "INSTALLATION COMMANDS"}
                  {activeTab === "code" && "REACT COMPONENT"}
                  {activeTab === "css" && "STYLESHEET"}
                </span>
                <Button
                  onClick={() => copyToClipboard("code", activeTab)}
                  variant="outline"
                  size="sm"
                  className={cn("", MinecartLCD.className)}
                >
                  {copiedStates[activeTab] ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      COPIED!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      COPY CODE
                    </>
                  )}
                </Button>
              </div>
            )}
            
            <div className="p-0">
              {tabsData.find(tab => tab.id === activeTab)?.content}
            </div>
          </div>
        </div>
      </ResponsiveWrapper>
      <EmpireFooter />
    </div>
  );
} 