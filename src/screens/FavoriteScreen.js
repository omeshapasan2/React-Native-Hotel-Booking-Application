import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WideHotelCard from '../components/WideHotelCard';
import HotelCard from '../components/HotelCard';
import { useFavorites } from '../context/FavoritesContext';
import hotels from '../data/hotels'; // Import your hotels data

const { width, height } = Dimensions.get('window');

const scale = (size) => (width / 375) * size;
const verticalScale = (size) => (height / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

function FavoriteScreen({ navigation }) {
  const { getFavoriteHotels, toggleFavorite } = useFavorites();
  const [viewType, setViewType] = useState('list');
  
  const favoriteHotels = getFavoriteHotels(hotels);

  const handleFavoritePress = (hotelId) => {
    toggleFavorite(hotelId);
  };

  const handleHotelPress = (hotel) => {
    console.log('Navigate to hotel detail:', hotel.name);
    // navigation.navigate('HotelDetail', { hotel });
  };

  const toggleViewType = () => {
    setViewType(viewType === 'list' ? 'grid' : 'list');
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="favorite-border" size={scale(80)} color="#E0E0E0" />
      <Text style={styles.emptyTitle}>No Favorites Yet</Text>
      <Text style={styles.emptySubtitle}>
        Start exploring hotels and add them to your favorites to see them here
      </Text>
    </View>
  );

  const renderHotelItem = ({ item }) => {
    if (viewType === 'list') {
      return (
        <WideHotelCard
          hotel={item}
          onPress={handleHotelPress}
          onFavoritePress={handleFavoritePress}
        />
      );
    } else {
      return (
        <HotelCard
          hotel={item}
          onPress={handleHotelPress}
          onFavoritePress={handleFavoritePress}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Favorites</Text>
        <View style={styles.headerActions}>
          <Text style={styles.favoriteCount}>
            {favoriteHotels.length} {favoriteHotels.length === 1 ? 'Hotel' : 'Hotels'}
          </Text>
          <TouchableOpacity
            style={styles.viewToggle}
            onPress={toggleViewType}
            activeOpacity={0.7}
          >
            <Icon
              name={viewType === 'list' ? 'grid-view' : 'view-list'}
              size={moderateScale(24)}
              color="#333"
            />
          </TouchableOpacity>
        </View>
      </View>

      {favoriteHotels.length > 0 ? (
        <FlatList
          data={favoriteHotels}
          renderItem={renderHotelItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={[
            styles.listContainer,
            viewType === 'grid' && styles.gridContainer
          ]}
          numColumns={viewType === 'grid' ? 2 : 1}
          key={viewType}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        renderEmptyState()
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(16),
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: moderateScale(24),
    fontWeight: '800',
    color: '#333',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteCount: {
    fontSize: moderateScale(14),
    color: '#666',
    marginRight: scale(12),
  },
  viewToggle: {
    padding: scale(8),
    borderRadius: scale(8),
    backgroundColor: '#F5F5F5',
  },
  listContainer: {
    padding: scale(16),
    paddingBottom: verticalScale(100),
  },
  gridContainer: {
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(32),
  },
  emptyTitle: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: '#333',
    marginTop: verticalScale(16),
    marginBottom: verticalScale(8),
  },
  emptySubtitle: {
    fontSize: moderateScale(14),
    color: '#666',
    textAlign: 'center',
    lineHeight: moderateScale(20),
  },
});

export default FavoriteScreen;