import express from 'express';
import { registration, login ,logout} from '../controllers/userController.js';
import authenticate from '../middleware/authenticate.js';

const userRouter = express.Router();

userRouter.post('/register', registration);
userRouter.post('/login', login);
userRouter.get('/me', authenticate, (req, res) => {
  res.json({
    message: "Authenticated user info",
    user: req.user,
  });
});
userRouter.post('/logout', logout);
export default userRouter;
