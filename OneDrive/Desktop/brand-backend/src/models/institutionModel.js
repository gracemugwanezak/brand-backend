// EducationalBackground.js
import mongoose from "mongoose";

const institutionSchema = new mongoose.Schema({
  // Define your schema fields herec
  degree: { type: String, required: true },
  name: { type: String, required: true },
  startTime: Date,
  endTime: Date,
  // Add more fields as needed
});

export function createEducationalBackgroundModel() {
  return mongoose.model("educationalBackground", institutionSchema);
}
