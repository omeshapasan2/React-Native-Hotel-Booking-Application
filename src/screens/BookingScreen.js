import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

// Get device dimensions
const { width, height } = Dimensions.get('window');

// Responsive scaling functions
const scale = (size) => (width / 375) * size;
const verticalScale = (size) => (height / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const Icon = ({ name, size, color, style }) => (
  <Text style={[{ fontSize: size, color }, style]}>
    {name === 'arrow-back' ? '←' : 
     name === 'location-on' ? '📍' : 
     name === 'star' ? '⭐' : 
     name === 'event' ? '📅' : '•'}
  </Text>
);

const BookingScreen = ({ navigation }) => {
  const route = useRoute();
  const hotel = route?.params?.hotel || {
    name: 'Sample Hotel',
    location: 'Sample Location',
    rating: '4.5',
    price: 100,
    discountedPrice: 85
  };

  // State for booking details
  const [nights, setNights] = useState('1');

  const calculateTotalPrice = () => {
    const nightsCount = parseInt(nights) || 1;
    const pricePerNight = hotel.discountedPrice || hotel.price;
    return nightsCount * pricePerNight;
  };

  const handleNightsChange = (text) => {
    // Only allow positive numbers
    const numericValue = text.replace(/[^0-9]/g, '');
    if (numericValue === '' || parseInt(numericValue) > 0) {
      setNights(numericValue);
    }
  };

  const handleConfirmBooking = () => {
    // Validate nights input
    const nightsCount = parseInt(nights);
    if (!nightsCount || nightsCount <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid number of nights');
      return;
    }

    const bookingDetails = {
      id: Date.now().toString(),
      hotel: hotel,
      nights: nightsCount,
      totalPrice: calculateTotalPrice(),
      bookingDate: new Date(),
      status: 'Confirmed'
    };

    if (navigation && navigation.navigate) {
      navigation.navigate('MyTrips', { newBooking: bookingDetails });
    } else {
      Alert.alert('Booking Confirmed', `Your booking has been confirmed for ${hotel.name}`);
    }
  };

  const handleGoBack = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleGoBack}
          activeOpacity={0.7}
        >
          <Icon name="arrow-back" size={moderateScale(24)} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Your Stay</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Hotel Info */}
        <View style={styles.hotelInfoSection}>
          <Text style={styles.hotelName}>{hotel.name}</Text>
          <View style={styles.locationContainer}>
            <Icon name="location-on" size={moderateScale(16)} color="#FFA500" />
            <Text style={styles.locationText}>{hotel.location}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={moderateScale(16)} color="#FFA500" />
            <Text style={styles.ratingText}>{hotel.rating}</Text>
          </View>
        </View>

        {/* Nights Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Number of Nights</Text>
          <View style={styles.nightsInputContainer}>
            <TextInput
              style={styles.nightsInput}
              value={nights}
              onChangeText={handleNightsChange}
              keyboardType="numeric"
              placeholder="Enter nights"
            />
            <Text style={styles.nightsLabel}>nights</Text>
          </View>
        </View>

        {/* Price Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Summary</Text>
          <View style={styles.priceCard}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>
                ${hotel.discountedPrice || hotel.price} × {nights} nights
              </Text>
              <Text style={styles.priceValue}>${calculateTotalPrice()}</Text>
            </View>
            {hotel.discountedPrice && (
              <View style={styles.priceRow}>
                <Text style={styles.savingsLabel}>
                  You save: ${(hotel.price - hotel.discountedPrice) * parseInt(nights)}
                </Text>
              </View>
            )}
            <View style={styles.divider} />
            <View style={styles.priceRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${calculateTotalPrice()}</Text>
            </View>
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Confirm Booking Button */}
      <View style={styles.bookingContainer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmBooking}
          activeOpacity={0.8}
        >
          <Text style={styles.confirmButtonText}>
            Confirm Booking - ${calculateTotalPrice()}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
  backButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: '#333',
  },
  placeholder: {
    width: scale(40),
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: scale(16),
  },
  hotelInfoSection: {
    paddingVertical: verticalScale(20),
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  hotelName: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: '#333',
    marginBottom: verticalScale(8),
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  locationText: {
    fontSize: moderateScale(16),
    color: '#666',
    marginLeft: scale(4),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: moderateScale(16),
    color: '#333',
    marginLeft: scale(4),
    fontWeight: '600',
  },
  section: {
    paddingVertical: verticalScale(20),
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#333',
    marginBottom: verticalScale(16),
  },
  nightsInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: scale(12),
    padding: scale(16),
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  nightsInput: {
    flex: 1,
    fontSize: moderateScale(18),
    color: '#333',
    fontWeight: '600',
  },
  nightsLabel: {
    fontSize: moderateScale(16),
    color: '#666',
    marginLeft: scale(8),
  },
  priceCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: scale(12),
    padding: scale(16),
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  priceLabel: {
    fontSize: moderateScale(16),
    color: '#666',
  },
  priceValue: {
    fontSize: moderateScale(16),
    color: '#333',
    fontWeight: '600',
  },
  savingsLabel: {
    fontSize: moderateScale(14),
    color: '#FF6B9D',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: verticalScale(12),
  },
  totalLabel: {
    fontSize: moderateScale(18),
    color: '#333',
    fontWeight: '700',
  },
  totalValue: {
    fontSize: moderateScale(20),
    color: '#1E2A78',
    fontWeight: '800',
  },
  bottomSpacing: {
    height: verticalScale(100),
  },
  bookingContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(16),
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  confirmButton: {
    backgroundColor: '#1E2A78',
    paddingVertical: verticalScale(16),
    borderRadius: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1E2A78',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: moderateScale(18),
    fontWeight: '700',
  },
});

export default BookingScreen;