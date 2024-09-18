import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { GeistMono } from "geist/font/mono";
import { SiteHeader } from "@/components/site/header";
import { ThemeProvider } from "@/components/providers";


export const metadata: Metadata = {
  title: "EmpireUI",
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
    <html lang="en" suppressHydrationWarning>
      {!isDev ? (
        <Script
          async
          src="https://analytics.umami.is/script.js"
          data-website-id="17e8fc96-321d-43a6-94e7-d571c4c66a04"
        />
      ) : null}
      <body className={`${GeistMono.variable} bg-zinc-950 dark:bg-zinc-950`}>
        <ThemeProvider attribute="class">
          <SiteHeader />
          <div className="isolate min-h-screen">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
