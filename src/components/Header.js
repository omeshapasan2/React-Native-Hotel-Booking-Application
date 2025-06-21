import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const Header = ({ navigation }) => {
  const handleNotificationPress = () => {
    navigation.navigate('Messages');
  };

  return (
    <View style={styles.headerWrapper}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#f8f9fa" 
        translucent={false}
      />
      <View style={styles.container}>
        {/* Left side - Profile section */}
        <View style={styles.leftSection}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            }}
            style={styles.profileImage}
          />
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>Hello there</Text>
            <Text style={styles.nameText}>Antony William</Text>
          </View>
        </View>

        {/* Right side - Notification icon */}
        <TouchableOpacity 
          style={styles.notificationContainer}
          onPress={handleNotificationPress}
        >
          <View style={styles.notificationIcon}>
            <Ionicons name="mail" size={24} color="#1E2A78" />
            {/* Notification badge */}
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>1</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: '#f8f9fa',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 15 : 15,
    backgroundColor: '#f8f9fa',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  greetingContainer: {
    justifyContent: 'center',
  },
  greetingText: {
    fontSize: 14,
    color: '#8e8e93',
    marginBottom: 2,
  },
  nameText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1c1c1e',
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#EC4899',
    borderRadius: 18,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#f8f9fa',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default Header;