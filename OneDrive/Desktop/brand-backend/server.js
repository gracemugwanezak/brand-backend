// server.js
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import YAML from "yamljs";
import swaggerUI from "swagger-ui-express";

const swaggerJsDocs = YAML.load("./api.yaml");

import userRouter from "./src/routes/usersRoute.js";
import blogsRouter from "./src/routes/blogsRoutes.js";
import { handleServerError } from "./src/helpers/errorHelper.js";
import messageRouter from "./src/routes/messagesRoutes.js";
import educationalBackgroundRoutes from "./src/routes/educationalBackgroundRoutes.js";
import skillRoutes from "./src/routes/skillRoutes.js";
import portfolioRouter from "./src/routes/portfolioRoutes.js";

dotenv.config({ path: "./src/env/.env" });

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome to my portfolio api endpoints " });
});

// Routes
app.use("/api/users", userRouter);
app.use("/api/blogs", blogsRouter);
app.use("/messages", messageRouter);
app.use("/education", educationalBackgroundRoutes);
app.use("/skills", skillRoutes);
app.use("/portfolio", portfolioRouter);

const PORT = process.env.PORT || 4000;

mongoose
  .connect(
    "mongodb+srv://mugwaneza:jltB26e3F0ueZGOZ@cluster0.v7gsbr4.mongodb.net/portifolio?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("DB connected!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });

// Error handling middleware
app.use((error, req, res, next) => {
  handleServerError(res, error);
});
app.use("*", (req, res, next) => {
  res.status(404).json({ message: "page not found" });
});
