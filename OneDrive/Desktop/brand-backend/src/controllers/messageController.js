// messageController.js
import Message from "../models/messageModel.js";

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({});
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findById(id);
    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body; // Changed message: text to message
    const newMessage = await Message.create({ name, email, message }); // Changed text to message
    res
      .status(201)
      .json({ message: "Message created successfully", newMessage }); // Changed message to newMessage
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findByIdAndDelete(id);
    if (!message) {
      return res
        .status(404)
        .json({ message: `Cannot find message with ID ${id}` });
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
