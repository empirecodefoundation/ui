"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/components/core/loading-provider';

interface LoadingLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const LoadingLink = ({ href, children, className, onClick }: LoadingLinkProps) => {
  const router = useRouter();
  const { startLoading } = useLoading();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Call custom onClick if provided
    onClick?.();
    
    // Start loading animation
    startLoading();
    
    // Navigate after a small delay to ensure loading state is visible
    setTimeout(() => {
      router.push(href);
    }, 100);
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}; 