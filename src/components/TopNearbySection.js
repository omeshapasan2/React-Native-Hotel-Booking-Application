import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import hotels from '../data/hotels';
import WideHotelCard from './WideHotelCard';

const locations = [
  'Sleman, DIY',
  'Bantul, DIY', 
  'Kulon Progo, DIY',
  'Gunung Kidul, DIY',
  'Yogyakarta City, DIY'
];

const TopNearbySection = () => {
  const [selectedLocation, setSelectedLocation] = useState('Sleman, DIY');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filter hotels based on selected location
  const filteredHotels = hotels.filter(hotel => 
    hotel.location === selectedLocation
  );

  const handleFavoritePress = (hotelId) => {
    // Handle favorite toggle logic here
    console.log('Favorite pressed for hotel:', hotelId);
  };

  const handleHotelPress = (hotel) => {
    // Handle hotel selection logic here
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
          <MaterialIcons name="near-me" size={24} color="#FFA500" />
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
                <Text style={styles.locationText}>{selectedLocation}</Text>
                <MaterialIcons 
                  name={isDropdownOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
                  size={16} 
                  color="#1E2A78" 
                />
              </TouchableOpacity>
            </View>
            <View style={styles.locationIconContainer}>
              <MaterialIcons name="gps-fixed" size={20} color="#1E2A78" />
            </View>
          </View>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <View style={styles.dropdownMenu}>
              {locations.map((location, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dropdownItem,
                    location === selectedLocation && styles.selectedItem
                  ]}
                  onPress={() => handleLocationSelect(location)}
                >
                  <MaterialIcons name="location-on" size={14} color="#1E2A78" />
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
      <FlatList
        data={filteredHotels}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <WideHotelCard
            hotel={item}
            onPress={handleHotelPress}
            onFavoritePress={handleFavoritePress}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        scrollEnabled={false}
        nestedScrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    zIndex: 9998,
    position: 'relative',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 8,
  },
  dropdownContainer: {
    position: 'relative',
    zIndex: 9999,
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationContent: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
    alignSelf: 'flex-end',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  locationText: {
    fontSize: 14,
    color: '#1E2A78',
    fontWeight: '600',
    marginRight: 4,
  },
  locationIconContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 6,
    padding: 8,
    marginLeft: 8,
    height: 40,
    width: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    minWidth: 160,
    zIndex: 10000,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F4',
  },
  selectedItem: {
    backgroundColor: '#F0F4FF',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 6,
  },
  selectedItemText: {
    color: '#1E2A78',
    fontWeight: '600',
  },
  listContainer: {
    paddingBottom: 16,
  },
});

export default TopNearbySection;