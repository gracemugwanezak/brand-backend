// src/controllers/skillController.js
import { skillModel } from "../models/Skill.js";
import asyncMiddleware from "../helpers/asyncMiddleware.js";

export const createSkill = asyncMiddleware(async (req, res, next) => {
  const { name, category } = req.body;
  console.log(req.body);
  if (!name || !category)
    return next(new Error("please provide required fields"));
  const skills = await skillModel.create(req.body);
  res.status(201).json({
    status: "success",
    skills,
  });
});

export const getSkills = asyncMiddleware(async (req, res, next) => {
  const skills = await skillModel.find({}, { __v: false });
  if (!skills) return next(new Error("not found"));
  res.status(200).json({
    status: "success",
    skills,
  });
});
export const deleteSkill = asyncMiddleware(async (req, res, next) => {
  const id = req.params.id;
  await skillModel.findByIdAndDelete(id);
  res.status(200).json({
    message: "deleted",
  });
});

export const updateSkill = asyncMiddleware(async (req, res, next) => {
  const id = req.params.id;
  const updatedSkill = await skillModel.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({
    updateSkill,
  });
});
export const getSkill = asyncMiddleware(async (req, res, next) => {
  const id = req.params.id;
  const skill = await skillModel.findById(id);
  res.status(200).json({
    skill,
  });
});
export const getSkillsByCategory = asyncMiddleware(async (req, res, next) => {
  const category = req.params.category;
  const filteredSkills = skillModel.find({ category });
  if (!filteredSkills) return next(new Error("not found!"));
  res.status(200).json(filteredSkills);
});
