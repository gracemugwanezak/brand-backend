//userController.js

import asyncMiddleware from "../helpers/asyncMiddleware.js";
import { User } from "../models/userModel.js";

export const getUsers = asyncMiddleware(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    data: users,
  });
});
