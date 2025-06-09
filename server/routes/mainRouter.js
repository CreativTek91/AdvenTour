import express from "express";
import userRouter from "./userRouter.js";
import tripRouter from "./tripsRouter.js";
import mediaRouter from "./mediaRouter.js";
import contactRouter from "./contactRouter.js";
import emailRouter from "./emailRouter.js";
import likeRouter from "./likeRouter.js"; 
import bookingRouter from "./bookingRouter.js";

const router = express.Router();


router.use(userRouter);
router.use("/trips",tripRouter);
router.use("/media",mediaRouter);
router.use('/contact',contactRouter);
router.use("/email", emailRouter); 
router.use("/likes",likeRouter); 
router.use("/booking", bookingRouter);

export default router;
