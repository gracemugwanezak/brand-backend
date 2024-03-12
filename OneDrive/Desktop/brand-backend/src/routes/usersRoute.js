import { Router } from "express";
import { getUsers } from "../controllers/userController.js";
import { login, signup } from "../controllers/authController.js";
import { verifyToken } from "../helpers/verifyToken.js";
const userRouter = Router();

userRouter.route("/").get(verifyToken, getUsers);
userRouter.post("/", signup);
userRouter.post("/login", login);

// userRouter.route("/login").post(login);

export default userRouter;
