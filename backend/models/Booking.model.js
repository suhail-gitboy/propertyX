import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        propertyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
            required: true,
            index: true
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        hostId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        name: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: true
        },

        checkIn: {
            type: Date,
            required: true
        },

        checkOut: {
            type: Date,
            required: true
        },

        rooms: {
            type: Number,
            required: true,
            min: 1
        },

        paymentMode: {
            type: String,

            required: true
        },

        totalPrice: {
            type: Number,
            required: true
        },

        bookingStatus: {
            type: String,

            default: "pending"
        }
    },
    { timestamps: true }
);

export const Booking = mongoose.model("Booking", bookingSchema);
