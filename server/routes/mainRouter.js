import express from "express";
import userRouter from "./userRouter.js";
import tripRouter from "./tripsRouter.js";
import mediaRouter from "./mediaRouter.js";
import contactRouter from "./contactRouter.js";

const router = express.Router();


router.use(userRouter);
router.use("/trips",tripRouter);
router.use("/media",mediaRouter);
router.use('/contact',contactRouter)
export default router;
