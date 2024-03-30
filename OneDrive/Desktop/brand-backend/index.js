import app from "./server.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 4000;

mongoose
  .connect(
    "mongodb+srv://mugwaneza:jltB26e3F0ueZGOZ@cluster0.v7gsbr4.mongodb.net/portifolio?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("DB connected!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });
