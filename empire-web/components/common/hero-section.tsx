import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { MinecartLCD } from "@/lib/fonts";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio when the component mounts
  useEffect(() => {
    audioRef.current = new Audio("/EmpireSound2.mp3");

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleSound = () => {
    setIsSoundOn((prev) => {
      if (audioRef.current) {
        if (prev) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        } else {
          audioRef.current.play();
        }
      }
      return !prev;
    });
  };

  return (
    <section className="relative z-[2] h-screen overflow-hidden cyber-grid">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-digital-black opacity-90 z-[-1]"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/backdrop.svg')] opacity-10 z-[-1]"></div>
      
      {/* Sound toggle button */}
      <div className="absolute top-6 right-6 z-10">
        <button 
          onClick={toggleSound}
          className={`px-4 py-2 border ${isSoundOn ? 'border-neon-blue text-neon-blue neon-glow' : 'border-gray-600 text-gray-500'} bg-black bg-opacity-50 transition-all duration-300`}
        >
          <span className={cn("text-sm tracking-wider", MinecartLCD.className)}>
            {isSoundOn ? "SOUND ON" : "ACTIVATE SOUND"}
          </span>
        </button>
      </div>

      {/* Main content container */}
      <div className="container mx-auto h-full flex flex-col items-center justify-center px-4">
        {/* Empire logo with glow effect */}
        <div className="w-40 h-40 md:w-48 md:h-48 mb-8 relative">
          <img 
            src="/empire-logo.png" 
            alt="Empire UI Logo" 
            className="w-full h-full object-contain neon-glow"
          />
        </div>
        
        {/* Main heading with glitch effect */}
        <div className="text-center mb-12 digital-scan">
          <h1 className={cn(
            "text-6xl md:text-8xl lg:text-9xl tracking-tight font-bold cyber-glitch text-white mb-4",
            MinecartLCD.className
          )}>
            EMPIRE<span className="text-neon-blue">UI</span>
          </h1>
          <h2 className={cn(
            "text-3xl md:text-4xl tracking-wide text-cyber-yellow uppercase mt-2",
            MinecartLCD.className
          )}>
            AI-POWERED COMPONENT LIBRARY
          </h2>
        </div>
        
        {/* Description with terminal style */}
        <div className="max-w-3xl w-full bg-black bg-opacity-80 border border-neon-blue p-6 mb-12">
          <div className={cn("text-neon-blue text-lg space-y-2", MinecartLCD.className)}>
            <p className="text-white flex">
              <span className="text-neon-purple mr-2">&gt;</span> 
              Building the <span className="text-neon-purple mx-1">future</span> of AI interfaces
            </p>
            <p className="text-white flex">
              <span className="text-neon-purple mr-2">&gt;</span> 
              Modern. Responsive. <span className="text-neon-purple mx-1">Intelligent.</span>
            </p>
            <p className="text-white flex">
              <span className="text-neon-purple mr-2">&gt;</span> 
              <span className="animate-pulse">_</span>
            </p>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <Button className={cn(
            "bg-neon-blue hover:bg-blue-700 text-white px-8 py-6 text-lg border-2 border-neon-blue neon-glow",
            MinecartLCD.className
          )}>
            GET STARTED
          </Button>
          <Button variant="outline" className={cn(
            "bg-transparent hover:bg-neon-purple/20 text-neon-purple border-2 border-neon-purple px-8 py-6 text-lg neon-purple-glow",
            MinecartLCD.className
          )}>
            EXPLORE DOCS
          </Button>
        </div>
        
        {/* Code snippet floating element */}
        <div className="absolute bottom-20 right-10 hidden lg:block max-w-md w-full bg-black bg-opacity-90 border border-neon-purple p-4 transform rotate-3 neon-purple-glow">
          <div className={cn("text-sm", MinecartLCD.className)}>
            <p className="text-gray-400">// Initialize Empire UI</p>
            <p className="text-white">npx <span className="text-neon-blue">@empireui/empire-ui</span> init</p>
            <p className="text-white">import {'{'} <span className="text-neon-purple">AIChatbox</span> {'}'} from <span className="text-cyber-yellow">'@empireui/empire-ui'</span>;</p>
            <p className="text-gray-400">// AI-powered interface is ready!</p>
          </div>
        </div>
      </div>
    </section>
  );
};
