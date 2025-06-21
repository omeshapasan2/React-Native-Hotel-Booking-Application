import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Get device dimensions
const { width, height } = Dimensions.get('window');

// Responsive scaling functions
const scale = (size) => (width / 375) * size;
const verticalScale = (size) => (height / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const MyTripsScreen = ({ navigation }) => {
  const route = useRoute();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load bookings from AsyncStorage
  const loadBookings = async () => {
    try {
      const storedBookings = await AsyncStorage.getItem('userBookings');
      if (storedBookings) {
        setBookings(JSON.parse(storedBookings));
      }
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  // Save bookings to AsyncStorage
  const saveBookings = async (newBookings) => {
    try {
      await AsyncStorage.setItem('userBookings', JSON.stringify(newBookings));
    } catch (error) {
      console.error('Error saving bookings:', error);
    }
  };

  // Handle new booking from navigation params
  useEffect(() => {
    if (route.params?.newBooking) {
      const newBooking = route.params.newBooking;
      const updatedBookings = [newBooking, ...bookings];
      setBookings(updatedBookings);
      saveBookings(updatedBookings);
      
      // Clear the navigation params to prevent duplicate additions
      navigation.setParams({ newBooking: undefined });
      
      // Show success message
      Alert.alert(
        'Booking Confirmed!',
        `Your booking at ${newBooking.hotel.name} has been confirmed.`,
        [{ text: 'OK' }]
      );
    }
  }, [route.params?.newBooking]);

  // Load bookings when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadBookings();
    }, [])
  );

  const formatDate = (date) => {
    const bookingDate = new Date(date);
    return bookingDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateRange = (checkIn, checkOut) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    const checkInStr = checkInDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
    
    const checkOutStr = checkOutDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    
    return `${checkInStr} - ${checkOutStr}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return '#4CAF50';
      case 'Cancelled':
        return '#F44336';
      case 'Completed':
        return '#2196F3';
      default:
        return '#FFA500';
    }
  };

  const handleCancelBooking = (bookingId) => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => {
            const updatedBookings = bookings.map(booking =>
              booking.id === bookingId
                ? { ...booking, status: 'Cancelled' }
                : booking
            );
            setBookings(updatedBookings);
            saveBookings(updatedBookings);
          }
        }
      ]
    );
  };

  const renderBookingCard = (booking) => (
    <View key={booking.id} style={styles.bookingCard}>
      {/* Hotel Image and Basic Info */}
      <View style={styles.cardHeader}>
        <Image
          source={booking.hotel.image || require('../assets/images/placeholder-hotel.jpg')}
          style={styles.hotelImage}
          resizeMode="cover"
        />
        <View style={styles.hotelInfo}>
          <Text style={styles.hotelName}>{booking.hotel.name}</Text>
          <View style={styles.locationContainer}>
            <Icon name="location-on" size={moderateScale(14)} color="#666" />
            <Text style={styles.locationText}>{booking.hotel.location}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={moderateScale(14)} color="#FFA500" />
            <Text style={styles.ratingText}>{booking.hotel.rating}</Text>
          </View>
        </View>
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
            <Text style={styles.statusText}>{booking.status}</Text>
          </View>
        </View>
      </View>

      {/* Booking Details */}
      <View style={styles.bookingDetails}>
        <View style={styles.detailRow}>
          <Icon name="date-range" size={moderateScale(16)} color="#666" />
          <Text style={styles.detailText}>
            {formatDateRange(booking.checkInDate, booking.checkOutDate)}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Icon name="hotel" size={moderateScale(16)} color="#666" />
          <Text style={styles.detailText}>
            {booking.nights} {booking.nights === 1 ? 'night' : 'nights'}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Icon name="receipt" size={moderateScale(16)} color="#666" />
          <Text style={styles.detailText}>
            Booked on {formatDate(booking.bookingDate)}
          </Text>
        </View>
      </View>

      {/* Price and Actions */}
      <View style={styles.cardFooter}>
        <View style={styles.priceContainer}>
          <Text style={styles.totalLabel}>Total Paid</Text>
          <Text style={styles.totalPrice}>${booking.totalPrice}</Text>
        </View>
        
        {booking.status === 'Confirmed' && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => handleCancelBooking(booking.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading your trips...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Trips</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="filter-list" size={moderateScale(24)} color="#333" />
        </TouchableOpacity>
      </View>

      {bookings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="luggage" size={moderateScale(80)} color="#E5E5E5" />
          <Text style={styles.emptyTitle}>No trips yet</Text>
          <Text style={styles.emptySubtitle}>
            Start exploring and book your first amazing stay!
          </Text>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.8}
          >
            <Text style={styles.exploreButtonText}>Explore Hotels</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView 
          style={styles.scrollContainer} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.sectionTitle}>
            {bookings.length} {bookings.length === 1 ? 'Booking' : 'Bookings'}
          </Text>
          
          {bookings.map(renderBookingCard)}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: moderateScale(16),
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: '#333',
  },
  headerButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(32),
  },
  emptyTitle: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: '#333',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(8),
  },
  emptySubtitle: {
    fontSize: moderateScale(16),
    color: '#666',
    textAlign: 'center',
    lineHeight: moderateScale(24),
    marginBottom: verticalScale(32),
  },
  exploreButton: {
    backgroundColor: '#1E2A78',
    paddingHorizontal: scale(32),
    paddingVertical: verticalScale(12),
    borderRadius: scale(25),
  },
  exploreButtonText: {
    color: '#FFF',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(20),
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: '#333',
    marginVertical: verticalScale(16),
  },
  bookingCard: {
    backgroundColor: '#FFF',
    borderRadius: scale(12),
    marginBottom: verticalScale(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  cardHeader: {
    flexDirection: 'row',
    padding: scale(16),
  },
  hotelImage: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(8),
  },
  hotelInfo: {
    flex: 1,
    marginLeft: scale(12),
    justifyContent: 'space-between',
  },
  hotelName: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#333',
    marginBottom: verticalScale(4),
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(4),
  },
  locationText: {
    fontSize: moderateScale(14),
    color: '#666',
    marginLeft: scale(4),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: moderateScale(14),
    color: '#333',
    marginLeft: scale(4),
    fontWeight: '600',
  },
  statusContainer: {
    justifyContent: 'flex-start',
  },
  statusBadge: {
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(4),
    borderRadius: scale(12),
  },
  statusText: {
    color: '#FFF',
    fontSize: moderateScale(12),
    fontWeight: '600',
  },
  bookingDetails: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(16),
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  detailText: {
    fontSize: moderateScale(14),
    color: '#666',
    marginLeft: scale(8),
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(16),
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: verticalScale(16),
  },
  priceContainer: {
    flex: 1,
  },
  totalLabel: {
    fontSize: moderateScale(12),
    color: '#666',
    marginBottom: verticalScale(2),
  },
  totalPrice: {
    fontSize: moderateScale(20),
    fontWeight: '800',
    color: '#1E2A78',
  },
  cancelButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#F44336',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    borderRadius: scale(8),
  },
  cancelButtonText: {
    color: '#F44336',
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
});

export default MyTripsScreen;