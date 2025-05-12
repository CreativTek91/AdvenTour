import express from "express";
import Trip from "../models/Trip.js";

const router = express.Router();

// Alle Trips abrufen
router.get("/", async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: "Fehler beim Laden der Trips." });
  }
});

// Einen Trip anlegen
router.post("/addTrip", async (req, res) => {
  const { title, location, date, duration, description, price} = req.body;
  console.log(req.body);
  try {
    const newTrip = new Trip({
      title,
      location,
      date,
      duration : Number(duration),
      description,
      price:Number(price)
  });
    const savedTrip = await newTrip.save();
    res.status(201).json({trip: savedTrip, message: "Trip erfolgreich gespeichert."});
  } catch (err) {
    res.status(400).json({ error: "Fehler beim Speichern des Trips." });
  }
});

export default router;
