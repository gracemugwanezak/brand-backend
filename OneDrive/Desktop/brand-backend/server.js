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

dotenv.config({ path: "./src/env/.env" });

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));
app.use(
  cors({
    origin: "*",
    methods: "*",
  })
);
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome to my  portifolio api endpoints " });
});

app.use("/api/users", userRouter);
app.use("/api/blogs", blogsRouter);
app.use("/messages", messageRouter);

const port = process.env.PORT || 4000;

// const dbURI = process.env.DB_URI || "mongodb://localhost:27017/portfolio";

mongoose
  .connect(
    "mongodb+srv://mugwaneza:jltB26e3F0ueZGOZ@cluster0.v7gsbr4.mongodb.net/portifolio?retryWrites=true&w=majority&appName=Cluster0"
  )
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
