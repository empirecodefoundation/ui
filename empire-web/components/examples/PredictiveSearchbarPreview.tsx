"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, Clock, TrendingUp, User, Hash } from "lucide-react";

interface SearchSuggestion {
  id: string;
  text: string;
  type: "recent" | "trending" | "user" | "tag";
  icon: React.ReactNode;
  subtitle?: string;
}

const mockSuggestions: SearchSuggestion[] = [
  { id: "1", text: "React components", type: "recent", icon: <Clock className="w-4 h-4" />, subtitle: "Recent search" },
  { id: "2", text: "Next.js tutorial", type: "trending", icon: <TrendingUp className="w-4 h-4" />, subtitle: "Trending now" },
  { id: "3", text: "TypeScript guide", type: "recent", icon: <Clock className="w-4 h-4" />, subtitle: "2 hours ago" },
  { id: "4", text: "AI chatbot", type: "trending", icon: <TrendingUp className="w-4 h-4" />, subtitle: "Popular today" },
  { id: "5", text: "@john_doe", type: "user", icon: <User className="w-4 h-4" />, subtitle: "User profile" },
  { id: "6", text: "#javascript", type: "tag", icon: <Hash className="w-4 h-4" />, subtitle: "Tag" },
  { id: "7", text: "Machine learning", type: "trending", icon: <TrendingUp className="w-4 h-4" />, subtitle: "Hot topic" },
  { id: "8", text: "CSS animations", type: "recent", icon: <Clock className="w-4 h-4" />, subtitle: "Yesterday" },
];

export default function PredictiveSearchbarPreview() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (query.trim()) {
      setIsLoading(true);
      // Simulate API call delay
      const timer = setTimeout(() => {
        const filtered = mockSuggestions.filter(item =>
          item.text.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(filtered);
        setIsLoading(false);
        setIsOpen(true);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelectSuggestion(suggestions[selectedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSelectSuggestion = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  useEffect(() => {
    if (selectedIndex >= 0) {
      suggestionRefs.current[selectedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth"
      });
    }
  }, [selectedIndex]);

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      <div className="relative">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => query && setIsOpen(true)}
            placeholder="Search for anything..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
          />
          {isLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {/* Suggestions Dropdown */}
        {isOpen && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            <div className="py-2">
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion.id}
                  ref={el => { suggestionRefs.current[index] = el; }}
                  onClick={() => handleSelectSuggestion(suggestion)}
                  className={`px-4 py-3 cursor-pointer flex items-center space-x-3 hover:bg-gray-50 transition-colors ${
                    selectedIndex === index ? "bg-blue-50 border-r-2 border-blue-500" : ""
                  }`}
                >
                  <div className={`flex-shrink-0 ${
                    suggestion.type === "recent" ? "text-gray-500" :
                    suggestion.type === "trending" ? "text-orange-500" :
                    suggestion.type === "user" ? "text-green-500" :
                    "text-blue-500"
                  }`}>
                    {suggestion.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 font-medium truncate">
                      {suggestion.text}
                    </p>
                    {suggestion.subtitle && (
                      <p className="text-gray-500 text-sm truncate">
                        {suggestion.subtitle}
                      </p>
                    )}
                  </div>
                  {suggestion.type === "trending" && (
                    <div className="text-orange-500 text-xs font-medium bg-orange-100 px-2 py-1 rounded">
                      Hot
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {isOpen && query && suggestions.length === 0 && !isLoading && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="px-4 py-6 text-center">
              <div className="text-gray-400 mb-2">
                <Search className="w-8 h-8 mx-auto" />
              </div>
              <p className="text-gray-600 font-medium">No results found</p>
              <p className="text-gray-500 text-sm">Try adjusting your search terms</p>
            </div>
          </div>
        )}
      </div>

      {/* Search Tips */}
      <div className="mt-4 text-center">
        <p className="text-gray-500 text-sm">
          💡 Try searching for "React", "Next.js", or "@john_doe"
        </p>
      </div>
    </div>
  );
} 