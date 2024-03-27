// educationalBackgroundRoutes.js
import express from "express";
import {
  getAllEducationalBackgrounds,
  createEducationalBackground,
  getEducationalBackgroundById,
  updateEducationalBackground,
  deleteEducationalBackground,
} from "../controllers/educationalBackgroundController.js";

const educationRoute = express.Router();

// Define routes
educationRoute.get("/", getAllEducationalBackgrounds);
educationRoute.post("/", createEducationalBackground);
educationRoute.get("/:id", getEducationalBackgroundById);
educationRoute.put("/:id", updateEducationalBackground);
educationRoute.delete("/:id", deleteEducationalBackground);

export default educationRoute;
