import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Keyboard } from 'react-native';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import TopNearbySection from '../components/TopNearbySection';
import { useNavigation } from '@react-navigation/native';
import useSearch from '../context/useSearchHook';
import hotels from '../data/hotels';

function HomeScreen() {
  const navigation = useNavigation();
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  // Use the search hook
  const {
    searchQuery,
    searchResults,
    isSearching,
    handleSearch,
    clearSearch,
  } = useSearch(hotels, ['name', 'location', 'category']);

  const handleSearchInput = (query) => {
    handleSearch(query);
    setShowSearchResults(query.trim().length > 0);
  };

  const handleSearchFocus = () => {
    if (searchQuery.trim().length > 0) {
      setShowSearchResults(true);
    }
  };

  const handleSearchBlur = () => {
    // Delay hiding results to allow for hotel selection
    setTimeout(() => {
      setShowSearchResults(false);
    }, 150);
  };

  const handleHotelPress = (hotel) => {
    setShowSearchResults(false);
    clearSearch();
    Keyboard.dismiss();
    navigation.navigate('Hotel', { hotel });
  };

  const handleFilterPress = () => {
    console.log('Filter pressed');
    // navigate to a filter screen or show filter modal
    // navigation.navigate('Filter');
  };

  const dismissSearch = () => {
    setShowSearchResults(false);
    Keyboard.dismiss();
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
      />
      
      {/* Search Results Overlay */}
      {showSearchResults && (
        <SearchResults
          searchResults={searchResults}
          onHotelPress={handleHotelPress}
          visible={showSearchResults}
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
      {showSearchResults && searchResults.length === 0 && searchQuery.trim().length > 0 && (
        <Pressable 
          style={styles.emptyStateContainer}
          onPress={dismissSearch}
        >
          <Text style={styles.emptyStateTitle}>No hotels found</Text>
          <Text style={styles.emptyStateText}>
            Try adjusting your search terms or browse our categories below.
          </Text>
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
  },
});

export default HomeScreen;