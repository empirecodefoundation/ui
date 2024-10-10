"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LandingCard } from "@/components/common/landing-card";
import Link from "next/link";
import path from "path";

const page = () => {
  return (
    <section className="mx-auto px-4 overflow-x-hidden h-full w-full dark:bg-black dark:bg-grid-white/[0.05]">
      <div>
        <section
          className="section_hero relative z-20 block overflow-hidden mt-16"
          style={{
            transform:
              "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);opacity: 1;transform-style: preserve-3d",
          }}
        >
          {/* <div> sound section </div> */}

          <div className="wrapper-container relative block w-full h-screen box-border">
            <section
              className={`wrapper-content z-0 bg-[url('/hero-image.webp')] object-cover bg-center bg-cover h-full w-full`}
              style={{
                clipPath:
                  "polygon(97.448% .734%, 99.706% 5.532%, 99.706% 5.532%, 99.752% 5.637%, 99.793% 5.747%, 99.83% 5.862%, 99.863% 5.981%, 99.89% 6.104%, 99.913% 6.23%, 99.931% 6.359%, 99.944% 6.491%, 99.952% 6.624%, 99.955% 6.758%, 99.955% 37.888%, 99.955% 37.888%, 99.95% 38.064%, 99.937% 38.238%, 99.914% 38.408%, 99.884% 38.572%, 99.846% 38.73%, 99.799% 38.881%, 99.745% 39.024%, 99.684% 39.158%, 99.616% 39.281%, 99.542% 39.394%, 97.566% 42.09%, 97.566% 42.09%, 97.485% 42.212%, 97.411% 42.347%, 97.344% 42.492%, 97.286% 42.648%, 97.235% 42.812%, 97.193% 42.985%, 97.16% 43.164%, 97.136% 43.348%, 97.122% 43.537%, 97.117% 43.73%, 97.117% 56.042%, 97.117% 56.042%, 97.12% 56.207%, 97.131% 56.369%, 97.149% 56.529%, 97.173% 56.685%, 97.204% 56.837%, 97.242% 56.984%, 97.286% 57.125%, 97.336% 57.26%, 97.392% 57.388%, 97.454% 57.507%, 99.644% 61.413%, 99.644% 61.413%, 99.701% 61.523%, 99.753% 61.64%, 99.799% 61.764%, 99.839% 61.893%, 99.874% 62.028%, 99.903% 62.168%, 99.925% 62.311%, 99.941% 62.458%, 99.951% 62.607%, 99.955% 62.759%, 99.955% 94.175%, 99.955% 94.175%, 99.951% 94.328%, 99.941% 94.48%, 99.924% 94.629%, 99.901% 94.774%, 99.871% 94.916%, 99.836% 95.052%, 99.794% 95.183%, 99.747% 95.308%, 99.694% 95.426%, 99.635% 95.536%, 97.44% 99.357%, 97.44% 99.357%, 97.381% 99.452%, 97.319% 99.538%, 97.254% 99.614%, 97.186% 99.682%, 97.115% 99.739%, 97.042% 99.786%, 96.967% 99.824%, 96.891% 99.851%, 96.814% 99.867%, 96.735% 99.873%, 55.872% 99.873%, 55.872% 99.873%, 55.769% 99.863%, 55.669% 99.835%, 55.571% 99.789%, 55.476% 99.727%, 55.385% 99.647%, 55.299% 99.552%, 55.219% 99.441%, 55.144% 99.316%, 55.076% 99.177%, 55.016% 99.025%, 54.526% 97.654%, 54.526% 97.654%, 54.46% 97.488%, 54.386% 97.337%, 54.305% 97.2%, 54.217% 97.08%, 54.123% 96.976%, 54.024% 96.889%, 53.921% 96.821%, 53.815% 96.771%, 53.705% 96.74%, 53.593% 96.73%, 46.357% 96.73%, 46.357% 96.73%, 46.231% 96.743%, 46.109% 96.781%, 45.99% 96.843%, 45.877% 96.929%, 45.77% 97.036%, 45.67% 97.164%, 45.578% 97.311%, 45.495% 97.478%, 45.421% 97.661%, 45.359% 97.861%, 45.094% 98.833%, 45.094% 98.833%, 45.037% 99.017%, 44.97% 99.186%, 44.893% 99.339%, 44.809% 99.474%, 44.717% 99.592%, 44.618% 99.69%, 44.514% 99.769%, 44.406% 99.826%, 44.293% 99.861%, 44.178% 99.873%, 38.784% 99.873%, 3.426% 99.873%, 3.426% 99.873%, 3.351% 99.867%, 3.276% 99.852%, 3.203% 99.828%, 3.131% 99.793%, 3.061% 99.749%, 2.993% 99.696%, 2.927% 99.634%, 2.863% 99.563%, 2.802% 99.484%, 2.744% 99.396%, .388% 95.539%, .388% 95.539%, .325% 95.428%, .269% 95.308%, .218% 95.181%, .173% 95.047%, .135% 94.906%, .103% 94.76%, .078% 94.61%, .06% 94.456%, .049% 94.298%, .046% 94.139%, .046% 62.794%, .046% 62.794%, .049% 62.637%, .06% 62.482%, .077% 62.33%, .102% 62.181%, .133% 62.037%, .17% 61.899%, .213% 61.766%, .262% 61.639%, .318% 61.52%, .378% 61.409%, 2.701% 57.515%, 2.701% 57.515%, 2.767% 57.394%, 2.827% 57.264%, 2.881% 57.126%, 2.928% 56.982%, 2.969% 56.83%, 3.003% 56.673%, 3.029% 56.512%, 3.048% 56.346%, 3.06% 56.177%, 3.064% 56.006%, 3.064% 43.766%, 3.064% 43.766%, 3.058% 43.567%, 3.043% 43.372%, 3.017% 43.182%, 2.982% 42.998%, 2.938% 42.822%, 2.884% 42.654%, 2.822% 42.496%, 2.752% 42.348%, 2.674% 42.213%, 2.588% 42.091%, .482% 39.39%, .482% 39.39%, .404% 39.278%, .332% 39.153%, .267% 39.018%, .21% 38.873%, .161% 38.719%, .121% 38.556%, .088% 38.388%, .065% 38.213%, .05% 38.034%, .046% 37.852%, .046% 6.793%, .046% 6.793%, .048% 6.652%, .057% 6.514%, .071% 6.377%, .091% 6.243%, .115% 6.112%, .145% 5.985%, .18% 5.862%, .221% 5.743%, .265% 5.631%, .315% 5.524%, 2.734% .692%, 2.734% .692%, 2.794% .58%, 2.859% .48%, 2.928% .389%, 3% .31%, 3.076% .242%, 3.155% .186%, 3.235% .142%, 3.318% .11%, 3.403% .09%, 3.488% .084%, 5.991% .084%, 15.856% .084%, 42.774% .084%, 42.774% .084%, 42.887% .095%, 42.998% .129%, 43.105% .184%, 43.208% .26%, 43.305% .356%, 43.396% .47%, 43.48% .601%, 43.556% .75%, 43.624% .914%, 43.682% 1.093%, 44.179% 2.84%, 44.179% 2.84%, 44.242% 3.035%, 44.315% 3.214%, 44.398% 3.375%, 44.49% 3.519%, 44.589% 3.643%, 44.695% 3.747%, 44.807% 3.829%, 44.923% 3.89%, 45.044% 3.927%, 45.167% 3.939%, 54.978% 3.939%, 54.978% 3.939%, 55.104% 3.926%, 55.227% 3.888%, 55.345% 3.825%, 55.459% 3.74%, 55.566% 3.632%, 55.667% 3.504%, 55.759% 3.355%, 55.842% 3.188%, 55.915% 3.004%, 55.978% 2.803%, 56.43% 1.127%, 56.43% 1.127%, 56.488% .942%, 56.555% .773%, 56.631% .62%, 56.716% .484%, 56.808% .366%, 56.907% .267%, 57.011% .188%, 57.12% .131%, 57.232% .096%, 57.348% .084%, 83.987% .084%, 94.144% .084%, 96.672% .084%, 96.672% .084%, 96.761% .091%, 96.849% .112%, 96.934% .146%, 97.018% .194%, 97.099% .254%, 97.176% .327%, 97.251% .412%, 97.321% .508%, 97.387% .616%, 97.448% .734%)",
              }}
            ></section>
          </div>
        </section>

        {/* <section className="bg-[url('/hero-image.webp')]">
          <div className="flex flex-col justify-center text-center items-center px-4">
            <p className="text-lg sm:text-xl text-zinc-200 mt-10 mb-6 max-w-2xl">
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
        </section> */}

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
