import { Schema,model } from "mongoose";

const bookingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tripId: {
    type: Schema.Types.ObjectId,
    ref: "Trip",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending","paid", "confirmed", "declined", "cancelled"],
    default: "pending",
  },
  totalPrice: {
    type: Number,
    required: true,
  },
 paidAt: {
    type: Date,
    default: null,
  },
  fakeTransactionId: {
    type: String,
    default: null,
  },
  expiredAt:{
    type: Date,
    default: null, // This will be set when the booking is created
  },
  wasReminded: {
    type: Boolean,
    default: false, // Indicates if the user was reminded about the booking
  },
  statusUpdatedAt: { type: Date, default: Date.now },
  isCancelledOrDeclined: { type: Boolean, default: false }, // Soft deleted from DB (not deleted from DB but does not appear in the FE)
},{ timestamps: true });
bookingSchema.pre("save", function (next) {
  if (this.isModified("status") && this.status !== "pending") {
    this.statusUpdatedAt = Date.now();
  }
  next();
});

const Booking=model("Booking",bookingSchema);
export default Booking;