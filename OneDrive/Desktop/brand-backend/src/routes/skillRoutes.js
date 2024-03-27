// skillRoutes.js
import express from "express";
import {
  getSkills,
  createSkill,
  getSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skillController.js";

const skillRoute = express.Router();

skillRoute.get("/skills", getSkills);
skillRoute.post("/skills", createSkill);
skillRoute.get("/skills/:id", getSkill);
skillRoute.put("/skills/:id", updateSkill);
skillRoute.delete("/skills/:id", deleteSkill);

export default skillRoute;
