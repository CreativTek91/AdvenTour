import express from 'express';
import { createBooking, payBooking,cancelBooking,getBookingsByUser,downloadTicket} from "../controllers/bookingController.js";
import Booking from '../models/Booking.js';
import authenticate from "../middleware/authenticate.js";

const bookingRouter = express.Router();

bookingRouter.post('/create',createBooking);
bookingRouter.post("/pay/:bookingId", payBooking);
bookingRouter.delete('/cancel/:bookingId', cancelBooking);



bookingRouter.get("/my", getBookingsByUser);
bookingRouter.get('/all', async (req, res) => {
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
bookingRouter.get('/ticket/:bookingId', authenticate,downloadTicket);
export default bookingRouter;