// src/controllers/blogController.js
import Blog from "../models/blogsModel.js";
import { handleServerError } from "../helpers/errorHelper.js";

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    res.status(200).json({ blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { blogName, blogDescription } = req.body;

    const blog = await Blog.findByIdAndUpdate(id);
    if (!blog) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id}` });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res
        .status(404)
        .json({ message: `cannot find blog with ID ${id}` });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
