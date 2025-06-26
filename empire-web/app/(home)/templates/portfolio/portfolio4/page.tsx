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
      <div className="relative w-full h-[600px] bg-black border-4 border-dotted border-orange-600 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center">
            <h3 className={cn("text-4xl font-bold mb-4", MinecartLCD.className)}>
              EMMA WATSON
            </h3>
            <p className={cn("text-gray-400 mb-6", MinecartLCD.className)}>
              VISUAL STORYTELLER & PHOTOGRAPHER
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded"></div>
              <div className="h-20 bg-gradient-to-br from-blue-900 to-gray-900 rounded"></div>
              <div className="h-20 bg-gradient-to-br from-purple-900 to-gray-900 rounded"></div>
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
        <div className="mb-2">npx create-next-app@latest photography-portfolio</div>
        <div className="mb-2">cd photography-portfolio</div>
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
{`// Photography Portfolio Component
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera, Eye, Mail } from 'lucide-react';

export default function PhotographyPortfolio() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-6xl font-bold mb-6">
              EMMA WATSON
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              VISUAL STORYTELLER & PHOTOGRAPHER
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-white text-black">
                <Camera className="mr-2 h-4 w-4" />
                VIEW GALLERY
              </Button>
              <Button variant="outline" className="border-white text-white">
                <Mail className="mr-2 h-4 w-4" />
                BOOK SESSION
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            FEATURED WORK
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { category: "PORTRAIT", bg: "from-gray-700 to-gray-900" },
              { category: "LANDSCAPE", bg: "from-blue-900 to-gray-900" },
              { category: "EVENT", bg: "from-purple-900 to-gray-900" }
            ].map((photo, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 group cursor-pointer">
                <div className={\`h-64 bg-gradient-to-br \${photo.bg} relative\`}>
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            PHOTOGRAPHY SERVICES
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "PORTRAIT SESSIONS",
                desc: "Individual and group portraits",
                price: "FROM $300"
              },
              {
                title: "WEDDING PHOTOGRAPHY",
                desc: "Complete wedding day coverage",
                price: "FROM $2000"
              },
              {
                title: "EVENT PHOTOGRAPHY",
                desc: "Corporate events and parties",
                price: "FROM $500"
              }
            ].map((service, index) => (
              <Card key={index} className="bg-black border-gray-800 p-6 text-center">
                <h3 className="text-lg font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{service.desc}</p>
                <div className="text-xl font-bold mb-4">{service.price}</div>
                <Button className="bg-white text-black w-full">BOOK NOW</Button>
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
{`/* Photography Portfolio Styles */
:root {
  --bg-black: #000000;
  --bg-gray-900: #111827;
  --bg-gray-800: #1f2937;
  --text-white: #ffffff;
  --text-gray-400: #9ca3af;
  --border-gray-800: #1f2937;
}

.photography-portfolio {
  background: var(--bg-black);
  color: var(--text-white);
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
  margin-bottom: 1.5rem;
  color: var(--text-white);
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-gray-400);
  margin-bottom: 2rem;
}

/* Gallery Grid */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

.photo-card {
  background: var(--bg-gray-900);
  border: 1px solid var(--border-gray-800);
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.photo-card:hover {
  transform: scale(1.02);
}

.photo-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  transition: background 0.3s ease;
}

.photo-card:hover .photo-overlay {
  background: rgba(0, 0, 0, 0.2);
}

/* Service Cards */
.services-section {
  background: var(--bg-gray-900);
  padding: 4rem 1.5rem;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.service-card {
  background: var(--bg-black);
  border: 1px solid var(--border-gray-800);
  padding: 2rem;
  text-align: center;
  border-radius: 0.5rem;
}

.service-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-white);
  margin-bottom: 1rem;
}

/* Buttons */
.btn-primary {
  background: var(--text-white);
  color: var(--bg-black);
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: var(--text-gray-400);
}

.btn-outline {
  background: transparent;
  color: var(--text-white);
  border: 2px solid var(--text-white);
  padding: 0.75rem 2rem;
  border-radius: 0.375rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-outline:hover {
  background: var(--text-white);
  color: var(--bg-black);
}

/* Filter Badges */
.filter-badges {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

.filter-badge {
  background: var(--bg-gray-800);
  color: var(--text-white);
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-gray-800);
  border-radius: 0.25rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-badge.active {
  background: var(--text-white);
  color: var(--bg-black);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .gallery-grid {
    grid-template-columns: 1fr;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
}`}
        </pre>
      </div>
    )
  }
];

export default function Portfolio4Page() {
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
              PHOTOGRAPHY SHOWCASE PORTFOLIO
            </motion.h1>
            <motion.p 
              className={cn("text-lg text-orange-800 max-w-3xl mx-auto", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              DARK GALLERY PORTFOLIO FOR PHOTOGRAPHERS WITH IMAGE FILTERING AND SHOWCASE DESIGN
            </motion.p>
            
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Badge className="bg-black text-white border border-dotted border-gray-600 rounded-none">
                DARK GALLERY
              </Badge>
              <Badge className="bg-orange-200 text-orange-900 border border-dotted border-orange-600 rounded-none">
                PHOTOGRAPHY
              </Badge>
              <Badge className="bg-orange-200 text-orange-900 border border-dotted border-orange-600 rounded-none">
                SHOWCASE
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={() => navigateTo("/templates/portfolio/portfolio4/demo")}
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
                      ? "npx create-next-app@latest photography-portfolio\ncd photography-portfolio\nnpm install framer-motion lucide-react\nnpm install @empire-ui/components\nnpm install tailwindcss postcss autoprefixer\nnpm run dev"
                      : activeTab === "code"
                      ? "// Photography Portfolio Component Code"
                      : "/* Photography Portfolio CSS Styles */";
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