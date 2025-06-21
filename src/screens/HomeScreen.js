HomeScreen.js

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import TopNearbySection from '../components/TopNearbySection';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <SearchBar/>
      
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 80 }]} // ensure bottom nav doesn't block
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <CategoryTabs />
        <View style={{ height: 0 }} />
        <TopNearbySection/>
      </ScrollView>
      
      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
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