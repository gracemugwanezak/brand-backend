// blogServer.js
import express from "express";
import mongoose from "mongoose";
import blogsRoutes from "./routes/blogsRoutes.js";
import { handleServerError } from "./helpers/errorHelper.js";

const app = express();
const port = process.env.PORT || 3000;

// Database connection
const mongoURI = "mongodb://localhost:27017/Blogsdb"; // Include the database URI in the connection URI

mongoose.connect("mongodb://localhost:27017/Blogsdb", {});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Express middleware
app.use(express.json());

// Routes
app.use("/api", blogsRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  handleServerError(res, error);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
