import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import TopNearbySection from '../components/TopNearbySection';
import { useNavigation } from '@react-navigation/native';


function HomeScreen() {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <Header navigation={navigation}/>
      <SearchBar/>
      
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <CategoryTabs navigation={navigation}/>
        <TopNearbySection navigation={navigation}/>
      </ScrollView>
      

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
    flexGrow: 1,
    paddingBottom: 100, // Space for bottom navigation
  },
});

export default HomeScreen;