"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, X, Loader2 } from "lucide-react";
import { useState, useRef } from "react";

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category?: string;
  relevanceScore?: number;
  price?: number;
  color?: string;
}

interface SmartSearchProps {
  placeholder?: string;
  onResults?: (results: SearchResult[]) => void;
  onSearch?: (query: string) => void;
  className?: string;
  maxResults?: number;
  showCategories?: boolean;
  apiKey?: string;
  model?: string;
}

export const SmartSearch = ({
  placeholder = "Search naturally... e.g., 'find red shoes under $100'",
  onResults,
  onSearch,
  className,
  maxResults = 5,
  showCategories = true,
  apiKey = "AIzaSyDIgil7Utyc91uRuCk99FxpY1yGka-CcNk",
  model = "gemini-1.5-flash",
}: SmartSearchProps) => {
  // Mock database of products
  const mockDatabase: SearchResult[] = [
    {
      id: "1",
      title: "Red Nike Air Max",
      description: "Classic red sneakers with excellent cushioning, perfect for running",
      category: "Footwear",
      price: 89.99,
      color: "red",
      relevanceScore: 0.95,
    },
    {
      id: "2",
      title: "Crimson Adidas Boost",
      description: "Comfortable red athletic shoes with boost technology",
      category: "Footwear",
      price: 79.99,
      color: "red",
      relevanceScore: 0.88,
    },
    {
      id: "3",
      title: "Red Canvas Sneakers",
      description: "Casual red canvas shoes, great for everyday wear",
      category: "Footwear",
      price: 45.99,
      color: "red",
      relevanceScore: 0.82,
    },
    {
      id: "4",
      title: "Blue Running Shorts",
      description: "Lightweight blue shorts with moisture-wicking fabric",
      category: "Activewear",
      price: 29.99,
      color: "blue",
      relevanceScore: 0.78,
    },
    {
      id: "5",
      title: "Black Leather Jacket",
      description: "Premium black leather jacket with quilted lining",
      category: "Outerwear",
      price: 199.99,
      color: "black",
      relevanceScore: 0.75,
    },
    {
      id: "6",
      title: "White Cotton T-Shirt",
      description: "Basic white t-shirt made from 100% organic cotton",
      category: "Casual",
      price: 24.99,
      color: "white",
      relevanceScore: 0.7,
    },
    {
      id: "7",
      title: "Wireless Headphones",
      description: "Noise-cancelling wireless headphones with 30hr battery",
      category: "Electronics",
      price: 129.99,
      relevanceScore: 0.68,
    },
    {
      id: "8",
      title: "Brown Leather Wallet",
      description: "Genuine leather wallet with multiple card slots",
      category: "Accessories",
      price: 49.99,
      color: "brown",
      relevanceScore: 0.65,
    },
    {
      id: "9",
      title: "Premium Running Shoes",
      description: "High-performance running shoes with advanced cushioning",
      category: "Footwear",
      price: 159.99,
      color: "black",
      relevanceScore: 0.9,
    },
    {
      id: "10",
      title: "Designer Sneakers",
      description: "Luxury designer sneakers with premium materials",
      category: "Footwear",
      price: 299.99,
      color: "white",
      relevanceScore: 0.85,
    },
  ];

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Enhanced search function that handles various search patterns
  const performEnhancedSearch = (searchQuery: string): SearchResult[] => {
    if (!searchQuery.trim()) return [];

    const lowerQuery = searchQuery.toLowerCase();
    
    // Extract price conditions
    let minPrice: number | null = null;
    let maxPrice: number | null = null;
    
    // Handle "above $X", "over $X", "more than $X"
    const aboveMatch = lowerQuery.match(/(?:above|over|more than)\s*\$?(\d+(?:\.\d{2})?)/);
    if (aboveMatch) {
      minPrice = parseFloat(aboveMatch[1]);
    }
    
    // Handle "under $X", "below $X", "less than $X"
    const underMatch = lowerQuery.match(/(?:under|below|less than)\s*\$?(\d+(?:\.\d{2})?)/);
    if (underMatch) {
      maxPrice = parseFloat(underMatch[1]);
    }
    
    // Handle "between $X and $Y"
    const betweenMatch = lowerQuery.match(/between\s*\$?(\d+(?:\.\d{2})?)\s*(?:and|to|-)\s*\$?(\d+(?:\.\d{2})?)/);
    if (betweenMatch) {
      minPrice = parseFloat(betweenMatch[1]);
      maxPrice = parseFloat(betweenMatch[2]);
    }

    // Extract keywords (remove price-related words and common stop words)
    const stopWords = ['find', 'show', 'get', 'search', 'for', 'me', 'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'with', 'by'];
    const priceWords = ['above', 'below', 'under', 'over', 'more', 'less', 'than', 'between', 'and', 'to', 'dollar', 'dollars', '$'];
    
    let cleanQuery = lowerQuery;
    // Remove price expressions
    cleanQuery = cleanQuery.replace(/(?:above|below|under|over|more than|less than)\s*\$?\d+(?:\.\d{2})?/g, '');
    cleanQuery = cleanQuery.replace(/between\s*\$?\d+(?:\.\d{2})?\s*(?:and|to|-)\s*\$?\d+(?:\.\d{2})?/g, '');
    cleanQuery = cleanQuery.replace(/\$\d+(?:\.\d{2})?/g, '');
    
    const keywords = cleanQuery
      .split(/\s+/)
      .filter(word => word.length > 0)
      .filter(word => !stopWords.includes(word))
      .filter(word => !priceWords.includes(word))
      .filter(word => !/^\d+$/.test(word)); // Remove standalone numbers

    // Define search synonyms
    const synonyms: { [key: string]: string[] } = {
      'shoes': ['sneakers', 'footwear', 'boots', 'sandals', 'loafers'],
      'sneakers': ['shoes', 'trainers', 'athletic shoes', 'running shoes'],
      'shirt': ['t-shirt', 'tee', 'top', 'blouse'],
      'jacket': ['coat', 'blazer', 'cardigan', 'outerwear'],
      'pants': ['trousers', 'jeans', 'slacks', 'bottoms'],
      'red': ['crimson', 'scarlet', 'cherry', 'burgundy'],
      'blue': ['navy', 'azure', 'cobalt', 'cyan'],
      'cheap': ['affordable', 'budget', 'inexpensive', 'low-cost'],
      'expensive': ['premium', 'luxury', 'high-end', 'costly'],
    };

    // Expand keywords with synonyms
    const expandedKeywords = [...keywords];
    keywords.forEach(keyword => {
      if (synonyms[keyword]) {
        expandedKeywords.push(...synonyms[keyword]);
      }
    });

    // Filter and score results
    const scoredResults = mockDatabase.map(item => {
      let score = 0;
      let matches = 0;

      // Check price constraints first
      if (minPrice !== null && item.price !== undefined && item.price < minPrice) {
        return null; // Exclude items that don't meet price criteria
      }
      if (maxPrice !== null && item.price !== undefined && item.price > maxPrice) {
        return null; // Exclude items that don't meet price criteria
      }

      // If no keywords extracted, but price filter applied, include all items that meet price criteria
      if (expandedKeywords.length === 0 && (minPrice !== null || maxPrice !== null)) {
        score = 0.8;
        matches = 1;
      } else {
        // Score based on keyword matches
        expandedKeywords.forEach(keyword => {
          const keywordLower = keyword.toLowerCase();
          
          // Title match (highest weight)
          if (item.title.toLowerCase().includes(keywordLower)) {
            score += 0.4;
            matches++;
          }
          
          // Description match
          if (item.description.toLowerCase().includes(keywordLower)) {
            score += 0.3;
            matches++;
          }
          
          // Category match
          if (item.category?.toLowerCase().includes(keywordLower)) {
            score += 0.25;
            matches++;
          }
          
          // Color match
          if (item.color?.toLowerCase().includes(keywordLower)) {
            score += 0.35;
            matches++;
          }
        });
      }

      // Boost score if price criteria are met
      if ((minPrice !== null || maxPrice !== null) && item.price !== undefined) {
        if (minPrice !== null && item.price >= minPrice) score += 0.1;
        if (maxPrice !== null && item.price <= maxPrice) score += 0.1;
      }

      // Only return items with matches or valid price filtering
      if (matches === 0 && minPrice === null && maxPrice === null) {
        return null;
      }

      return {
        ...item,
        relevanceScore: Math.min(0.99, score + (item.relevanceScore || 0) * 0.1)
      };
    }).filter(Boolean) as SearchResult[];

    // Sort by relevance score and limit results
    return scoredResults
      .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
      .slice(0, maxResults);
  };

  const callGeminiAPI = async (searchQuery: string, mockResults: SearchResult[]) => {
    if (!apiKey) {
      console.warn("No Gemini API key provided. Using enhanced mock results.");
      return performEnhancedSearch(searchQuery);
    }

    try {
      const prompt = `
You are an intelligent search assistant. Analyze this search query and enhance only the given product results.
Query: "${searchQuery}"
Available Products: ${JSON.stringify(mockDatabase)}

Instructions:
1. Filter products based on the search query
2. Handle price ranges (above, below, between, under, over)
3. Match keywords and synonyms (shoes = sneakers, footwear, etc.)
4. Consider color, category, and other attributes
5. Calculate relevance scores based on match quality
6. Return ONLY products from the available database
7. Maximum ${maxResults} results

Return enhanced results as a JSON array with this structure:
{
  "id": "string",
  "title": "string", 
  "description": "string",
  "category": "string",
  "relevanceScore": number,
  "price": number,
  "color": "string"
}

Return only valid JSON with no extra text.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );

      const result = await response.json();
      const responseText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!responseText) throw new Error("Invalid response from Gemini API");

      const cleanedResponse = responseText.replace(/```json|```/g, "").trim();
      const parsedResults = JSON.parse(cleanedResponse);
      
      return Array.isArray(parsedResults) ? parsedResults.slice(0, maxResults) : [];
    } catch (error) {
      console.error("Gemini API error:", error);
      return performEnhancedSearch(searchQuery);
    }
  };

  const performInitialSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const enhancedResults = performEnhancedSearch(searchQuery);
    setResults(enhancedResults);
    onResults?.(enhancedResults);
    setIsOpen(enhancedResults.length > 0);
  };

  const performSmartSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    setIsOpen(true);

    try {
      const enhancedResults = await callGeminiAPI(searchQuery, mockDatabase);
      
      if (enhancedResults && Array.isArray(enhancedResults)) {
        const processedResults = enhancedResults
          .slice(0, maxResults)
          .map((result, index) => ({
            ...result,
            id: result.id || `result-${index}`,
            relevanceScore: result.relevanceScore || 1 - index * 0.1,
          }));
        
        setResults(processedResults);
        onResults?.(processedResults);
      } else {
        // Fallback to enhanced search if API fails
        const fallbackResults = performEnhancedSearch(searchQuery);
        setResults(fallbackResults);
        onResults?.(fallbackResults);
      }
    } catch (error) {
      console.error("Search error:", error);
      // Fallback to enhanced search
      const fallbackResults = performEnhancedSearch(searchQuery);
      setResults(fallbackResults);
      onResults?.(fallbackResults);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      performSmartSearch(query);
      return;
    }

    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);
    onSearch?.(value);
    performInitialSearch(value);
  };

  const handleResultClick = (result: SearchResult) => {
    setQuery(result.title);
    setIsOpen(false);
    setSelectedIndex(-1);
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
      Footwear: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
      Activewear: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
      Outerwear: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300",
      Casual: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
      Electronics: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
      Accessories: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
      default: "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-300",
    };
    return colors[category as keyof typeof colors] || colors.default;
  };

  return (
    <div className={cn("relative w-full  max-w-2xl", className)}>
      {/* Search Input */}
      <div className="relative ">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {isLoading ? (
            <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
          ) : (
            <Search className="h-4 w-4 text-gray-400" />
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
            "w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 bg-white",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            "placeholder:text-gray-500 text-gray-900",
            "transition-all duration-200 ease-in-out"
          )}
          whileFocus={{ scale: 1.01 }}
        />
        {/* Clear button and AI Indicator */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center space-x-2">
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={clearSearch}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-3 w-3 text-gray-400" />
            </motion.button>
          )}
          <div className="flex items-center space-x-1 text-xs text-gray-500">
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
              "absolute top-full mt-2 w-full  bg-white border border-gray-200",
              "rounded-lg shadow-lg z-50 overflow-scroll",
            )}
          >
            {/* Results Header */}
            <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Smart Results</span>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Sparkles className="h-3 w-3" />
                  <span>AI Powered</span>
                </div>
              </div>
            </div>

            {/* Results List */}
            <div className="max-h-80 ">
              {results.map((result, index) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleResultClick(result)}
                  className={cn(
                    "px-4 py-3 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0",
                    selectedIndex === index ? "bg-gray-100" : "hover:bg-gray-50"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {result.title}
                      </h4>
                      <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                        {result.description}
                      </p>
                      {/* Price */}
                      {result.price && (
                        <p className="text-sm font-semibold text-green-600 mt-1">
                          ${result.price.toFixed(2)}
                        </p>
                      )}
                      {/* Category & Relevance */}
                      <div className="flex items-center justify-between mt-2">
                        {showCategories && result.category && (
                          <span
                            className={cn(
                              "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                              getCategoryColor(result.category)
                            )}
                          >
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
                                      ? "bg-blue-500"
                                      : "bg-gray-300"
                                  )}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500 ml-1">
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
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Use ↑↓ arrows to navigate, Enter to select, Esc to close
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No Results State */}
      <AnimatePresence>
        {isOpen && query.length > 0 && results.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-6 text-center"
          >
            <Search className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">No results found for "{query}"</p>
            <p className="text-xs text-gray-500 mt-1">
              Try a different search term or be more specific
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const SmartSearchExample = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <h2 className="text-2xl font-bold text-gray-900">
              Enhanced Smart Search
            </h2>
            <p className="text-gray-600">
              Search with natural language - try price ranges, colors, categories
            </p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>Try these examples:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">shoes above 100</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">red sneakers under $50</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">footwear between $80 and $200</span>
                <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">electronics over $100</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center"
        >
          <SmartSearch
            onResults={(results) => setSearchResults(results)}
            placeholder="Try: 'shoes above 100' or 'red sneakers under $50'"
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
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Search Results ({searchResults.length})
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((result) => (
                <motion.div
                  key={result.id}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-all cursor-pointer"
                >
                  <h4 className="font-medium text-gray-900">{result.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{result.description}</p>
                  {result.price && (
                    <p className="text-lg font-bold text-green-600 mt-2">
                      ${result.price.toFixed(2)}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    {result.category && (
                      <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {result.category}
                      </span>
                    )}
                    {result.relevanceScore && (
                      <div className="text-xs text-gray-500">
                        Match: {Math.round(result.relevanceScore * 100)}%
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SmartSearchExample;