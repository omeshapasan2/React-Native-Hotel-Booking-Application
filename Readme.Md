# 🏨 BookStay - Hotel Booking Mobile Application

A modern and elegant React Native hotel booking application built with Expo, featuring a sleek UI, smooth animations, and comprehensive booking functionality.

![BookStay App](https://github.com/omeshapasan2/React-Native-Hotel-Booking-Application/blob/master/assets/icon.png?raw=true)

## 📱 Download Demo APK

**[Download BookStay APK](https://bookstay.omeshapasan.site)** - Try the app on your Android device!

## ✨ Features

### 🔍 **Smart Search & Filtering**
- Real-time hotel search with instant results
- Advanced filtering by price, location, category, and rating
- Category-based browsing (Popular, Modern, Beach, Mountain, Luxury, Budget)
- Smart search suggestions and autocomplete

### ❤️ **Favorites Management**
- Add/remove hotels from favorites with heart animation
- Persistent favorites storage across app sessions
- Quick access to saved hotels

### 🏨 **Hotel Discovery**
- Browse top nearby hotels with location-based recommendations
- Detailed hotel information with high-quality images
- Comprehensive amenities listing
- User reviews and ratings display

### 📱 **Intuitive Navigation**
- Bottom tab navigation for easy access
- Smooth screen transitions and animations
- Responsive design for all screen sizes
- Modern Material Design UI components

### 🎯 **Booking System**
- Seamless hotel booking flow
- Trip management and booking history
- User profile management
- Integrated messaging system

### 🎨 **Modern UI/UX**
- Clean and modern interface design
- Smooth animations and micro-interactions
- Consistent color scheme and typography
- Optimized for both iOS and Android

## 🚀 Getting Started

### Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Expo CLI** (`npm install -g expo-cli`)
- **Expo Go** app on your mobile device (for testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/omeshapasan2/React-Native-Hotel-Booking-Application.git
   cd React-Native-Hotel-Booking-Application
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run the app**
   - **Mobile Device**: Scan the QR code with Expo Go app
   - **Web Browser**: Press `w` in terminal to open web version
   - **iOS Simulator**: Press `i` in terminal (requires Xcode)
   - **Android Emulator**: Press `a` in terminal (requires Android Studio)

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── BottomNavigation.js
│   ├── Header.js
│   ├── SearchBar.js
│   ├── HotelCard.js
│   ├── CategoryTabs.js
│   ├── FilterModal.js
│   ├── SearchResults.js
│   ├── TopNearbySection.js
│   └── WideHotelCard.js
├── screens/             # Application screens
│   ├── HomeScreen.js
│   ├── HotelScreen.js
│   ├── FavoriteScreen.js
│   ├── BookingScreen.js
│   ├── MyTripsScreen.js
│   ├── ProfileScreen.js
│   ├── MessagesScreen.js
│   └── SeeAllScreen.js
├── context/             # Context providers and Hooks
│   ├── FavoritesContext.js
│   ├── ProfileContext.js
│   └── useSearchHook.js
├── data/               # Static data and mock APIs
│   ├── hotels.js
│   └── messages.js
└── assets/             # Hotel Images
    └── images/hotels
```

## 🛠️ Built With

- **React Native** - Mobile app framework
- **Expo** - React Native development platform
- **React Navigation** - Navigation library
- **React Context API** - State management
- **React Native Vector Icons** - Icon library
- **JavaScript ES6+** - Programming language

## 🎨 Design Features

- **Modern Material Design** - Following Google's Material Design principles
- **Responsive Layout** - Adapts to different screen sizes and orientations
- **Smooth Animations** - Enhanced user experience with fluid transitions
- **Consistent Typography** - Professional font hierarchy and spacing
- **Color Psychology** - Carefully chosen colors for trust and elegance

## 📋 Key Screens

1. **Home Screen** - Search, categories, and top hotels
2. **Hotel Details** - Comprehensive hotel information and booking
3. **Favorites** - Saved hotels with easy management
4. **Search Results** - Advanced filtering and sorting options
5. **Booking Flow** - Seamless reservation process
6. **Profile Management** - User account and preferences
7. **Trip History** - Past and upcoming bookings


### Customization

- **Messages Data**: Add/Modify messages in `src/data/messages.js`
- **Hotel Data**: Modify hotel information in `src/data/hotels.js`
- **App Configuration**: Update app settings in `app.json`


## 🚢 Deployment

### Building for Production

1. **Android APK**
   ```bash
   eas build -p android --profile preview
   ```
   or
   ```bash
   eas build --platform android
   ```

2. **iOS IPA**
   ```bash
   eas build --platform ios
   ```

3. **Alternatively, you can use --platform all option to build for Android and iOS at the same time**
   ```bash
   eas build --platform all
   ```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Omesha Pasan**
- 📧 Email: [omeshapasan@gmail.com](mailto:omeshapasan@gmail.com)
- 💼 LinkedIn: [Omesha Pasan](https://www.linkedin.com/in/omesha-pasan-1503a5292)
- 🐙 GitHub: [@omeshapasan2](https://github.com/omeshapasan2)
- 🌐 Portfolio: [portfolio.omeshapasan.site](https://portfolio.omeshapasan.site)
- 📱 Phone: +94787386042

## 🙏 Acknowledgments

- Thanks to the React Native and Expo communities
- Material Design for UI/UX inspiration

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/omeshapasan2/React-Native-Hotel-Booking-Application/issues) page
2. Contact me directly: [omeshapasan@gmail.com](mailto:omeshapasan@gmail.com)
3. Visit my portfolio: [portfolio.omeshapasan.site](https://portfolio.omeshapasan.site)

---