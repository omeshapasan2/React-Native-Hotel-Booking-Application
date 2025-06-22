import { useState, useEffect, useMemo } from 'react';

const useSearch = (data, searchFields = ['name', 'location', 'category']) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 200],
    selectedLocations: [],
    selectedCategories: [],
    minRating: 0,
  });
  const [hasActiveFilters, setHasActiveFilters] = useState(false);

  // Check if filters are active
  useEffect(() => {
    const isFilterActive = 
      filters.priceRange[0] > 0 || 
      filters.priceRange[1] < 200 ||
      filters.selectedLocations.length > 0 ||
      filters.selectedCategories.length > 0 ||
      filters.minRating > 0;
    
    setHasActiveFilters(isFilterActive);
  }, [filters]);

  const applyFilters = (data) => {
    return data.filter((item) => {
      // Price filter
      const effectivePrice = item.discountedPrice || item.price;
      const priceMatch = effectivePrice >= filters.priceRange[0] && effectivePrice <= filters.priceRange[1];
      
      // Location filter
      const locationMatch = filters.selectedLocations.length === 0 || 
        filters.selectedLocations.includes(item.location);
      
      // Category filter
      const categoryMatch = filters.selectedCategories.length === 0 || 
        filters.selectedCategories.some(selectedCategory => 
          item.category.includes(selectedCategory)
        );
      
      // Rating filter
      const ratingMatch = item.rating >= filters.minRating;
      
      return priceMatch && locationMatch && categoryMatch && ratingMatch;
    });
  };

  const searchResults = useMemo(() => {
    let filteredData = data;

    // Apply filters first
    if (hasActiveFilters) {
      filteredData = applyFilters(data);
    }

    // If no search query, return filtered data or empty array
    if (!searchQuery.trim()) {
      return hasActiveFilters ? filteredData : [];
    }

    const query = searchQuery.toLowerCase().trim();
    
    const searchFiltered = filteredData.filter((item) => {
      return searchFields.some((field) => {
        const value = item[field];
        
        if (Array.isArray(value)) {
          // Handle array fields like categories
          return value.some(subValue => 
            subValue.toString().toLowerCase().includes(query)
          );
        }
        
        if (typeof value === 'string') {
          return value.toLowerCase().includes(query);
        }
        
        if (typeof value === 'number') {
          return value.toString().includes(query);
        }
        
        return false;
      });
    });

    // Sort results by relevance (exact matches first, then partial matches)
    return searchFiltered.sort((a, b) => {
      const aExactMatch = searchFields.some(field => {
        const value = a[field];
        if (Array.isArray(value)) {
          return value.some(subValue => 
            subValue.toString().toLowerCase() === query
          );
        }
        return value && value.toString().toLowerCase() === query;
      });
      
      const bExactMatch = searchFields.some(field => {
        const value = b[field];
        if (Array.isArray(value)) {
          return value.some(subValue => 
            subValue.toString().toLowerCase() === query
          );
        }
        return value && value.toString().toLowerCase() === query;
      });
      
      if (aExactMatch && !bExactMatch) return -1;
      if (!aExactMatch && bExactMatch) return 1;
      
      // Secondary sort by rating (highest first)
      if (b.rating !== a.rating) return b.rating - a.rating;
      
      // Tertiary sort by price (lowest first)
      const aPrice = a.discountedPrice || a.price;
      const bPrice = b.discountedPrice || b.price;
      if (aPrice !== bPrice) return aPrice - bPrice;
      
      // Final sort by name alphabetically
      return a.name.localeCompare(b.name);
    });
  }, [data, searchQuery, searchFields, filters, hasActiveFilters]);

  // Get filtered results without search query
  const filteredResults = useMemo(() => {
    if (!hasActiveFilters) return [];
    return applyFilters(data).sort((a, b) => {
      // Sort by rating (highest first)
      if (b.rating !== a.rating) return b.rating - a.rating;
      
      // Sort by price (lowest first)
      const aPrice = a.discountedPrice || a.price;
      const bPrice = b.discountedPrice || b.price;
      if (aPrice !== bPrice) return aPrice - bPrice;
      
      // Sort by name alphabetically
      return a.name.localeCompare(b.name);
    });
  }, [data, filters, hasActiveFilters]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(query.trim().length > 0 || hasActiveFilters);
  };

  const handleFilters = (newFilters) => {
    setFilters(newFilters);
    setIsSearching(searchQuery.trim().length > 0 || 
      newFilters.priceRange[0] > 0 || 
      newFilters.priceRange[1] < 200 ||
      newFilters.selectedLocations.length > 0 ||
      newFilters.selectedCategories.length > 0 ||
      newFilters.minRating > 0
    );
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(hasActiveFilters);
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 200],
      selectedLocations: [],
      selectedCategories: [],
      minRating: 0,
    });
    setIsSearching(searchQuery.trim().length > 0);
  };

  const clearAll = () => {
    setSearchQuery('');
    setFilters({
      priceRange: [0, 200],
      selectedLocations: [],
      selectedCategories: [],
      minRating: 0,
    });
    setIsSearching(false);
  };

  // Determine which results to show
  const displayResults = searchQuery.trim().length > 0 ? searchResults : filteredResults;

  return {
    searchQuery,
    searchResults: displayResults,
    isSearching,
    filters,
    hasActiveFilters,
    handleSearch,
    handleFilters,
    clearSearch,
    clearFilters,
    clearAll,
  };
};

export default useSearch;