import express from "express";
import { addTrip, getAllTrips } from "../controllers/tripControllers.js";
import multer from "multer";
import Trip from "../models/Trip.js";
const tripRouter = express.Router();
const upload = multer({ dest: "uploads/" });
// Alle Trips abrufen
// tripRouter.get("/", async (req, res) => {
//   try {
//     const trips = await Trip.find();
//     res.json(trips);
//   } catch (err) {
//     res.status(500).json({ error: "Fehler beim Laden der Trips." });
//   }
// });
tripRouter.get('/',getAllTrips)
tripRouter.post("/addTrip", upload.array("files", 5), addTrip);

// router.post("/addTrip", async (req, res) => {
//   const { title, location, date, duration, description, price} = req.body;
//   console.log(req.body);
//   try {
//     const newTrip = new Trip({
//       title,
//       location,
//       date,
//       duration : Number(duration),
//       description,
//       price:Number(price)
//   });
//     const savedTrip = await newTrip.save();
//     res.status(201).json({trip: savedTrip, message: "Trip erfolgreich gespeichert."});
//   } catch (err) {
//     res.status(400).json({ error: "Fehler beim Speichern des Trips." });
//   }
// });

export default tripRouter;
