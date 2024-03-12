import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
// userSchema.pre("save", async function (next) {
//   this.password = await bcrypt.hash(this.password, 12);
// });
export const User = model("User", userSchema);
