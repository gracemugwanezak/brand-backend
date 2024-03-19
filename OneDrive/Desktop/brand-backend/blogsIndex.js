// src/blogsIndex.js
import app from "./blogsServer.js";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost:27017/Blogsdb")
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch(() => {
    console.log("error");
  });

app.listen(3005, () => {
  console.log("server started - 3005");
});
