import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

// scaling functions
const scale = (size) => (width / 375) * size;
const verticalScale = (size) => (height / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const WideHotelCard = ({ hotel, onPress, onFavoritePress, navigation }) => {
  const {
    id,
    name,
    image,
    rating,
    price,
    discountedPrice,
    location,
    isFavorite
  } = hotel;

  const handleFavoritePress = () => {
    if (onFavoritePress) {
      onFavoritePress(id);
    }
  };

  // press handler to navigate to HotelScreen
  const handleCardPress = () => {
    navigation.navigate('Hotel', { hotel });
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handleCardPress} // Updated to use new handler
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={image || require('../assets/images/placeholder-hotel.jpg')}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.ratingContainer}>
          <Icon name="star" size={moderateScale(12)} color="#FFA500" />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.hotelName} numberOfLines={1}>
          {name}
        </Text>
        <View style={styles.locationContainer}>
          <Icon name="location-on" size={moderateScale(12)} color="#FFA500" />
          <Text style={styles.locationText}>{location}</Text>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.startFromText}>Start from</Text>
          <View style={styles.priceRow}>
            {discountedPrice ? (
              <>
                <Text style={styles.discountedPrice}>${discountedPrice}</Text>
                <Text style={styles.originalPrice}>${price}</Text>
              </>
            ) : (
              <Text style={styles.price}>${price}</Text>
            )}
            <Text style={styles.nightText}>/NIGHT</Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleFavoritePress}
          activeOpacity={0.7}
        >
          <Icon
            name={isFavorite ? "favorite" : "favorite-border"}
            size={moderateScale(20)}
            color={isFavorite ? "#FF6B9D" : "#FF6B9D"}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  card: {
    width: width - scale(32),
    height: verticalScale(120),
    backgroundColor: '#FFF',
    borderRadius: scale(12),
    marginBottom: verticalScale(12),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: scale(120),
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  ratingContainer: {
    position: 'absolute',
    top: scale(8),
    left: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(2),
    borderRadius: scale(4),
  },
  ratingText: {
    color: '#FFF',
    fontSize: moderateScale(11),
    fontWeight: '600',
    marginLeft: scale(2),
  },
  content: {
    flex: 1,
    padding: scale(12),
    position: 'relative',
    justifyContent: 'space-between',
  },
  hotelName: {
    fontSize: moderateScale(16),
    fontWeight: '800',
    color: '#333',
    marginBottom: verticalScale(4),
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  locationText: {
    fontSize: moderateScale(12),
    color: '#666',
    marginLeft: scale(2),
  },
  priceContainer: {
    marginTop: 'auto',
  },
  startFromText: {
    fontSize: moderateScale(11),
    color: '#999',
    marginBottom: verticalScale(2),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#333',
  },
  discountedPrice: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#333',
    marginRight: scale(6),
  },
  originalPrice: {
    fontSize: moderateScale(14),
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: scale(4),
  },
  nightText: {
    fontSize: moderateScale(10),
    color: '#999',
    marginLeft: scale(2),
  },
  favoriteButton: {
    position: 'absolute',
    bottom: scale(12),
    right: scale(12),
    width: scale(32),
    height: scale(32),
    backgroundColor: 'rgba(255, 107, 157, 0.1)',
    borderRadius: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WideHotelCard;