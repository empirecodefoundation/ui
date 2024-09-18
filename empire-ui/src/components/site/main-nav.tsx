"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { BrainCog } from "lucide-react";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="ml-52 hidden md:flex ">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <BrainCog className="h-6 w-6" />
        <span className="hidden text-lg font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          href="/docs"
          className={cn(
            "text-base font-semibold transition-colors hover:text-foreground/80",
            pathname?.startsWith("/docs")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Components
        </Link>
        <Link
          href="/templates"
          className={cn(
            "text-base font-semibold transition-colors hover:text-foreground/80",
            pathname?.startsWith("/themes")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Templates
        </Link>
        {/* <Link
          href="/blocks"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/blocks")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Blocks
        </Link> */}
        {/* <Link
          href={siteConfig.links.github}
          className={cn(
            "hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
          )}
        >
          GitHub
        </Link> */}
      </nav>
    </div>
  );
}
