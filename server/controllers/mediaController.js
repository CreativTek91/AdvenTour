import cloudinary from "../config/cloudinary.js";
import Media from "../models/Media.js";

const uploadMedia = async (req, res) => {
  try {
    if (req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }
    const mediaArray = req.files;
    console.log("mediaArray", mediaArray);
    
    for (const file of mediaArray) {
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: file.mimetype.startsWith("video") ? "video" : "image",
        folder: "adventour_media",
      });

      const media = new Media({
        public_id: result.public_id,
        url: result.secure_url,
        type: file.mimetype.startsWith("video") ? "video" : "image",
      });

      await media.save();
    }

    res.status(201).json(mediaArray);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllMedia = async (req, res) => {
  try {
    const media = await Media.find();
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({message:' Error fetching media', error: error.message});
  }
};
const deleteMediaById = async (req, res) => {

  try {
    const { id } = req.params;
    const media = await Media.findById(id);
    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }
    const cloudinaryResponse = await cloudinary.uploader.destroy(
      media.public_id,
      {
        resource_type: media.type === "video" ? "video" : "image",
      }
    );
    if (cloudinaryResponse.result !== "ok") {
      return res
        .status(500)
        .json({ message: "Failed to delete media from Cloudinary" });

    }
    await media.deleteOne();
    res.status(200).json({ message: "Media deleted successfully", media });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { uploadMedia, getAllMedia, deleteMediaById };
