import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileContext = createContext();

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    name: 'Antony William',
    email: 'antony@example.com',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    phone: '+1 234 567 8900',
    bio: 'Software Developer passionate about mobile apps',
  });

  // Load profile data from AsyncStorage on app start
  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem('profileData');
      if (savedProfile) {
        setProfileData(JSON.parse(savedProfile));
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
    }
  };

  const updateProfile = async (newData) => {
    try {
      const updatedProfile = { ...profileData, ...newData };
      setProfileData(updatedProfile);
      await AsyncStorage.setItem('profileData', JSON.stringify(updatedProfile));
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
  };

  const updateProfileImage = async (imageUri) => {
    await updateProfile({ profileImage: imageUri });
  };

  return (
    <ProfileContext.Provider value={{
      profileData,
      updateProfile,
      updateProfileImage,
    }}>
      {children}
    </ProfileContext.Provider>
  );
};