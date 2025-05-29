"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Zap, Shield, Globe, ChevronRight } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  image?: string;
}

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function LandingTemplate() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Space-themed background */}
      <div className="absolute inset-0 z-0 bg-black empire-space-bg">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 40px), radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 30px), radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 40px)',
          backgroundSize: '550px 550px, 350px 350px, 250px 250px', 
          backgroundPosition: '0 0, 40px 60px, 130px 270px',
          opacity: 0.4
        }}></div>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-900/20 blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-900/20 blur-[120px]"></div>
      </div>
      
      {/* Navigation */}
      <nav className="relative z-10 py-6 px-4 md:px-8 lg:px-12 mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 bg-gray-900 border border-gray-700 rounded-lg flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L3 7L12 12L21 7L12 2Z" fill="#4F46E5" />
                  <path d="M3 17L12 22L21 17M3 12L12 17L21 12" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.div>
            <span className="text-xl font-bold text-white">EmpireAI</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-gray-300 hover:text-white transition-colors">
              Testimonials
            </Link>
            <Link href="#faq" className="text-gray-300 hover:text-white transition-colors">
              FAQ
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
              Log in
            </Button>
            <Button className="bg-indigo-900 text-white hover:bg-indigo-800 border-none">
              Sign up
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="relative z-10 px-4 md:px-8 lg:px-12 mx-auto max-w-7xl pt-20 md:pt-32 pb-24 md:pb-32">
        <div className="flex flex-col items-center text-center">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            The Next Generation <br className="hidden md:block" />
            <span className="text-indigo-400">
              AI Platform
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-400 mb-10 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Build, deploy, and scale AI applications faster with our enterprise-ready platform.
            Get started in minutes with no setup required.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <Button size="lg" className="bg-indigo-900 text-white hover:bg-indigo-800 py-6 px-8 rounded-xl border-none">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-white border-gray-700 hover:bg-gray-800 py-6 px-8 rounded-xl">
              Watch Demo
            </Button>
          </motion.div>
          
          <motion.div 
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <div className="flex flex-col items-center">
              <p className="text-white text-4xl font-bold">500+</p>
              <p className="text-gray-500">Customers</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-white text-4xl font-bold">99.9%</p>
              <p className="text-gray-500">Uptime</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-white text-4xl font-bold">24/7</p>
              <p className="text-gray-500">Support</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-white text-4xl font-bold">100M+</p>
              <p className="text-gray-500">API Calls</p>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="relative bg-gray-900 py-24 md:py-32 border-t border-gray-800">
        <div className="px-4 md:px-8 lg:px-12 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Powerful AI Features</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Our platform provides everything you need to build, deploy, and scale AI applications.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="w-6 h-6 text-indigo-400" />}
              title="Fast Inference"
              description="Deploy models with sub-100ms latency for real-time applications and seamless user experiences."
            />
            <FeatureCard 
              icon={<Star className="w-6 h-6 text-indigo-400" />}
              title="State-of-the-art Models"
              description="Access the latest AI models with continuous updates and improvements."
            />
            <FeatureCard 
              icon={<Shield className="w-6 h-6 text-indigo-400" />}
              title="Enterprise Security"
              description="SOC 2 compliant with encryption at rest and in transit. Your data remains private and secure."
            />
            <FeatureCard 
              icon={<Globe className="w-6 h-6 text-indigo-400" />}
              title="Global Edge Network"
              description="Deploy your AI applications globally with our distributed edge network for low latency."
            />
            <FeatureCard 
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-indigo-400">
                <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 12H8M16 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 3V8M12 16V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>}
              title="Seamless Integrations"
              description="Connect with all your favorite tools and services with our robust API and SDK."
            />
            <FeatureCard 
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-indigo-400">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>}
              title="Simple Deployment"
              description="Deploy your models with a single command or through our intuitive dashboard."
            />
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="relative bg-black py-24 md:py-32 border-t border-gray-800">
        <div className="px-4 md:px-8 lg:px-12 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Choose the plan that's right for you. All plans include a 14-day free trial.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard 
              title="Starter"
              price="$49"
              description="Perfect for individual developers and small projects."
              features={[
                "1M API calls per month",
                "5 models",
                "Standard support",
                "Community forum access",
                "Basic analytics"
              ]}
              cta="Get Started"
              highlighted={false}
            />
            <PricingCard 
              title="Pro"
              price="$99"
              description="Ideal for growing teams and businesses."
              features={[
                "5M API calls per month",
                "All models",
                "Priority support",
                "Advanced analytics",
                "Custom model fine-tuning",
                "Team collaboration"
              ]}
              cta="Get Started"
              highlighted={true}
            />
            <PricingCard 
              title="Enterprise"
              price="Custom"
              description="For large organizations with specific requirements."
              features={[
                "Unlimited API calls",
                "All models + custom models",
                "24/7 dedicated support",
                "SLA guarantees",
                "On-premise deployment options",
                "Custom integrations",
                "Advanced security controls"
              ]}
              cta="Contact Sales"
              highlighted={false}
            />
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="relative bg-gray-900 py-24 md:py-32 border-t border-gray-800">
        <div className="px-4 md:px-8 lg:px-12 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">What Our Customers Say</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Trusted by thousands of developers and companies worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="EmpireAI has completely transformed how we build AI features. The speed and reliability are unmatched."
              author="Sarah Johnson"
              role="CTO, TechGrowth"
              image="/assets/images/testimonial-1.jpg"
            />
            <TestimonialCard 
              quote="We reduced our AI infrastructure costs by 60% while improving performance. The support team is exceptional."
              author="Michael Chen"
              role="Engineering Lead, DataFlow"
              image="/assets/images/testimonial-2.jpg"
            />
            <TestimonialCard 
              quote="The platform's flexibility allowed us to experiment rapidly and scale seamlessly as our product grew."
              author="Elena Rodriguez"
              role="Product Manager, InnovateAI"
              image="/assets/images/testimonial-3.jpg"
            />
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section id="faq" className="relative bg-black py-24 md:py-32 border-t border-gray-800">
        <div className="px-4 md:px-8 lg:px-12 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Have questions? We're here to help.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <FAQItem 
              question="How do I get started with EmpireAI?"
              answer="Getting started is easy. Simply sign up for a free account, follow our quickstart guide, and you'll be up and running in minutes."
            />
            <FAQItem 
              question="What models are available on the platform?"
              answer="We offer a wide range of models for different tasks including text generation, image generation, speech recognition, and more. All major open-source and proprietary models are supported."
            />
            <FAQItem 
              question="How are API calls counted?"
              answer="API calls are counted based on the number of requests made to our API. Each request counts as one API call, regardless of the complexity or length of the response."
            />
            <FAQItem 
              question="Can I host my own custom models?"
              answer="Yes, our Pro and Enterprise plans allow you to deploy custom models on our infrastructure. We also offer on-premise deployment options for Enterprise customers."
            />
            <FAQItem 
              question="What kind of support do you offer?"
              answer="All plans include access to our community forum. Pro plans include priority email support, while Enterprise plans include 24/7 dedicated support with guaranteed response times."
            />
            <FAQItem 
              question="Is my data secure?"
              answer="Yes, we take security seriously. Your data is encrypted at rest and in transit. We are SOC 2 compliant and offer additional security controls for Enterprise customers."
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative bg-indigo-900/30 py-20 border-t border-gray-800">
        <div className="px-4 md:px-8 lg:px-12 mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
              <p className="text-lg text-gray-300 max-w-xl">
                Join thousands of companies building with EmpireAI today.
                Start your 14-day free trial, no credit card required.
              </p>
            </div>
            <Button size="lg" className="bg-white text-indigo-900 hover:bg-gray-100 py-6 px-8 rounded-xl whitespace-nowrap">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="relative bg-gray-900 text-white py-12 md:py-16 border-t border-gray-800">
        <div className="px-4 md:px-8 lg:px-12 mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L3 7L12 12L21 7L12 2Z" fill="#4F46E5" />
                    <path d="M3 17L12 22L21 17M3 12L12 17L21 12" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-lg font-bold">EmpireAI</span>
              </div>
              <p className="text-gray-400 mb-6">
                Building the future of AI infrastructure for developers and enterprises.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Release Notes</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Data Processing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">GDPR</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Examples</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400">© 2023 EmpireAI. All rights reserved.</p>
              <div className="mt-4 md:mt-0">
                <ul className="flex space-x-6">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Cookies</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        /* Space background with stars */
        .empire-space-bg {
          background-color: #000;
          background-image: 
            radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 40px),
            radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 30px),
            radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 40px),
            radial-gradient(rgba(255,255,255,.4), rgba(255,255,255,.1) 2px, transparent 30px);
          background-size: 550px 550px, 350px 350px, 250px 250px, 150px 150px;
          background-position: 0 0, 40px 60px, 130px 270px, 70px 100px;
        }
      `}</style>
    </div>
  );
}

// Component for feature cards
function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl hover:border-indigo-900/40 transition-colors duration-300">
      <div className="w-12 h-12 bg-gray-900/80 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

// Component for pricing cards
function PricingCard({ title, price, description, features, cta, highlighted }: PricingCardProps) {
  return (
    <div className={`rounded-xl overflow-hidden ${highlighted ? 'border-2 border-indigo-900 shadow-lg shadow-indigo-900/20' : 'border border-gray-800'}`}>
      <div className={`p-6 ${highlighted ? 'bg-gray-800' : 'bg-gray-900'}`}>
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <div className="flex items-baseline mb-2">
          <span className="text-4xl font-bold text-white">{price}</span>
          {price !== "Custom" && <span className="text-gray-500 ml-1">/month</span>}
        </div>
        <p className="text-gray-400 mb-6">{description}</p>
        
        <Button 
          className={`w-full py-5 ${highlighted ? 'bg-indigo-800 hover:bg-indigo-700 text-white' : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'}`}
        >
          {cta}
        </Button>
      </div>
      
      <div className="p-6 bg-black border-t border-gray-800">
        <p className="font-medium mb-4 text-gray-300">What's included:</p>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="mr-2 mt-1 text-indigo-400">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-gray-400">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Component for testimonial cards
function TestimonialCard({ quote, author, role, image }: TestimonialCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-indigo-900/30 transition-colors duration-300">
      <div className="mb-4 text-indigo-400">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.33333 20H4L9.33333 12H4V8H12V16L9.33333 20ZM21.3333 20H16L21.3333 12H16V8H24V16L21.3333 20Z" fill="currentColor"/>
        </svg>
      </div>
      
      <p className="text-gray-300 mb-6">{quote}</p>
      
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gray-700 rounded-full mr-4"></div>
        <div>
          <p className="font-semibold text-white">{author}</p>
          <p className="text-gray-500 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
}

// Component for FAQ items
function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <div className="border-b border-gray-800 pb-6">
      <h3 className="text-lg font-semibold mb-2 flex items-center text-white">
        {question}
        <ChevronRight className="ml-auto w-5 h-5 text-gray-500" />
      </h3>
      <p className="text-gray-400">{answer}</p>
    </div>
  );
} 