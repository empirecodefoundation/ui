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
import Image from "next/image";
import { ResponsiveWrapper } from "@/components/common/responsive-wrapper";
import { useNavigation } from "@/lib/hooks/use-navigation";

const tabsData = [
  {
    id: "preview",
    label: "PREVIEW",
    content: (
      <div className="relative w-full h-[600px] bg-black border-4 border-dotted border-orange-600 overflow-hidden">
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <div className="text-center">
            <h3 className={cn("text-3xl font-bold text-green-400 mb-4", MinecartLCD.className)}>
              ALEX CHEN
            </h3>
            <p className={cn("text-gray-300 mb-4", MinecartLCD.className)}>
              FULL-STACK DEVELOPER
            </p>
            <div className="bg-gray-900 border border-green-400 p-4 rounded max-w-md mx-auto">
              <code className={cn("text-green-400 text-sm", MinecartLCD.className)}>
                const dev = {'{'} skills: ["React", "Node.js"] {'}'}
              </code>
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
      <div className="bg-black text-green-400 p-6 rounded-none font-mono text-sm border-4 border-dotted border-orange-600">
        <div className="mb-4">
          <span className="text-gray-500"># Install dependencies</span>
        </div>
        <div className="mb-2">npx create-next-app@latest minimalist-portfolio</div>
        <div className="mb-2">cd minimalist-portfolio</div>
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
      <div className="bg-black text-gray-300 p-6 rounded-none font-mono text-sm border-4 border-dotted border-orange-600 max-h-[600px] overflow-y-auto">
        <pre className="whitespace-pre-wrap">
{`// components/MinimalistPortfolio.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, Mail, Terminal } from 'lucide-react';

export default function MinimalistPortfolio() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-6xl font-bold mb-4 text-green-400"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ALEX CHEN
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            FULL-STACK DEVELOPER
          </motion.p>
          
          {/* Terminal Window */}
          <motion.div
            className="bg-gray-900 border border-green-400 rounded-lg p-6 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center mb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="ml-4 text-gray-500 text-sm">~/developer.js</span>
            </div>
            <code className="text-green-400 block">
              const developer = {'{'}
              <br />
              {'  '}name: "Alex Chen",
              <br />
              {'  '}role: "Full-Stack Developer",
              <br />
              {'  '}skills: ["React", "Node.js", "Python"],
              <br />
              {'  '}passion: "Building scalable applications"
              <br />
              {'}'};
            </code>
          </motion.div>
          
          <motion.div
            className="flex gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button className="bg-green-400 text-black hover:bg-green-300">
              <Mail className="mr-2 h-4 w-4" />
              CONTACT
            </Button>
            <Button variant="outline" className="border-green-400 text-green-400">
              <Github className="mr-2 h-4 w-4" />
              GITHUB
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-green-400">
            FEATURED PROJECTS
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-COMMERCE API",
                desc: "Scalable REST API with microservices",
                tech: ["Node.js", "MongoDB", "Docker"]
              },
              {
                title: "REACT DASHBOARD", 
                desc: "Real-time analytics dashboard",
                tech: ["React", "TypeScript", "D3.js"]
              },
              {
                title: "ML PIPELINE",
                desc: "Machine learning data pipeline",
                tech: ["Python", "TensorFlow", "Kubernetes"]
              }
            ].map((project, index) => (
              <div 
                key={index}
                className="bg-black border border-green-400 p-6 rounded-lg"
              >
                <h3 className="text-lg font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map(tech => (
                    <Badge 
                      key={tech} 
                      className="bg-gray-900 text-green-400 border border-green-400"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-green-400 text-black">
                    <Github className="mr-1 h-3 w-3" />
                    CODE
                  </Button>
                  <Button size="sm" variant="outline" className="border-green-400 text-green-400">
                    DEMO
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-6 bg-green-400 text-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            {'>'} LET'S BUILD SOMETHING
          </h2>
          <p className="text-black/80 mb-8 text-lg">
            Open to discussing new opportunities
          </p>
          <Button className="bg-black text-green-400 hover:bg-gray-900">
            <Mail className="mr-2 h-4 w-4" />
            GET IN TOUCH
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
      <div className="bg-black text-gray-300 p-6 rounded-none font-mono text-sm border-4 border-dotted border-orange-600 max-h-[600px] overflow-y-auto">
        <pre className="whitespace-pre-wrap">
{`/* styles/minimalist-portfolio.css */

/* Dark minimalist theme */
:root {
  --bg-primary: #000000;
  --bg-secondary: #111111;
  --accent-primary: #10b981;
  --accent-secondary: #059669;
  --text-primary: #ffffff;
  --text-secondary: #d1d5db;
  --text-muted: #9ca3af;
  --border-color: #10b981;
}

/* Base styles */
.minimalist-portfolio {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  line-height: 1.6;
}

/* Terminal styling */
.terminal-window {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
  font-family: 'JetBrains Mono', monospace;
}

.terminal-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.traffic-lights {
  display: flex;
  gap: 0.5rem;
}

.traffic-light {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.traffic-light.red { background: #ef4444; }
.traffic-light.yellow { background: #eab308; }
.traffic-light.green { background: #22c55e; }

/* Code syntax highlighting */
.code-block {
  background: var(--bg-secondary);
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
}

.syntax-keyword { color: #10b981; }
.syntax-string { color: #10b981; }
.syntax-number { color: #10b981; }
.syntax-comment { color: #6b7280; }

/* Project cards */
.project-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(16, 185, 129, 0.1);
}

/* Badges */
.tech-badge {
  background: var(--bg-secondary);
  color: var(--accent-primary);
  border: 1px solid var(--border-color);
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

/* Buttons */
.btn-primary {
  background: var(--accent-primary);
  color: var(--bg-primary);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: var(--accent-secondary);
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  color: var(--accent-primary);
  border: 1px solid var(--border-color);
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-outline:hover {
  background: var(--accent-primary);
  color: var(--bg-primary);
}

/* Typography */
.title-large {
  font-size: 4rem;
  font-weight: 700;
  color: var(--accent-primary);
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

/* Responsive design */
@media (max-width: 768px) {
  .title-large {
    font-size: 2.5rem;
  }
  
  .project-grid {
    grid-template-columns: 1fr;
  }
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

/* Scroll effects */
.parallax-bg {
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}`}
        </pre>
      </div>
    )
  }
];

export default function Portfolio1Page() {
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
              MINIMALIST DEVELOPER PORTFOLIO
            </motion.h1>
            <motion.p 
              className={cn("text-lg text-orange-800 max-w-3xl mx-auto", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              CLEAN DARK THEME PORTFOLIO FOR SOFTWARE DEVELOPERS WITH TERMINAL-STYLE DESIGN
            </motion.p>
            
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Badge className="bg-black text-green-400 border border-dotted border-green-600 rounded-none">
                DARK THEME
              </Badge>
              <Badge className="bg-orange-200 text-orange-900 border border-dotted border-orange-600 rounded-none">
                MINIMALIST
              </Badge>
              <Badge className="bg-orange-200 text-orange-900 border border-dotted border-orange-600 rounded-none">
                DEVELOPER
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={() => navigateTo("/templates/portfolio/portfolio1/demo")}
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
                      ? "npx create-next-app@latest minimalist-portfolio\ncd minimalist-portfolio\nnpm install framer-motion lucide-react\nnpm install @empire-ui/components\nnpm install tailwindcss postcss autoprefixer\nnpm run dev"
                      : activeTab === "code"
                      ? "// Minimalist Developer Portfolio Component Code"
                      : "/* Minimalist Portfolio CSS Styles */";
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