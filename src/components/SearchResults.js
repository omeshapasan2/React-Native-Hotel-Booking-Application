import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

// Responsive scaling functions
const scale = (size) => (width / 375) * size;
const verticalScale = (size) => (height / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const SearchResults = ({ searchResults, onHotelPress, visible }) => {
  if (!visible || searchResults.length === 0) {
    return null;
  }

  const renderSearchItem = ({ item }) => (
    <TouchableOpacity
      style={styles.searchItem}
      onPress={() => onHotelPress(item)}
      activeOpacity={0.7}
    >
      <Image
        source={item.image || require('../assets/images/placeholder-hotel.jpg')}
        style={styles.hotelImage}
        resizeMode="cover"
      />
      
      <View style={styles.hotelInfo}>
        <Text style={styles.hotelName} numberOfLines={1}>
          {item.name}
        </Text>
        
        <View style={styles.locationContainer}>
          <Icon name="location-on" size={moderateScale(14)} color="#FFA500" />
          <Text style={styles.locationText} numberOfLines={1}>
            {item.location}
          </Text>
        </View>
        
        <View style={styles.ratingPriceRow}>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={moderateScale(14)} color="#FFA500" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          
          <View style={styles.priceContainer}>
            {item.discountedPrice ? (
              <>
                <Text style={styles.originalPrice}>${item.price}</Text>
                <Text style={styles.discountedPrice}>${item.discountedPrice}</Text>
              </>
            ) : (
              <Text style={styles.price}>${item.price}</Text>
            )}
            <Text style={styles.nightText}>/night</Text>
          </View>
        </View>
        
        <View style={styles.categoriesContainer}>
          {item.category.slice(0, 2).map((cat, index) => (
            <View key={index} style={styles.categoryTag}>
              <Text style={styles.categoryText}>{cat}</Text>
            </View>
          ))}
        </View>
      </View>
      
      <Icon 
        name="chevron-right" 
        size={moderateScale(20)} 
        color="#9CA3AF" 
        style={styles.chevronIcon}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.resultsTitle}>
          {searchResults.length} hotel{searchResults.length !== 1 ? 's' : ''} found
        </Text>
      </View>
      
      <FlatList
        data={searchResults}
        renderItem={renderSearchItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        style={styles.resultsList}
        contentContainerStyle={styles.resultsContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    marginHorizontal: scale(16),
    marginTop: verticalScale(8),
    borderRadius: scale(12),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    maxHeight: verticalScale(400),
  },
  header: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  resultsTitle: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#6B7280',
  },
  resultsList: {
    flex: 1,
  },
  resultsContent: {
    paddingBottom: verticalScale(8),
  },
  searchItem: {
    flexDirection: 'row',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  hotelImage: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(8),
    marginRight: scale(12),
  },
  hotelInfo: {
    flex: 1,
    paddingRight: scale(8),
  },
  hotelName: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#111827',
    marginBottom: verticalScale(4),
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(6),
  },
  locationText: {
    fontSize: moderateScale(12),
    color: '#6B7280',
    marginLeft: scale(4),
    flex: 1,
  },
  ratingPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(6),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: '#111827',
    marginLeft: scale(2),
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: '#1E2A78',
  },
  originalPrice: {
    fontSize: moderateScale(12),
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    marginRight: scale(4),
  },
  discountedPrice: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: '#FF6B9D',
  },
  nightText: {
    fontSize: moderateScale(10),
    color: '#9CA3AF',
    marginLeft: scale(2),
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryTag: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(2),
    borderRadius: scale(12),
    marginRight: scale(6),
    marginBottom: verticalScale(2),
  },
  categoryText: {
    fontSize: moderateScale(10),
    fontWeight: '500',
    color: '#1E2A78',
  },
  chevronIcon: {
    marginLeft: scale(8),
  },
});

export default SearchResults;