import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import hotels from '../data/hotels'
import HotelCard from './HotelCard';

const categories = ['Popular', 'Modern', 'Beach', 'Mountain'];

const HotelList = () => {
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
    <View style={{ flex: 1, padding: 16 }}>
      {/* Category Tab Bar */}
      <View style={styles.tabContainer}>
        {categories.map(renderCategoryTab)}
      </View>

      {/* Hotel Cards List */}
      <FlatList
        data={filteredHotels}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <HotelCard hotel={item} />}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#EEE',
    borderRadius: 20,
    marginRight: 8,
  },
  activeTabButton: {
    backgroundColor: '#1E2A78',
  },
  tabText: {
    color: '#000',
  },
  activeTabText: {
    color: '#FFF',
  },
});

export default HotelList;