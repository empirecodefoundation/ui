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
      <div className="relative w-full h-[600px] bg-gray-50 border-4 border-dotted border-orange-600 overflow-hidden">
        <div className="absolute inset-0 bg-white p-8 flex items-center">
          <div className="w-full">
            <h3 className={cn("text-4xl font-bold text-gray-900 mb-4", MinecartLCD.className)}>
              ROBERT ANDERSON
            </h3>
            <p className={cn("text-blue-600 mb-4", MinecartLCD.className)}>
              CHIEF EXECUTIVE OFFICER
            </p>
            <div className="bg-blue-600 text-white p-4 rounded-lg max-w-md">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold">15+</div>
                  <div className="text-xs">YEARS</div>
                </div>
                <div>
                  <div className="text-xl font-bold">500M+</div>
                  <div className="text-xs">REVENUE</div>
                </div>
              </div>
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
        <div className="mb-2">npx create-next-app@latest business-portfolio</div>
        <div className="mb-2">cd business-portfolio</div>
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
{`// Professional Business Portfolio Component
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Building, Users, Award } from 'lucide-react';

export default function BusinessPortfolio() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              ROBERT ANDERSON
            </h1>
            <p className="text-xl text-blue-600 mb-4">
              CHIEF EXECUTIVE OFFICER
            </p>
            <p className="text-lg text-gray-700 mb-8">
              Leading strategic initiatives for over 15 years
            </p>
            <div className="flex gap-4">
              <Button className="bg-blue-600 text-white">
                <Building className="mr-2 h-4 w-4" />
                ABOUT COMPANY
              </Button>
            </div>
          </motion.div>
          <div className="bg-blue-600 p-8 rounded-2xl text-white">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-blue-200">YEARS</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">500M+</div>
                <div className="text-blue-200">REVENUE</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            CORE SERVICES
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "STRATEGIC PLANNING",
                icon: <Award className="h-8 w-8" />,
                desc: "Business strategy development"
              },
              {
                title: "LEADERSHIP CONSULTING", 
                icon: <Users className="h-8 w-8" />,
                desc: "Executive coaching programs"
              },
              {
                title: "OPERATIONAL EXCELLENCE",
                icon: <Building className="h-8 w-8" />,
                desc: "Process optimization"
              }
            ].map((service, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="text-blue-600 mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
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
{`/* Professional Business Portfolio Styles */
:root {
  --primary-blue: #2563eb;
  --secondary-blue: #1d4ed8;
  --accent-blue: #3b82f6;
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-900: #111827;
}

.business-portfolio {
  font-family: 'Inter', sans-serif;
  background: var(--gray-50);
  color: var(--gray-900);
}

/* Hero Section */
.hero-section {
  background: white;
  padding: 5rem 1.5rem;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 1.5rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--primary-blue);
  margin-bottom: 1rem;
}

.stats-card {
  background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
  padding: 2rem;
  border-radius: 1rem;
  color: white;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  text-align: center;
}

/* Service Cards */
.services-section {
  padding: 4rem 1.5rem;
  background: var(--gray-50);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.service-card {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  text-align: center;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.service-card:hover {
  border-color: var(--primary-blue);
  box-shadow: 0 10px 25px rgba(37, 99, 235, 0.1);
  transform: translateY(-4px);
}

.service-icon {
  color: var(--primary-blue);
  margin-bottom: 1rem;
  display: inline-block;
}

/* Buttons */
.btn-primary {
  background: var(--primary-blue);
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 0.375rem;
  border: none;
  font-weight: 600;
  transition: background 0.3s ease;
}

.btn-primary:hover {
  background: var(--secondary-blue);
}

.btn-outline {
  background: transparent;
  color: var(--primary-blue);
  border: 2px solid var(--primary-blue);
  padding: 0.75rem 2rem;
  border-radius: 0.375rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-outline:hover {
  background: var(--primary-blue);
  color: white;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* Contact Section */
.contact-section {
  background: var(--primary-blue);
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
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
}`}
        </pre>
      </div>
    )
  }
];

export default function Portfolio3Page() {
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
              PROFESSIONAL BUSINESS PORTFOLIO
            </motion.h1>
            <motion.p 
              className={cn("text-lg text-orange-800 max-w-3xl mx-auto", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              CORPORATE PORTFOLIO FOR BUSINESS EXECUTIVES WITH PROFESSIONAL DESIGN AND CLEAN LAYOUT
            </motion.p>
            
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Badge className="bg-blue-100 text-blue-800 border border-dotted border-blue-600 rounded-none">
                PROFESSIONAL
              </Badge>
              <Badge className="bg-orange-200 text-orange-900 border border-dotted border-orange-600 rounded-none">
                BUSINESS
              </Badge>
              <Badge className="bg-orange-200 text-orange-900 border border-dotted border-orange-600 rounded-none">
                EXECUTIVE
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={() => navigateTo("/templates/portfolio/portfolio3/demo")}
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
                      ? "npx create-next-app@latest business-portfolio\ncd business-portfolio\nnpm install framer-motion lucide-react\nnpm install @empire-ui/components\nnpm install tailwindcss postcss autoprefixer\nnpm run dev"
                      : activeTab === "code"
                      ? "// Professional Business Portfolio Component Code"
                      : "/* Professional Business Portfolio CSS Styles */";
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