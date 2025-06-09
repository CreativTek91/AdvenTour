import express from 'express';
import { createBooking, payBooking,deleteBooking,getBookingsByUser} from "../controllers/bookingController.js";
import Booking from '../models/Booking.js';
import authenticate from '../middleware/authenticate.js';

const bookingRouter = express.Router();

bookingRouter.post('/create',createBooking);
bookingRouter.post("/pay/:bookingId", payBooking);
bookingRouter.delete('/cancel/:bookingId', deleteBooking);



bookingRouter.get('/my/:userId',getBookingsByUser);
bookingRouter.get('/all', authenticate, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('tripId')
      .populate('userId');
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    res.status(500).json({ error: "Failed to fetch all bookings" });
  }
});

export default bookingRouter;