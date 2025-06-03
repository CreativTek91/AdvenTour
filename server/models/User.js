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
    activationLink: { type: String, default: null },
    isActivated: { type: Boolean, default: false },
},
{ timestamps: true },
  
);

const User = model("User", userSchema);
export default User;
