import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Keyboard } from 'react-native';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import FilterModal from '../components/FilterModal';
import TopNearbySection from '../components/TopNearbySection';
import { useNavigation } from '@react-navigation/native';
import useSearch from '../context/useSearchHook';
import hotels from '../data/hotels';

function HomeScreen() {
  const navigation = useNavigation();
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  
  // Use the search hook with filter functionality
  const {
    searchQuery,
    searchResults,
    isSearching,
    filters,
    hasActiveFilters,
    handleSearch,
    handleFilters,
    clearSearch,
    clearFilters,
    clearAll,
  } = useSearch(hotels, ['name', 'location', 'category']);

  const handleSearchInput = (query) => {
    handleSearch(query);
    setShowSearchResults(query.trim().length > 0 || hasActiveFilters);
  };

  const handleSearchFocus = () => {
    if (searchQuery.trim().length > 0 || hasActiveFilters) {
      setShowSearchResults(true);
    }
  };

  const handleSearchBlur = () => {
    // Delay hiding results to allow for hotel selection
    setTimeout(() => {
      if (!hasActiveFilters && searchQuery.trim().length === 0) {
        setShowSearchResults(false);
      }
    }, 150);
  };

  const handleHotelPress = (hotel) => {
    setShowSearchResults(false);
    clearSearch();
    Keyboard.dismiss();
    navigation.navigate('Hotel', { hotel });
  };

  const handleFilterPress = () => {
    setShowFilterModal(true);
  };

  const handleApplyFilters = (newFilters) => {
    handleFilters(newFilters);
    setShowSearchResults(searchQuery.trim().length > 0 || 
      newFilters.priceRange[0] > 0 || 
      newFilters.priceRange[1] < 200 ||
      newFilters.selectedLocations.length > 0 ||
      newFilters.selectedCategories.length > 0 ||
      newFilters.minRating > 0
    );
  };

  const dismissSearch = () => {
    if (!hasActiveFilters) {
      setShowSearchResults(false);
    }
    Keyboard.dismiss();
  };

  const getResultsText = () => {
    if (searchQuery.trim().length > 0 && hasActiveFilters) {
      return `Found ${searchResults.length} hotel${searchResults.length !== 1 ? 's' : ''} matching "${searchQuery}" with filters`;
    } else if (searchQuery.trim().length > 0) {
      return `Found ${searchResults.length} hotel${searchResults.length !== 1 ? 's' : ''} for "${searchQuery}"`;
    } else if (hasActiveFilters) {
      return `Found ${searchResults.length} hotel${searchResults.length !== 1 ? 's' : ''} with current filters`;
    }
    return `${searchResults.length} hotel${searchResults.length !== 1 ? 's' : ''} found`;
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation}/>

      <SearchBar
        onSearch={handleSearchInput}
        onSearchResults={handleSearchInput}
        onFocus={handleSearchFocus}
        onBlur={handleSearchBlur}
        onFilterPress={handleFilterPress}
        hasActiveFilters={hasActiveFilters} // Pass this to show filter indicator
      />
      
      {/* Filter Modal */}
      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApplyFilters={handleApplyFilters}
        initialFilters={filters}
        hotels={hotels}
      />
      
      {/* Search Results Overlay */}
      {showSearchResults && (
        <SearchResults
          searchResults={searchResults}
          onHotelPress={handleHotelPress}
          visible={showSearchResults}
          resultsText={getResultsText()}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
          onClearAll={clearAll}
        />
      )}
      
      {/* Main Content - Hide when searching */}
      {!showSearchResults && (
        <Pressable 
          style={styles.pressableContainer}
          onPress={dismissSearch}
        >
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <CategoryTabs navigation={navigation}/>
            <TopNearbySection navigation={navigation}/>
          </ScrollView>
        </Pressable>
      )}
      
      {/* Show empty state when searching but no results */}
      {showSearchResults && searchResults.length === 0 && (searchQuery.trim().length > 0 || hasActiveFilters) && (
        <Pressable 
          style={styles.emptyStateContainer}
          onPress={dismissSearch}
        >
          <Text style={styles.emptyStateTitle}>No hotels found</Text>
          <Text style={styles.emptyStateText}>
            {searchQuery.trim().length > 0 && hasActiveFilters 
              ? `No hotels match "${searchQuery}" with your current filters. Try adjusting your search or filters.`
              : searchQuery.trim().length > 0
              ? `No hotels found for "${searchQuery}". Try a different search term.`
              : "No hotels match your current filters. Try adjusting your filter criteria."
            }
          </Text>
          {hasActiveFilters && (
            <Pressable 
              style={styles.clearFiltersButton}
              onPress={clearFilters}
            >
              <Text style={styles.clearFiltersButtonText}>Clear Filters</Text>
            </Pressable>
          )}
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  pressableContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100, // Space for bottom navigation
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  clearFiltersButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  clearFiltersButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default HomeScreen;