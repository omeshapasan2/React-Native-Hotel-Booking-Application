import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const BottomNavigation = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Home');

  const tabs = [
    {
      name: 'Home',
      icon: 'home',
      iconLibrary: 'Entypo',
      label: 'Home',
      screenName: 'Home',
    },
    {
      name: 'MyTrip',
      icon: 'ticket-confirmation',
      iconLibrary: 'MaterialCommunityIcons',
      label: 'My Trip',
      screenName: 'MyTrips',
    },
    {
      name: 'Favorite',
      icon: 'bookmark-added',
      iconLibrary: 'MaterialIcons',
      label: 'Favorite',
      screenName: 'Favorites',
    },
    {
      name: 'Profile',
      icon: 'account',
      iconLibrary: 'MaterialCommunityIcons',
      label: 'Profile',
      screenName: 'Profile',
    },
  ];

  const handleTabPress = (tab) => {
    setActiveTab(tab.name);
    // Navigate to the corresponding screen if it exists
    if (tab.screenName) {
      navigation.navigate(tab.screenName);
    } else {
      console.log(`${tab.name} screen not implemented yet`);
    }
  };

  const renderIcon = (tab) => {
    const isActive = activeTab === tab.name;
    const iconColor = isActive ? '#4c6ef5' : '#8e8e93';
    const iconSize = 24;

    switch (tab.iconLibrary) {
      case 'Entypo':
        return <Entypo name={tab.icon} size={iconSize} color={iconColor} />;
      case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons name={tab.icon} size={iconSize} color={iconColor} />;
      case 'MaterialIcons':
        return <MaterialIcons name={tab.icon} size={iconSize} color={iconColor} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabButton}
            onPress={() => handleTabPress(tab)}
            activeOpacity={0.7}
          >
            <View style={styles.tabContent}>
              <View style={styles.iconContainer}>
                {renderIcon(tab)}
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === tab.name && styles.activeTabLabel,
                ]}
              >
                {tab.label}
              </Text>
              {activeTab === tab.name && <View style={styles.activeIndicator} />}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'white',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e5ea',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabContent: {
    alignItems: 'center',
    position: 'relative',
  },
  iconContainer: {
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 12,
    color: '#8e8e93',
    fontWeight: '500',
  },
  activeTabLabel: {
    color: '#4c6ef5',
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -12,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#4c6ef5',
  },
});

export default BottomNavigation;