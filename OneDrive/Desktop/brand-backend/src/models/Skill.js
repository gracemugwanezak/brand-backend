import { model, Schema } from "mongoose";

export const skillModel = model(
  "Skill",
  new Schema({
    name: String,
    category: {
      type: String,
      enum: ["Soft skills", "Technical skills"],
    },
  })
);
