import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { io, getReceiverSocketId } from "../lib/socket.js";

// REVISIT: Get Users for Sidebar
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggInUserId },
    }).select("-password");

    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersForSidebar", error);
    res.status(500).json({ message: "Server error" });
  }
};

// REVISIT: Get Messages
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const reqUserId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: reqUserId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: reqUserId },
      ],
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages", error);
    res.status(500).json({ message: "Server error" });
  }
};

// REVISIT: Send Message
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadedImage = await cloudinary.uploader.upload(image);
      imageUrl = uploadedImage.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();

    // TODO: real-time messaging functionality goes here => socket.io
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage", error);
    res.status(500).json({ message: "Server error" });
  }
};
