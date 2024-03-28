import { config } from "dotenv";
import { v2 as cloudinary } from "cloudinary";
config({ path: `${process.cwd()}/src/env/.env` });

// configuring cloudinary

cloudinary.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.apiKey,
  api_secret: process.env.apiSecret,
});

export default cloudinary;
