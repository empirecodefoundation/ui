import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import UserTracker from "../components/UserTracker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "User Tracker Demo",
  description: "Reusable user interaction tracking component",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {/* Global UserTracker - tracks interactions across all pages */}
        <UserTracker 
          enableConsoleLog={true}
          trackAllClicks={false}
          sessionId={undefined} // Auto-generate session ID
        />
        {children}
      </body>
    </html>
  );
}
