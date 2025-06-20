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

const { width } = Dimensions.get('window');

const WideHotelCard = ({ hotel, onPress, onFavoritePress }) => {
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

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress && onPress(hotel)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={image || require('../assets/images/placeholder-hotel.jpg')}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.ratingContainer}>
          <Icon name="star" size={12} color="#FFA500" />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.hotelName} numberOfLines={1}>
          {name}
        </Text>
        <View style={styles.locationContainer}>
          <Icon name="location-on" size={12} color="#FFA500" />
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
            size={20}
            color={isFavorite ? "#FF6B9D" : "#FF6B9D"}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width - 32,
    height: 120,
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: 120,
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  ratingContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 2,
  },
  content: {
    flex: 1,
    padding: 12,
    position: 'relative',
    justifyContent: 'space-between',
  },
  hotelName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#333',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 2,
  },
  priceContainer: {
    marginTop: 'auto',
  },
  startFromText: {
    fontSize: 11,
    color: '#999',
    marginBottom: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  discountedPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginRight: 6,
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 4,
  },
  nightText: {
    fontSize: 10,
    color: '#999',
    marginLeft: 2,
  },
  favoriteButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 32,
    height: 32,
    backgroundColor: 'rgba(255, 107, 157, 0.1)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WideHotelCard;