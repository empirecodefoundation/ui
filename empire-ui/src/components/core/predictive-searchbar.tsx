import React, { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Search, Loader2 } from "lucide-react";

interface SearchSuggestion {
  id: string;
  text: string;
}

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onSearch: (query: string) => void;
}

const AiSearchBar = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "search", onSearch, ...props }, ref) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const suggestionRefs = useRef<(HTMLLIElement | null)[]>([]);

    const debouncedFetchSuggestions = useCallback(
      debounce(async (input: string) => {
        if (input.trim() === "") {
          setSuggestions([]);
          return;
        }

        setIsLoading(true);
        try {
          const response = await fetch("/api/search-suggestions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: input }),
          });
          const data = await response.json();
          setSuggestions(data);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        } finally {
          setIsLoading(false);
        }
      }, 300),
      []
    );

    useEffect(() => {
      debouncedFetchSuggestions(query);
    }, [query, debouncedFetchSuggestions]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      setSelectedIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
      } else if (e.key === "Enter") {
        if (selectedIndex >= 0) {
          setQuery(suggestions[selectedIndex].text);
          onSearch(suggestions[selectedIndex].text);
          setSuggestions([]);
        } else {
          onSearch(query);
        }
      }
    };

    const handleSuggestionClick = (suggestion: SearchSuggestion) => {
      setQuery(suggestion.text);
      onSearch(suggestion.text);
      setSuggestions([]);
    };

    useEffect(() => {
      if (selectedIndex >= 0 && suggestionRefs.current[selectedIndex]) {
        suggestionRefs.current[selectedIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }, [selectedIndex]);

    return (
      <div className="relative w-full max-w-md">
        <div className="relative">
          <input
            type={type}
            className={cn(
              "flex h-12 w-full rounded-full border border-input bg-background px-4 pr-12 py-2 text-sm ring-offset-background transition-shadow duration-200 ease-in-out file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            {...props}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            ) : (
              <Search className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </div>
        {suggestions.length > 0 && (
          <ul className="absolute z-10 w-full mt-1 bg-background border border-input rounded-md shadow-lg max-h-60 overflow-auto">
            {suggestions.map((suggestion, index) => (
              <li
                key={suggestion.id}
                ref={(el: any) => (suggestionRefs.current[index] = el)}
                className={cn(
                  "px-4 py-2 text-sm cursor-pointer transition-colors duration-150 ease-in-out",
                  index === selectedIndex
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-muted"
                )}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

AiSearchBar.displayName = "AiSearchBar";

function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export { AiSearchBar };
