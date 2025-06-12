import { Schema,model } from "mongoose";

const bookingSchema = new Schema(
  {
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
      enum: ["pending", "paid", "confirmed", "cancelled"],
      default: "pending",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    numberOfPeople: {
      type: Number,
      required: true,
      min: 1, // At least one person must be booked
      max: 35, // Assuming the maximum number of people for a trip is 35
    },
    payment: {
      method: {
        type: String,
        enum: ["credit_card", "paypal", "bank_transfer", "cash"],
        default: "credit_card",
      },
      paidAt: {
        type: Date,
        default: null,
      },
      fakeTransactionId: {
        type: String,
        default: null,
      },
    },
    cansellationReason: {
      type: String,
      default: null, // This will be set when the booking is cancelled or declined
    },
    expiredAt: {
      type: Date,
      default: null, // This will be set when the booking is created
    },
    wasReminded: {
      type: Boolean,
      default: false, // Indicates if the user was reminded about the booking
    },
    refundend: {
      type: Boolean,
      default: false, // Indicates if the booking was refunded
    },
    statusUpdatedAt: { type: Date, default: Date.now },
    isCancelledOrDeclined: { type: Boolean, default: false }, // Soft deleted from DB (not deleted from DB but does not appear in the FE)
  },
  { timestamps: true }
);
bookingSchema.pre("save", function (next) {
  if (this.isModified("status") && this.status !== "pending") {
    this.statusUpdatedAt = Date.now();
  }
  next();
});

const Booking=model("Booking",bookingSchema);
export default Booking;