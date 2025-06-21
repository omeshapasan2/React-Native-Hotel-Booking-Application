import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, StyleSheet, Dimensions } from 'react-native';
import hotels from '../data/hotels'
import HotelCard from './HotelCard';

const { width, height } = Dimensions.get('window');
const categories = ['Popular', 'Modern', 'Beach', 'Mountain', 'Luxury', 'Budget'];

// Responsive scaling function
const scale = (size) => (width / 375) * size;
const verticalScale = (size) => (height / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const CategoryTabs = () => {
  const [selectedCategory, setSelectedCategory] = useState('Popular');

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

  const renderHotelCard = ({ item }) => (
    <View style={styles.cardWrapper}>
      <HotelCard hotel={item} />
    </View>
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

      {/* Category Tab Bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabContainer}
        contentContainerStyle={styles.tabContentContainer}
      >
        {categories.map(renderCategoryTab)}
      </ScrollView>

      {/* Hotel Cards List - Now Horizontal */}
      <View style={styles.hotelListContainer}>
        <FlatList
          key="horizontal-hotel-list" // Add key to force fresh render
          data={filteredHotels}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderHotelCard}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalFlatListContent}
          ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
          snapToInterval={scale(280)} // Adjust based on your card width
          decelerationRate="fast"
          snapToAlignment="start"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(20), 
    marginBottom: verticalScale(20), // Responsive bottom margin
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(16),
    paddingHorizontal: scale(16),
  },
  categoryTitle: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: '#000',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: moderateScale(16),
    color: '#9CA3AF',
  },
  chevron: {
    fontSize: moderateScale(16),
    color: '#9CA3AF',
  },
  tabContainer: {
    marginBottom: verticalScale(16),
    flexGrow: 0,
  },
  tabContentContainer: {
    paddingHorizontal: scale(16),
  },
  tabButton: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
    borderRadius: scale(25),
    marginRight: scale(12),
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
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  hotelListContainer: {
    // Remove horizontal padding to allow full-width scrolling
  },
  cardWrapper: {
    width: scale(180), // Set a fixed width for each card
    // You can adjust this width based on your HotelCard component size
  },
  cardSeparator: {
    // width: scale(8), // Reduced space between cards
  },
  horizontalFlatListContent: {
    paddingHorizontal: scale(16), // Add padding to the content
  },
});

export default CategoryTabs;