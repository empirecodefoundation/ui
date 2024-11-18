"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  let pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      document.documentElement.classList.add("dark");
    }
  }, [pathname]);

  return (
    <div className="h-full">
      <main className="">{children}</main>
    </div>
  );
};

export default LandingLayout;
