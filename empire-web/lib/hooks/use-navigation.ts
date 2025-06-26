"use client";

import { useRouter } from "next/navigation";
import { useLoading } from "@/components/core/loading-provider";

export const useNavigation = () => {
  const router = useRouter();
  const { startLoading } = useLoading();

  const navigateTo = (href: string) => {
    startLoading();
    router.push(href);
  };

  return { navigateTo };
}; 