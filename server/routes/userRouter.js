// import express from 'express';
// import { registration, login ,logout} from '../controllers/userController.js';
// import authenticate from '../middleware/authenticate.js';

// const userRouter = express.Router();

// userRouter.post('/register', registration);
// userRouter.post('/login', login);
// userRouter.get('/me', authenticate, (req, res) => {
//   res.json({
//     message: "Authenticated user info",
//     user: req.user,
//   });
// });
// userRouter.post('/logout', logout);
// export default userRouter;
import express from "express";
import multer from "multer";
import {
  registration,
  login,
  logout,
  // activate,
  // refresh,
  // getAllUsers,
  // getUserById,
  loadAvatar,
} from "../controllers/userController.js";
import authenticate from "../middleware/authenticate.js";
const upload = multer({ dest: "uploads/" });

const userRouter = express.Router();

userRouter.post("/register", registration);
userRouter.post("/login", login);
userRouter.get("/me", authenticate, (req, res) => {
  res.json({
    message: "Authenticated user info",
    user: req.user,
  });
});
userRouter.post("/logout", logout);
// userRouter.get("/activate/:link", activate);
// userRouter.get("/activate/:link", () => {});
// userRouter.get("/refresh", refresh);
// userRouter.get("/users", getAllUsers);


userRouter.patch("/:id", upload.single("avatar"), loadAvatar);
export default userRouter;