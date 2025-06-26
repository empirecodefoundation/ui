"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Github, ExternalLink, Mail, Code, Terminal, Database } from "lucide-react";
import { MinecartLCD } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/lib/hooks/use-navigation";
import { LoadingProvider } from "@/components/core/loading-provider";

export default function Portfolio1Demo() {
  const { navigateTo } = useNavigation();

  return (
    <LoadingProvider>
      <div className="min-h-screen bg-black text-white">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-green-400 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Button
            onClick={() => navigateTo("/templates/portfolio/portfolio1")}
            variant="outline"
            size="sm"
            className={cn("border-green-400 text-green-400 hover:bg-green-400 hover:text-black", MinecartLCD.className)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            BACK TO TEMPLATE
          </Button>
          
          <div className={cn("text-lg font-bold text-green-400", MinecartLCD.className)}>
            MINIMALIST DEVELOPER
          </div>
          
          <Button
            onClick={() => window.open("/templates/portfolio/portfolio1", "_blank")}
            variant="outline"
            size="sm"
            className={cn("border-green-400 text-green-400 hover:bg-green-400 hover:text-black", MinecartLCD.className)}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            VIEW CODE
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className={cn("text-6xl md:text-7xl font-bold mb-4 text-green-400", MinecartLCD.className)}>
                ALEX CHEN
              </h1>
              <p className={cn("text-xl text-gray-300 mb-6", MinecartLCD.className)}>
                FULL-STACK DEVELOPER
              </p>
              <div className="flex justify-center gap-4 flex-wrap mb-8">
                <Badge className="bg-gray-900 text-green-400 border border-green-400">REACT</Badge>
                <Badge className="bg-gray-900 text-green-400 border border-green-400">NODE.JS</Badge>
                <Badge className="bg-gray-900 text-green-400 border border-green-400">TYPESCRIPT</Badge>
                <Badge className="bg-gray-900 text-green-400 border border-green-400">PYTHON</Badge>
              </div>
            </motion.div>

            {/* Terminal Window */}
            <motion.div
              className="bg-gray-900 border border-green-400 rounded-lg p-6 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center mb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="ml-4 text-gray-500 text-sm">~/developer.js</span>
              </div>
              <code className={cn("text-green-400 block", MinecartLCD.className)}>
                <div className="mb-1">const developer = {'{'}</div>
                <div className="mb-1 ml-4">name: "Alex Chen",</div>
                <div className="mb-1 ml-4">role: "Full-Stack Developer",</div>
                <div className="mb-1 ml-4">skills: ["React", "Node.js", "Python", "AWS"],</div>
                <div className="mb-1 ml-4">passion: "Building scalable applications",</div>
                <div className="mb-1 ml-4">location: "San Francisco, CA"</div>
                <div>{'}'}</div>
              </code>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button className={cn("bg-green-400 text-black hover:bg-green-300", MinecartLCD.className)}>
                <Mail className="mr-2 h-4 w-4" />
                CONTACT ME
              </Button>
              <Button variant="outline" className={cn("border-green-400 text-green-400 hover:bg-green-400 hover:text-black", MinecartLCD.className)}>
                <Github className="mr-2 h-4 w-4" />
                GITHUB
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Projects */}
        <section className="py-16 px-6 bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className={cn("text-4xl font-bold mb-12 text-center text-green-400", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              FEATURED PROJECTS
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "E-COMMERCE API",
                  desc: "Scalable REST API with microservices architecture",
                  tech: ["Node.js", "MongoDB", "Docker", "AWS"],
                  icon: <Database className="h-8 w-8" />
                },
                {
                  title: "REACT DASHBOARD",
                  desc: "Real-time analytics dashboard with D3.js charts",
                  tech: ["React", "TypeScript", "D3.js", "WebSocket"],
                  icon: <Code className="h-8 w-8" />
                },
                {
                  title: "ML PIPELINE",
                  desc: "Machine learning data processing pipeline",
                  tech: ["Python", "TensorFlow", "Kubernetes", "GCP"],
                  icon: <Terminal className="h-8 w-8" />
                },
                {
                  title: "MOBILE APP",
                  desc: "Cross-platform React Native application",
                  tech: ["React Native", "Firebase", "Redux", "Jest"],
                  icon: <Code className="h-8 w-8" />
                },
                {
                  title: "BLOCKCHAIN DApp",
                  desc: "Decentralized application on Ethereum",
                  tech: ["Solidity", "Web3.js", "React", "IPFS"],
                  icon: <Terminal className="h-8 w-8" />
                },
                {
                  title: "DEV TOOLS",
                  desc: "CLI tools for developer productivity",
                  tech: ["Node.js", "Commander.js", "Chalk", "Inquirer"],
                  icon: <Database className="h-8 w-8" />
                }
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-black border-green-400 hover:bg-gray-900 transition-all h-full">
                    <CardContent className="p-6 h-full flex flex-col">
                      <div className="text-green-400 mb-4">{project.icon}</div>
                      <h3 className={cn("text-lg font-bold text-white mb-2", MinecartLCD.className)}>
                        {project.title}
                      </h3>
                      <p className={cn("text-gray-400 text-sm mb-4 flex-1", MinecartLCD.className)}>
                        {project.desc}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map(tech => (
                          <Badge key={tech} className="bg-gray-900 text-green-400 text-xs border border-green-400">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className={cn("bg-green-400 text-black hover:bg-green-300", MinecartLCD.className)}>
                          <Github className="mr-1 h-3 w-3" />
                          CODE
                        </Button>
                        <Button size="sm" variant="outline" className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black">
                          <ExternalLink className="mr-1 h-3 w-3" />
                          DEMO
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className={cn("text-4xl font-bold mb-12 text-center text-green-400", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              TECHNICAL EXPERTISE
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  category: "FRONTEND",
                  skills: ["React", "Vue.js", "TypeScript", "Next.js", "Tailwind", "D3.js"]
                },
                {
                  category: "BACKEND", 
                  skills: ["Node.js", "Python", "Go", "PostgreSQL", "MongoDB", "Redis"]
                },
                {
                  category: "CLOUD & DEVOPS",
                  skills: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "Nginx"]
                },
                {
                  category: "TOOLS & OTHER",
                  skills: ["Git", "Linux", "Vim", "Webpack", "Jest", "GraphQL"]
                }
              ].map((skillGroup, index) => (
                <motion.div 
                  key={index} 
                  className="bg-gray-900 border border-green-400 p-6 rounded-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className={cn("text-lg font-bold mb-4 text-center text-green-400", MinecartLCD.className)}>
                    {skillGroup.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.skills.map(skill => (
                      <Badge key={skill} className="bg-black text-green-400 border border-green-400">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 px-6 bg-green-400 text-black">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className={cn("text-4xl font-bold mb-6", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {'>'} LET'S BUILD SOMETHING
            </motion.h2>
            <motion.p 
              className={cn("text-black/80 mb-8 text-lg max-w-2xl mx-auto", MinecartLCD.className)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              ALWAYS OPEN TO DISCUSSING NEW OPPORTUNITIES AND INTERESTING PROJECTS
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Button className={cn("bg-black text-green-400 hover:bg-gray-900", MinecartLCD.className)}>
                <Mail className="mr-2 h-4 w-4" />
                GET IN TOUCH
              </Button>
              <Button variant="outline" className={cn("border-black text-black hover:bg-black hover:text-green-400", MinecartLCD.className)}>
                <Terminal className="mr-2 h-4 w-4" />
                DOWNLOAD CV
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
    </LoadingProvider>
  );
} 