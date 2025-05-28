import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: {
      type: Schema.Types.ObjectId,
      ref: "Media",
      default: null,
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user", "guest"], default: "user" },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
export default User;
