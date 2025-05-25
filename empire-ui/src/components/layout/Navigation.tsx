import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../base/Button";
import { cn } from "../../utils/cn";
import { MessageSquare, Settings, Home, Code, Book } from "lucide-react";

interface NavigationProps {
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ className }) => {
  const location = useLocation();

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "AI Chat",
      path: "/ai-chat",
      icon: MessageSquare,
    },
    {
      name: "Components",
      path: "/components",
      icon: Code,
    },
    {
      name: "Documentation",
      path: "/docs",
      icon: Book,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <nav className={cn("border-r bg-background", className)}>
      <div className="flex flex-col h-full">
        <div className="p-4">
          <h1 className="text-xl font-bold">Empire UI</h1>
        </div>
        <div className="flex-1 px-2 py-4">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path} className="block">
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      isActive && "bg-secondary"
                    )}
                  >
                    <item.icon className="w-5 h-5 mr-2" />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
