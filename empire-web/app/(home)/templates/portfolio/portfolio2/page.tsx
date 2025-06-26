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
      <div className="relative w-full h-[600px] bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 border-4 border-dotted border-orange-600 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h3 className={cn("text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-4", MinecartLCD.className)}>
              SARAH MARTINEZ
            </h3>
            <p className={cn("text-purple-600 mb-6", MinecartLCD.className)}>
              CREATIVE DESIGNER & VISUAL STORYTELLER
            </p>
            <div className="flex justify-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-400 rounded-lg"></div>
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-lg"></div>
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg"></div>
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
        <div className="mb-2">npx create-next-app@latest creative-portfolio</div>
        <div className="mb-2">cd creative-portfolio</div>
        <div className="mb-4">npm install framer-motion lucide-react @headlessui/react</div>
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
{`// components/CreativePortfolio.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Palette, Mail, Instagram, Dribbble, Sparkles } from 'lucide-react';

export default function CreativePortfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-4">
                SARAH MARTINEZ
              </h1>
              <Sparkles className="absolute -top-4 -right-4 text-pink-400 h-8 w-8 animate-pulse" />
            </div>
          </motion.div>
          
          <motion.p 
            className="text-2xl text-purple-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            CREATIVE DESIGNER & VISUAL STORYTELLER
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4 justify-center"
          >
            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3">
              <Palette className="mr-2 h-4 w-4" />
              VIEW MY WORK
            </Button>
            <Button variant="outline" className="border-purple-600 text-purple-600 px-8 py-3">
              <Mail className="mr-2 h-4 w-4" />
              LET'S COLLABORATE
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-purple-800 mb-12 text-center">
            FEATURED WORK
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "REBRAND PROJECT",
                category: "BRAND IDENTITY",
                gradient: "from-pink-400 to-red-400"
              },
              {
                title: "DIGITAL ARTWORK", 
                category: "ILLUSTRATION",
                gradient: "from-purple-400 to-indigo-400"
              },
              {
                title: "PACKAGE DESIGN",
                category: "PRODUCT DESIGN", 
                gradient: "from-green-400 to-teal-400"
              }
            ].map((project, index) => (
              <Card 
                key={index}
                className="border-2 border-purple-200 hover:border-purple-400 transition-all overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className={\`h-48 bg-gradient-to-br \${project.gradient}\`}>
                    <div className="p-4">
                      <Badge className="bg-white/90 text-purple-600">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-purple-800 mb-2">
                      {project.title}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-purple-800 mb-12 text-center">
            CREATIVE SERVICES
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "BRAND IDENTITY",
                icon: "🎨",
                desc: "Logo design, brand guidelines, visual systems"
              },
              {
                title: "DIGITAL ART",
                icon: "✨", 
                desc: "Custom illustrations, digital paintings"
              },
              {
                title: "PRINT DESIGN",
                icon: "📄",
                desc: "Posters, brochures, packaging design"
              },
              {
                title: "UI/UX DESIGN",
                icon: "💻",
                desc: "Website design, mobile apps, UX research"
              }
            ].map((service, index) => (
              <Card key={index} className="text-center p-6 border-2 border-purple-200">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold text-purple-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-purple-600 text-sm">
                  {service.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-6 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            LET'S CREATE MAGIC TOGETHER
          </h2>
          <p className="text-purple-100 mb-8 text-lg">
            Ready to bring your creative visions to life?
          </p>
          <Button className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3">
            <Mail className="mr-2 h-4 w-4" />
            START A PROJECT
          </Button>
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
{`/* styles/creative-portfolio.css */

/* Colorful creative theme */
:root {
  --gradient-primary: linear-gradient(135deg, #ec4899, #8b5cf6, #6366f1);
  --gradient-secondary: linear-gradient(135deg, #f97316, #eab308, #22c55e);
  --bg-light: #fdf2f8;
  --bg-purple: #f3e8ff;
  --bg-indigo: #eef2ff;
  --text-primary: #581c87;
  --text-secondary: #7c3aed;
  --text-accent: #ec4899;
}

/* Base styles */
.creative-portfolio {
  background: linear-gradient(135deg, var(--bg-light), var(--bg-purple), var(--bg-indigo));
  color: var(--text-primary);
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
}

/* Gradient text effects */
.gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradientShift 3s ease-in-out infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Creative cards */
.creative-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 2px solid #e879f9;
  border-radius: 16px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.creative-card:hover {
  transform: translateY(-8px) rotate(1deg);
  border-color: #c084fc;
  box-shadow: 0 25px 50px rgba(139, 92, 246, 0.15);
}

/* Portfolio project cards */
.project-card {
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s ease;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(15px);
}

.project-card:hover {
  transform: scale(1.05) rotate(-1deg);
  box-shadow: 0 30px 60px rgba(236, 72, 153, 0.2);
}

/* Gradient backgrounds for projects */
.gradient-pink { background: linear-gradient(135deg, #f472b6, #ec4899, #be185d); }
.gradient-purple { background: linear-gradient(135deg, #a78bfa, #8b5cf6, #7c3aed); }
.gradient-indigo { background: linear-gradient(135deg, #818cf8, #6366f1, #4f46e5); }
.gradient-green { background: linear-gradient(135deg, #4ade80, #22c55e, #16a34a); }
.gradient-blue { background: linear-gradient(135deg, #60a5fa, #3b82f6, #2563eb); }
.gradient-orange { background: linear-gradient(135deg, #fb923c, #f97316, #ea580c); }

/* Service cards */
.service-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border: 2px solid #e879f9;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--gradient-primary);
  transform: translateY(-100%);
  transition: transform 0.3s ease;
}

.service-card:hover::before {
  transform: translateY(0);
}

.service-card:hover {
  transform: translateY(-4px);
  border-color: #c084fc;
}

/* Buttons */
.btn-gradient {
  background: var(--gradient-primary);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-gradient:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(236, 72, 153, 0.3);
}

.btn-outline-creative {
  background: transparent;
  color: var(--text-secondary);
  border: 2px solid var(--text-secondary);
  padding: 0.75rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-outline-creative:hover {
  background: var(--text-secondary);
  color: white;
  transform: translateY(-2px);
}

/* Animated elements */
.floating-element {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.sparkle {
  animation: sparkle 2s ease-in-out infinite;
}

@keyframes sparkle {
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
}

/* Stats section */
.stats-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(15px);
  border: 2px solid #e879f9;
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  transition: all 0.3s ease;
}

.stats-number {
  font-size: 3rem;
  font-weight: 700;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Responsive design */
@media (max-width: 768px) {
  .gradient-text {
    font-size: 2.5rem;
  }
  
  .project-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .service-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: var(--gradient-primary);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--gradient-secondary);
}`}
        </pre>
      </div>
    )
  }
];

export default function Portfolio2Page() {
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
              CREATIVE DESIGNER PORTFOLIO
            </motion.h1>
            <motion.p 
              className={cn("text-lg text-orange-800 max-w-3xl mx-auto", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              VIBRANT COLORFUL PORTFOLIO FOR CREATIVE DESIGNERS WITH GRADIENT EFFECTS AND VISUAL STORYTELLING
            </motion.p>
            
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Badge className="bg-pink-100 text-pink-800 border border-dotted border-pink-600 rounded-none">
                COLORFUL
              </Badge>
              <Badge className="bg-orange-200 text-orange-900 border border-dotted border-orange-600 rounded-none">
                CREATIVE
              </Badge>
              <Badge className="bg-orange-200 text-orange-900 border border-dotted border-orange-600 rounded-none">
                DESIGNER
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={() => navigateTo("/templates/portfolio/portfolio2/demo")}
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
                      ? "npx create-next-app@latest creative-portfolio\ncd creative-portfolio\nnpm install framer-motion lucide-react @headlessui/react\nnpm install @empire-ui/components\nnpm install tailwindcss postcss autoprefixer\nnpm run dev"
                      : activeTab === "code"
                      ? "// Creative Designer Portfolio Component Code"
                      : "/* Creative Portfolio CSS Styles */";
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