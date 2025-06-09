import Booking from "../models/Booking.js";
import Trip from "../models/Trip.js";
import ErrorHandler from "../exceptions/errorHandlung.js";
const createBooking = async (req, res,next) => {
  const {userId, tripId,quantity} = req.body;

    if (!userId || !tripId ) {
        return res.status(400).json({ error: "All fields are required" });
    }

  try {
    const trip = await Trip.findOne({_id: tripId });
    trip.isAvailable = trip.availablePlaces >= quantity; // Check if trip is available and has enough seats
 
    if (!trip || !trip.isAvailable) {
      return ErrorHandler.ForbiddenError("Trip not available or does not exist");
    }
    const booking = await Booking.create({
      userId,
      tripId,
      status: "pending",
      totalPrice: trip.price * quantity, // Assuming price is per person
    });
    trip.availablePlaces -= quantity; // Decrease the number of free places
    trip.save(); // Save the updated trip
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Failed to create booking" });
  }
}

const payBooking = async (req, res,next) => {
  const bookingId = req.params.id;
const userId = req.user.id;
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: bookingId, userId, status: "pending" },
      { status: "paid", statusUpdatedAt: Date.now() },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ error: "Booking not found or unauthorized" });
    }
    res.status(200).json({ message: "Booking paid successfully", booking });
  } catch (error) {
    console.error("Error paying booking:", error);
    res.status(500).json({ error: "Failed to pay booking" });
  }
}
// This function allows a user to cancel a booking
const cancelBooking = async (req, res) => {
  const bookingId = req.params.id;
  const userId = req.user.id;

  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: bookingId, userId },
      { status: "cancelled", isCancelledOrDeclined: true },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ error: "Booking not found or unauthorized" });
    }
    res.status(200).json({ message: "Booking cancelled successfully", booking });
  }
  catch (error) {
    console.error("Error cancelling booking:", error);
    res.status(500).json({ error: "Failed to cancel booking" });
  }
}
const declineBooking = async (req, res) => {
  const bookingId = req.params.id;
  const userId = req.user.id;

  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: bookingId, userId },
      { status: "declined", isCancelledOrDeclined: true },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ error: "Booking not found or unauthorized" });
    }                           
    res.status(200).json({ message: "Booking declined successfully", booking });
  }
  catch (error) {
    console.error("Error declining booking:", error);
    res.status(500).json({ error: "Failed to decline booking" });
  }
}
const getBookingById = async (req, res,next) => {
  const bookingId = req.params.id;
  const userId = req.user.id;

  try {
    const booking = await Booking.findOne({ _id: bookingId, userId })
        .populate("tripId")
        .populate("userId");            
    if (!booking) {
        return res.status(404).json({ error: "Booking not found or unauthorized" });
        }
    res.status(200).json(booking);
  }
    catch (error) {
        console.error("Error fetching booking:", error);
       next(error);
    }
}
//cancelBooking
const deleteBooking = async (req, res,next) => {
  const bookingId = req.params.id;
  const userId = req.user.id;

  try {
    const booking = await Booking.findOne(
      { _id: bookingId, userId },
      { new: true }
    );
    if (!booking || booking.status !== "pending") {
    throw ErrorHandler.NotFoundError("Booking not found or cannot be cancelled");
    }
    booking.status = "cancelled";
    booking.isCancelledOrDeclined = true; // Soft delete
    booking.cancellationReason = req.body.reason || "No reason provided"; // Optional cancellation reason
    await booking.save();
    res.status(200).json({ message: "Booking cancelled successfully", booking });
  }
  catch (error) {
    next(error);
    console.error("Error cancelling booking:", error);
  }
} 

const getBookingsByUser=async (req, res,next) => {
  const userId = req.params.userId;
  if (!userId) {
    throw ErrorHandler.BadRequestError("User ID is required");
  }

  try {
    const bookings = await Booking.find({_id: userId })
      .populate("tripId")
      .sort({createdAt: -1}); // Sort by creation date, newest first

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    next(error);
  }
}
export {
  createBooking,
  payBooking,
  getBookingsByUser,
  cancelBooking,
  declineBooking,
  getBookingById,
  deleteBooking
};