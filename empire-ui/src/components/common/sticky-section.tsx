import { cn } from "@/lib/utils";
import { Bebas_Neue, Afacad } from "next/font/google";
import Sticky from "react-sticky-el";

const bebas_neue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const press_start_2p = Afacad({
  weight: "400",
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
                    //INTO THE AI GEN
                  </div>
                  <h2
                    className={cn(
                      "tracking-[.001em] uppercase font-bold text-5xl md:text-7xl lg:text-8xl text-[#f3edd8] transform scale-y-[1.4]",
                      bebas_neue.className
                    )}
                  >
                    AI COMPONENTS
                  </h2>
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
              </div>
            </div>
          </div>
        </div>
      </Sticky>
    </div>
  );
};
