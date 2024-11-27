// pages/index.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import StartupAnalyzer from './startupAnalyzer';
import { motion } from 'framer-motion';

const StarryBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Dot grid background */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgb(55 65 81 / 0.3) 1px, transparent 0)
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

const Home: NextPage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <>
      <Head>
        <title>Startup Analyzer - Analyze Your Startup Potential</title>
        <meta 
          name="description" 
          content="Analyze your startup idea with AI-powered insights, market analysis, and growth projections" 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StarryBackground>
        <main className="min-h-screen py-8">
          <div className="container mx-auto px-4">
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
                Analyze your startup idea with AI-powered insights
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl"
            >
              <StartupAnalyzer />
            </motion.div>
          </div>
        </main>

        <footer className="border-t border-gray-800 py-8 mt-16">
          <div className="container mx-auto px-4 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Startup Analyzer. All rights reserved.</p>
          </div>
        </footer>
      </StarryBackground>
    </>
  );
};

export default Home;