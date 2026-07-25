import mongoose, { Types } from "mongoose";

const reelSchema = new mongoose.Schema({
    
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    media : {
        type: String,
        required: true
    },
    caption : {
        type: String
    },
    likes : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    comment : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]

},{timestamps: true});

export const Reel = mongoose.model("Reel", reelSchema);