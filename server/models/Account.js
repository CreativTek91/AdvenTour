import { Schema,model } from "mongoose";

const accountSchema=new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
    currency: {
        type: String,
        default: "USD",
    },
    transactions: [
        {
            type: Schema.Types.ObjectId,
            ref: "Transaction",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
accountSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});
const Account = model("Account", accountSchema);
export default Account;