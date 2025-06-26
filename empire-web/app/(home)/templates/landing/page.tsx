"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Code, Terminal, Palette, Copy, Check, ExternalLink, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/common/navbar";
import { EmpireFooter } from "@/components/common/empire-footer";
import { MinecartLCD } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ResponsiveWrapper } from "@/components/common/responsive-wrapper";
import Particles from "@/components/ui/particles";

// Import placeholder image
import img1 from "@/images/img1.png";

export default function LandingTemplatePage() {
  const [activeTab, setActiveTab] = useState("preview");
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Dependencies for the landing page
  const dependencies = `npm install @empireui/components framer-motion lucide-react
npm install @radix-ui/react-slot @radix-ui/react-tabs
npm install tailwindcss-animate class-variance-authority clsx tailwind-merge`;

  // Usage example
  const usageCode = `import { LandingPage } from './components/LandingPage';

export default function Home() {
  return (
    <div>
      <LandingPage />
    </div>
  );
}`;

  // Main component code
  const componentCode = `"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Zap, Shield, ArrowRight, CheckCircle } from "lucide-react";

export function LandingPage() {
  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Built for speed and performance with modern web technologies."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure by Default",
      description: "Enterprise-grade security features built into every component."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team Collaboration",
      description: "Work together seamlessly with real-time collaboration tools."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO, TechCorp",
      content: "This platform transformed how our team works. Incredible results!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Lead Developer",
      content: "The best development experience I've ever had. Highly recommended!",
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$19",
      features: ["5 Projects", "10GB Storage", "Email Support"],
      popular: false
    },
    {
      name: "Professional",
      price: "$49", 
      features: ["Unlimited Projects", "100GB Storage", "Priority Support", "Advanced Analytics"],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99",
      features: ["Everything in Pro", "Custom Integrations", "Dedicated Manager", "SLA"],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-32">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Badge className="mb-8 bg-purple-100 text-purple-800 hover:bg-purple-200">
              🚀 New Release Available
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
              Build the 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {" "}Future
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              The most powerful platform for building modern applications. 
              Start shipping faster with our comprehensive toolkit and AI-powered features.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800 px-8 py-4 text-lg">
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built by developers, for developers. Every feature is designed to enhance your workflow.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
                  <CardHeader>
                    <div className="text-purple-400 mb-4">{feature.icon}</div>
                    <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-slate-800/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Loved by Developers
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-4 text-lg">"{testimonial.content}"</p>
                    <div>
                      <p className="text-white font-semibold">{testimonial.name}</p>
                      <p className="text-gray-400">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-300">
              Choose the plan that works best for your team
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className={\`bg-slate-800/50 border-slate-700 relative \${plan.popular ? 'ring-2 ring-purple-500' : ''}\`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader>
                    <CardTitle className="text-white text-2xl">{plan.name}</CardTitle>
                    <div className="text-4xl font-bold text-white">
                      {plan.price}
                      <span className="text-lg text-gray-400">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-gray-300">
                          <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={\`w-full \${plan.popular ? 'bg-purple-600 hover:bg-purple-700' : 'bg-slate-700 hover:bg-slate-600'}\`}
                      size="lg"
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Join thousands of developers building the future with our platform
            </p>
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg">
              Start Building Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}`;

  // CSS styles
  const cssCode = `/* Custom animations and styles for the landing page */
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

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out;
}

.animate-pulse-slow {
  animation: pulse 3s infinite;
}

/* Gradient text effect */
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Card hover effects */
.feature-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Button animations */
.btn-primary {
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.btn-primary:hover::before {
  left: 100%;
}

/* Responsive design utilities */
@media (max-width: 768px) {
  .hero-title {
    font-size: 3rem;
    line-height: 1.1;
  }
  
  .section-padding {
    padding: 4rem 1rem;
  }
}

/* Loading states */
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}`;

  return (
    <ResponsiveWrapper>
      <div className="min-h-screen relative" style={{ marginTop: '-15px' }}>
        {/* Particles Background */}
        <div className="fixed inset-0 w-full h-full z-[-1]">
          <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={100}
            particleSpread={8}
            speed={0.05}
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
          {/* Header */}
          <div className="mb-12">
            <Link 
              href="/templates"
              className={cn("inline-flex items-center text-white hover:text-gray-300 mb-6 transition-colors", MinecartLCD.className)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Templates
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <h1 className={cn("text-4xl md:text-5xl font-bold text-white", MinecartLCD.className)}>
                  Landing Page Template
                </h1>
                <Badge className="bg-purple-600 text-white">
                  Featured
                </Badge>
              </div>
              <p className={cn("text-xl text-gray-300 max-w-3xl", MinecartLCD.className)}>
                A modern, responsive landing page template with hero section, features, testimonials, and pricing. 
                Perfect for SaaS products, startups, and marketing campaigns.
              </p>
            </motion.div>
          </div>

          {/* Tab Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-black border-2 border-dotted border-white rounded-none">
              <TabsTrigger 
                value="preview" 
                className={cn("rounded-none data-[state=active]:bg-white data-[state=active]:text-black", MinecartLCD.className)}
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </TabsTrigger>
              <TabsTrigger 
                value="dependencies" 
                className={cn("rounded-none data-[state=active]:bg-white data-[state=active]:text-black", MinecartLCD.className)}
              >
                <Terminal className="mr-2 h-4 w-4" />
                CLI
              </TabsTrigger>
              <TabsTrigger 
                value="code" 
                className={cn("rounded-none data-[state=active]:bg-white data-[state=active]:text-black", MinecartLCD.className)}
              >
                <Code className="mr-2 h-4 w-4" />
                Code
              </TabsTrigger>
              <TabsTrigger 
                value="css" 
                className={cn("rounded-none data-[state=active]:bg-white data-[state=active]:text-black", MinecartLCD.className)}
              >
                <Palette className="mr-2 h-4 w-4" />
                CSS
              </TabsTrigger>
            </TabsList>

            {/* Preview Tab */}
            <TabsContent value="preview" className="mt-8">
              <Card className="bg-black border-4 border-dotted border-white rounded-none">
                <CardHeader>
                  <CardTitle className={cn("text-white text-2xl", MinecartLCD.className)}>
                    Landing Page Preview
                  </CardTitle>
                  <CardDescription className={cn("text-gray-300", MinecartLCD.className)}>
                    Full screenshot of the landing page template
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full h-[600px] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-lg overflow-hidden">
                    <Image 
                      src={img1}
                      alt="Landing Page Template Preview" 
                      fill
                      className="object-cover object-top"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="text-center">
                        <h3 className={cn("text-white text-3xl font-bold mb-4", MinecartLCD.className)}>
                          Landing Page Template
                        </h3>
                        <p className={cn("text-gray-200 text-lg mb-6", MinecartLCD.className)}>
                          Modern • Responsive • AI-Ready
                        </p>
                        <Link href="/templates/landing/demo">
                          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Live Demo
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* CLI/Dependencies Tab */}
            <TabsContent value="dependencies" className="mt-8">
              <Card className="bg-black border-4 border-dotted border-white rounded-none">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className={cn("text-white text-2xl", MinecartLCD.className)}>
                      Installation
                    </CardTitle>
                    <CardDescription className={cn("text-gray-300", MinecartLCD.className)}>
                      Required packages and installation commands
                    </CardDescription>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(dependencies, 'dependencies')}
                    className="bg-gray-800 hover:bg-gray-700 text-white"
                    size="sm"
                  >
                    {copiedSection === 'dependencies' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 p-6 rounded-lg">
                    <pre className={cn("text-green-400 text-sm overflow-x-auto", MinecartLCD.className)}>
                      <code>{dependencies}</code>
                    </pre>
                  </div>
                  <div className="mt-6">
                    <h4 className={cn("text-white text-lg font-bold mb-3", MinecartLCD.className)}>
                      Usage:
                    </h4>
                    <div className="bg-gray-900 p-6 rounded-lg">
                      <pre className={cn("text-blue-400 text-sm overflow-x-auto", MinecartLCD.className)}>
                        <code>{usageCode}</code>
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Code Tab */}
            <TabsContent value="code" className="mt-8">
              <Card className="bg-black border-4 border-dotted border-white rounded-none">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className={cn("text-white text-2xl", MinecartLCD.className)}>
                      Component Code
                    </CardTitle>
                    <CardDescription className={cn("text-gray-300", MinecartLCD.className)}>
                      Complete React component source code
                    </CardDescription>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(componentCode, 'component')}
                    className="bg-gray-800 hover:bg-gray-700 text-white"
                    size="sm"
                  >
                    {copiedSection === 'component' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 p-6 rounded-lg max-h-96 overflow-y-auto">
                    <pre className={cn("text-green-400 text-sm", MinecartLCD.className)}>
                      <code>{componentCode}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* CSS Tab */}
            <TabsContent value="css" className="mt-8">
              <Card className="bg-black border-4 border-dotted border-white rounded-none">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className={cn("text-white text-2xl", MinecartLCD.className)}>
                      Custom CSS Styles
                    </CardTitle>
                    <CardDescription className={cn("text-gray-300", MinecartLCD.className)}>
                      Additional CSS for animations and custom styling
                    </CardDescription>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(cssCode, 'css')}
                    className="bg-gray-800 hover:bg-gray-700 text-white"
                    size="sm"
                  >
                    {copiedSection === 'css' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 p-6 rounded-lg max-h-96 overflow-y-auto">
                    <pre className={cn("text-blue-400 text-sm", MinecartLCD.className)}>
                      <code>{cssCode}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/templates/landing/demo">
              <Button 
                size="lg" 
                className={cn("bg-purple-600 hover:bg-purple-700 text-white px-8 py-4", MinecartLCD.className)}
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                View Live Demo
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline"
              className={cn("border-white text-white hover:bg-white hover:text-black px-8 py-4", MinecartLCD.className)}
            >
              <Copy className="mr-2 h-5 w-5" />
              Copy Template
            </Button>
          </div>
        </div>

        {/* Footer */}
        <EmpireFooter />
      </div>
    </ResponsiveWrapper>
  );
} 