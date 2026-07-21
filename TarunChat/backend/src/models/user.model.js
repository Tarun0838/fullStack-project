import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required :true,
            trim: true
        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
            trim: true
        },
        profilePhoto: {
            type: String,
            default: ""
        },
        gender: {
            type: String,
            enum: ["male", "female"],
            required: true
        }
    },
    {timestamps: true})

export const User = mongoose.model("User", userSchema);
