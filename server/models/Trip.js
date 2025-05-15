import { Schema,model } from "mongoose";
const tripSchema = new Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: String, required: true },
    duration: { type: Number, required: true }, // z.B. 1 für Tagestrip
    description: { type: String, required: true },
    price: { type: Number, required: true },
    media:[ {
      type: Schema.Types.ObjectId,
      ref: "Media",
    }],
  },
  { timestamps: true }
);

const Trip = model("Trip", tripSchema);

export default Trip;
