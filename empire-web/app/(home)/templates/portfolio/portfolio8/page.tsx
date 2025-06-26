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
      <div className="relative w-full h-[600px] bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 border-4 border-dotted border-orange-600 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center">
            <h3 className={cn("text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4", MinecartLCD.className)}>
              DAVID RODRIGUEZ
            </h3>
            <p className={cn("text-blue-300 mb-6", MinecartLCD.className)}>
              TECH INFLUENCER & CONTENT CREATOR
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-lg">
                <div className="text-xl font-bold">1M+</div>
                <div className="text-xs">FOLLOWERS</div>
              </div>
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-3 rounded-lg">
                <div className="text-xl font-bold">500K</div>
                <div className="text-xs">VIEWS</div>
              </div>
              <div className="bg-gradient-to-br from-pink-600 to-red-600 p-3 rounded-lg">
                <div className="text-xl font-bold">50+</div>
                <div className="text-xs">VIDEOS</div>
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
        <div className="mb-2">npx create-next-app@latest influencer-portfolio</div>
        <div className="mb-2">cd influencer-portfolio</div>
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
{`// Tech Influencer Portfolio Component
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Users, Eye } from 'lucide-react';

export default function InfluencerPortfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            DAVID RODRIGUEZ
          </h1>
          <p className="text-xl text-blue-300 mb-8">
            TECH INFLUENCER & CONTENT CREATOR
          </p>
          
          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-4 rounded-lg">
              <div className="text-2xl font-bold">1M+</div>
              <div className="text-sm">FOLLOWERS</div>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-4 rounded-lg">
              <div className="text-2xl font-bold">500K</div>
              <div className="text-sm">MONTHLY VIEWS</div>
            </div>
            <div className="bg-gradient-to-br from-pink-600 to-red-600 p-4 rounded-lg">
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm">VIDEOS</div>
            </div>
          </div>
          
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            <Play className="mr-2 h-4 w-4" />
            WATCH LATEST
          </Button>
        </motion.div>
      </section>

      {/* Content Showcase */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            FEATURED CONTENT
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "AI REVOLUTION", views: "100K", duration: "15:30" },
              { title: "CRYPTO TRENDS", views: "85K", duration: "12:45" },
              { title: "WEB3 FUTURE", views: "120K", duration: "18:20" }
            ].map((video, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 group cursor-pointer">
                <div className="h-48 bg-gradient-to-br from-blue-600 to-purple-600 relative">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-bold">{video.title}</h3>
                    <div className="text-sm opacity-75">{video.views} views • {video.duration}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 px-6 bg-black/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">
            FOLLOW MY JOURNEY
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { platform: "YOUTUBE", followers: "500K", color: "bg-red-600" },
              { platform: "TWITTER", followers: "300K", color: "bg-blue-500" },
              { platform: "INSTAGRAM", followers: "200K", color: "bg-pink-600" },
              { platform: "TIKTOK", followers: "150K", color: "bg-black" }
            ].map((social, index) => (
              <Card key={index} className={\`\${social.color} border-none p-6 text-center cursor-pointer hover:scale-105 transition-transform\`}>
                <div className="text-2xl font-bold mb-2">{social.followers}</div>
                <div className="text-sm">{social.platform}</div>
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
{`/* Tech Influencer Portfolio Styles */
:root {
  --gradient-tech: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
  --bg-dark: #0f172a;
  --bg-blue: #1e3a8a;
  --text-blue: #60a5fa;
  --text-purple: #a855f7;
}

.influencer-portfolio {
  background: linear-gradient(135deg, #1f2937, #1e40af, #7c3aed);
  color: white;
  font-family: 'Inter', sans-serif;
}

/* Dynamic dark theme */
.hero-section {
  padding: 5rem 1.5rem;
  text-align: center;
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  background: var(--gradient-tech);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 24rem;
  margin: 0 auto 2rem auto;
}

.stat-card {
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  color: white;
}

/* Content Cards */
.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.video-card {
  background: #374151;
  border: 2px solid #4b5563;
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.video-card:hover {
  transform: scale(1.05);
}

/* Social Media Cards */
.social-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.social-card {
  padding: 2rem;
  text-align: center;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.social-card:hover {
  transform: scale(1.05);
}

/* Buttons */
.btn-tech {
  background: #3b82f6;
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  transition: background 0.3s ease;
}

.btn-tech:hover {
  background: #2563eb;
}`}
        </pre>
      </div>
    )
  }
];

export default function Portfolio8Page() {
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
              TECH INFLUENCER PORTFOLIO
            </motion.h1>
            <motion.p 
              className={cn("text-lg text-orange-800 max-w-3xl mx-auto", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              DYNAMIC DARK PORTFOLIO FOR TECH INFLUENCERS WITH SOCIAL MEDIA INTEGRATION AND CONTENT SHOWCASE
            </motion.p>
            
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Badge className="bg-blue-100 text-blue-800 border border-dotted border-blue-600 rounded-none">
                DYNAMIC DARK
              </Badge>
              <Badge className="bg-orange-200 text-orange-900 border border-dotted border-orange-600 rounded-none">
                INFLUENCER
              </Badge>
              <Badge className="bg-orange-200 text-orange-900 border border-dotted border-orange-600 rounded-none">
                SOCIAL MEDIA
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={() => navigateTo("/templates/portfolio/portfolio8/demo")}
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
                      ? "npx create-next-app@latest influencer-portfolio\ncd influencer-portfolio\nnpm install framer-motion lucide-react\nnpm install @empire-ui/components\nnpm install tailwindcss postcss autoprefixer\nnpm run dev"
                      : activeTab === "code"
                      ? "// Tech Influencer Portfolio Component Code"
                      : "/* Tech Influencer Portfolio CSS Styles */";
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