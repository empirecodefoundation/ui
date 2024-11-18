"use client";
import React from "react";
import { MobileConntainer } from "@/components/common/examples-container-mobile";
import { DesktopConatainer } from "@/components/common/examples-container-desktop";
import { HeroSection } from "@/components/common/hero-section";
import { StickySection } from "@/components/common/sticky-section";
import { IconSection } from "@/components/common/icon-section";

const page = () => {
  return (
    <main className="page-wrapper h-auto overflow-visible static block box-border">
      <div className="texture z-[1] bg-[#0000] w-full h-full fixed inset-0 bg-cover bg-scroll bg-repeat bg-[url('/backdrop.svg')] opacity-100 bg-[position:50%_100%,0_0]"></div>
      <div className="grain-overlay is-hero z-[2] opacity-[0.02] bg-[url('/grain-overlay.gif')] bg-[0_0] bg-auto fixed inset-0"></div>
      <section className="mx-auto px-4 overflow-x-hidden h-full w-full">
        <div>
          {/* hero section */}
          <HeroSection />

          {/* icon section */}
          <IconSection />
        </div>

        {/* featured components */}
        <div className="my-4 px-4 relative">
          <div>
            <div className="z-10 h-[5vw] w-full absolute"></div>
            <div className="mx-auto w-full">
              <div className="wrapper z-[1] relative inset-0 flex justify-center items-center w-full h-[400vh]">
                <StickySection />

                {/* mobile */}
                <MobileConntainer />

                {/* desktop */}
                <DesktopConatainer />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
