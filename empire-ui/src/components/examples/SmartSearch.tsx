"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, X, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category?: string;
  relevanceScore?: number;
}

interface SmartSearchProps {
  data?: any[];
  placeholder?: string;
  onResults?: (results: SearchResult[]) => void;
  onSearch?: (query: string) => void;
  className?: string;
  maxResults?: number;
  showCategories?: boolean;
  apiKey?: string; // Gemini API key
  model?: "gemini-1.5-flash"; // Gemini model version
}

export const SmartSearch = ({
  data = [],
  placeholder = "Search naturally... e.g., 'find red shoes under $100'",
  onResults,
  onSearch,
  className,
  maxResults = 5,
  showCategories = true,
  apiKey,
  model = "gemini-pro",
}: SmartSearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Function to call Gemini API
  const callGeminiAPI = async (searchQuery: string) => {
    if (!apiKey) {
      console.warn("No Gemini API key provided. Using mock data instead.");
      return null;
    }

    try {
      const prompt = `
        You are an intelligent search assistant. Analyze this search query and return relevant product results:
        "${searchQuery}"

        Return the results as a JSON array with the following structure for each item:
        {
          "id": "unique-id",
          "title": "product name and key details",
          "description": "detailed product description",
          "category": "product category",
          "relevanceScore": 0.9 // score between 0-1
        }

        Return exactly ${maxResults} results, ordered by relevance.
        Include price if mentioned in the query.
        Make the results as realistic as possible.
      `;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=AIzaSyDIgil7Utyc91uRuCk99FxpY1yGka-CcNk`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }]
          }),
        }
      );

      const result = await response.json();
      
      // Extract the response text
      const responseText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!responseText) {
        throw new Error("Invalid response from Gemini API");
      }

      // Try to parse the JSON from the response
      try {
        // Sometimes the response includes markdown code blocks
        const jsonString = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonString);
      } catch (e) {
        console.error("Failed to parse Gemini response:", e);
        return null;
      }
    } catch (error) {
      console.error("Gemini API error:", error);
      return null;
    }
  };

  // Perform AI-powered search with Gemini integration
  const performSmartSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    try {
      // First try to get results from Gemini API
      const geminiResults = await callGeminiAPI(searchQuery);
      
      if (geminiResults && Array.isArray(geminiResults)) {
        // Process Gemini results
        const processedResults = geminiResults
          .slice(0, maxResults)
          .map((result, index) => ({
            ...result,
            id: result.id || `gemini-${index}`,
            relevanceScore: result.relevanceScore || (1 - (index * 0.1)) // Default scoring if not provided
          }));
        
        setResults(processedResults);
        onResults?.(processedResults);
      } else {
        // Fallback to mock data if Gemini fails or no API key
        const mockResults: SearchResult[] = [
          {
            id: "1",
            title: "Red Nike Air Max - $89.99",
            description: "Classic red sneakers with excellent cushioning, perfect for running",
            category: "Footwear",
            relevanceScore: 0.95
          },
          {
            id: "2", 
            title: "Crimson Adidas Boost - $79.99",
            description: "Comfortable red athletic shoes with boost technology",
            category: "Footwear",
            relevanceScore: 0.88
          },
          {
            id: "3",
            title: "Red Canvas Sneakers - $45.99", 
            description: "Casual red canvas shoes, great for everyday wear",
            category: "Footwear",
            relevanceScore: 0.82
          },
          {
            id: "4",
            title: "Cherry Red Heels - $95.99",
            description: "Elegant red high heels for special occasions",
            category: "Formal",
            relevanceScore: 0.75
          }
        ].slice(0, maxResults);

        setResults(mockResults);
        onResults?.(mockResults);
      }
      
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Rest of the component remains the same...
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (query.length > 2) {
        performSmartSearch(query);
        setIsOpen(true);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);
    onSearch?.(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleResultClick(results[selectedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleResultClick = (result: SearchResult) => {
    setQuery(result.title);
    setIsOpen(false);
    setSelectedIndex(-1);
    // Handle result selection (e.g., navigate to product page)
    console.log("Selected result:", result);
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const getCategoryColor = (category?: string) => {
    const colors = {
      "Footwear": "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
      "Formal": "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300",
      "Casual": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
      "default": "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-300"
    };
    return colors[category as keyof typeof colors] || colors.default;
  };

  return (
    <div className={cn("relative w-full max-w-2xl", className)}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {isLoading ? (
            <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
          ) : (
            <Search className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
        
        <motion.input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className={cn(
            "w-full pl-10 pr-10 py-3 rounded-lg border border-border bg-background",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
            "placeholder:text-muted-foreground text-foreground",
            "transition-all duration-200 ease-in-out"
          )}
          whileFocus={{ scale: 1.01 }}
        />

        {/* AI Indicator */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center space-x-2">
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={clearSearch}
              className="p-1 hover:bg-muted rounded-full transition-colors"
            >
              <X className="h-3 w-3 text-muted-foreground" />
            </motion.button>
          )}
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3" />
            <span className="hidden sm:inline">AI</span>
          </div>
        </div>
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            ref={resultsRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "absolute top-full mt-2 w-full bg-background border border-border",
              "rounded-lg shadow-lg z-50 overflow-hidden"
            )}
          >
            {/* Results Header */}
            <div className="px-4 py-2 border-b border-border bg-muted/50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  Smart Results
                </span>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Sparkles className="h-3 w-3" />
                  <span>AI Powered</span>
                </div>
              </div>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto">
              {results.map((result, index) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleResultClick(result)}
                  className={cn(
                    "px-4 py-3 cursor-pointer transition-colors border-b border-border/50 last:border-b-0",
                    selectedIndex === index 
                      ? "bg-muted" 
                      : "hover:bg-muted/50"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground truncate">
                        {result.title}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {result.description}
                      </p>
                      
                      {/* Category & Relevance */}
                      <div className="flex items-center justify-between mt-2">
                        {showCategories && result.category && (
                          <span className={cn(
                            "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                            getCategoryColor(result.category)
                          )}>
                            {result.category}
                          </span>
                        )}
                        
                        {result.relevanceScore && (
                          <div className="flex items-center space-x-1">
                            <div className="flex space-x-0.5">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={cn(
                                    "w-1 h-1 rounded-full",
                                    i < Math.floor(result.relevanceScore! * 5)
                                      ? "bg-primary"
                                      : "bg-muted"
                                  )}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground ml-1">
                              {Math.round(result.relevanceScore * 100)}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-muted/30 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                Use ↑↓ arrows to navigate, Enter to select, Esc to close
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No Results State */}
      <AnimatePresence>
        {isOpen && query.length > 2 && results.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full bg-background border border-border rounded-lg shadow-lg z-50 p-6 text-center"
          >
            <Search className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              No results found for "{query}"
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Try a different search term or be more specific
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Example usage component with Gemini API
export const SmartSearchExampleWithGemini = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearchResults = (results: SearchResult[]) => {
    setSearchResults(results);
    console.log("Search results:", results);
  };

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  return (
    <div className="bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <h2 className="text-2xl font-bold text-foreground">AI-Powered Smart Search</h2>
            <p className="text-muted-foreground">
              Search naturally using Google's Gemini AI for intelligent results
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center"
        >
          <SmartSearch
            onResults={handleSearchResults}
            onSearch={handleSearch}
            placeholder="Try: 'find red shoes under $100' or 'comfortable running sneakers'"
            apiKey="YOUR_GEMINI_API_KEY" // Replace with your actual Gemini API key
            model="gemini-pro" // or "gemini-1.5-pro" if you have access
          />
        </motion.div>

        {/* Results Display */}
        {searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <h3 className="text-lg font-semibold mb-4">AI-Generated Results</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {searchResults.map((result) => (
                <motion.div
                  key={result.id}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 border border-border rounded-lg bg-card hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <h4 className="font-medium text-foreground">{result.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {result.description}
                  </p>
                  {result.category && (
                    <span className="inline-block mt-2 px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                      {result.category}
                    </span>
                  )}
                  {result.relevanceScore && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      Relevance: {Math.round(result.relevanceScore * 100)}%
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};