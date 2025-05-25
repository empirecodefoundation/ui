import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AIChatInterface } from "../components/ai/AIChatInterface";
import { AIImageGenerator } from "../components/ai/AIImageGenerator";
import { AICodeAssistant } from "../components/ai/AICodeAssistant";
import { Button } from "../components/base/Button";
import { cn } from "../utils/cn";
import {
  MessageSquare,
  Image as ImageIcon,
  Code2,
  Settings,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "../hooks/useTheme";

type Tab = "chat" | "image" | "code";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<Tab>("chat");
  const { theme, toggleTheme } = useTheme();

  // Update active tab based on URL
  useEffect(() => {
    const path = location.pathname.split("/").pop();
    if (path && ["chat", "image", "code"].includes(path)) {
      setActiveTab(path as Tab);
    }
  }, [location]);

  const tabs = [
    {
      id: "chat",
      label: "AI Chat",
      icon: MessageSquare,
      component: <AIChatInterface />,
    },
    {
      id: "image",
      label: "Image Generator",
      icon: ImageIcon,
      component: <AIImageGenerator />,
    },
    {
      id: "code",
      label: "Code Assistant",
      icon: Code2,
      component: <AICodeAssistant />,
    },
  ] as const;

  const handleTabChange = (tabId: Tab) => {
    setActiveTab(tabId);
    navigate(`/ai-tools/${tabId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <h1 className="text-xl font-bold">AI Tools</h1>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-2">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  onClick={() => handleTabChange(tab.id as Tab)}
                  className="gap-2"
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden md:inline-block">{tab.label}</span>
                </Button>
              ))}
            </nav>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="h-9 w-9"
              >
                {theme === "light" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <div className="space-y-6">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={cn(
                "transition-opacity duration-300",
                activeTab === tab.id ? "opacity-100" : "hidden opacity-0"
              )}
            >
              {tab.component}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
