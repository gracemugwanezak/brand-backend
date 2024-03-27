// educationalBackgroundController.js
import { createEducationalBackgroundModel } from "../models/institutionModel.js";

// Create the model instance
const EducationalBackground = createEducationalBackgroundModel();

// Controller functions for handling CRUD operations

// Get all educational backgrounds
export async function getAllEducationalBackgrounds(req, res) {
  try {
    const backgrounds = await EducationalBackground.find();
    res.json(backgrounds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Create a new educational background
export async function createEducationalBackground(req, res) {
  const background = new EducationalBackground(req.body);
  try {
    const newBackground = await background.save();
    res.status(201).json(newBackground);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Get educational background by ID
export async function getEducationalBackgroundById(req, res) {
  try {
    const background = await EducationalBackground.findById(req.params.id);
    if (background) {
      res.json(background);
    } else {
      res.status(404).json({ message: "Educational background not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Update educational background by ID
export async function updateEducationalBackground(req, res) {
  try {
    const updatedBackground = await EducationalBackground.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedBackground) {
      res.json(updatedBackground);
    } else {
      res.status(404).json({ message: "Educational background not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Delete educational background by ID
export async function deleteEducationalBackground(req, res) {
  try {
    const deletedBackground = await EducationalBackground.findByIdAndDelete(
      req.params.id
    );
    if (deletedBackground) {
      res.json({ message: "Educational background deleted" });
    } else {
      res.status(404).json({ message: "Educational background not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
