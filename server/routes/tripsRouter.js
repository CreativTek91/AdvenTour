import express from "express";
import {
  addTrip,
  getTripById,
  getAllTrips,
  deleteTripAndMedia,
  updateTrip,
  addMediaToTripFromGallery,
} from "../controllers/tripControllers.js";
import multer from "multer";
const tripRouter = express.Router();
const upload = multer({ dest: "uploads/" });

tripRouter.get('/',getAllTrips);
tripRouter.get("/:id", getTripById);
tripRouter.post("/addTrip", upload.array("files", 5), addTrip);
tripRouter.delete("/deleteTrip/:id",deleteTripAndMedia);
tripRouter.put("/updateTrip/:id",upload.array("files",5),updateTrip);
tripRouter.post("/:id/add_media", addMediaToTripFromGallery);
export default tripRouter;
