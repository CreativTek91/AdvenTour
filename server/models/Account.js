// import { Schema,model } from "mongoose";

// const accountSchema=new Schema({
//     userId: {
//         type: Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//     },
//     balance: {
//         type: Number,
//         default: 0,
//     },
//     currency: {
//         type: String,
//         default: "USD",
//     },
//     transactions: [
//         {
//             type: Schema.Types.ObjectId,
//             ref: "Transaction",
//         },
//     ],
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
//     updatedAt: {
//         type: Date,
//         default: Date.now,
//     },
// }, {
//     timestamps: true,
//     versionKey: false,
//     toJSON: {
//         virtuals: true,
//         getters: true,
//     },
//     toObject: {
//         virtuals: true,
//         getters: true,
//     },
//     id: false,
//     minimize: false,
//     strict: true,
//     collection: "accounts",
//     discriminatorKey: "accountType",
//     _id: true,
//     validateBeforeSave: true,
//     autoIndex: true,
//     optimisticConcurrency: true,
//     strictQuery: true,
//     strictPopulate: true,
//     strictSchema: true,
//     useNestedStrict: true,
// });
// accountSchema.pre("save", function (next) {
//     this.updatedAt = Date.now();
//     next();
// });
// const Account = model("Account", accountSchema);
// export default Account;

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