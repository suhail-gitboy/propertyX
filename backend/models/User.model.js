import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        picture: {
            url: { type: String, default: "https://cdn-icons-png.flaticon.com/512/149/149071.png" },
            public_id: { type: String, default: null }
        },


        role: {
            type: String,
            default: "user"
        },
        phone: {
            type: String,
            default: ""
        },

        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        isVerified: {
            type: Boolean,
            default: false
        }

    },
    { timestamps: true }
);

export const Usermodel = mongoose.model("User", userSchema);
