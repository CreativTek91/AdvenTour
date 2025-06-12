import { Schema, model } from "mongoose";

const accountSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    provider: { type: String, required: true },
    refreshToken: { type: String, default: "" },
    accessToken: { type: String, default: "" },
    expiresAt: { type: Number, default: 0 },
  },
  { timestamps: true }
);
const Account = model("Account", accountSchema);
export default Account;