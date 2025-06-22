import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const SearchBar = ({ 
  placeholder = "Explore Something fun", 
  onSearch, // prop for handling search input
  onFilterPress, // prop for handling filter button press
  onSearchResults, // prop for passing search results
  onFocus, // prop for handling focus
  onBlur, // prop for handling blur
  hasActiveFilters = false, // prop to show filter indicator
  style 
}) => {
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textInputRef = useRef(null);

  const handleTextChange = (text) => {
    setSearchText(text);
    if (onSearch) {
      onSearch(text);
    }
    // Pass the search text to parent for filtering
    if (onSearchResults) {
      onSearchResults(text);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) {
      onFocus();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) {
      onBlur();
    }
  };

  const clearSearch = () => {
    setSearchText('');
    if (onSearch) {
      onSearch('');
    }
    if (onSearchResults) {
      onSearchResults('');
    }
    // Keep focus on the input after clearing
    textInputRef.current?.focus();
  };

  return (
    <View style={[styles.container, style]}>
      <View style={[
        styles.searchContainer,
        isFocused && styles.searchContainerFocused
      ]}>
        <FontAwesome 
          name="search" 
          size={20} 
          color={isFocused ? "#6366F1" : "#6B7280"}
          style={styles.searchIcon}
        />
        <TextInput
          ref={textInputRef}
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={searchText}
          onChangeText={handleTextChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          returnKeyType="search"
          onSubmitEditing={() => onSearch && onSearch(searchText)}
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode="never"
        />
        {searchText.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={clearSearch}
            activeOpacity={0.7}
          >
            <FontAwesome 
              name="times-circle" 
              size={16} 
              color="#9CA3AF"
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity 
          style={[
            styles.filterButton,
            hasActiveFilters && styles.filterButtonActive
          ]}
          onPress={onFilterPress}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons 
            name="tune-variant" 
            size={20} 
            color={hasActiveFilters ? "#FFF" : "#6366F1"}
          />
          {hasActiveFilters && <View style={styles.filterIndicator} />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    zIndex: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchContainerFocused: {
    borderColor: '#6366F1',
    shadowColor: '#6366F1',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    paddingVertical: 0,
    height: 20,
  },
  clearButton: {
    marginLeft: 8,
    padding: 4,
  },
  filterButton: {
    marginLeft: 12,
    padding: 4,
    borderRadius: 8,
    position: 'relative',
  },
  filterButtonActive: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  filterIndicator: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1,
    borderColor: '#FFF',
  },
});

export default SearchBar;