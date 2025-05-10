import { cn } from "@/lib/utils";
import { Bebas_Neue, Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const bebas_neue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const press_start_2p = Inter({
  weight: ["400"],
  subsets: ["latin"],
});

export const HeroSection = () => {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null); // Create a ref for the audio object

  // Initialize audio when the component mounts
  useEffect(() => {
    audioRef.current = new Audio("/EmpireSound2.mp3"); // Assign audio to the ref

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
          audioRef.current.currentTime = 0; // Reset sound when toggling off
        } else {
          audioRef.current.play();
        }
      }
      return !prev;
    });
  };

  return (
    <section
      className="section_hero relative z-[2] md:block overflow-hidden mt-16"
      style={{
        transform:
          "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
        opacity: 1,
        transformStyle: "preserve-3d",
      }}
      onClick={toggleSound}
    >
      {/* Sound Toggle Button */}
      <div
        className="flex z-10 justify-center items-center absolute inset-x-0 top-2 bottom-auto cursor-pointer"
        style={{
          transform:
            "translate3d(0vw, 0vw, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
          transformStyle: "preserve-3d",
        }}
      >
        <a
          href="#"
          className={`sound-wrapper absolute clip-sound flex items-center justify-center mt-0 ml-[0.1vw] h-[3.47vh] w-[12.7%] ${
            isSoundOn ? "bg-[#fd8a46]" : "bg-[#643b23]"
          }`}
        >
          <div className="h-[1vw] overflow-hidden text-xs">
            <div
              className={`static transform transition-transform duration-500 ${
                isSoundOn ? "translate-y-[-1vw]" : "translate-y-0"
              } leading-[1vw]`}
            >
              [ACTIVATE SOUND]
            </div>
            <div
              className={`static transform transition-transform duration-500 text-center ${
                isSoundOn ? "translate-y-[-1vw]" : "translate-y-0"
              } leading-[1vw]`}
            >
              [SOUND ON]
            </div>
          </div>
        </a>
      </div>

      {/* Responsive Hero Layout */}
      <div className="wrapper-container relative w-full h-auto box-border flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 pt-16 md:pt-32 px-4 md:px-16">
        {/* Hero Text */}
        <div className="flex-1 flex flex-col items-center md:items-start z-10">
          <div className="block w-32 h-32 md:hidden my-6">
            <img src="/empire-logo.png" alt="empire logo" />
          </div>
          <div className="heading-content flex justify-center">
            <h2 className={cn("tracking-[.001em] uppercase font-bold text-5xl md:text-7xl lg:text-8xl text-[#f3edd8] transform scale-y-[1.4]", bebas_neue.className)}>
              AI POWERED
            </h2>
          </div>
          <div className="heading-content flex items-center">
            <h2 className={cn("tracking-[.001em] uppercase font-bold text-5xl md:text-7xl lg:text-8xl text-[#f3edd8] transform scale-y-[1.4]", bebas_neue.className)}>
              COMPONENT
            </h2>
          </div>
          <div className="heading-content flex items-center">
            <h2 className={cn("tracking-[.001em] uppercase font-bold text-5xl md:text-7xl lg:text-8xl text-[#f3edd8] transform scale-y-[1.4]", bebas_neue.className)}>
              LIBRARY
            </h2>
          </div>
          <div className="wrapper-description z-[1] flex flex-col pt-8 text-center md:text-left text-lg -space-y-2 text-[#f3edd8]">
            <p>The next generation UI toolkit for AI applications</p>
            <p>with ready-to-use intelligent components</p>
            <p>designed for the modern web experience.</p>
          </div>
        </div>
        {/* Featured Card */}
        <div className="flex-1 flex justify-center items-center w-full md:w-auto mt-12 md:mt-0 z-10">
          <div className="wrapper-card-container w-[90vw] max-w-[400px] md:w-[25vw] lg:w-[17vw] backdrop-blur-[4px] bg-gradient-to-b from-[#f3edd81a] to-[#f3edd81a] border border-[#f3edd852] rounded-[1px] relative">
            <div className="wrapper-card-inner relative backdrop-blur-[27px] w-full h-full">
              <div className="card-inner-corner-wrapper z-[2] w-full h-full absolute inset-0">
                <div className="top-left-corner absolute -top-[0.5vw] -left-[0.45vw] inset-x-auto inset-y-auto opacity-100 transform translate-x-0 translate-y-0 translate-z-0 scale-100 rotate-x-0 rotate-y-0 rotate-z-0 skew-x-0 skew-y-0 transform-style-preserve-3d">
                  <img
                    loading="lazy"
                    className="w-full block"
                    src="https://cdn.prod.website-files.com/6654d3c17b8020f4b7ba121d/666301b9565bc943edac3106_corner-path.svg"
                  />
                </div>
                <div className="bottom-left-corner absolute -bottom-[0.5vw] -left-[0.45vw] inset-x-auto inset-y-auto opacity-100 transform translate-x-0 translate-y-0 translate-z-0 scale-100 rotate-x-0 rotate-y-0 rotate-z-0 skew-x-0 skew-y-0 transform-style-preserve-3d">
                  <img
                    loading="lazy"
                    className="w-full block"
                    src="https://cdn.prod.website-files.com/6654d3c17b8020f4b7ba121d/6663035dc75e4face043c32e_corner-path-b-l.svg"
                  />
                </div>
                <div className="bottom-left-corner absolute -bottom-[0.5vw] -right-[0.45vw] inset-x-auto inset-y-auto opacity-100 transform translate-x-0 translate-y-0 translate-z-0 scale-100 rotate-x-0 rotate-y-0 rotate-z-0 skew-x-0 skew-y-0 transform-style-preserve-3d">
                  <img
                    loading="lazy"
                    className="w-full block"
                    src="https://cdn.prod.website-files.com/6654d3c17b8020f4b7ba121d/6663035dcdcc515bf5ac7a30_corner-path-b-r.svg"
                  />
                </div>
                <div className="bottom-left-corner absolute -top-[0.5vw] -right-[0.45vw] inset-x-auto inset-y-auto opacity-100 transform translate-x-0 translate-y-0 translate-z-0 scale-100 rotate-x-0 rotate-y-0 rotate-z-0 skew-x-0 skew-y-0 transform-style-preserve-3d">
                  <img
                    loading="lazy"
                    className="w-full block"
                    src="https://cdn.prod.website-files.com/6654d3c17b8020f4b7ba121d/6663035da9df92c312bca5fd_corner-path-r.svg"
                  />
                </div>
              </div>
              {/* Card Content (add a fallback image if needed) */}
              <img src="/assets/templates/ai-dashboard.webp" alt="Featured Component" className="w-full h-56 object-cover rounded-t" />
              <div className="p-4">
                <h3 className="text-xl font-bold text-[#f3edd8] mb-2">AI Chatbox</h3>
                <p className="text-[#f3edd8]/70">A ready-to-use AI chat interface for your apps.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="wrapper-content-overlay hidden md:block absolute z-0 clip-polygon bg-[linear-gradient(#fbf6c0,#fbf6c0_3px,transparent_0,transparent_9px)] bg-[length:100%_7px] opacity-[0.05] object-cover h-5/6 w-full animate-scan-overlay"></section>
      <section
        className={
          "wrapper-container-mobile block md:hidden absolute z-0 clip-polygon-mobile bg-[linear-gradient(#00000052,#00000052),url('/hero-section-1.webp')] bg-[#20202047] object-cover bg-center bg-[length:150%_100%] h-5/6 w-full"
        }
      ></section>
      <section className="wrapper-content-overlay block md:hidden absolute z-0 clip-polygon-mobile bg-[linear-gradient(#fbf6c0,#fbf6c0_3px,transparent_0,transparent_9px)] bg-[length:100%_7px] opacity-[0.05] object-cover h-5/6 w-full animate-scan-overlay"></section>
    </section>
  );
};
