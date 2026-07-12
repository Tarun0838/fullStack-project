import cloudinary from "../lib/cloudinary.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";


// implementing the message controller
export const getAllContacts = async (req, res) => {
    // here  yah mereko loggedInUser ke alava sab user ka data chaiye

    // get the id of loggedInUser
    try {
        const loggedInUserId = req.user._id;

        // user ko filter karenge

        const filteredUser = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")

        // sending the response
        res.status(201).json(filteredUser);
    } catch (error) {
        console.log(`error in getAllContacts ${error}`)
        res.status(500).json({ message: "Internal Server error " })
    }
}

export const getMessageByUserId = async (req, res) => {
    // get the receiver id 
    const myId = req.user._id;
    // get the senderId or usertochatid
    const { id: chatToUserId } = req.params

    try {
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: chatToUserId },
                { senderId: chatToUserId, receiverId: myId }
            ]
        })

        // message aane ke baad sending the response
        res.status(200).json(messages);
    } catch (error) {
        console.log(`error occur in getMessageByUserId controller ${error}`)
        res.status(500).json({ message: "Something went wrong in Gettting Messages " });
    }



}
export const sendMessage = async (req, res) => {
    // if i want to send message to any user 
    /**
     * for sending the message 
     * step 1: senderId honi chaiye (req.params)
     * step 2: receiverId honi cahiye (req.user._id)
     * step 3: jo bhi message send karna hai (text , image ) req.body se get karo
     * step 4: agar image send ki toh cloudinary par upload karo
     * step 6 : text hai to normaly db mai save kar lenge
     * 
     */

    // getting sender id 
    const senderId = req.user._id;
    // getting receiver id
    const { id: receiverId } = req.params;

    // getting (text , image ) message 
    const { text, image } = req.body;

    try {
        let imageUrl;
        if (image) {
            // first upload to cloudinary 
            const uploadResponse = await cloudinary.uploader.upload(image)
            console.log(`Message image is upload to Cloudinary : ${uploadResponse.secure_url}`)
            imageUrl = uploadResponse.secure_url;

        }

        // saving to db
        const message = new Message({
            senderId: senderId,
            receiverId: receiverId,
            text: text,
            image: imageUrl
        })

        await message.save();

        // TODO: send message in real time using soket.io


        res.status(200).json(message)

    } catch (error) {
        console.log(`error occur in sending message ${error}`)
        res.status(500).json({ message: "server error in sending message " })
    }
}

export const getChatUser = async (req, res) => {
    /**
     * yah basically vo sare user chaiye jinse maine chat ki hai ya jinhone mujhse chat ki hai vo sare message lenge
     * 
     * then in sare msg mai ke senderID ya receiverId ek array mai store kr lenge 
     * 
     * then un id ke basis par user find kar lenge
     * 
     */

    // loggedInUserId lunga \\ apni id lunga
    const loggedInUserId = req.user._id;

    // jo jo msg mujhse related hai vo sare msg get karunga
    try {

        const allMessages = await Message.find({
            $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }]
        })

        // ab in sare msg mai se sender and receiver id leni hai

        const chatUserIds = [
            ... new Set(
                allMessages.map((msg) => msg.senderId.toString() === loggedInUserId.toString() ? msg.receiverId.toString() : msg.senderId.toString())
            )
        ]

        // ab user find karunga un ids ke basis par 

        const chatUser = await User.find({
            _id: { $in: chatUserIds }
        }).select("-password")

        res.status(200).json(chatUser)
    } catch (error) {
        console.log(`error occurs in chatUser controller ${error}`)
        res.status(500).json({message: "server error in chat user "})
    }
}