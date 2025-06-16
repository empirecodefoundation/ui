import React from 'react';
import { MinecartLCD } from "@/lib/fonts";
import { cn } from '@/lib/utils';

export const EmpireFooter = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white py-8 px-8 relative">
      <div className="max-w-5xl mx-auto relative">
        {/* Left Empire UI Branding - Corner positioned */}
        <div className="absolute -left-60 top-1/2 transform -translate-y-1/2 -translate-x-4">
          <h2 className={cn("text-white text-3xl font-bold tracking-wider transform -rotate-90 origin-center", MinecartLCD.className)}>
            Empire UI
          </h2>
        </div>

        {/* Right Empire UI Branding - Corner positioned */}
        <div className="absolute -right-60 top-1/2 transform -translate-y-1/2 translate-x-4">
          <h2 className={cn("text-white text-3xl font-bold tracking-wider transform rotate-90 origin-center", MinecartLCD.className)}>
            Empire UI
          </h2>
        </div>

        {/* Main Content Grid - Centered with more space */}
        <div className="mx-16 grid grid-cols-3 gap-12 px-6">
          {/* Products Column */}
          <div>
            <h3 className={cn("text-white text-lg font-bold mb-3", MinecartLCD.className)}>
              Products
            </h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className={cn("text-gray-300 hover:text-white transition-colors text-sm", MinecartLCD.className)}>
                  • Backgrounds
                </a>
              </li>
              <li>
                <a href="#" className={cn("text-gray-300 hover:text-white transition-colors text-sm", MinecartLCD.className)}>
                  • Cursors
                </a>
              </li>
              <li>
                <a href="#" className={cn("text-gray-300 hover:text-white transition-colors text-sm", MinecartLCD.className)}>
                  • Animations
                </a>
              </li>
              <li>
                <a href="#" className={cn("text-gray-300 hover:text-white transition-colors text-sm", MinecartLCD.className)}>
                  • Components
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className={cn("text-white text-lg font-bold mb-3", MinecartLCD.className)}>
              Company
            </h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className={cn("text-gray-300 hover:text-white transition-colors text-sm", MinecartLCD.className)}>
                  • About Us
                </a>
              </li>
              <li>
                <a href="#" className={cn("text-gray-300 hover:text-white transition-colors text-sm", MinecartLCD.className)}>
                  • Careers
                </a>
              </li>
              <li>
                <a href="#" className={cn("text-gray-300 hover:text-white transition-colors text-sm", MinecartLCD.className)}>
                  • Contact
                </a>
              </li>
              <li>
                <a href="#" className={cn("text-gray-300 hover:text-white transition-colors text-sm", MinecartLCD.className)}>
                  • Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className={cn("text-white text-lg font-bold mb-3", MinecartLCD.className)}>
              Support
            </h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className={cn("text-gray-300 hover:text-white transition-colors text-sm", MinecartLCD.className)}>
                  • FAQs
                </a>
              </li>
              <li>
                <a href="#" className={cn("text-gray-300 hover:text-white transition-colors text-sm", MinecartLCD.className)}>
                  • Returns
                </a>
              </li>
              <li>
                <a href="#" className={cn("text-gray-300 hover:text-white transition-colors text-sm", MinecartLCD.className)}>
                  • Help Center
                </a>
              </li>
              <li>
                <a href="#" className={cn("text-gray-300 hover:text-white transition-colors text-sm", MinecartLCD.className)}>
                  • 24/7 Live Chat
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright - Smaller and closer */}
        <div className="mt-8 pt-4 text-center" style={{
          borderTop: '4px dotted #4a5568' 
        }}>
          <p className={cn("text-gray-400 text-sm", MinecartLCD.className)}>
            © 2025 Misty Interactive Studios. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}; 