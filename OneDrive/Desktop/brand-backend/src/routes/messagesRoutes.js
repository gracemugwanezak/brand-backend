import { Router } from "express"; // Import Router from express

const messageRouter = Router(); // Define messageRouter before using it

import {
  getMessages,
  getMessageById,
  createMessage,
  deleteMessage,
} from "../controllers/messageController.js";

// Define routes using messageRouter
messageRouter.get("/all-messages", getMessages);
messageRouter.get("/single-message/:id", getMessageById);
messageRouter.post("/add-message", createMessage);
messageRouter.get("/delete-message/:id", deleteMessage);

export default messageRouter;
