"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  let pathname = usePathname();

  useEffect(() => {
    // Force dark mode on specific routes
    if (pathname === "/" || pathname?.startsWith("/templates") || pathname?.startsWith("/colors")) {
      document.documentElement.classList.add("dark");
    } else {
      // For other pages, respect user's theme preference
      document.documentElement.classList.remove("dark");
    }
  }, [pathname]);

  return (
    <div className="h-full">
      <main className="pt-14">{children}</main>
    </div>
  );
};

export default LandingLayout;
