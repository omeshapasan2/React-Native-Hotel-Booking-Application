import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FavoritesProvider } from './src/context/FavoritesContext';
import BottomNavigation from './src/components/BottomNavigation';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';

import HomeScreen from './src/screens/HomeScreen'; 
import HotelScreen from './src/screens/HotelScreen';
import FavoriteScreen from './src/screens/FavoriteScreen';
import MessagesScreen from './src/screens/MessagesScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <FavoritesProvider>
      <View style={styles.container}>
        <NavigationContainer>
          <View style={styles.navigatorContainer}>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Hotel" component={HotelScreen} />
              <Stack.Screen name="Favorites" component={FavoriteScreen} />
              <Stack.Screen name="Messages" component={MessagesScreen} />
            </Stack.Navigator>
          </View>
          <BottomNavigation />
        </NavigationContainer>
      </View>
    </FavoritesProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigatorContainer: {
    flex: 1,
  },
});

export default App;