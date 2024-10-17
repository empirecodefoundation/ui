import { cn } from "@/lib/utils";
import { Bebas_Neue, Afacad } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const bebas_neue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const press_start_2p = Afacad({
  weight: "400",
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
      {/* <div> sound section </div> */}
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

      <div className="wrapper-container relative md:block w-full h-screen box-border">
        <div
          className="flex z-[2] justify-center items-center absolute inset-x-0 bottom-[120px]"
          style={{
            transform:
              "translate3d(0vw, 0vw, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="static">
            <div>dummy text</div>
          </div>
        </div>

        <div
          className="flex z-[2] absolute justify-center items-center -ml-10 inset-[42%_-1.5%_60%_auto]"
          style={{
            transform:
              "translate3d(0vw, 0vw, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(90deg) skew(0deg, 0deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="static">
            <div>dummy text</div>
          </div>
        </div>

        <div
          className="flex z-[2] absolute justify-center items-center -ml-10 inset-[42%_auto_60%_1.5%]"
          style={{
            transform:
              "translate3d(0vw, 0vw, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(-90deg) skew(0deg, 0deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="static">
            <div>dummy text</div>
          </div>
        </div>

        <section
          className={`wrapper-content hidden md:block absolute z-0 clip-polygon bg-[linear-gradient(#00000052,#00000052),url('/hero-section-1.webp')] bg-[#20202047] object-cover bg-center bg-[length:100%_100%] h-5/6 w-full`}
        ></section>
        <section className="wrapper-content-overlay hidden md:block absolute z-0 clip-polygon bg-[linear-gradient(#fbf6c0,#fbf6c0_3px,transparent_0,transparent_9px)] bg-[length:100%_7px] opacity-[0.05] object-cover h-5/6 w-full animate-scan-overlay"></section>
        <section
          className={
            "wrapper-container-mobile block md:hidden absolute z-0 clip-polygon-mobile bg-[linear-gradient(#00000052,#00000052),url('/hero-section-1.webp')] bg-[#20202047] object-cover bg-center bg-[length:150%_100%] h-5/6 w-full"
          }
        ></section>
        <section className="wrapper-content-overlay block md:hidden absolute z-0 clip-polygon-mobile bg-[linear-gradient(#fbf6c0,#fbf6c0_3px,transparent_0,transparent_9px)] bg-[length:100%_7px] opacity-[0.05] object-cover h-5/6 w-full animate-scan-overlay"></section>
      </div>
      <div className="flex justify-center">
        <div className="wrapper-heading absolute top-[35%] md:top-[45%] md:left-[6vw] transform -translate-y-1/2 flex flex-col items-center md:items-start space-y-1">
          <div className="block w-32 h-32 md:hidden my-6">
            <img src="/empire-logo.png" alt="empire logo"></img>
          </div>
          <div className="heading-content flex justify-center">
            <h2
              className={cn(
                "tracking-[.001em] uppercase font-bold text-6xl md:text-8xl lg:text-9xl text-[#f3edd8] transform scale-y-[1.4]",
                bebas_neue.className
              )}
            >
              AI POWERED
            </h2>
          </div>
          <div className="heading-content flex items-center">
            <h2
              className={cn(
                "tracking-[.001em] uppercase font-bold text-6xl md:text-8xl lg:text-9xl text-[#f3edd8] transform scale-y-[1.4]",
                bebas_neue.className
              )}
            >
              COMPONENT
            </h2>
          </div>
          <div className="heading-content flex items-center">
            <h2
              className={cn(
                "tracking-[.001em] uppercase font-bold text-6xl md:text-8xl lg:text-9xl text-[#f3edd8] transform scale-y-[1.4]",
                bebas_neue.className
              )}
            >
              LIBRARY
            </h2>
          </div>
          <div className="wrapper-description z-[1] flex flex-col pt-10 text-center md:text-left text-lg -space-y-2 text-[#f3edd8]">
            {/* <div className=""> {gif} </div> */}
            <p>The AI-powered component library</p>
            <p>that adapts to your design needs.</p>
            <p>Build beautiful, responsive interfaces.</p>
          </div>
        </div>
        <div className="wrapper-card-container hidden absolute md:flex md:justify-center md:items-center w-[25vw] lg:w-[17vw] bottom-[25vw] lg:bottom-[15vw] right-[5vw] backdrop-blur-[4px] bg-gradient-to-b from-[#f3edd81a] to-[#f3edd81a] border border-[#f3edd852] rounded-[1px]">
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
            <div
              className={cn(
                "card-text relative flex justify-center items-center p-6 text-md text-[#f3edd8]",
                press_start_2p.className
              )}
            >
              <div className="flex flex-col">
                <div className="text-row flex items-center justify-start">
                  <p>// WELCOME TO EMPIRE UI</p>
                </div>
                <div className="text-row flex items-center justify-start">
                  <p>LET JOURNEYBEGIN = TRUE;</p>
                </div>
                <div className="text-row flex items-center justify-start">
                  <p>NPX EMPIREUI@LATEST INIT</p>
                </div>
                <div className="text-row flex items-center justify-start">
                  <p>RETHINK AI DESIGN</p>
                </div>
                <div className="text-row flex items-center justify-start">
                  <p>{"}"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
