import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, StyleSheet, Dimensions } from 'react-native';
import hotels from '../data/hotels';
import HotelCard from './HotelCard';
import { useFavorites } from '../context/FavoritesContext';

const { width, height } = Dimensions.get('window');
const categories = ['Popular', 'Modern', 'Beach', 'Mountain', 'Luxury', 'Budget'];

// Responsive scaling function
const scale = (size) => (width / 375) * size;
const verticalScale = (size) => (height / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const CategoryTabs = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('Popular');
  const { getHotelsWithFavorites, toggleFavorite } = useFavorites();

  // Filter hotels by selected category and add favorite status
  const filteredHotels = hotels.filter(hotel =>
    hotel.category.includes(selectedCategory)
  );
  
  // Get hotels with updated favorite status
  const hotelsWithFavorites = getHotelsWithFavorites(filteredHotels);

  const handleFavoritePress = (hotelId) => {
    toggleFavorite(hotelId);
  };

  // Updated to remove individual hotel press handler since navigation is now handled in HotelCard
  const renderHotelCard = ({ item }) => (
    <View style={styles.cardWrapper}>
      <HotelCard
        hotel={item}
        onFavoritePress={handleFavoritePress}
        navigation={navigation}
      />
    </View>
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

      {/* Category Tab Bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabContainer}
        contentContainerStyle={styles.tabContentContainer}
      >
        {categories.map(renderCategoryTab)}
      </ScrollView>

      {/* Hotel Cards List - Horizontal */}
      <View style={styles.hotelListContainer}>
        <FlatList
          key="horizontal-hotel-list"
          data={hotelsWithFavorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderHotelCard}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalFlatListContent}
          ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
          snapToInterval={scale(188)}
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
    marginBottom: verticalScale(20),
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
    // Container for the horizontal list
  },
  cardWrapper: {
    width: scale(180),
  },
  cardSeparator: {
    width: scale(8),
  },
  horizontalFlatListContent: {
    paddingHorizontal: scale(16),
  },
});

export default CategoryTabs;