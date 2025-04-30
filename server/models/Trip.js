import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: String, required: true },
    duration: { type: Number, required: true }, // z.B. 1 für Tagestrip
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String }, // optionaler Image-Link
  },
  { timestamps: true }
);

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;
