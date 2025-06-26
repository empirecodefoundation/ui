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
      <div className="relative w-full h-[600px] bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 border-4 border-dotted border-orange-600 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h3 className={cn("text-4xl font-bold text-amber-900 mb-4", MinecartLCD.className)}>
              MAYA PATEL
            </h3>
            <p className={cn("text-amber-700 mb-6", MinecartLCD.className)}>
              CREATIVE DESIGNER & BRAND STRATEGIST
            </p>
            <div className="bg-white p-4 rounded-lg max-w-md mx-auto border border-amber-200">
              <div className="text-2xl font-bold text-amber-600">50+ BRANDS</div>
              <div className="text-sm text-gray-600">TRANSFORMED</div>
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
{`// Creative Designer Portfolio Component
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Palette, Lightbulb, Star } from 'lucide-react';

export default function CreativePortfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-6xl font-bold text-amber-900 mb-6">
              MAYA PATEL
            </h1>
            <p className="text-2xl text-amber-700 mb-8">
              CREATIVE DESIGNER & BRAND STRATEGIST
            </p>
            
            <div className="bg-white p-6 rounded-xl max-w-2xl mx-auto border border-amber-200 mb-8">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-amber-600">50+</div>
                  <div className="text-sm text-gray-600">BRANDS</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600">200+</div>
                  <div className="text-sm text-gray-600">PROJECTS</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-600">5+</div>
                  <div className="text-sm text-gray-600">YEARS</div>
                </div>
              </div>
            </div>
            
            <Button className="bg-amber-600 text-white hover:bg-amber-700">
              <Palette className="mr-2 h-4 w-4" />
              VIEW PORTFOLIO
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-amber-900">
            FEATURED PROJECTS
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "BRAND IDENTITY",
                client: "Tech Startup",
                category: "Logo & Visual Identity",
                color: "amber"
              },
              {
                title: "WEB DESIGN", 
                client: "Fashion Brand",
                category: "UI/UX Design",
                color: "orange"
              },
              {
                title: "PACKAGING",
                client: "Organic Foods",
                category: "Product Design",
                color: "red"
              }
            ].map((project, index) => (
              <Card key={index} className="bg-gradient-to-br from-white to-amber-50 border-amber-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <Lightbulb className="h-8 w-8 text-amber-600" />
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-2">{project.title}</h3>
                <p className="text-amber-700 mb-1">{project.client}</p>
                <p className="text-gray-600 text-sm">{project.category}</p>
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
{`/* Creative Designer Portfolio Styles */
:root {
  --gradient-warm: linear-gradient(135deg, #f59e0b, #ea580c);
  --bg-warm: #fef3c7;
  --bg-white: #ffffff;
  --text-amber: #92400e;
  --text-orange: #ea580c;
}

.creative-portfolio {
  background: linear-gradient(135deg, #fef3c7, #fed7aa, #fecaca);
  font-family: 'Inter', sans-serif;
}

/* Warm creative theme */
.hero-section {
  padding: 5rem 1.5rem;
  text-align: center;
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  color: var(--text-amber);
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #92400e, #ea580c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid #fbbf24;
}

.project-card {
  background: linear-gradient(135deg, white, #fef3c7);
  border: 1px solid #fbbf24;
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(245, 158, 11, 0.2);
}

/* Creative elements */
.color-palette {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
}

.color-swatch {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.floating-element {
  animation: float 3s ease-in-out infinite;
}

/* Responsive design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
}`}
        </pre>
      </div>
    )
  }
];

export default function Portfolio9Page() {
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

  const getCliContent = () => `# Install dependencies
npx create-next-app@latest creative-portfolio
cd creative-portfolio
npm install framer-motion lucide-react

# Install Empire UI
npm install @empire-ui/components
npm install tailwindcss postcss autoprefixer

# Run development server
npm run dev`;

  const getCodeContent = () => `// Creative Designer Portfolio Component
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Palette, Lightbulb, Star } from 'lucide-react';

export default function CreativePortfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-6xl font-bold text-amber-900 mb-6">
              MAYA PATEL
            </h1>
            <p className="text-2xl text-amber-700 mb-8">
              CREATIVE DESIGNER & BRAND STRATEGIST
            </p>
            
            <div className="bg-white p-6 rounded-xl max-w-2xl mx-auto border border-amber-200 mb-8">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-amber-600">50+</div>
                  <div className="text-sm text-gray-600">BRANDS</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600">200+</div>
                  <div className="text-sm text-gray-600">PROJECTS</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-600">5+</div>
                  <div className="text-sm text-gray-600">YEARS</div>
                </div>
              </div>
            </div>
            
            <Button className="bg-amber-600 text-white hover:bg-amber-700">
              <Palette className="mr-2 h-4 w-4" />
              VIEW PORTFOLIO
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-amber-900">
            FEATURED PROJECTS
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "BRAND IDENTITY",
                client: "Tech Startup",
                category: "Logo & Visual Identity",
                color: "amber"
              },
              {
                title: "WEB DESIGN", 
                client: "Fashion Brand",
                category: "UI/UX Design",
                color: "orange"
              },
              {
                title: "PACKAGING",
                client: "Organic Foods",
                category: "Product Design",
                color: "red"
              }
            ].map((project, index) => (
              <Card key={index} className="bg-gradient-to-br from-white to-amber-50 border-amber-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <Lightbulb className="h-8 w-8 text-amber-600" />
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-2">{project.title}</h3>
                <p className="text-amber-700 mb-1">{project.client}</p>
                <p className="text-gray-600 text-sm">{project.category}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}`;

  const getCssContent = () => `/* Creative Designer Portfolio Styles */
:root {
  --gradient-warm: linear-gradient(135deg, #f59e0b, #ea580c);
  --bg-warm: #fef3c7;
  --bg-white: #ffffff;
  --text-amber: #92400e;
  --text-orange: #ea580c;
}

.creative-portfolio {
  background: linear-gradient(135deg, #fef3c7, #fed7aa, #fecaca);
  font-family: 'Inter', sans-serif;
}

/* Warm creative theme */
.hero-section {
  padding: 5rem 1.5rem;
  text-align: center;
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  color: var(--text-amber);
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #92400e, #ea580c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid #fbbf24;
}

.project-card {
  background: linear-gradient(135deg, white, #fef3c7);
  border: 1px solid #fbbf24;
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(245, 158, 11, 0.2);
}

/* Creative elements */
.color-palette {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
}

.color-swatch {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.floating-element {
  animation: float 3s ease-in-out infinite;
}

/* Responsive design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
}`;

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
                  CREATIVE DESIGNER PORTFOLIO
                </h1>
                <p className={cn("text-gray-600 mt-1", MinecartLCD.className)}>
                  WARM, ARTISTIC PORTFOLIO FOR CREATIVE PROFESSIONALS
                </p>
              </div>
            </div>
            
            <Button
              onClick={() => navigateTo("/templates/portfolio/portfolio9/demo")}
              className={cn("bg-orange-600 text-white hover:bg-orange-700", MinecartLCD.className)}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              VIEW LIVE DEMO
            </Button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Badge className="bg-amber-100 text-amber-800 border border-amber-300">CREATIVE</Badge>
            <Badge className="bg-orange-100 text-orange-800 border border-orange-300">DESIGNER</Badge>
            <Badge className="bg-red-100 text-red-800 border border-red-300">PORTFOLIO</Badge>
            <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-300">ARTISTIC</Badge>
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
                  onClick={() => {
                    const content = activeTab === "cli" ? getCliContent() : 
                                   activeTab === "code" ? getCodeContent() : 
                                   getCssContent();
                    copyToClipboard(content, activeTab);
                  }}
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