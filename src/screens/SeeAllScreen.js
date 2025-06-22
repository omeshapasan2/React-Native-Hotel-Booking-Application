import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import hotels from '../data/hotels';
import HotelCard from '../components/HotelCard';
import { useFavorites } from '../context/FavoritesContext';

const { width, height } = Dimensions.get('window');
const categories = ['All', 'Popular', 'Modern', 'Beach', 'Mountain', 'Luxury', 'Budget'];

// Responsive scaling functions
const scale = (size) => (width / 375) * size;
const verticalScale = (size) => (height / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const SeeAllScreen = ({ navigation, route }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name'); // 'name', 'price', 'rating'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc', 'desc'
  const { getHotelsWithFavorites, toggleFavorite } = useFavorites();

  // Get initial category from route params if available
  useEffect(() => {
    if (route?.params?.category) {
      setSelectedCategory(route.params.category);
    }
  }, [route?.params?.category]);

  // Filter hotels by selected category
  const getFilteredHotels = () => {
    let filtered = hotels;
    
    if (selectedCategory !== 'All') {
      filtered = hotels.filter(hotel =>
        hotel.category.includes(selectedCategory)
      );
    }
    
    return filtered;
  };

  // Sort hotels based on selected criteria
  const getSortedHotels = (hotelsToSort) => {
    const sorted = [...hotelsToSort].sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'price':
          aValue = a.discountedPrice || a.price;
          bValue = b.discountedPrice || b.price;
          break;
        case 'rating':
          aValue = parseFloat(a.rating);
          bValue = parseFloat(b.rating);
          break;
        case 'name':
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    return sorted;
  };

  // Get final processed hotels list
  const processedHotels = () => {
    const filtered = getFilteredHotels();
    const sorted = getSortedHotels(filtered);
    return getHotelsWithFavorites(sorted);
  };

  const handleFavoritePress = (hotelId) => {
    toggleFavorite(hotelId);
  };

  const handleSortPress = (newSortBy) => {
    if (sortBy === newSortBy) {
      // Toggle sort order if same criteria
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new criteria with ascending order
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  const renderHotelCard = ({ item, index }) => (
    <View style={[
      styles.cardWrapper,
      { marginLeft: index % 2 === 0 ? 0 : scale(8) }
    ]}>
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

  const renderSortButton = (label, sortKey, icon) => (
    <TouchableOpacity
      key={sortKey}
      onPress={() => handleSortPress(sortKey)}
      style={[
        styles.sortButton,
        sortBy === sortKey && styles.activeSortButton
      ]}
    >
      <Icon 
        name={icon} 
        size={moderateScale(16)} 
        color={sortBy === sortKey ? '#1E2A78' : '#6B7280'} 
      />
      <Text
        style={[
          styles.sortText,
          sortBy === sortKey && styles.activeSortText
        ]}
      >
        {label}
      </Text>
      {sortBy === sortKey && (
        <Icon
          name={sortOrder === 'asc' ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={moderateScale(16)}
          color="#1E2A78"
        />
      )}
    </TouchableOpacity>
  );

  const hotelsData = processedHotels();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={moderateScale(24)} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Hotels</Text>
        <View style={styles.headerRightSpace} />
      </View>

      {/* Category Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabContainer}
          contentContainerStyle={styles.tabContentContainer}
        >
          {categories.map(renderCategoryTab)}
        </ScrollView>
      </View>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sortContentContainer}
        >
          {renderSortButton('Name', 'name', 'sort-by-alpha')}
          {renderSortButton('Price', 'price', 'attach-money')}
          {renderSortButton('Rating', 'rating', 'star')}
        </ScrollView>
      </View>

      {/* Results Count */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          {hotelsData.length} hotel{hotelsData.length !== 1 ? 's' : ''} found
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
        </Text>
      </View>

      {/* Hotels Grid */}
      <FlatList
        data={hotelsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderHotelCard}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={styles.row}
        ItemSeparatorComponent={() => <View style={styles.rowSeparator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    width: scale(40),
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(8),
    backgroundColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: '#333',
  },
  headerRightSpace: {
    width: scale(40),
  },
  filtersContainer: {
    backgroundColor: '#FFF',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tabContainer: {
    flexGrow: 0,
  },
  tabContentContainer: {
    paddingHorizontal: scale(16),
  },
  tabButton: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    borderRadius: scale(20),
    marginRight: scale(8),
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
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sortLabel: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#333',
    marginRight: scale(12),
  },
  sortContentContainer: {
    flexDirection: 'row',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: scale(16),
    marginRight: scale(8),
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: 'transparent',
  },
  activeSortButton: {
    backgroundColor: '#E8EAFF',
    borderColor: '#1E2A78',
  },
  sortText: {
    color: '#6B7280',
    fontSize: moderateScale(12),
    fontWeight: '500',
    marginLeft: scale(4),
    marginRight: scale(2),
  },
  activeSortText: {
    color: '#1E2A78',
  },
  resultsContainer: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    backgroundColor: '#F9FAFB',
  },
  resultsText: {
    fontSize: moderateScale(14),
    color: '#6B7280',
    fontWeight: '500',
  },
  gridContainer: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(8),
    paddingBottom: verticalScale(20),
  },
  row: {
    justifyContent: 'space-between',
  },
  cardWrapper: {
    flex: 1,
  },
  rowSeparator: {
    height: verticalScale(8),
  },
});

export default SeeAllScreen;