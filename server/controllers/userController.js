import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";
import userService from "../service/user-service.js";
import Media from "../models/Media.js";
import validator from "validator";
import "dotenv/config.js";
import ErrorHandler from "../exceptions/errorHandlung.js";
import UserDTO from "../dtos/user-dto.js";


const registration = async (req, res,next) => {
  try{
  console.log("SERVER:REGISTRATION:Request body:", req.body);
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
    console.log("SERVER:REGISTRATION:User data:", userData);
      res.cookie("refreshToken", userData.refreshToken, {
              httpOnly: true,
              secure: false, // Set to true in production
              sameSite: "Lax",
              maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            });
      return res.status(201).json({
        message: "Check your EMAIL! Please follow the link and  activate your account!",
        userData,
      });
  }catch (error) {
  next(error);
  }
  
};
const activate = async (req, res, next) => {
  try {
    const activationLink = req.params.link;
   await userService.activate(activationLink);
   return res.redirect(
      `${process.env.CLIENT_URL}/register?message=Account activated successfully! You can now log in.&isActivated=true`
    );
  } catch (error) {
    next(error);
  }
};

const login = async (req, res,next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw ErrorHandler.BadRequestError('LOGIN: Email and password are required!');
  }
  try {
    const sanitizedEmail = validator.escape(email);
    const sanitizedPassword = validator.escape(password);
    const userData = await userService.login(sanitizedEmail, sanitizedPassword);
  
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

const updateUser = async (req, res,next) => {
  const name = req.body.name;

if(name && !validator.isLength(name, { min: 2, max: 30 })) {
  throw ErrorHandler.ValidationError(
    "Name must be between 2 and 30 characters long"
  );
}

  const { id } = req.params;
  const opt = { runValidators: true, new: true };
  try {
    const user = await User.findById({_id: id});
    console.log("SERVER:LOAD_AVATAR:User found:", user);
    if (!user) {
      throw ErrorHandler.NotFoundError(  );
    }
    if (name) {
      user.name = name;
    }
    const { file } = req;
    if (!file && !name) {
      console.log("SERVER:LOAD_AVATAR:No file or name provided");
      throw ErrorHandler.NotFoundError('Image not upload or name is missing');
    }
    if(file) {
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
  }
   
    await user.save(opt);
    const updatedUser = await User.findById(user._id).populate("avatar");
   const userData=new UserDTO(updatedUser);
    res.status(200).json({
      message: "Image loaded successfully",
      user: userData,
    });
  } catch (error) {
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

const refresh = async (req, res,next) => {
  try{
const { refreshToken } = req.cookies.refreshToken;
const userData = await userService.refresh(refreshToken);
res.cookie("refreshToken", userData.refreshToken, {
  httpOnly: true,
  secure: false, // Set to true in production
  sameSite: "Lax",
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
});
  }catch(error) {
    next(error);
  }
 
};

export { registration, login, logout, updateUser, getUserById, activate, refresh, getAllUsers};



