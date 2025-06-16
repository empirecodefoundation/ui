"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const ComponentsLayout = ({ children }: { children: React.ReactNode }) => {
  let pathname = usePathname();

  useEffect(() => {
    // Set appropriate theme for components pages
    if (pathname?.startsWith("/components")) {
      document.documentElement.classList.remove("dark");
    }
  }, [pathname]);

  return (
    <div className="h-full">
      <main className="pt-14">{children}</main>
    </div>
  );
};

export default ComponentsLayout; 