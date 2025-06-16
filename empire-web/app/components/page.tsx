"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/common/navbar";
import { EmpireFooter } from "@/components/common/empire-footer";
import { MinecartLCD } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import FlowingMenuItem from "@/components/ui/FlowingMenu";
import InfiniteMenu from "@/components/ui/InfiniteMenu";

export default function ComponentsPage() {
  const [selectedItem, setSelectedItem] = useState("Introduction");

  const sidebarItems = [
    {
      title: "Getting Started",
      items: [
        { name: "Introduction", tag: null },
        { name: "Installation", tag: "Updated" },
        { name: "Wiki", tag: "New" }
      ]
    },
    {
      title: "AI Components",
      items: [
        { name: "Conversation & Text", isSubheader: true },
        { name: "AI Chatbox", tag: "Popular" },
        { name: "Text Paraphraser Button", tag: null },
        { name: "Text Summarizer Button", tag: null },
        { name: "Grammar Check Button", tag: null },
        { name: "Caption Generator Button", tag: null },
        { name: "Advanced AI Interfaces", isSubheader: true },
        { name: "MCP Interface", tag: "New" },
        { name: "Node Canvas", tag: "New" }
      ]
    },
    {
      title: "Data Visualization",
      items: [
        { name: "Analytics Cards", tag: null },
        { name: "Prediction Output Card", tag: "Popular" },
        { name: "Training Summary Card", tag: null },
        { name: "Dataset Overview Card", tag: null }
      ]
    },
    {
      title: "Interactive Elements",
      items: [
        { name: "Expand Card", tag: null },
        { name: "Passcode Card", tag: null },
        { name: "Predictive Searchbar", tag: "New" }
      ]
    },
    {
      title: "UI Elements",
      items: [
        { name: "Backgrounds", isSubheader: true },
        { name: "Aurora Background", tag: "Popular" },
        { name: "Wavy Background", tag: null },
        { name: "Form Elements", isSubheader: true },
        { name: "Step Form", tag: null },
        { name: "Toast Notifications", tag: null },
        { name: "Button", tag: "Core" }
      ]
    }
  ];



  return (
    <div className="min-h-screen" style={{ marginTop: '-15px' }}>
      {/* Navigation */}
      <Navbar />
      
      <div className="flex mx-auto max-w-[95%] w-[1450px]">
        {/* Sidebar */}
        <div className="w-96 bg-black border border-white min-h-screen p-6 mt-5" 
             style={{ borderRadius: '50px' }}>
          <div className="space-y-6">
            {sidebarItems.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h3 className={cn("text-white font-bold text-lg mb-4", MinecartLCD.className)}>
                  {section.title}
                </h3>
                                 <div className="space-y-2">
                   {section.items.map((item, itemIndex) => (
                     <FlowingMenuItem
                       key={itemIndex}
                       name={item.name}
                       tag={item.tag}
                       isSubheader={item.isSubheader}
                       onClick={item.isSubheader ? undefined : () => setSelectedItem(item.name)}
                       isSelected={selectedItem === item.name}
                     />
                   ))}
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl">
            <h1 className={cn("text-4xl font-bold text-white mb-6", MinecartLCD.className)}>
              {selectedItem}
            </h1>
            {selectedItem === "Introduction" ? (
              <div className="bg-black border border-gray-800 p-8" style={{ borderRadius: '25px', height: '600px' }}>
                <InfiniteMenu items={[
                  {
                    image: 'https://picsum.photos/300/300?grayscale',
                    link: 'https://google.com/',
                    title: 'Empire UI Components',
                    description: 'Explore our component library with interactive 3D navigation'
                  },
                  {
                    image: 'https://picsum.photos/400/400?grayscale',
                    link: 'https://google.com/',
                    title: 'Getting Started',
                    description: 'Learn how to install and use Empire UI in your projects'
                  },
                  {
                    image: 'https://picsum.photos/500/500?grayscale',
                    link: 'https://google.com/',
                    title: 'Documentation',
                    description: 'Comprehensive guides and API references'
                  },
                  {
                    image: 'https://picsum.photos/600/600?grayscale',
                    link: 'https://google.com/',
                    title: 'Examples',
                    description: 'Real-world examples and code snippets'
                  }
                ]} />
              </div>
            ) : (
              <div className="bg-black border border-gray-800 p-8" style={{ borderRadius: '25px' }}>
                <p className={cn("text-gray-300 text-lg", MinecartLCD.className)}>
                  Welcome to the {selectedItem} section. This is where detailed documentation and examples for this component will be displayed.
                </p>
                <div className="mt-6 p-4 bg-gray-900 border border-gray-700" style={{ borderRadius: '15px' }}>
                  <p className={cn("text-sm text-gray-400", MinecartLCD.className)}>
                    Component documentation and interactive examples coming soon...
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <EmpireFooter />
    </div>
  );
} 