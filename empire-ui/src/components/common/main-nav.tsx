"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mx-auto hidden md:flex ">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="w-7 h-7" />
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
          href="/docs/templates"
          className={cn(
            "text-base font-semibold transition-colors hover:text-foreground/80",
            pathname?.startsWith("/docs")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Templates
        </Link>
      </nav>
    </div>
  );
}
