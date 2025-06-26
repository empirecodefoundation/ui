"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, User, Palette, Code, Layers, Play } from "lucide-react";
import { Navbar } from "@/components/common/navbar";
import { EmpireFooter } from "@/components/common/empire-footer";
import { MinecartLCD } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import PixelTransition from "@/components/ui/PixelTransition";
import Particles from "@/components/ui/particles";
import { ResponsiveWrapper } from "@/components/common/responsive-wrapper";
import { useNavigation } from "@/lib/hooks/use-navigation";

// Import illustrations for portfolio templates
import img1 from "@/illustrations/img1.png";
import img2 from "@/illustrations/img2.png";
import img3 from "@/illustrations/img3.png";
import img4 from "@/illustrations/img4.png";
import img5 from "@/illustrations/img5.png";
import img6 from "@/illustrations/img6.png";
import img7 from "@/illustrations/img7.png";
import img8 from "@/illustrations/img8.png";

const portfolioTemplates = [
  {
    id: "portfolio1",
    title: "MINIMALIST DEVELOPER",
    description: "CLEAN DARK THEME PORTFOLIO FOR SOFTWARE DEVELOPERS WITH CODE SHOWCASES AND PROJECT HIGHLIGHTS",
    theme: "Dark",
    style: "Minimalist",
    niche: "Software Developer",
    previewImage: "/placeholder1.jpeg",
    icon: <Image src={img1} alt="Minimalist Developer Portfolio" width={180} height={180} className="object-contain" />,
    category: "Developer",
    tags: ["Dark", "Clean", "Code"],
    href: "/templates/portfolio/portfolio1"
  },
  {
    id: "portfolio2", 
    title: "CREATIVE DESIGNER",
    description: "VIBRANT LIGHT PORTFOLIO WITH COLORFUL GRADIENTS FOR GRAPHIC DESIGNERS AND ARTISTS",
    theme: "Light",
    style: "Creative",
    niche: "Graphic Designer",
    previewImage: "/placeholder2.jpeg",
    icon: <Image src={img2} alt="Creative Designer Portfolio" width={180} height={180} className="object-contain" />,
    category: "Designer",
    tags: ["Light", "Colorful", "Art"],
    href: "/templates/portfolio/portfolio2"
  },
  {
    id: "portfolio3",
    title: "PROFESSIONAL BUSINESS",
    description: "CORPORATE STYLE PORTFOLIO WITH NEUTRAL TONES FOR BUSINESS PROFESSIONALS AND CONSULTANTS",
    theme: "Light",
    style: "Professional",
    niche: "Business Consultant",
    previewImage: "/placeholder3.jpeg",
    icon: <Image src={img3} alt="Professional Business Portfolio" width={180} height={180} className="object-contain" />,
    category: "Business",
    tags: ["Corporate", "Professional", "Clean"],
    href: "/templates/portfolio/portfolio3"
  },
  {
    id: "portfolio4",
    title: "PHOTOGRAPHY SHOWCASE",
    description: "FULL-SCREEN IMAGE GALLERY PORTFOLIO FOR PHOTOGRAPHERS WITH DARK OVERLAY NAVIGATION",
    theme: "Dark",
    style: "Gallery",
    niche: "Photographer",
    previewImage: "/placeholder5.jpg",
    icon: <Image src={img4} alt="Photography Portfolio" width={180} height={180} className="object-contain" />,
    category: "Photography",
    tags: ["Gallery", "Images", "Dark"],
    href: "/templates/portfolio/portfolio4"
  },
  {
    id: "portfolio5",
    title: "FREELANCER HUB",
    description: "MODERN LIGHT PORTFOLIO FOR FREELANCERS WITH SERVICE LISTINGS AND CLIENT TESTIMONIALS",
    theme: "Light",
    style: "Modern",
    niche: "Freelancer",
    previewImage: "/placeholder1.jpeg",
    icon: <Image src={img5} alt="Freelancer Portfolio" width={180} height={180} className="object-contain" />,
    category: "Freelancer",
    tags: ["Services", "Modern", "Light"],
    href: "/templates/portfolio/portfolio5"
  },
  {
    id: "portfolio6",
    title: "ARTIST STUDIO",
    description: "CREATIVE DARK PORTFOLIO WITH EXPERIMENTAL LAYOUTS FOR DIGITAL ARTISTS AND ILLUSTRATORS",
    theme: "Dark",
    style: "Experimental",
    niche: "Digital Artist",
    previewImage: "/placeholder2.jpeg",
    icon: <Image src={img6} alt="Artist Portfolio" width={180} height={180} className="object-contain" />,
    category: "Artist",
    tags: ["Creative", "Art", "Dark"],
    href: "/templates/portfolio/portfolio6"
  },
  {
    id: "portfolio7",
    title: "STARTUP FOUNDER",
    description: "ENTREPRENEURIAL LIGHT PORTFOLIO FOR STARTUP FOUNDERS WITH COMPANY HISTORY AND ACHIEVEMENTS",
    theme: "Light",
    style: "Entrepreneurial",
    niche: "Entrepreneur",
    previewImage: "/placeholder3.jpeg",
    icon: <Image src={img7} alt="Startup Founder Portfolio" width={180} height={180} className="object-contain" />,
    category: "Entrepreneur",
    tags: ["Startup", "Business", "Light"],
    href: "/templates/portfolio/portfolio7"
  },
  {
    id: "portfolio8",
    title: "TECH INFLUENCER",
    description: "DYNAMIC DARK PORTFOLIO FOR TECH INFLUENCERS WITH SOCIAL MEDIA INTEGRATION AND CONTENT SHOWCASE",
    theme: "Dark",
    style: "Dynamic",
    niche: "Tech Influencer",
    previewImage: "/placeholder5.jpg",
    icon: <Image src={img8} alt="Tech Influencer Portfolio" width={180} height={180} className="object-contain" />,
    category: "Influencer",
    tags: ["Social", "Tech", "Dark"],
    href: "/templates/portfolio/portfolio8"
  },
  {
    id: "portfolio9",
    title: "ACADEMIC RESEARCHER",
    description: "SCHOLARLY LIGHT PORTFOLIO FOR RESEARCHERS WITH PUBLICATION LISTS AND ACADEMIC ACHIEVEMENTS",
    theme: "Light",
    style: "Academic",
    niche: "Research Scientist",
    previewImage: "/placeholder1.jpeg",
    icon: <Image src={img1} alt="Academic Portfolio" width={180} height={180} className="object-contain" />,
    category: "Academic",
    tags: ["Research", "Publications", "Light"],
    href: "/templates/portfolio/portfolio9"
  },
  {
    id: "portfolio10",
    title: "CREATIVE CODER",
    description: "INTERACTIVE DARK PORTFOLIO FOR CREATIVE CODERS WITH LIVE CODE DEMOS AND GENERATIVE ART",
    theme: "Dark",
    style: "Interactive",
    niche: "Creative Developer",
    previewImage: "/placeholder2.jpeg",
    icon: <Image src={img2} alt="Creative Coder Portfolio" width={180} height={180} className="object-contain" />,
    category: "Creative-Tech",
    tags: ["Interactive", "Code", "Dark"],
    href: "/templates/portfolio/portfolio10"
  }
];

