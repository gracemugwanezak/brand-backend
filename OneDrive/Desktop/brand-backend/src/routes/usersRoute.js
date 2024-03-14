import { Router } from "express";
import { getUsers } from "../controllers/userController.js";
import { login, signup } from "../controllers/authController.js";
import { verifyToken } from "../helpers/verifyToken.js";
import {
  protectionMiddleware,
  checkAdmin,
} from "../controllers/authController.js";
const userRouter = Router();

userRouter.route("/").get(protectionMiddleware, checkAdmin, getUsers);
userRouter.post("/signup", signup);
userRouter.post("/login", login);

// userRouter.route("/login").post(login);

export default userRouter;
