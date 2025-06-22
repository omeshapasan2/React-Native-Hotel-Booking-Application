import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(new Set([1, 3]));

  // Load favorites from storage on app start
  useEffect(() => {
    loadFavorites();
  }, []);

  // Save favorites to AsyncStorage
  const saveFavorites = async (favorites) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify([...favorites]));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  // Load favorites from AsyncStorage
  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favorites');
      if (savedFavorites) {
        const favoritesArray = JSON.parse(savedFavorites);
        setFavoriteIds(new Set(favoritesArray));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  // Toggle favorite status
  const toggleFavorite = (hotelId) => {
    const newFavoriteIds = new Set(favoriteIds);
    
    if (newFavoriteIds.has(hotelId)) {
      newFavoriteIds.delete(hotelId);
    } else {
      newFavoriteIds.add(hotelId);
    }
    
    setFavoriteIds(newFavoriteIds);
    saveFavorites(newFavoriteIds);
  };

  // Check if hotel is favorite
  const isFavorite = (hotelId) => {
    return favoriteIds.has(hotelId);
  };

  // Get hotels with updated favorite status
  const getHotelsWithFavorites = (hotels) => {
    return hotels.map(hotel => ({
      ...hotel,
      isFavorite: favoriteIds.has(hotel.id)
    }));
  };

  // Get only favorite hotels
  const getFavoriteHotels = (hotels) => {
    return hotels.filter(hotel => favoriteIds.has(hotel.id)).map(hotel => ({
      ...hotel,
      isFavorite: true
    }));
  };

  const value = {
    favoriteIds,
    toggleFavorite,
    isFavorite,
    getHotelsWithFavorites,
    getFavoriteHotels
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};