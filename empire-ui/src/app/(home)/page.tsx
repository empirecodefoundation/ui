"use client";
import React from "react";
import ParticleImage, {
  ParticleOptions,
  Vector,
  forces,
  ParticleForce,
} from "react-particle-image";
import useWindowSize from "@rooks/use-window-size";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Footer from "@/components/common/Footer";
import LandingCard2 from "@/components/common/landing-card2";
import JapaneseCharacter from "@/components/common/japanese";

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
    <section className="container">
      <div className="h-full">
        <div className="w-full flex-col justify-center pt-16 pb-5 items-start ">
          <ParticleImage
            src={"/empireUI-logo.png"}
            scale={1}
            entropy={2}
            width={1500}
            height={460}
            maxParticles={20000}
            particleOptions={particleOptions}
            mouseMoveForce={motionForce}
            touchMoveForce={motionForce}
            backgroundColor="#00000"
          />
        </div>
        <div className="grid justify-center items-center">
          <div className="container mx-auto px-9 sm:px-6 ml-10 lg:px-8 text-left">
            <p className="text-xl text-zinc-200 mb-10 max-w-2xl text-center">
              The AI-powered component library that adapts to your design needs.
              Build beautiful, responsive interfaces in record time.
            </p>
          </div>
          <div className="flex justify-center  space-x-4">
            <Button size="lg" variant="outline">
              View Components
            </Button>
            <Button
              size="lg"
              className="bg-white text-zinc-700 font-semibold hover:text-zinc-200"
            >
              Get Started
            </Button>
          </div>
        </div>
        <div className="py-24 flex w-full justify-center items-center gap-14">
          <div className="flex justify-center items-center gap-3 text-zinc-300 font-bold">
            <Image
              src="/icons/vercel.png"
              width={50}
              height={50}
              alt="vercel"
            />{" "}
            Vercel
          </div>
          <div className="flex justify-center items-center  gap-3 text-zinc-300 font-bold">
            <Image src="/icons/next.png" width={50} height={50} alt="vercel" />{" "}
            NextJS
          </div>
          <div className="flex justify-center items-center gap-3 text-zinc-300 font-bold">
            <Image src="/icons/radix.png" width={50} height={50} alt="vercel" />{" "}
            Radix UI
          </div>
          <div className="flex justify-center items-center gap-3 text-zinc-300 font-bold">
            <Image
              src="/icons/framer.png"
              width={50}
              height={50}
              alt="vercel"
            />{" "}
            Framer
          </div>
        </div>
      </div>
      {/* Middle Part  */}
      {/* <div className="w-full space-y-9 flex justify-center items-center">
        <div className="" style={{ width: "50%" }}>
          <ScatterGraphy src="/japnese.png" shape={"square"} size={0.1} />
        </div>
      </div> */}
      <JapaneseCharacter />

      {/* Featured Components  */}
      <div className="flex-col mt-9  justify-center items-center container px-52 bg-black">
        <h2 className="text-5xl text-center font-bold mb-4">
          Featured Components
        </h2>
        <p className=" text-gray-400 text-center">
          All sorts of cool components created by our community, from simple to
          detailed and complex components.{" "}
          <span className="text-zinc-200 font-bold">
            Your ultimate AI components library.
          </span>
        </p>
        <div className="grid grid-cols-3  justify-between gap-5 items-start container mt-16 my-6">
          <LandingCard2 />
          <LandingCard2 />
          <LandingCard2 />
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default page;