// Get theme color based on portfolio theme
function getThemeColor(theme: string): string {
  return theme === "Dark" 
    ? "bg-gradient-to-br from-gray-900/60 to-black/60" 
    : "bg-gradient-to-br from-orange-50/60 to-yellow-50/60";
}

// Get tag color based on theme
function getTagColor(theme: string): string {
  return theme === "Dark"
    ? "bg-white text-black border border-dotted border-white"
    : "bg-orange-600 text-white border border-dotted border-orange-600";
}

export default function PortfolioTemplatesPage() {
  const [selectedTheme, setSelectedTheme] = React.useState("All");
  const { navigateTo } = useNavigation();
  
  const themes = ["All", "Light", "Dark"];
  
  // Filter templates based on theme
  const filteredTemplates = portfolioTemplates.filter(template => {
    return selectedTheme === "All" || template.theme === selectedTheme;
  });
  
  return (
    <ResponsiveWrapper>
      <div className="min-h-screen relative bg-gradient-to-br from-yellow-50 via-orange-50 to-green-50" style={{ marginTop: '-15px' }}>
        {/* Particles Background */}
        <div className="fixed inset-0 w-full h-full z-[-1]">
          <Particles
            particleColors={['#f97316', '#eab308']}
            particleCount={150}
            particleSpread={8}
            speed={0.08}
            particleBaseSize={80}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
            className="w-full h-full"
          />
        </div>
        
        {/* Navigation */}
        <Navbar />
      
        <div className="container mx-auto px-6 py-16 max-w-7xl relative z-10">
          {/* Back Navigation */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/templates">
              <Button 
                variant="outline" 
                className={cn(
                  "bg-orange-100 text-orange-900 hover:bg-orange-200 border-2 border-dotted border-orange-600 rounded-none transition-all",
                  MinecartLCD.className
                )}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                BACK TO TEMPLATES
              </Button>
            </Link>
          </motion.div>

          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.h1 
              className={cn("text-5xl md:text-6xl font-bold mb-6 text-orange-900", MinecartLCD.className)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              PERSONAL PORTFOLIO TEMPLATES
            </motion.h1>
            <motion.p 
              className={cn("text-xl text-orange-800 max-w-4xl mx-auto leading-relaxed", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              CHOOSE FROM 10 UNIQUE PORTFOLIO DESIGNS CRAFTED FOR DIFFERENT PROFESSIONS AND STYLES
            </motion.p>
          </div>
          
          {/* Theme Filters */}
          <div className="flex justify-center gap-4 mb-16">
            {themes.map(theme => (
              <Button
                key={theme}
                variant={selectedTheme === theme ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTheme(theme)}
                className={cn(
                  selectedTheme === theme 
                    ? "bg-orange-600 text-white" 
                    : "bg-orange-100 text-orange-900 hover:bg-orange-200",
                  "px-6 py-3 rounded-none transition-all border-2 border-dotted border-orange-600",
                  MinecartLCD.className
                )}
              >
                {theme.toUpperCase()}
              </Button>
            ))}
          </div>
          
          {/* Portfolio Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Card className="h-full border-4 border-dotted border-orange-600 rounded-none bg-orange-50/80 backdrop-blur-sm transition-all group-hover:bg-orange-100/90 group-hover:scale-[1.02] overflow-hidden">
                  <CardContent className="p-0 h-full flex flex-col">
                    {/* Preview Image with Overlay */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-orange-100 to-orange-200">
                      <Image 
                        src={template.previewImage}
                        alt={`${template.title} Preview`}
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                      />
                      
                      {/* Overlay with Play Button */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="bg-orange-600 text-white p-3 rounded-full">
                          <Play className="h-6 w-6 fill-current" />
                        </div>
                      </div>
                      
                      {/* Theme Badge */}
                      <div className="absolute top-3 right-3">
                        <Badge className={cn(
                          template.theme === "Dark" 
                            ? "bg-gray-900 text-white" 
                            : "bg-white text-gray-900",
                          "rounded-none text-xs border-2 border-dotted",
                          MinecartLCD.className
                        )}>
                          {template.theme.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Template Info */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className={cn("text-lg font-bold text-orange-900 mb-1", MinecartLCD.className)}>
                            {template.title}
                          </h3>
                          <p className={cn("text-xs text-orange-700 mb-3", MinecartLCD.className)}>
                            FOR {template.niche.toUpperCase()}
                          </p>
                          <p className={cn("text-sm text-orange-800 leading-relaxed", MinecartLCD.className)}>
                            {template.description}
                          </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {template.tags.map(tag => (
                            <Badge 
                              key={tag}
                              className={cn("bg-orange-200 text-orange-900 rounded-none text-xs border border-dotted border-orange-600", MinecartLCD.className)}
                            >
                              {tag.toUpperCase()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="mt-6 space-y-3">
                        <Button 
                          onClick={() => navigateTo(template.href)}
                          className={cn(
                            "w-full bg-orange-600 text-white hover:bg-orange-700 rounded-none transition-all border-2 border-dotted border-orange-800",
                            MinecartLCD.className
                          )}
                        >
                          VIEW TEMPLATE
                        </Button>
                        
                        <Button 
                          onClick={() => navigateTo(`${template.href}/demo`)}
                          variant="outline"
                          className={cn(
                            "w-full bg-orange-100 text-orange-900 hover:bg-orange-200 rounded-none transition-all border-2 border-dotted border-orange-600",
                            MinecartLCD.className
                          )}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          LIVE DEMO
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* Additional Info Section */}
          <motion.div 
            className="text-center py-16 border-4 border-dotted border-orange-600 bg-orange-50/60 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className={cn("text-3xl font-bold text-orange-900 mb-6", MinecartLCD.className)}>
              ALL TEMPLATES INCLUDE
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <Code className="mx-auto mb-4 text-orange-600" size={48} />
                <h3 className={cn("text-lg font-bold text-orange-900 mb-2", MinecartLCD.className)}>
                  CLEAN CODE
                </h3>
                <p className={cn("text-orange-800", MinecartLCD.className)}>
                  WELL-STRUCTURED, COMMENTED CODE
                </p>
              </div>
              <div className="text-center">
                <Layers className="mx-auto mb-4 text-orange-600" size={48} />
                <h3 className={cn("text-lg font-bold text-orange-900 mb-2", MinecartLCD.className)}>
                  RESPONSIVE DESIGN
                </h3>
                <p className={cn("text-orange-800", MinecartLCD.className)}>
                  MOBILE-FIRST RESPONSIVE LAYOUTS
                </p>
              </div>
              <div className="text-center">
                <Palette className="mx-auto mb-4 text-orange-600" size={48} />
                <h3 className={cn("text-lg font-bold text-orange-900 mb-2", MinecartLCD.className)}>
                  CUSTOM STYLING
                </h3>
                <p className={cn("text-orange-800", MinecartLCD.className)}>
                  TAILORED CSS FOR EACH TEMPLATE
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Footer */}
        <EmpireFooter />
      </div>
    </ResponsiveWrapper>
  );
} 