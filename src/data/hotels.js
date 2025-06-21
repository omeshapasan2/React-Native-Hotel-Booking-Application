const hotels = [
    {
        id: 1,
        name: "The Phoenix Hotel",
        category: ["Popular", "Modern"],
        image: require("../assets/images/hotels/ThePhoenixHotel.jpg"),
        rating: 4.8,
        price: 125,
        discountedPrice: null,
        location: "Sleman, DIY",
        isFavorite: true,
	    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        id: 2,
        name: "Aston White Coral",
        category: ["Popular", "Beach"],
        image: require("../assets/images/hotels/AstonWhiteCoral.jpg"),
        rating: 4.8,
        price: 130,
        discountedPrice: null,
        location: "Sleman, DIY",
        isFavorite: false,
	    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        id: 3,
        name: "Keraton Villa",
        category: ["Popular", "Modern"],
        image: require("../assets/images/hotels/KeratonVilla.jpg"),
        rating: 4.8,
        price: 225,
        discountedPrice: 200,
        location: "Sleman, DIY",
        isFavorite: true,
	    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
 
    },
    {
        id: 4,
        name: "COMO Metropolitan",
        category: ["Luxury", "Modern"],
        image: require("../assets/images/hotels/COMO Metropolitan.webp"),
        rating: 4.3,
        price: 320,
        discountedPrice: 280,
        location: "Orchard Road, Singapore",
        isFavorite: false,
	    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
 
    },
    {
        id: 5,
        name: "Cinnamon Lakeside",
        category: ["Popular", "Lake View"],
        image: require("../assets/images/hotels/Cinnamon Lakeside.webp"),
        rating: 4.5,
        price: 180,
        discountedPrice: null,
        location: "Colombo, Sri Lanka",
        isFavorite: false,
	    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
 
    },
    {
        id: 6,
        name: "Earl's Regency Hotel",
        category: ["Popular", "Heritage"],
        image: require("../assets/images/hotels/Earl's Regency Hotel.webp"),
        rating: 4.2,
        price: 95,
        discountedPrice: 85,
        location: "Kandy, Sri Lanka",
        isFavorite: false,
	    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
 
    },
    {
        id: 7,
        name: "Galle Face Hotel",
        category: ["Heritage", "Beach"],
        image: require("../assets/images/hotels/Galle Face Hotel.webp"),
        rating: 4.0,
        price: 200,
        discountedPrice: null,
        location: "Colombo, Sri Lanka",
        isFavorite: false,
	    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
 
    },
    {
        id: 8,
        name: "Hotel Boss",
        category: ["Budget", "Modern"],
        image: require("../assets/images/hotels/HotelBoss.webp"),
        rating: 4.1,
        price: 85,
        discountedPrice: null,
        location: "Lavender, Singapore",
        isFavorite: false,
	    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
 
    },
    {
        id: 9,
        name: "Hotel Margherita",
        category: ["Boutique", "Heritage"],
        image: require("../assets/images/hotels/HotelMargherita.png"),
        rating: 4.3,
        price: 150,
        discountedPrice: 135,
        location: "Goa, India",
        isFavorite: false,
	    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
 
    },
    {
        id: 10,
        name: "ITC Ratnadipa",
        category: ["Luxury", "Heritage"],
        image: require("../assets/images/hotels/ITC Rathnadipa.webp"),
        rating: 4.6,
        price: 220,
        discountedPrice: null,
        location: "Colombo, Sri Lanka",
        isFavorite: false,
	    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
 
    },
    {
        id: 11,
        name: "JEN Singapore Tanglin by Shangri-La",
        category: ["Popular", "Modern"],
        image: require("../assets/images/hotels/JEN Singapore Tanglin by Shangri-La.webp"),
        rating: 4.4,
        price: 190,
        discountedPrice: 170,
        location: "Tanglin, Singapore",
        isFavorite: false,
	    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
 
    },
    {
        id: 12,
        name: "Jetwing Colombo Seven",
        category: ["Modern", "Business"],
        image: require("../assets/images/hotels/Jetwing Colombo Seven.webp"),
        rating: 4.5,
        price: 160,
        discountedPrice: null,
        location: "Colombo, Sri Lanka",
        isFavorite: false,
	    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
 
    },
    {
        id: 13,
        name: "Mandarina Colombo",
        category: ["Boutique", "Modern"],
        image: require("../assets/images/hotels/Mandarina Colombo.webp"),
        rating: 4.2,
        price: 140,
        discountedPrice: 125,
        location: "Colombo, Sri Lanka",
        isFavorite: false,
	    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
 
    },
    {
        id: 14,
        name: "NH Bentota Ceysands Resort",
        category: ["Beach", "Resort"],
        image: require("../assets/images/hotels/NH Bentota Ceysands Resort.webp"),
        rating: 4.3,
        price: 175,
        discountedPrice: null,
        location: "Bentota, Sri Lanka",
        isFavorite: false,
	    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
 
    },
    {
        id: 15,
        name: "Paradox Singapore Merchant Court at Clarke Quay",
        category: ["Popular", "Riverside"],
        image: require("../assets/images/hotels/Paradox Singapore Merchant Court at Clarke Quay.webp"),
        rating: 4.2,
        price: 165,
        discountedPrice: 145,
        location: "Clarke Quay, Singapore",
        isFavorite: false,
	    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
 
    },
    {
        id: 16,
        name: "The Barracks Hotel Sentosa",
        category: ["Luxury", "Beach"],
        image: require("../assets/images/hotels/TheBarracksHotelSentosa.webp"),
        rating: 4.7,
        price: 280,
        discountedPrice: null,
        location: "Sentosa Island, Singapore",
        isFavorite: false,
	    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
 
    },
    {
        id: 17,
        name: "Marino Beach Colombo",
        category: ["Beach", "Modern"],
        image: require("../assets/images/hotels/Marino Beach Colombo.webp"),
        rating: 4.1,
        price: 120,
        discountedPrice: 105,
        location: "Colombo, Sri Lanka",
        isFavorite: false,
	    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
 
    },
    {
        id: 18,
        name: "Sea Forest",
        category: ["Popular", "Beach"],
        image: require("../assets/images/hotels/Sea Forest.jpg"),
        rating: 4.8,
        price: 100,
        discountedPrice: 80,
        location: "Unawatuna, Sri Lanka",
        isFavorite: false,
	    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
 
    }
];

export default hotels;