import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />
      
      {/* Main content area - you'll add your other components here */}
      <View style={styles.content}>
        <Text style={styles.placeholderText}>
          Main content will go here
        </Text>
        <Text style={styles.placeholderText}>
          (SearchBar, CategoryTabs, HotelCards, etc.)
        </Text>
      </View>
      
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