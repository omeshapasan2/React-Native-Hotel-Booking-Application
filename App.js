import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import FavoriteScreen from './src/screens/FavoriteScreen';
import { FavoritesProvider } from './src/context/FavoritesContext';
import MessagesScreen from './src/screens/MessagesScreen';

export default function App() {
  return (
    <FavoritesProvider>
      <View style={styles.container}>
        <HomeScreen />
        {/* <FavoriteScreen/> */}
        {/* <MessagesScreen/> */}
        <StatusBar style="auto" />
      </View>
    </FavoritesProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});