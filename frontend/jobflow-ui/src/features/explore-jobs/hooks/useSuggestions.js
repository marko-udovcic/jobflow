import { useState, useEffect } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
export function useSuggestions(query, setQuery, suggestions = [], options = {}) {
  const { minQueryLength = 1, maxSuggestions = 5, splitFirst = false } = options;
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [inputValue, setInputValue] = useState(query);

  // debounce hook to delay updating the actual query
  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    setQuery(debouncedValue);
  }, [debouncedValue, setQuery]);

  const getFilteredSuggestions = () => {
    if (!query || query.length < minQueryLength) return [];

    return suggestions
      .filter((suggestion) => suggestion.toLowerCase().includes(query.toLowerCase()))
      .slice(0, maxSuggestions);
  };

  const onSuggestionClick = (suggestion) => {
    if (splitFirst) {
      suggestion = suggestion.split(",")[0];
    }
    setInputValue(suggestion);
    setQuery(suggestion);
    setShowSuggestions(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setShowSuggestions(e.target.value.length >= minQueryLength);
  };
  const handleInputFocus = () => {
    if (query) {
      setShowSuggestions(true);
    }
  };

  return {
    showSuggestions,
    setShowSuggestions,
    getFilteredSuggestions,
    onSuggestionClick,
    handleInputChange,
    handleInputFocus,
    inputValue,
  };
}
