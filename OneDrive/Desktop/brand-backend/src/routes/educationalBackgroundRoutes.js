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
educationRoute.get("/educational-backgrounds", getAllEducationalBackgrounds);
educationRoute.post("/educational-backgrounds", createEducationalBackground);
educationRoute.get(
  "/educational-backgrounds/:id",
  getEducationalBackgroundById
);
educationRoute.put("/educational-backgrounds/:id", updateEducationalBackground);
educationRoute.delete(
  "/educational-backgrounds/:id",
  deleteEducationalBackground
);

export default educationRoute;
