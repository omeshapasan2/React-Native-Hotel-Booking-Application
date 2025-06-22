import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const FilterModal = ({ visible, onClose, onApplyFilters, initialFilters, hotels }) => {
  const [filters, setFilters] = useState({
    priceRange: [0, 200],
    selectedLocations: [],
    selectedCategories: [],
    minRating: 0,
  });

  // Extract unique locations and categories from hotels data
  const uniqueLocations = [...new Set(hotels.map(hotel => hotel.location))];
  const uniqueCategories = [...new Set(hotels.flatMap(hotel => hotel.category))];

  // Price range options
  const priceRangeOptions = [
    { label: 'Any Price', range: [0, 200] },
    { label: '$0 - $50', range: [0, 50] },
    { label: '$51 - $100', range: [51, 100] },
    { label: '$101 - $150', range: [101, 150] },
    { label: '$151 - $200', range: [151, 200] },
    { label: '$200+', range: [200, 500] },
  ];

  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  const handlePriceRangeSelect = (range) => {
    setFilters({ ...filters, priceRange: range });
  };

  const toggleSelection = (item, type) => {
    const key = type === 'location' ? 'selectedLocations' : 'selectedCategories';
    const currentSelection = filters[key];
    const updatedSelection = currentSelection.includes(item)
      ? currentSelection.filter(i => i !== item)
      : [...currentSelection, item];
    
    setFilters({ ...filters, [key]: updatedSelection });
  };

  const handleRatingChange = (rating) => {
    setFilters({ ...filters, minRating: rating });
  };

  const clearAllFilters = () => {
    setFilters({
      priceRange: [0, 200],
      selectedLocations: [],
      selectedCategories: [],
      minRating: 0,
    });
  };

  const applyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  const renderFilterChip = (item, isSelected, onPress) => (
    <TouchableOpacity
      key={item}
      style={[
        styles.filterChip,
        isSelected && styles.filterChipSelected
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[
        styles.filterChipText,
        isSelected && styles.filterChipTextSelected
      ]}>
        {item}
      </Text>
      {isSelected && (
        <Icon name="check" size={16} color="#FFF" style={styles.checkIcon} />
      )}
    </TouchableOpacity>
  );

  const renderPriceRangeOption = (option) => {
    const isSelected = filters.priceRange[0] === option.range[0] && filters.priceRange[1] === option.range[1];
    
    return (
      <TouchableOpacity
        key={option.label}
        style={[
          styles.priceRangeOption,
          isSelected && styles.priceRangeOptionSelected
        ]}
        onPress={() => handlePriceRangeSelect(option.range)}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.priceRangeText,
          isSelected && styles.priceRangeTextSelected
        ]}>
          {option.label}
        </Text>
        {isSelected && (
          <Icon name="check-circle" size={20} color="#6366F1" />
        )}
      </TouchableOpacity>
    );
  };

  const renderRatingStars = () => {
    return (
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((rating) => (
          <TouchableOpacity
            key={rating}
            onPress={() => handleRatingChange(rating)}
            style={styles.starContainer}
            activeOpacity={0.7}
          >
            <Icon
              name="star"
              size={32}
              color={filters.minRating >= rating ? "#FFA500" : "#E5E7EB"}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Filters</Text>
          <TouchableOpacity onPress={clearAllFilters} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Price Range */}
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Price Range</Text>
            <View style={styles.priceRangeContainer}>
              {priceRangeOptions.map((option) => renderPriceRangeOption(option))}
            </View>
          </View>

          {/* Minimum Rating */}
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Minimum Rating</Text>
            <Text style={styles.ratingText}>
              {filters.minRating > 0 ? `${filters.minRating}+ stars` : 'Any rating'}
            </Text>
            {renderRatingStars()}
          </View>

          {/* Location Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.chipContainer}>
              {uniqueLocations.map((location) => 
                renderFilterChip(
                  location,
                  filters.selectedLocations.includes(location),
                  () => toggleSelection(location, 'location')
                )
              )}
            </View>
          </View>

          {/* Category Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <View style={styles.chipContainer}>
              {uniqueCategories.map((category) => 
                renderFilterChip(
                  category,
                  filters.selectedCategories.includes(category),
                  () => toggleSelection(category, 'category')
                )
              )}
            </View>
          </View>
        </ScrollView>

        {/* Apply Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={applyFilters}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="filter-check" size={20} color="#FFF" />
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    backgroundColor: '#FFF',
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  clearButton: {
    padding: 4,
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  filterSection: {
    marginVertical: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  priceRangeContainer: {
    gap: 8,
  },
  priceRangeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    marginBottom: 8,
  },
  priceRangeOptionSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#6366F1',
  },
  priceRangeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  priceRangeTextSelected: {
    color: '#6366F1',
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  starContainer: {
    marginHorizontal: 4,
    padding: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 10,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    marginBottom: 8,
  },
  filterChipSelected: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  filterChipTextSelected: {
    color: '#FFF',
  },
  checkIcon: {
    marginLeft: 6,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#FFF',
  },
  applyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
    marginLeft: 8,
  },
});

export default FilterModal;