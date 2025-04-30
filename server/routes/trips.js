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
router.post("/", async (req, res) => {
  try {
    const newTrip = new Trip(req.body);
    const savedTrip = await newTrip.save();
    res.status(201).json(savedTrip);
  } catch (err) {
    res.status(400).json({ error: "Fehler beim Speichern des Trips." });
  }
});

export default router;
