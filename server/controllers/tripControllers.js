import Trip from "../models/Trip.js";
import cloudinary from "../config/cloudinary.js";
import Media from "../models/Media.js";
const addTrip = async (req, res) => {
  try {
    const { title, location, date, duration, description, price } = req.body;
    if (req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }
    const mediaArray = req.files;
    const mediaTrip = [];
    const newTrip = new Trip({
      title,
      location,
      date,
      duration: Number(duration),
      description,
      price: Number(price)
    });

    for (const file of mediaArray) {
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: file.mimetype.startsWith("video") ? "video" : "image",
        folder: "teamMedia",
      });
      const media = await Media.create({
        public_id: result.public_id,
        url: result.secure_url,
        type: file.mimetype.startsWith("video") ? "video" : "image",
      });
     mediaTrip.push(media._id);

    }
     newTrip.media = mediaTrip;
console.log("Uploaded media IDs:", mediaTrip);
    await newTrip.save();
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTrips = async (req, res) => {
  try {
    const deletedTrip = await Trip.deleteMany();
    res.status(200).json(deletedtrip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { addTrip, deleteTrips, getAllTrips };
