import express from 'express';
import { like, unlike, getStatus,getCountLikes ,favoritTrips} from "../controllers/likeController.js";



const likeRouter = express.Router();
likeRouter.post('/like', like);
likeRouter.post('/unlike', unlike);
likeRouter.get('/status', getStatus);
likeRouter.get('/count/:tripId',getCountLikes);
likeRouter.get("/my", favoritTrips);
export default likeRouter;