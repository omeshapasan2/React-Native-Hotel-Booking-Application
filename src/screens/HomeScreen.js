import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import WideHotelCard from '../components/WideHotelCard';
import HotelCard from '../components/HotelCard';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <SearchBar/>
      
      <CategoryTabs />

      
      
      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 5,
  },
});

export default HomeScreen;