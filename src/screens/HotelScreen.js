import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFavorites } from '../context/FavoritesContext';
import hotels from '../data/hotels';
import { useRoute } from '@react-navigation/native';





const { width, height } = Dimensions.get('window');

// Responsive scaling functions
const scale = (size) => (width / 375) * size;
const verticalScale = (size) => (height / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const HotelScreen = ({ navigation }) => {

    const route = useRoute();
    const hotel = route?.params?.hotel;
  
    if (!hotel) {
        return (
            <View style={styles.container}>
                <Text>Hotel not found</Text>
            </View>
        );
    }

    const { isFavorite , toggleFavorite } = useFavorites();
    
    const isHotelFavorite  = isFavorite(hotel.id);

    const handleFavoritePress = () => {
        toggleFavorite(hotel.id);
    };

    const {
        id,
        name,
        image,
        rating,
        price,
        discountedPrice,
        location,
        description,
        category
    } = hotel;


    const handleBookNow = () => {
        // Add booking logic here
        console.log('Booking hotel:', name);
        // navigation.navigate('BookingScreen', { hotel });
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    const amenities = [
        { icon: 'wifi', name: 'Free WiFi' },
        { icon: 'pool', name: 'Swimming Pool' },
        { icon: 'restaurant', name: 'Restaurant' },
        { icon: 'local-parking', name: 'Free Parking' },
        { icon: 'fitness-center', name: 'Fitness Center' },
        { icon: 'room-service', name: 'Room Service' },
    ];

    return (
        <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            {/* Header Image */}
            <View style={styles.imageContainer}>
            <Image
                source={image || require('../assets/images/placeholder-hotel.jpg')}
                style={styles.headerImage}
                resizeMode="cover"
            />
            
            {/* Header Controls */}
            <View style={styles.headerControls}>
                <TouchableOpacity
                style={styles.backButton}
                onPress={handleGoBack}
                activeOpacity={0.7}
                >
                <Icon name="arrow-back" size={moderateScale(24)} color="#FFF" />
                </TouchableOpacity>
                
                <TouchableOpacity
                style={styles.favoriteHeaderButton}
                onPress={handleFavoritePress}
                activeOpacity={0.7}
                >
                <Icon
                    name={isHotelFavorite ? "favorite" : "favorite-border"}
                    size={moderateScale(24)}
                    color={isHotelFavorite ? "#FF6B9D" : "#FFF"}
                />
                </TouchableOpacity>
            </View>

            {/* Rating Badge */}
            <View style={styles.ratingBadge}>
                <Icon name="star" size={moderateScale(16)} color="#FFA500" />
                <Text style={styles.ratingBadgeText}>{rating}</Text>
            </View>
            </View>

            {/* Content */}
            <View style={styles.contentContainer}>
            {/* Hotel Name and Location */}
            <View style={styles.titleSection}>
                <Text style={styles.hotelName}>{name}</Text>
                <View style={styles.locationContainer}>
                <Icon name="location-on" size={moderateScale(16)} color="#FFA500" />
                <Text style={styles.locationText}>{location}</Text>
                </View>
            </View>

            {/* Categories */}
            <View style={styles.categoriesSection}>
                <Text style={styles.sectionTitle}>Categories</Text>
                <View style={styles.categoriesContainer}>
                {category.map((cat, index) => (
                    <View key={index} style={styles.categoryTag}>
                    <Text style={styles.categoryText}>{cat}</Text>
                    </View>
                ))}
                </View>
            </View>

            {/* Price Section */}
            <View style={styles.priceSection}>
                <Text style={styles.sectionTitle}>Price</Text>
                <View style={styles.priceContainer}>
                <Text style={styles.startFromText}>Starting from</Text>
                <View style={styles.priceRow}>
                    {discountedPrice ? (
                    <>
                        <Text style={styles.originalPrice}>${price}</Text>
                        <Text style={styles.discountedPrice}>${discountedPrice}</Text>
                    </>
                    ) : (
                    <Text style={styles.currentPrice}>${price}</Text>
                    )}
                    <Text style={styles.nightText}>/NIGHT</Text>
                </View>
                </View>
            </View>

            {/* Description */}
            <View style={styles.descriptionSection}>
                <Text style={styles.sectionTitle}>About This Hotel</Text>
                <Text style={styles.descriptionText}>{description}</Text>
            </View>

            {/* Amenities */}
            <View style={styles.amenitiesSection}>
                <Text style={styles.sectionTitle}>Amenities</Text>
                <View style={styles.amenitiesGrid}>
                {amenities.map((amenity, index) => (
                    <View key={index} style={styles.amenityItem}>
                    <Icon name={amenity.icon} size={moderateScale(24)} color="#1E2A78" />
                    <Text style={styles.amenityText}>{amenity.name}</Text>
                    </View>
                ))}
                </View>
            </View>

            {/* Reviews Section */}
            <View style={styles.reviewsSection}>
                <View style={styles.reviewsHeader}>
                <Text style={styles.sectionTitle}>Reviews</Text>
                <TouchableOpacity style={styles.seeAllReviews}>
                    <Text style={styles.seeAllText}>See All</Text>
                    <Icon name="chevron-right" size={moderateScale(16)} color="#9CA3AF" />
                </TouchableOpacity>
                </View>
                
                <View style={styles.reviewSummary}>
                <View style={styles.ratingOverview}>
                    <Text style={styles.overallRating}>{rating}</Text>
                    <View style={styles.starsContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Icon
                        key={star}
                        name="star"
                        size={moderateScale(16)}
                        color={star <= Math.floor(rating) ? "#FFA500" : "#E5E5E5"}
                        />
                    ))}
                    </View>
                    <Text style={styles.reviewsCount}>Based on 1,234 reviews</Text>
                </View>
                </View>
            </View>

            {/* Bottom spacing for button */}
            <View style={styles.bottomSpacing} />
            </View>
        </ScrollView>

        {/* Book Now Button - Fixed at bottom */}
        <View style={styles.bookingContainer}>
            <TouchableOpacity
            style={styles.bookNowButton}
            onPress={handleBookNow}
            activeOpacity={0.8}
            >
            <Text style={styles.bookNowText}>Book Now</Text>
            </TouchableOpacity>
        </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContainer: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: verticalScale(300),
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerControls: {
    position: 'absolute',
    top: StatusBar.currentHeight + verticalScale(10),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
  },
  backButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteHeaderButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: scale(16),
    right: scale(16),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: scale(20),
  },
  ratingBadgeText: {
    color: '#FFF',
    fontSize: moderateScale(14),
    fontWeight: '600',
    marginLeft: scale(4),
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(20),
  },
  titleSection: {
    marginBottom: verticalScale(20),
  },
  hotelName: {
    fontSize: moderateScale(28),
    fontWeight: '800',
    color: '#333',
    marginBottom: verticalScale(8),
    lineHeight: moderateScale(34),
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: moderateScale(16),
    color: '#666',
    marginLeft: scale(4),
  },
  categoriesSection: {
    marginBottom: verticalScale(24),
  },
  sectionTitle: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: '#333',
    marginBottom: verticalScale(12),
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryTag: {
    backgroundColor: '#1E2A78',
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: scale(20),
    marginRight: scale(8),
    marginBottom: verticalScale(8),
  },
  categoryText: {
    color: '#FFF',
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
  priceSection: {
    marginBottom: verticalScale(24),
  },
  priceContainer: {
    backgroundColor: '#F8F9FA',
    padding: scale(16),
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  startFromText: {
    fontSize: moderateScale(14),
    color: '#666',
    marginBottom: verticalScale(4),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currentPrice: {
    fontSize: moderateScale(32),
    fontWeight: '800',
    color: '#1E2A78',
  },
  originalPrice: {
    fontSize: moderateScale(20),
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: scale(8),
  },
  discountedPrice: {
    fontSize: moderateScale(32),
    fontWeight: '800',
    color: '#FF6B9D',
  },
  nightText: {
    fontSize: moderateScale(14),
    color: '#666',
    marginLeft: scale(4),
    alignSelf: 'flex-end',
    marginBottom: verticalScale(4),
  },
  descriptionSection: {
    marginBottom: verticalScale(24),
  },
  descriptionText: {
    fontSize: moderateScale(16),
    color: '#666',
    lineHeight: moderateScale(24),
  },
  amenitiesSection: {
    marginBottom: verticalScale(24),
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  amenityItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(12),
    padding: scale(12),
    backgroundColor: '#F8F9FA',
    borderRadius: scale(8),
  },
  amenityText: {
    fontSize: moderateScale(14),
    color: '#333',
    marginLeft: scale(8),
    flex: 1,
  },
  reviewsSection: {
    marginBottom: verticalScale(24),
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  seeAllReviews: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: moderateScale(14),
    color: '#9CA3AF',
    marginRight: scale(4),
  },
  reviewSummary: {
    backgroundColor: '#F8F9FA',
    padding: scale(16),
    borderRadius: scale(12),
  },
  ratingOverview: {
    alignItems: 'center',
  },
  overallRating: {
    fontSize: moderateScale(36),
    fontWeight: '800',
    color: '#1E2A78',
    marginBottom: verticalScale(8),
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: verticalScale(8),
  },
  reviewsCount: {
    fontSize: moderateScale(14),
    color: '#666',
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
  bookNowButton: {
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
  bookNowText: {
    color: '#FFF',
    fontSize: moderateScale(18),
    fontWeight: '700',
  },
});

export default HotelScreen;