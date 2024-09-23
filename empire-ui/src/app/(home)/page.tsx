"use client";
import React from "react";
import ParticleImage, {
  ParticleOptions,
  forces,
  ParticleForce,
} from "react-particle-image";
import useWindowSize from "@rooks/use-window-size";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LandingCard } from "@/components/common/landing-card";
import Link from "next/link";

const particleOptions: ParticleOptions = {
  filter: ({ x, y, image }) => {
    // Get pixel
    const pixel = image.get(x, y);
    // Make a particle for this pixel if blue > 50 (range 0-255)
    return pixel.b > 50;
  },
  color: ({ x, y, image }) => "#ddd",
  radius: () => Math.random() * 1.5 + 0.5,
  mass: () => 70,
  friction: () => 0.25,
};

const motionForce = (x: number, y: number): ParticleForce => {
  return forces.disturbance(x, y, 8);
};

const page = () => {
  const { innerWidth, innerHeight } = useWindowSize();
  return (
    <section className="mx-auto px-4 overflow-x-hidden">
      <div className="h-full">
        {/* Particle Image Section */}
        <div className="flex flex-col justify-center items-center py-10">
          <ParticleImage
            src={"/empireUI-logo.png"}
            scale={1}
            entropy={10}
            width={1500}
            height={460}
            maxParticles={20000}
            particleOptions={particleOptions}
            mouseMoveForce={motionForce}
            touchMoveForce={motionForce}
            backgroundColor="#00000"
          />
        </div>

        {/* Text and buttons section */}
        <div className="flex flex-col justify-center text-center items-center px-4">
          <p className="text-lg sm:text-xl text-zinc-200 mb-6 max-w-2xl">
            The AI-powered component library that adapts to your design needs.
            Build beautiful, responsive interfaces in record time.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-x-4 sm:space-y-0">
            <Link href={"/docs/ai-summarizer-button"}>
              <Button size="lg" variant="outline">
                View Components
              </Button>
            </Link>
            <Link href={"/docs"}>
              <Button
                variant={"outline"}
                size="lg"
                className="bg-white text-zinc-700 font-semibold"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        {/* icon section */}
        <div className="pt-20 pb-12 flex flex-wrap justify-center items-center gap-10 lg:gap-12">
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
          />
          <LandingCard
            src={"./component.gif"}
            alt={""}
            title="AI Text Summarizer Button"
          />
          <LandingCard
            src={"./component.gif"}
            alt={""}
            title="AI Text Summarizer Button"
          />
          <LandingCard
            src={"./component.gif"}
            alt={""}
            title="AI Text Summarizer Button"
          />
          <LandingCard
            src={"./component.gif"}
            alt={""}
            title="AI Text Summarizer Button"
          />
          <LandingCard
            src={"./component.gif"}
            alt={""}
            title="AI Text Summarizer Button"
          />
          <LandingCard
            src={"./component.gif"}
            alt={""}
            title="AI Text Summarizer Button"
          />
          <LandingCard
            src={"./component.gif"}
            alt={""}
            title="AI Text Summarizer Button"
          />
          <LandingCard
            src={"./component.gif"}
            alt={""}
            title="AI Text Summarizer Button"
          />
        </div>
      </div>
    </section>
  );
};

export default page;
