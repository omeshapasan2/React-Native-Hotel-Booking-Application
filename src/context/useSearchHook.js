import { useState, useEffect, useMemo } from 'react';

const useSearch = (data, searchFields = ['name', 'location', 'category']) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase().trim();
    
    const filtered = data.filter((item) => {
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
    return filtered.sort((a, b) => {
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
      
      // Secondary sort by name alphabetically
      return a.name.localeCompare(b.name);
    });
  }, [data, searchQuery, searchFields]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(query.trim().length > 0);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  return {
    searchQuery,
    searchResults,
    isSearching,
    handleSearch,
    clearSearch,
  };
};

export default useSearch;