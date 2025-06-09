import { model } from 'mongoose';
import ErrorHandler from '../exceptions/errorHandlung.js';
import Like from '../models/Like.js';
import Trip from '../models/Trip.js';
import Media from '../models/Media.js';

const like= async (req, res,next) => {  
  try {
    const { tripId, userId } = req.body;
    console.log("Trip ID:", tripId);
    console.log("User ID:", userId);
    if (!tripId) {
     throw ErrorHandler.ForbiddenError("Trip ID is required");
    }
    if (!userId) {
      throw ErrorHandler.ForbiddenError("User ID is required");
    }
 const like=  await Like.create({ tripId, userId });
    console.log("Like created:", like);
    res.status(201).json({ message: "Trip liked successfully" });

}catch (error) {
    if(error.code === 11000) {
      return res.status(400).json({error: "You have already liked this trip" });
    }
    // Handle other errors
    res.status(500).json({error: error.message });
  }
}

const unlike = async (req, res) => {
  try {
    const {userId, tripId } = req.body;
    if (!tripId && !userId) {
     throw ErrorHandler.ForbiddenError("Trip ID and User ID are required");
    }
await Like.deleteOne({ tripId, userId });
    res.status(200).json({ message: "Trip unliked successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const getStatus = async (req, res) => {
  try {
    const { userId, tripId } = req.query;
    const liked=await Like.exists({ tripId, userId });
    res.json({liked});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const getCountLikes = async (req, res) => {
 try{
    const count= await Like.countDocuments({ tripId: req.params.tripId });
    res.status(200).json({ count });
 }catch (error) {
    res.status(500).json({error: error.message });
  }
}
const favoritTrips= async (req, res,next) => {
  const { userId } = req.query;
  try {
    const likes = await Like.find({ userId })
    .populate({
      path: 'tripId',
      populate: {
        path:'media',
        model: 'Media'
      }
    });
   
    const trips = likes.map(like => like.tripId);
   
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export { like, unlike, getStatus, getCountLikes, favoritTrips };