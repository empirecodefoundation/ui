import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { GeistMono, GeistSans, MinecartLCD } from "@/lib/fonts";
import { ThemeProvider } from "@/components/core/providers";

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
    <html lang="en" suppressHydrationWarning>
      {!isDev ? (
        <Script
          async
          src="https://analytics.umami.is/script.js"
          data-website-id="17e8fc96-321d-43a6-94e7-d571c4c66a04"
        />
      ) : null}
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${MinecartLCD.variable} bg-[#202020] m-0 p-0 overflow-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
