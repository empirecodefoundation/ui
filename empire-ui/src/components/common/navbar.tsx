import React from 'react';
import Link from 'next/link';
import { MinecartLCD } from "@/lib/fonts";
import { cn } from '@/lib/utils';
import { ShoppingCart, Search, User } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="nav-container">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <Link href="/" className={cn("text-white font-bold text-lg tracking-wide nav-link", MinecartLCD.className)}>
            HOME
          </Link>
          <Link href="/products" className={cn("text-white font-bold text-lg tracking-wide nav-link", MinecartLCD.className)}>
            PRODUCTS
          </Link>
          <Link href="/features" className={cn("text-white font-bold text-lg tracking-wide nav-link", MinecartLCD.className)}>
            FEATURES
          </Link>
          <Link href="/blog" className={cn("text-white font-bold text-lg tracking-wide nav-link", MinecartLCD.className)}>
            BLOG
          </Link>
          <Link href="/about" className={cn("text-white font-bold text-lg tracking-wide nav-link", MinecartLCD.className)}>
            ABOUT
          </Link>
          <Link href="/contact" className={cn("text-white font-bold text-lg tracking-wide nav-link", MinecartLCD.className)}>
            CONTACT
          </Link>
        </div>
        <div className="flex items-center">
          <button className="nav-icon-button">
            <Search size={22} />
          </button>
          <button className="nav-icon-button">
            <ShoppingCart size={22} />
          </button>
          <button className="nav-icon-button">
            <User size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
}; 