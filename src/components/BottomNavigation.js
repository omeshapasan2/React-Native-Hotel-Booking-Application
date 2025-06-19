import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const tabs = [
    {
      name: 'Home',
      icon: '🏠',
      label: 'Home',
    },
    {
      name: 'MyTrip',
      icon: '🧳',
      label: 'My Trip',
    },
    {
      name: 'Favorite',
      icon: '❤️',
      label: 'Favorite',
    },
    {
      name: 'Profile',
      icon: '👤',
      label: 'Profile',
    },
  ];

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
    // Here you would typically handle navigation
    console.log(`Navigating to ${tabName}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabButton}
            onPress={() => handleTabPress(tab.name)}
            activeOpacity={0.7}
          >
            <View style={styles.tabContent}>
              <Text
                style={[
                  styles.tabIcon,
                  activeTab === tab.name && styles.activeTabIcon,
                ]}
              >
                {tab.icon}
              </Text>
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
  tabIcon: {
    fontSize: 22,
    marginBottom: 4,
    opacity: 0.6,
  },
  activeTabIcon: {
    opacity: 1,
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