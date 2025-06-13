import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { MinecartLCD } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import gitLogo from "@/images/git.png";
import { useRouter } from "next/navigation";

const componentsList = [
  {
    title: "Getting Started",
    items: [
      { name: "Introduction", href: "/docs" },
      { name: "Installation", href: "/docs/installation", tag: "Updated" },
      { name: "Wiki", href: "/docs/wiki", tag: "New" }
    ]
  },
  {
    title: "AI Components",
    items: [
      { name: "AI Chatbox", href: "/components/ai-chatbox", tag: "Popular" },
      { name: "Text Paraphraser Button", href: "/components/text-paraphraser" },
    ]
  }
];

export function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    console.log("🚀 NAVBAR COMPONENT LOADED 🚀");
    console.log("Dropdown state:", isDropdownOpen);
  }, [isDropdownOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = (href: string) => {
    setIsDropdownOpen(false);
    router.push(href);
  };

  const handleButtonClick = () => {
    console.log("🔥 BUTTON CLICKED! 🔥");
    console.log("Button clicked, current state:", isDropdownOpen);
    setIsDropdownOpen(!isDropdownOpen);
    console.log("New state will be:", !isDropdownOpen);
  };

  console.log("🎯 NAVBAR RENDERING, dropdown state:", isDropdownOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white">
      {/* EXTREMELY OBVIOUS TEST ELEMENT */}
      <div className="bg-green-500 text-black text-center py-2 font-bold text-xl">
        🔥 NAVBAR LOADED - DROPDOWN STATE: {isDropdownOpen ? "OPEN" : "CLOSED"} 🔥
      </div>
      
      <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/EMUI.png"
                alt="Empire UI Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className={cn("ml-2 text-xl text-white", MinecartLCD.className)}>
                Empire UI
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/components" className="text-white hover:text-gray-300">
              Components
            </Link>
            <Link href="/docs" className="text-white hover:text-gray-300">
              Documentation
            </Link>
            <Link href="/test-liquid" className="text-white hover:text-gray-300">
              Test Liquid
            </Link>
          </div>

          {/* Search Box */}
          <div className="flex items-center space-x-4">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleButtonClick}
                className="flex items-center space-x-2 px-4 py-2 bg-yellow-400 text-black rounded-full hover:bg-yellow-300 transition-colors border-4 border-red-500 font-bold text-lg"
              >
                <Search className="h-5 w-5" />
                <span>🔍 CLICK ME FOR DROPDOWN 🔍</span>
              </button>

              {/* SUPER OBVIOUS DROPDOWN */}
              {isDropdownOpen && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-96 bg-red-500 border-8 border-yellow-500 rounded-lg shadow-2xl overflow-hidden z-[99999]">
                  <div className="p-4 bg-black">
                    <div className="text-white text-2xl font-bold mb-4 text-center">
                      🎉 DROPDOWN IS WORKING! 🎉
                    </div>
                    {componentsList.map((section, sectionIndex) => (
                      <div key={sectionIndex} className="mb-4">
                        <h3 className="text-white font-bold text-lg mb-2">
                          {section.title}
                        </h3>
                        <div className="space-y-2">
                          {section.items.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              onClick={() => handleItemClick(item.href)}
                              className="px-4 py-2 text-white bg-gray-800 hover:bg-gray-600 cursor-pointer rounded"
                            >
                              {item.name}
                              {item.tag && (
                                <span className="ml-2 px-2 py-1 text-xs bg-blue-500 rounded">
                                  {item.tag}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* GitHub Logo */}
            <a
              href="https://github.com/empirecodefoundation/ui"
              target="_blank" 
              rel="noopener noreferrer"
              className="nav-icon-button ml-2"
            >
              <Image 
                src={gitLogo}
                alt="GitHub"
                width={22}
                height={22}
                className="nav-icon"
              />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
} 