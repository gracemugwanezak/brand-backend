// portfolioModel.js
import { model, Schema } from "mongoose";

export const portfolioModel = model(
  "Portfolio",
  new Schema({
    title: { type: String, trim: true, unique: true, minlength: 5 },
    content: { type: String, trim: true, minilength: 10 },
    image: { type: String },
  })
);
