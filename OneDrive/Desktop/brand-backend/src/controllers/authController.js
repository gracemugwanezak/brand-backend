// authController.js

import asyncMiddleware from "../helpers/asyncMiddleware.js";
import dotenv from "dotenv";
dotenv.config({ path: `${process.cwd()}/src/env/.env` });
import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
// console.log(process.env.secret);
// console.log(process.cwd());
// signing token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.secret, {
    expiresIn: process.env.expiresIn,
  });
};
// verifying token
const verifyToken = (token, secret = process.env.secret) => {
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
  // let { email, password, username, isAdmin } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email: req.body.email });

  if (user) return next("User already exist, use another email");
  if (!req.body.password) return next("provide password");
  req.body.password = encryptPassword(req.body.password);
  // const newUser = await User.create({ email, password, username, isAdmin });
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "success",
    message: "account created successfully!",
  });
});

export const login = asyncMiddleware(async (req, res, next) => {
  const { email, password } = req.body;
  console.log("body", req.body);
  if (!email || !password) return next("please provide email and password");
  const user = await User.findOne({ email }).select("+password");
  if (!user) return next("user not found!");
  if (!comparePasswords(user.password, password))
    return next("invalid credentials!");
  const token = signToken(user._id);

  res.status(200).json({
    message: "logged in",
    token,
    user,
  });
});
export const protectionMiddleware = asyncMiddleware(async (req, res, next) => {
  const authorization = req.headers.authorization || undefined;
  if (!authorization) throw new Error("no authorization");
  const token = authorization.split(" ")[1];
  if (!token) throw new Error("no token provided");
  const decodedToken = verifyToken(token);
  const userId = decodedToken.id;
  const user = await User.findById(userId);
  if (!user) throw new Error("no user found!");
  req.user = user;
  // console.log(decodedToken);
  next();
});
export const checkAdmin = asyncMiddleware(async (req, res, next) => {
  if (!req.user.isAdmin) throw new Error("you are not admin");
  next();
});
