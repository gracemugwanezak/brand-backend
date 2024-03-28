// portfolioController.js

import { portfolioModel } from "../models/portfolioModel.js";
import asyncMiddleware from "../helpers/asyncMiddleware.js";
import cloudinary from "../middleware/cloudinary.js";

export const createPortfolio = asyncMiddleware(async (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content)
    return next(new Error("Please provide title and content"));
  const { secure_url } = await cloudinary.uploader.upload(req.file.path);
  console.log("secure_url", secure_url);
  const newPortfolio = new portfolioModel({
    title,
    content,
    image: secure_url,
  });

  console.log(newPortfolio);
  await newPortfolio.save();
  res.status(201).json(newPortfolio);
});
export const getPortfolio = asyncMiddleware(async (req, res, next) => {
  const portfolios = await portfolioModel.find();
  if (portfolios.length === 0)
    return next(new Error("No portfolio created yet"));
  res.status(200).json(portfolios);
});
