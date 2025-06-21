import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import hotels from '../data/hotels';
import WideHotelCard from './WideHotelCard';

const { width, height } = Dimensions.get('window');

// Responsive scaling functions
const scale = (size) => (width / 375) * size;
const verticalScale = (size) => (height / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const locations = [
  'Sleman, DIY',
  'Orchard Road, Singapore',
  'Colombo, Sri Lanka',
  'Kandy, Sri Lanka',
  'Lavender, Singapore',
  'Goa, India',
  'Tanglin, Singapore',
  'Bentota, Sri Lanka',
  'Clarke Quay, Singapore',
  'Sentosa Island, Singapore',
  'Unawatuna, Sri Lanka'
];

const TopNearbySection = () => {
  const [selectedLocation, setSelectedLocation] = useState('Sleman, DIY');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredHotels = hotels.filter(hotel => 
    hotel.location === selectedLocation
  );

  const handleFavoritePress = (hotelId) => {
    console.log('Favorite pressed for hotel:', hotelId);
  };

  const handleHotelPress = (hotel) => {
    console.log('Hotel pressed:', hotel.name);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setIsDropdownOpen(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <MaterialIcons name="near-me" size={moderateScale(24)} color="#FFA500" />
          <Text style={styles.title}>Top Nearby</Text>
        </View>

        {/* Location Dropdown */}
        <View style={styles.dropdownContainer}>
          <View style={styles.locationSection}>
            <View style={styles.locationContent}>
              <Text style={styles.locationLabel}>Location</Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Text style={styles.locationText} numberOfLines={1}>
                  {selectedLocation}
                </Text>
                <MaterialIcons 
                  name={isDropdownOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
                  size={moderateScale(16)} 
                  color="#1E2A78" 
                />
              </TouchableOpacity>
            </View>
            <View style={styles.locationIconContainer}>
              <MaterialIcons name="gps-fixed" size={moderateScale(20)} color="#1E2A78" />
            </View>
          </View>

          {/* Dropdown Menu - Fixed positioning */}
          {isDropdownOpen && (
            <View style={styles.dropdownMenu}>
              {locations.map((location, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dropdownItem,
                    location === selectedLocation && styles.selectedItem,
                    index === locations.length - 1 && styles.lastDropdownItem
                  ]}
                  onPress={() => handleLocationSelect(location)}
                >
                  <MaterialIcons name="location-on" size={moderateScale(14)} color="#1E2A78" />
                  <Text style={[
                    styles.dropdownItemText,
                    location === selectedLocation && styles.selectedItemText
                  ]}>
                    {location}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* Hotel List */}
      <View style={styles.hotelListContainer}>
        {filteredHotels.map((hotel) => (
          <WideHotelCard
            key={hotel.id.toString()}
            hotel={hotel}
            onPress={handleHotelPress}
            onFavoritePress={handleFavoritePress}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(16),
    marginTop: verticalScale(8), 
    marginBottom: verticalScale(300),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(16),
    position: 'relative',
    zIndex: 1000,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: '#000',
    marginLeft: scale(8),
  },
  dropdownContainer: {
    position: 'relative',
    zIndex: 1001,
    minWidth: scale(160),
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationContent: {
    flex: 1,
    alignItems: 'flex-end',
  },
  locationLabel: {
    fontSize: moderateScale(12),
    color: '#999',
    marginBottom: verticalScale(2),
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    maxWidth: scale(120),
  },
  locationText: {
    fontSize: moderateScale(14),
    color: '#1E2A78',
    fontWeight: '600',
    marginRight: scale(4),
    textAlign: 'right',
  },
  locationIconContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: scale(6),
    padding: scale(8),
    marginLeft: scale(8),
    height: verticalScale(40),
    width: scale(36),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: '#FFF',
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 15,
    minWidth: scale(180),
    maxWidth: scale(220),
    zIndex: 1002,
    marginTop: verticalScale(4),
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F4',
  },
  lastDropdownItem: {
    borderBottomWidth: 0,
  },
  selectedItem: {
    backgroundColor: '#F0F4FF',
  },
  dropdownItemText: {
    fontSize: moderateScale(14),
    color: '#333',
    marginLeft: scale(8),
    flex: 1,
  },
  selectedItemText: {
    color: '#1E2A78',
    fontWeight: '600',
  },
  hotelListContainer: {
    marginTop: verticalScale(8),
  },
});

export default TopNearbySection;