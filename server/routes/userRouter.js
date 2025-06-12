import express from "express";
import multer from "multer";
import {
  registration,
  login,
  logout,
  activate,
  refresh,
  getAllUsers,
  // getUserById,
  updateUser,
} from "../controllers/userController.js";
import  authenticate from "../middleware/authenticate.js";
import { userValidationRules } from "../middleware/userValidator.js";

const upload = multer({ dest: "uploads/" });

const userRouter = express.Router();

userRouter.post("/register",registration);
userRouter.get("/activate/:link", activate);
userRouter.post("/login", userValidationRules, login);
userRouter.get("/me", authenticate, (req, res) => {
  res.json({
    message: "Authenticated user info",
    user: req.user,
  });
});
userRouter.post("/logout", logout);

userRouter.get("/refresh", refresh);
userRouter.get("/users", authenticate, getAllUsers);

userRouter.patch("/:id", upload.single("avatar"), updateUser);


export default userRouter;
