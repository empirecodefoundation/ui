"use client";
import React from "react";
import Image from "next/image";
import { LandingCard } from "@/components/common/landing-card";
import { Bebas_Neue, Afacad } from "next/font/google";
import { cn } from "@/lib/utils";
import StickySection from "@/components/common/sticky-section";

const bebas_neue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const press_start_2p = Afacad({
  weight: "400",
  subsets: ["latin"],
});

const page = () => {
  return (
    <section className="mx-auto px-4 overflow-x-hidden h-full w-full dark:bg-black dark:bg-grid-white/[0.05]">
      <div>
        <section
          className="section_hero relative z-[2] md:block overflow-hidden mt-16"
          style={{
            transform:
              "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);opacity: 1;transform-style: preserve-3d",
          }}
        >
          {/* <div> sound section </div> */}

          <div className="wrapper-container relative md:block w-full h-screen box-border">
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

        {/* icon section */}
        <div className="-mt-4 pb-12 flex flex-wrap justify-center items-center gap-10 lg:gap-12">
          <div className="flex items-center gap-3 text-zinc-300 font-bold">
            <Image
              src="/icons/vercel.png"
              width={40}
              height={40}
              alt="Vercel"
            />
            Vercel
          </div>
          <div className="flex items-center gap-3 text-zinc-300 font-bold">
            <Image src="/icons/next.png" width={40} height={40} alt="Next.js" />
            NextJS
          </div>
          <div className="flex items-center gap-3 text-zinc-300 font-bold">
            <Image
              src="/icons/radix.png"
              width={40}
              height={40}
              alt="Radix UI"
            />
            Radix UI
          </div>
          <div className="flex items-center gap-3 text-zinc-300 font-bold">
            <Image
              src="/icons/framer.png"
              width={40}
              height={40}
              alt="Framer"
            />
            Framer
          </div>
        </div>
      </div>

      {/* Featured Components  */}
      <div className="flex my-4 justify-center items-center px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-start items-center gap-4">
          <LandingCard
            src={"./component.gif"}
            alt={""}
            title="AI Text Summarizer Button"
            component="ai-summarizer-button"
          />
          <LandingCard
            src={"./component.gif"}
            alt={""}
            title="AI Text Summarizer Button"
            component="ai-summarizer-button"
          />
          <LandingCard
            src={"./component.gif"}
            alt={""}
            title="AI Text Summarizer Button"
            component="ai-summarizer-button"
          />
          <LandingCard
            src={"./component.gif"}
            alt={""}
            title="AI Text Summarizer Button"
            component="ai-summarizer-button"
          />
          <LandingCard
            src={"./component.gif"}
            alt={""}
            title="AI Text Summarizer Button"
            component="ai-summarizer-button"
          />
          <LandingCard
            src={"./component.gif"}
            alt={""}
            title="AI Text Summarizer Button"
            component="ai-summarizer-button"
          />
          <LandingCard
            src={"./component.gif"}
            alt={""}
            title="AI Text Summarizer Button"
            component="ai-summarizer-button"
          />
          <LandingCard
            src={"./component.gif"}
            alt={""}
            title="AI Text Summarizer Button"
            component="ai-summarizer-button"
          />
          <LandingCard
            src={"./component.gif"}
            alt={""}
            title="AI Text Summarizer Button"
            component="ai-summarizer-button"
          />
        </div>
      </div>

      {/* Featured Components */}
      <section className="sticky">
        <div
          className="z-10 h-[5vw] w-full absolute"
          style={{
            backgroundImage: "linear-gradient(180deg, #0707071c 72%, #07070700",
          }}
        ></div>
        <div className="py-20 px-10">
          <div className="mx-auto w-full">
            <div className="wrapper z-[1] relative inset-0 flex justify-center items-center w-full h-[400vh]">
              <div className="sticky-wrapper absolute inset-0">
                <div className="sticky-wrapper-element sticky top-0 w-full h-screen">
                  <div className="sticky-text-wrapper w-full h-full relative">
                    <div className="flex flex-col gap-x-0 gap-y-[0.5vw] absolute inset-[3.5rem_0_auto_0]">
                      <div>AI COMPONENTS</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cards w-full mt-[100vh] mb-0">
                <div className="cards-wrapper relative flex gap-x-[1vh] gap-y-0 items-center justify-start">
                  <div
                    className="first-card z-[2] relative w-[20.822vh] h-[27.6vw] flex justify-center items-center"
                    style={{ transform: "rotate(4deg) translate(-32vw)" }}
                  >
                    <div
                      className="card-outer absolute overflow-hidden bg-cover bg-center border border-[#f3edd896] rounded-[4px] w-[20.833vw] h-[27.6vw]"
                      style={{
                        backgroundImage: "url('/card-outer1.webp')",
                      }}
                    ></div>
                    <div className="bg-[#f3edd882] w-[19.7vw] h-[26.7vw] absolute overflow-hidden clip-card"></div>
                    <div
                      className="absolute bg-cover bg-center overflow-hidden clip-card w-[19.5vw] h-[26.5vw]"
                      style={{ backgroundImage: "url('/component.gif')" }}
                    >
                      <canvas
                        className="w-[327px] h-[426px] absolute top-0 left-0 inline-block"
                        role="image"
                      ></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default page;
