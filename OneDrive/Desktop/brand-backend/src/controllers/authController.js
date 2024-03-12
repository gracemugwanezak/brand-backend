import asyncMiddleware from "../helpers/asyncMiddleware.js";
import dotenv from "dotenv";
dotenv.config({ path: `../env/.env` });
import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
console.log(process.env.secret);
// signing token
const signToken = (id) => {
  return jwt.sign({ id }, "thisismysecretkey12343somewhat", {
    expiresIn: "2d",
  });
};
// verifying token
const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};
const encryptPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};
const comparePasswords = async (registeredPassword, loginPassword) => {
  return await bcrypt.compare(registeredPassword, loginPassword);
};

// method for creating new user
export const signup = asyncMiddleware(async (req, res, next) => {
  let { email, password, username } = req.body;
  const user = await User.findOne({ email });

  if (user) return next("User already exist, use another email");
  if (!password) return next("provide password");
  password = encryptPassword(password);
  const newUser = await User.create({ email, password, username });
  res.status(201).json({
    status: "success",
    data: {
      username: newUser.username,
      email: newUser.email,
    },
  });
  user.req = user;
});

//method for creating
export const login = asyncMiddleware(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next("please provide email and password");
  const user = await User.findOne({ email }).select("+password");
  if (!user) return next("user not found!");
  if (!comparePasswords(user.password, password))
    return next("invalid credentials!");
  const token = signToken(user._id);
  //   console.log(token);
  res.status(200).json({
    message: "logged in",
    token,
  });
});
