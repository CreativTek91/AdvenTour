import Booking from "../models/Booking.js";
import Trip from "../models/Trip.js";
import ErrorHandler from "../exceptions/errorHandlung.js";
import mailService from '../service/mail-service.js';
import generateTicket from "../utils/generateTicket.js";

const createBooking = async (req, res,next) => {
  const {tripId,quantity} = req.body;
  const userId = req.user.id;
    if (!userId || !tripId ) {
       throw ErrorHandler.ForbiddenError('You must be logged and provide tripId and quantity to create a booking');
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
      expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Booking expires in 24 hour
      numberOfPeople: quantity,
      totalPrice: trip.price * quantity, // Assuming price is per person
    });
    trip.reservedPlaces = quantity,
    trip.availablePlaces -= quantity; // Decrease the number of free places
    trip.save(); // Save the updated trip
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Failed to create booking" });
  }
}

const payBooking = async (req, res,next) => {
  const bookingId = req.params.bookingId;
const userId = req.user.id;
console.log("SERVER:BOOKING:payBooking: bookingId:", bookingId);
console.log("SERVER:BOOKING:payBooking: userId:", userId);
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: bookingId, userId, status: "pending" },
      { status: "paid", statusUpdatedAt: Date.now(),
        payment:{
          paidAt:new Date(), 
          fakeTransactionId: `TX-${Math.random().toString(36).substring(2,10)}}` }}, // Simulating a payment
      { new: true }
    ).populate("tripId").populate("userId");
   
    console.log("SERVER:BOOKING:payBooking: booking:", booking);
    if (!booking) {
      throw ErrorHandler.ForbiddenError("Booking not found or already paid")
    }
    console.log("SERVER:BOOKING:payBooking: booking befor update:", booking);
  booking.tripId.totalPlaces -= booking.numberOfPeople; // Decrease the total places by the number of people in the booking
  booking.tripId.availablePlaces = booking.tripId.totalPlaces; // Update available places
    booking.tripId.reservedPlaces = 0; // Reset reserved places to 0 after payment
    console.log('SERVER:BOOKING:payBooking: booking after update:', booking);
    await booking.tripId.save(); // Save the updated trip
    console.log("SERVER:BOOKING:payBooking: booking after trip save:", booking.tripId);
    await mailService.sendPaymentSuccessMail(
      req.user.email, // Assuming user email is stored in req.user.email
      [
        `Booking ID: ${booking._id}`,
        `User: ${booking.userId.name} (${booking.userId.email})`,
        `Trip Title: ${booking.tripId.title}`,
        `Quantity of Peole: ${booking.numberOfPeople}`,
        `Trip Date: ${booking.tripId.date}`,
        `Trip Location: ${booking.tripId.location}`,
        `Total Price: $${booking.totalPrice}`,
        `Payment Status: ${booking.status}`,
      ]
    );
    res
      .status(200)
      .json({
        message:
          "Check your EMAIL!We have sent you a confirmation of successful payment by email!",
        booking,
      });
  } catch (error) {
    console.error("Error paying booking:", error);
   next(error);
  }
}

// This function allows a user to cancel a booking
const cancelBooking = async (req, res,next) => {
  const bookingId = req.params.bookingId;
  const userId = req.user.id;
  console.log("SERVER:BOOKING:cancelBooking: req.body:", req.body);
console.log("SERVER:BOOKING:cancelBooking: bookingId:", bookingId);
console.log("SERVER:BOOKING:cancelBooking: userId:", userId);
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: bookingId, userId },
      { status: "cancelled", isCancelledOrDeclined: true,cansellationReason: req.body.reason || "No reason provided" }, // Optional cancellation reason
      { new: true }
    ).populate("tripId").populate("userId");

    if (!booking) {
      return res.status(404).json({ error: "Booking not found or unauthorized" });
    }
    console.log("SERVER:BOOKING:cancelBooking: booking:", booking);
    if(booking.tripId.reservedPlaces && booking.tripId.reservedPlaces === booking.numberOfPeople){
      booking.tripId.reservedPlaces = 0; // Reset reserved places to 0 after cancellation
      booking.tripId.availablePlaces += booking.numberOfPeople; // Increase available places by the number of people in the booking
      await booking.tripId.save(); // Save the updated trip
    }
    console.log("SERVER:BOOKING:cancelBooking: booking after trip save:", booking.tripId);
    await mailService.sendCancelBookingMail(
      req.user.email, // Assuming user email is stored in req.user.email
      [
        `Booking ID: ${booking._id}`,
        `User: ${booking.userId.name} (${booking.userId.email})`,
        `Trip Title: ${booking.tripId.title}`,
        `Quantity of Peole: ${booking.numberOfPeople}`,
        `Trip Date: ${booking.tripId.date}`,
        `Trip Location: ${booking.tripId.location}`,
        `Total Price: $${booking.totalPrice}`,
        `Cancellation Reason: ${
          booking.cansellationReason || "No reason provided"
        }`,
        `Payment Status: ${booking.status}`,
      ]
    );
    res.status(200).json({ message: "Booking cancelled successfully", booking });
  }
  catch (error) {
    console.error("Error cancelling booking:", error);
    next(error);
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


const getBookingsByUser=async (req, res,next) => {
  if (!req.user){
    throw ErrorHandler.UnauthorizedError("You must be logged in to view bookings");
  }
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate("tripId")
      .sort({createdAt: -1}); // Sort by creation date, newest first

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    next(error);
  }
}
const downloadTicket = async (req, res,next) => {
  const bookingId = req.params.bookingId;
  const userId = req.user.id;
console.log("SERVER:BOOKING:downloadTicket: bookingId:", bookingId);
  console.log("SERVER:BOOKING:downloadTicket: userId:", userId);
  try {
    const booking = await Booking.findOne({ _id:bookingId, userId })
      .populate("tripId")
      .populate("userId");
    console.log("SERVER:BOOKING:downloadTicket: booking:", booking);
    if (!booking) {
      throw ErrorHandler.UnauthorizedError(' have not permission to download this ticket');
    }
    if (booking.status !== "paid") {
      throw ErrorHandler.ForbiddenError("Only paid bookings can download tickets- please pay for the booking first");
    }
    console.log("SERVER:BOOKING:downloadTicket: booking:", booking);
    generateTicket({ booking, trip: booking.tripId, user: booking.userId, res });
  
}catch (error) {
   
    next( ErrorHandler.InternalServerError("Only paid bookings can download tickets- please pay for the booking first"));
  }
}

export {
  createBooking,
  payBooking,
  getBookingsByUser,
  cancelBooking,
  getBookingById,
  downloadTicket,
};