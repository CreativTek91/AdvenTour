import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";
import userService from "../service/user-service.js";
import Media from "../models/Media.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
import ErrorHandler from "../exceptions/errorHandlung.js";


const registration = async (req, res,next) => {
  try{
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required!" });
    }
        const sanitizedName = validator.escape(name);
        const sanitizedEmail = validator.escape(email);
    
        if (!validator.isLength(sanitizedName, { min: 2, max: 30 })) {
          throw ErrorHandler.ValidationError(
             "Name must be between 2 and 30 characters long"
          );
        }
        if (!validator.isEmail(sanitizedEmail)) {
          throw new Error({ error: "Invalid email format" });
        }
        if (
          !validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          })
        ) {
          throw ErrorHandler.ValidationPasswordError(
            "Password must be strong: 8+ chars incl. uppercase, lowercase, number & symbol."
          );
        }
    
      const userData =  await userService.registration(sanitizedName ,sanitizedEmail, password);
      console.log("User data:", userData);
      res.cookie("refreshToken", userData.refreshToken, {
              httpOnly: true,
              secure: false, // Set to true in production
              sameSite: "Lax",
              maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            });
      return res.status(201).json({
        message: "Check your EMAIL! Please follow the link and  activate your account!",
      });
  }catch (error) {
  next(error);
  }
  
};
const activate = async (req, res, next) => {
  try {
    console.log("ACTIVATION_REQUEST:", req.params);
    const activationLink = req.params.link;
console.log("ACTIVATION_LINK:", activationLink);
   await userService.activate(activationLink);
 return res.redirect(
      `${process.env.CLIENT_URL}/?activation=success`
    );
    // res.status(200).json({ message: "User activated successfully!" });
   console.log("test")
  } catch (error) {
    console.error("Activation error:", error);
    next(error);
  }
};

const login = async (req, res,next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw ErrorHandler.BadRequestError();
    // return res.status(400).json({ error: "Email and password are required!" });
  }
  try {
    const sanitizedEmail = validator.escape(email);
    const sanitizedPassword = validator.escape(password);
    const userData = await userService.login(sanitizedEmail, sanitizedPassword);
    console.log("User data:", userData);
    res.cookie("refreshToken", userData.refreshToken, {
      httpOnly: true,
      secure: false, // Set to true in production
      sameSite: "Lax",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
   return res.status(200).json({
      message: "User logged in successfully!",
     userData});
  } catch (error) {
    next(error);
 
  }
};
const logout = async (req, res,next) => {
  try {
    const {refreshToken} = req.cookies;
    const token = await userService.logout(refreshToken);
    res.clearCookie("refreshToken").status(200).json({
      message: "User logged out successfully",token
    });
  } catch (error) {
    next(error);
  }
};

const loadAvatar = async (req, res,next) => {
  console.log("LOAD_AVATAR_REQUEST:", req.params);
  const { id } = req.params;
  const opt = { runValidators: true, new: true };
  try {
    const user = await User.findById({_id: id});
    if (!user) {
      throw ErrorHandler.NotFoundError(  );
    }
    const { file } = req;
    if (!file) {
      throw ErrorHandler.NotFoundError( );
    }
    if (!user.avatar) {
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: "image",
        folder: "adventour_avatars",
      });
      const media = new Media({
        public_id: result.public_id,
        url: result.secure_url,
        type: "image",
      });
      await media.save(); 
      user.avatar = media._id;
    } else {
      const media = await Media.findById(user.avatar);
      if (media?.public_id) {
        const result = await cloudinary.uploader.upload(file.path, {
          public_id: media.public_id,
          invalidate: true,
        });
        media.url = result.secure_url;
        await media.save(); 
      }
    }
    await user.save(opt);
    const updatedUser = await User.findById(user._id).populate("avatar");
    updatedUser.password = 'SECRET'; 
    res.status(200).json({
      message: "Image loaded successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Upload failed", error);
  next(error);
  }
};

const getUserById = async (req, res,next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate("avatar");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
   
    res.status(200).json(user);
  } catch (error) {
   next(error);
  }
};



const getAllUsers = async (req, res,next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
   next(error);
  }
};

const refresh = async (req, res) => {
  try{
const { refreshToken } = req.cookies;
const userData = await userService.refresh(refreshToken);
console.log("User data:", userData);
res.cookie("refreshToken", userData.refreshToken, {
  httpOnly: true,
  secure: false, // Set to true in production
  sameSite: "Lax",
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
});
  }catch(error) {
    console.error("Refresh token error:", error);
    next(error);
  }
 
};
export { registration, login, logout, loadAvatar, getUserById, activate, refresh, getAllUsers };



