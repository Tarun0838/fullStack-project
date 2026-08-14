import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        profileImage: {
            type: String,
            default: ""
        },
        bio: {
            type: String,
        },
        profession: {
            type: String,
        },
        gender: {
            type: String,
            enum: ["male", "female"]
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
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post"
            }
        ],
        reels: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Reel"
            }
        ],
        story: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Story"
        },
        saved: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post"
            }
        ],

        resetOtp: {
            type: String
        },
        otpExpires: {
            type: Date
        },
        isOtpVerified: {
            type: Boolean,
            default: false
        }

    },
    { timestamps: true });

export const User = mongoose.model("User", userSchema)