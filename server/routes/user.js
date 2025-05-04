import express from 'express';
import { registraition,login } from '../controllers/userController.js';
import autthenticate from '../middleware/authenticate.js'

const userRouter = express.Router();
userRouter.route('/register').post(registraition);
userRouter.route('/login').post(login);
userRouter.route('/me').get(autthenticate)
export default userRouter;


