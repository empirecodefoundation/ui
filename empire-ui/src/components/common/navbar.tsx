"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MinecartLCD } from "@/lib/fonts";
import { cn } from '@/lib/utils';
import { Search, User } from 'lucide-react';
import { LoadingLink } from '@/components/ui/loading-link';

export const Navbar = () => {
  return (
    <nav className="nav-container">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          {/* Logo */}
          <div className="-ml-1 mr-10 mt-1.5 w-[50px] h-[50px] overflow-hidden rounded-[50px]">
            <Image 
              src="/EMUI.png" 
              alt="Empire UI Logo" 
              width={50} 
              height={50}
              className="object-cover scale-125 rounded-[50px]"
            />
          </div>
          
          {/* Navigation Links */}
          <div className="ml-8">
            <LoadingLink href="/" className={cn("text-white font-bold text-lg tracking-wide nav-link", MinecartLCD.className)}>
              HOME
            </LoadingLink>
            <LoadingLink href="/components" className={cn("text-white font-bold text-lg tracking-wide nav-link", MinecartLCD.className)}>
              COMPONENTS
            </LoadingLink>
            <LoadingLink href="/templates" className={cn("text-white font-bold text-lg tracking-wide nav-link", MinecartLCD.className)}>
              TEMPLATES
            </LoadingLink>
            <LoadingLink href="/contact" className={cn("text-white font-bold text-lg tracking-wide nav-link", MinecartLCD.className)}>
              CONTACT
            </LoadingLink>
          </div>
        </div>
        
        <div className="flex items-center">
          {/* Search Box */}
          <div className="nav-search-box flex items-center">
            <Search size={18} className="text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search Documentation" 
              className={cn("bg-transparent text-white text-sm placeholder-gray-400 outline-none w-50", MinecartLCD.className)}
            />
          </div>
          
          {/* User Icon */}
          <button className="nav-icon-button">
            <User size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
}; 