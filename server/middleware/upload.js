// middleware/upload.js
import multer from "multer";

const storage = multer.memoryStorage(); // oder diskStorage, je nach Bedarf

const upload = multer({ storage });

export default upload;
