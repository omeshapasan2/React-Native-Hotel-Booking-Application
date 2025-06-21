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
        isFavorite: true
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
        isFavorite: false
    },
    {
        id: 3,
        name: "Keraton Villa",
        category: ["Popular","Modern"],
        image: require("../assets/images/hotels/KeratonVilla.jpg"),
        rating: 4.8,
        price: 225,
        discountedPrice: 200,
        location: "Sleman, DIY",
        isFavorite: true
    }
];

export default hotels;