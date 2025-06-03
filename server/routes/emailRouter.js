import express from "express";
import authenticate from "../middleware/authenticate.js";

import {sendEmailToAdvenTour } from "../controllers/emailController.js";

const emailRouter = express.Router();

emailRouter.post("/", authenticate, sendEmailToAdvenTour);

export default emailRouter;
