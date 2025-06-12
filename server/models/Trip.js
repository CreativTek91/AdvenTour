import { Schema,model } from "mongoose";
const tripSchema = new Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: String, required: true },
    duration: { type: Number, required: true }, // z.B. 1 für Tagestrip
    description: { type: String, required: true },
    price: { type: Number, required: true },
    totalPlaces: { type: Number, default: 35 }, // Gesamtanzahl der Plätze
    availablePlaces: { type: Number, default: 35 }, // Anzahl der verfügbaren Plätze
    isAvailable: { type: Boolean, default: true }, // Verfügbarkeit des Trips
    reservedPlaces: { type: Number, default: 0 }, // Anzahl der reservierten Plätze
    media: [
      {
        type: Schema.Types.ObjectId,
        ref: "Media",
      },
    ],
  },
  { timestamps: true }
);

const Trip = model("Trip", tripSchema);

export default Trip;
