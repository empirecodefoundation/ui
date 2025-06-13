import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { GeistMono, GeistSans, MinecartLCD } from "@/lib/fonts";
import { ThemeProvider } from "@/components/core/providers";
import { LoadingProvider } from "@/components/core/loading-provider";
import PageTransition from "@/components/core/page-transition";
import GlobalClickAnimation from "@/components/ui/global-click-animation";
import { ParticlesBackground } from "@/components/ui/particles-background";

export const metadata: Metadata = {
  title: "Empire UI",
  description:
    "Empire-UI is a project showcasing AI-powered components built with Tailwind CSS. This repository offers a curated collection of reusable components designed to enhance your next AI SaaS website with intelligent, dynamic features and seamless integration.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden m-0 p-0">
      <head>
        <style>{`
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            overflow-x: hidden;
          }
          body {
            margin-top: -15px !important;
          }
        `}</style>
      </head>
      {!isDev ? (
        <Script
          async
          src="https://analytics.umami.is/script.js"
          data-website-id="17e8fc96-321d-43a6-94e7-d571c4c66a04"
        />
      ) : null}
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${MinecartLCD.variable} min-h-screen w-full m-0 p-0`}
        style={{ margin: 0, padding: 0 }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LoadingProvider>
            <ParticlesBackground>
              <PageTransition>
                {children}
              </PageTransition>
              {/* Global click animation for all pages */}
              <GlobalClickAnimation 
                sparkColor="#ffffff"
                sparkSize={3}
                sparkRadius={25}
                sparkCount={8}
                duration={200}
              />
            </ParticlesBackground>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
