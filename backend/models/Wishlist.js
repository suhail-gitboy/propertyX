import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
    {
        userEmail: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },

        property: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
            required: true
        }
    },
    { timestamps: true }
);

// ❌ prevent duplicate wishlist
wishlistSchema.index(
    { userEmail: 1, property: 1 },
    { unique: true }
);

export const Wishlist = mongoose.model("Wishlist", wishlistSchema);
