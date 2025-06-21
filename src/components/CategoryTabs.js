import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, StyleSheet } from 'react-native';
import hotels from '../data/hotels'
import HotelCard from './HotelCard';

const categories = ['Popular', 'Modern', 'Beach', 'Mountain', 'Luxury', 'Budget'];

const CategoryTabs = () => {
  const [selectedCategory, setSelectedCategory] = useState('Popular');

  // Filter the hotels based on selected category
  const filteredHotels = hotels.filter(hotel =>
    hotel.category.includes(selectedCategory)
  );

  const renderCategoryTab = (category) => (
    <TouchableOpacity
      key={category}
      onPress={() => setSelectedCategory(category)}
      style={[
        styles.tabButton,
        selectedCategory === category && styles.activeTabButton
      ]}
    >
      <Text
        style={[
          styles.tabText,
          selectedCategory === category && styles.activeTabText
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Category Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.categoryTitle}>Category</Text>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>See All</Text>
          <Text style={styles.chevron}> {'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* Category Tab Bar - Full Width Scrollable */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabContainer}
        contentContainerStyle={styles.tabContentContainer}
      >
        {categories.map(renderCategoryTab)}
      </ScrollView>

      {/* Hotel Cards List */}
      <View style={styles.hotelListContainer}>
        <FlatList
          data={filteredHotels}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <HotelCard hotel={item} />}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 0 }}
          contentContainerStyle={{ paddingBottom: 0 }} // Remove bottom padding
          showsVerticalScrollIndicator={false}
          scrollEnabled={false} // Disable inner scrolling since parent handles it
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginBottom: 16, // Add consistent bottom margin for spacing
  },

  // Category Header
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },

  // Category Title
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },

  // See All Button
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  chevron: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  // Between the cards and tab bar
  tabContainer: {
    marginBottom: 16,
    flexGrow: 0,
  },
  // Tab bar left side padding
  tabContentContainer: {
    paddingHorizontal: 16,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: 'transparent',
  },
  activeTabButton: {
    backgroundColor: '#1E2A78',
    borderColor: '#1E2A78',
  },
  tabText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  // Space Between hotel cards
  hotelListContainer: {
    paddingHorizontal: 16,
  },
});

export default CategoryTabs;