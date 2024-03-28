// portfolioRoutes.js

import { upload } from "../middleware/multer.js";
import { Router } from "express";
import {
  createPortfolio,
  getPortfolio,
} from "../controllers/portfolioController.js";
const portfolioRouter = Router();

portfolioRouter
  .get("/", getPortfolio)
  .post("/", upload.single("image"), createPortfolio);

export default portfolioRouter;
