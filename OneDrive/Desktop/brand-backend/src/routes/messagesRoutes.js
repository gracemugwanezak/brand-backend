import { Router } from "express"; // Import Router from express
import {
  checkAdmin,
  protectionMiddleware,
} from "../controllers/authController.js";

const messageRouter = Router(); // Define messageRouter before using it

import {
  getMessages,
  getMessageById,
  createMessage,
  deleteMessage,
} from "../controllers/messageController.js";

// Define routes using messageRouter
messageRouter.get(
  "/all-messages",
  protectionMiddleware,
  checkAdmin,
  getMessages
);
messageRouter.get(
  "/single-message/:id",
  protectionMiddleware,
  checkAdmin,
  getMessageById
);
messageRouter.post("/add-message", createMessage);
messageRouter.delete(
  "/delete-message/:id",
  protectionMiddleware,
  checkAdmin,
  deleteMessage
);

export default messageRouter;
