'use client';
import { motion } from 'framer-motion';
import StartupAnalyzer from './startupAnalyzer';
import { GraduationCap, Rocket, Trophy } from 'lucide-react';

const StarryBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Dot grid background */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.5) 1px, transparent 0)
          `,
          backgroundSize: '24px 24px',
          backgroundPosition: '-1px -1px'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default function StartupAnalyzerPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const features = [
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Growth Analysis",
      description: "Track and predict your startup's growth trajectory"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Performance Metrics",
      description: "Monitor key performance indicators in real-time"
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Smart Insights",
      description: "Get AI-powered recommendations for your business"
    }
  ];

  return (
    <StarryBackground>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Startup Analysis Platform
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Make data-driven decisions with our advanced analytics tools
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex justify-center mb-4 text-blue-400">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Analyzer Component */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl"
        >
          <StartupAnalyzer />
        </motion.div>
      </div>
    </StarryBackground>
  );
}