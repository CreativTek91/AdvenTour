import Trip from "../models/Trip.js";
import cloudinary from "../config/cloudinary.js";
import Media from "../models/Media.js";


const addTrip = async (req, res) => {
  try {
   
    const { title, location, date, duration, description, price } = req.body;
   
    const newTrip = new Trip({
      title,
      location,
      date,
      duration: Number(duration),
      description,
      price: Number(price),
    });
    console.log("Request body ADD_TRIP:", newTrip);
    const mediaArray = req.files;
    if (mediaArray.length > 0) {
      const mediaTrip = [];
      for (const file of mediaArray) {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: file.mimetype.startsWith("video") ? "video" : "image",
          folder: "adventour_trip",
        });
        const media = await Media.create({
          public_id: result.public_id,
          url: result.secure_url,
          type: file.mimetype.startsWith("video") ? "video" : "image",
        });
        mediaTrip.push(media._id);
      }

      newTrip.media = mediaTrip;
    }
  
    await newTrip.save();
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllTrips = async (req, res) => {
  const {
    currentPage = 1,
    limit = 10,
    sortDirection = "asc",
    sortBy = "title",
  } = req.query;
  const skip = (parseInt(currentPage) - 1) * parseInt(limit);
  try {
    const trips = await Trip.find()
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .populate("media");
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const addMediaToTripFromGallery = async (req, res) => {
  try {
   const tripId = req.params.id; // Assuming the trip ID is passed in the URL
    const { mediaId } = req.body;
    console.log("Trip ID:", tripId);
    console.log("Media ID:", mediaId);
    if (!tripId || !mediaId) {
      return res.status(400).json({ message: "Trip ID and Media ID are required" });
    }
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    console.log("Trip found:", trip);
    const media = await Media.findById(mediaId);
    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }
    console.log("Media found:", media);
     trip.media.push(mediaId);
    await trip.save();
     res.status(200).json({ message: "Media added to trip successfully", trip });
  } catch (error) {
    
  }
};

// const getAllTrips = async (req, res) => {
//   try {
//     const trips = await Trip.find().populate("media");
//     res.status(200).json(trips);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
const getTripById = async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await Trip.findById(id).populate("media");
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateTrip = async (req, res,next) => {

  try {
    const { id } = req.params;
    console.log("ID from params:", id);
    console.log("Request body:", req.body);
    console.log("Request files:", req.files);
    if (!id) {
      return res.status(400).json({ message: "Trip ID is required" });
    }
    const { title,location,date,duration,description, price } = req.body;
    const mediaArray = req.files;
    const mediaTrip = [];
    if (mediaArray.length > 0) {
    
      for (const file of mediaArray) {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: file.mimetype.startsWith("video") ? "video" : "image",
          folder: "adventour_trip_Olga",
        });
        const media = await Media.create({
          public_id: result.public_id,
          url: result.secure_url,
          type: file.mimetype.startsWith("video") ? "video" : "image",
        });
        mediaTrip.push(media._id);
      }

    }
    console.log("Uploaded media IDs:", mediaTrip);
   const updatedTrip = await Trip.replaceOne(
     { _id: id },
     {
       title: title,
        location:location,
        date:date,
        duration:Number(duration),
       description:description,
       price: Number(price),
       media:mediaTrip
     },
     {
       new: true,
       runValidators: true,
     }
   );
    res.status(200).json(updatedTrip);
  } catch (error) {
    next(error);
  }
};

const deleteTripAndMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await Trip.findById(id);
    if (!trip) {
      console.log("Trip not found");
      return res.status(404).json({ message: "Trip not found" });
    }
    const mediaIds = trip.media.map((media) => media._id);
  console.log("Media IDs to delete:", mediaIds);
  console.log("Trip to delete:", trip);
  
   
    if(mediaIds.length > 0) {
    // Delete media from Cloudinary
     for (let mediaId of mediaIds) {
       const media = await Media.findById(mediaId);
      console.log("Media to delete:", media);

     if (!media) {
        console.log("Media in collection Media not found");
        return res.status(404).json({ message: "Media not found" });
      }
     
      const cloudinaryResponse =   await cloudinary.uploader.destroy(media.public_id, {
          resource_type: media.type  === "video" ? "video" : "image",
          folder: "adventour_trip_Olga",
        });

        if (cloudinaryResponse.result !== "ok") {
          console.log("Failed to delete media from Cloudinary");
          return res
            .status(500)
            .json({ message: "Failed to delete media from Cloudinary" });
        }
       // media.deleteOne();
       
      }

    }
      await Media.deleteMany({ _id: { $in: mediaIds } });
  
   await trip.deleteOne();
    res.status(200).json({ message: "Trip deleted successfully", trip });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export {
  addTrip,
  getAllTrips,
  getTripById,
  updateTrip,
  deleteTripAndMedia,
  addMediaToTripFromGallery,
};
