// server.js
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import userRouter from "./src/routes/usersRoute.js";
import blogsRouter from "./src/routes/blogsRoutes.js";
import { handleServerError } from "./src/helpers/errorHelper.js";

dotenv.config({ path: "./src/env/.env" });

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("tiny"));
app.use("/api/users", userRouter);
app.use("/api/blogs", blogsRouter);

const port = process.env.PORT || 4000;

// const dbURI = process.env.DB_URI || "mongodb://localhost:27017/portfolio";

mongoose
  .connect("mongodb://localhost:27017/portfolio")
  .then(() => {
    console.log("DB connected!");
    app.listen(port, () => {
      console.log("Server is running on port " + port);
    });
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });

// Error handling middleware
app.use((error, req, res, next) => {
  handleServerError(res, error);
});
