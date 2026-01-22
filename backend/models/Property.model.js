import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({



    title: {
        type: String,
        required: true
    },

    description: String,

    propertyType: String,
    listingType: String,

    price: Number,
    squareFeet: Number,

    roomsAvailable: {
        type: Number,
        default: 1
    },

    // 👤 Seller / Host Details
    seller: {
        sellerId: String,
        name: String,
        email: String,
        phone: String,
        picture: {
            url: String,
            public_id: String
        }
    },

    // 📍 Location
    location: {
        address: String,
        city: String,
        pincode: String,
        lat: Number,
        lng: Number
    },

    // 🖼 Images
    images: {
        type: [
            {
                url: { type: String, required: true },
                public_id: { type: String, required: true }
            }
        ],
        default: []
    },

    likes: [{
        userId: String,
        name: String,
        email: String,
        likedAt: {
            type: Date,
            default: Date.now
        }
    }],

    // 💬 Comments
    comments: [{

        userId: String,
        name: String,
        text: String,
        rating: Number,
        picture: {
            url: { type: String, default: "https://cdn-icons-png.flaticon.com/512/149/149071.png" },
            public_id: { type: String, default: null }

        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],

    // 📅 Bookings
    bookings: [{
        propertyId: String,
        userId: String,
        hostId: String,
        name: String,
        phone: String,
        checkIn: Date,
        payment: String,
        room: Number,
        checkOut: Date,
        totalPrice: Number,
        bookingStatus: {
            type: String,
            default: "booked"
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],

    isAvailable: {
        type: Boolean,
        default: true
    },
    embedding: {
        type: [Number],
        index: false
    },


    isActive: {
        type: String,
        default: "pending"
    }

}, { timestamps: true });

export const Propertymodel = mongoose.model("Property", propertySchema);