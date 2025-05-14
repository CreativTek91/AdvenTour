import express from 'express';
import multer from 'multer';
import {uploadMedia, getAllMedia, deleteMediaById } from '../controllers/mediaController.js';
const mediaRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

 mediaRouter.post("/upload", upload.array("files", 5), uploadMedia);
 mediaRouter.get("/", getAllMedia);
 mediaRouter.delete("/:id", deleteMediaById);
export default  mediaRouter;
