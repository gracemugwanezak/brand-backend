import express from "express";
import { verifyToken } from "../helpers/verifyToken.js";
// import {
//   getAllBlogs,
//   getBlogById,
//   createBlog,
//   updateBlog,
//   deleteBlog,
// } from "../controllers/blogController.js";

import * as blogController from "../controllers/blogController.js";

const router = express.Router();

router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);
router.post("/", blogController.createBlog);
router.patch("/:id", blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);

export default router;
