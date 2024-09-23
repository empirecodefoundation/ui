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
import Footer from "@/components/common/Footer";
import LandingCard2 from "@/components/common/landing-card2";
import JapaneseCharacter from "@/components/common/japanese";
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
        <div className="py-24 flex flex-wrap justify-center items-center gap-10 lg:gap-12">
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

      <JapaneseCharacter />

      {/* Featured Components  */}
      <div className="flex flex-col my-9 justify-center items-center px-4 py-12 bg-black">
        <h2 className="text-3xl sm:text-5xl font-bold text-center mb-4">
          Featured Components
        </h2>
        <p className="text-gray-400 text-center mb-8 max-w-3xl">
          All sorts of cool components created by our community, from simple to
          detailed and complex components.{" "}
          <span className="text-zinc-200 font-bold">
            Your ultimate AI components library.
          </span>
        </p>
        <div className="flex flex-1 flex-wrap justify-center items-center gap-4">
          <LandingCard2 />
          <LandingCard2 />
          <LandingCard2 />
          <LandingCard2 />
        </div>
      </div>
    </section>
  );
};

export default page;
