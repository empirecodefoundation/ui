import { cn } from "@/lib/utils";
import { Bebas_Neue, Inter } from "next/font/google";
import Sticky from "react-sticky-el";

const bebas_neue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const press_start_2p = Inter({
  weight: ["400"],
  subsets: ["latin"],
});

export const StickySection = () => {
  return (
    <div className="sticky-wrapper absolute inset-0">
      <Sticky>
        <div className="sticky-wrapper-element top-0 w-full h-screen">
          <div className="sticky-text-wrapper w-full h-full relative">
            <div className="flex justify-center items-center">
              <div className="flex flex-col gap-x-0 space-y-20 md:space-y-32 absolute items-center justify-center top-32">
                <div className="flex flex-col gap-x-0 gap-y-[0.5vw] items-center justify-center">
                  <div
                    className={cn(
                      "tracking-[.001em] uppercase font-bold text-lg md:text-xl lg:text-2xl text-[#f3edd8] transform scale-y-[1.4]",
                      bebas_neue.className
                    )}
                  >
                    //INTELLIGENT INTERFACES
                  </div>
                  <h2
                    className={cn(
                      "tracking-[.001em] uppercase font-bold text-5xl md:text-7xl lg:text-8xl text-[#f3edd8] transform scale-y-[1.4]",
                      bebas_neue.className
                    )}
                  >
                    AI COMPONENTS
                  </h2>
                  <div className="mt-2 bg-gradient-to-r from-amber-300 to-orange-500 px-4 py-1 rounded-sm">
                    <span className="text-black font-bold text-xs md:text-sm">NEW v1.2.0 AVAILABLE</span>
                  </div>
                </div>
                <div
                  className={cn(
                    "tracking-[.001em] uppercase font-bold text-sm md:text-md lg:text-lg text-[#f3edd8] transform scale-y-[1.2]"
                  )}
                >
                  <div className="flex flex-col -space-y-2 justify-center items-center">
                    <p>Supercharge your React apps with AI-driven</p>
                    <p>components. Build intelligent, customizable,</p>
                    <p>and responsive interfaces effortlessly—saving</p>
                    <p>time and boosting performance with minimal code.</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <a href="/docs" className="bg-[#fd8a46] hover:bg-[#fd7a2e] text-black font-bold py-2 px-6 rounded-sm transition-colors">
                    View Documentation
                  </a>
                  <a href="https://github.com/empirecodefoundation/ui" target="_blank" rel="noopener noreferrer" className="bg-transparent border border-[#f3edd8] text-[#f3edd8] font-bold py-2 px-6 rounded-sm hover:bg-[#f3edd81a] transition-colors">
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Sticky>
    </div>
  );
};
