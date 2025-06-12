import express from "express";
import authenticate from "../middleware/authenticate.js";

import {sendEmail } from "../controllers/emailController.js";

const emailRouter = express.Router();

emailRouter.post("/", authenticate, sendEmail);

export default emailRouter;
