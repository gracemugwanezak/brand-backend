// skillRoutes.js
import express from "express";
import {
  getSkills,
  createSkill,
  getSkill,
  updateSkill,
  deleteSkill,
  getSkillsByCategory,
} from "../controllers/skillController.js";

const skillRoute = express.Router();

skillRoute.get("/", getSkills);
skillRoute.post("/", createSkill);
skillRoute.get("/:id", getSkill);
skillRoute.put("/:id", updateSkill);
skillRoute.delete("/:id", deleteSkill);
skillRoute.get("/filter/:category", getSkillsByCategory);

export default skillRoute;
