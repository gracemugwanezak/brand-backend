import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    blogName: {
      type: String,
      required: [true],
    },
    blogDescription: {
      type: String,
      required: true,
    },
    blogImage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("blogs", blogSchema);
export default Blog;
