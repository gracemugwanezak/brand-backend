// userController.js
import asyncMiddleware from "../helpers/asyncMiddleware.js";
import { User } from "../models/userModel.js";

export const getUsers = asyncMiddleware(async (req, res, next) => {
  // Check if the requesting user is an admin
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const users = await User.find();
  res.status(200).json({
    status: "success",
    data: users,
  });
});
