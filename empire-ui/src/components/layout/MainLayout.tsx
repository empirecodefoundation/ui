import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../base/Button";
import { Loading } from "../base/Loading";
import { useTheme } from "../../hooks/useTheme";
import { useLoading } from "../../contexts/LoadingContext";
import { cn } from "../../utils/cn";
import { Sun, Moon, Settings } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const { isLoading } = useLoading();

  return (
    <div className={cn("min-h-screen bg-background", theme)}>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link to="/" className="text-xl font-bold">
              Empire UI
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-2">
              <Link to="/">
                <Button variant="ghost">Home</Button>
              </Link>
              <Link to="/ai-tools">
                <Button variant="ghost">AI Tools</Button>
              </Link>
              <Link to="/docs">
                <Button variant="ghost">Documentation</Button>
              </Link>
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
      <main className="container py-6 relative">
        {isLoading && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <Loading size="lg" />
          </div>
        )}
        {children}
      </main>
    </div>
  );
};
