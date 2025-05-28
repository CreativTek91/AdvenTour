import User from '../models/User.js';
import cloudinary from "../config/cloudinary.js";
import Media from "../models/Media.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config.js';
import ErrorHandler from '../middleware/errorHandlung.js';
import { v4 as uuid } from 'uuid';
import sendActivationMail from '../middleware/sendActivationMail.js';

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;
const JWT_SECRET = process.env.JWT_SECRET;

const registration = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required!" });
  }
console.log("req.body_register", req.body);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).
        json(ErrorHandler.ConflictError().message);
    }
   const isAdmin =
  (email === process.env.ADMIN_EMAIL1 &&
    password === process.env.ADMIN_PASSWORD1) ||
  (email === process.env.ADMIN_EMAIL2 &&
    password === process.env.ADMIN_PASSWORD2)
    ? true
    : false;
    const sanitizedName = validator.escape(name);
    const sanitizedEmail = validator.escape(email);
 
    if (!validator.isLength(sanitizedName, { min: 2, max: 30 })) {
      return res.status(400).json({ error: "Name must be between 2 and 30 characters long" });
    }
    if (!validator.isEmail(sanitizedEmail)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    if (!validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })) {
      return res.status(400).json({
        error: "Password must be strong: 8+ chars incl. uppercase, lowercase, number & symbol."
      });
    }

    const hashedPW = await bcrypt.hash(password, SALT_ROUNDS);
    const activationLink = uuid.v4(); // Generate a unique activation link
 

    const newUser=await User.create({
      name: sanitizedName,
      email: sanitizedEmail,
      password: hashedPW,
      role: isAdmin ? 'admin' : 'user',
      activationLink: activationLink,
    });
   await sendActivationMail(sanitizedEmail, activationLink);
    res.status(201).json({message: "User registered successfully!",name:newUser.name,role:newUser.role });

  } catch (error) {
    res.status(500).json({
    error: error.message
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const sanitizedEmail = validator.escape(email);
    const sanitizedPassword = validator.escape(password);
   
    const foundUser = await User.findOne({ email: sanitizedEmail });
    if (!foundUser)
      return res.status(404).json({ error: "You have to register first!" });

    const isMatchPW = await bcrypt.compare(sanitizedPassword, foundUser.password);
    if (!isMatchPW)
      return res.status(401).json(ErrorHandler.UnauthorizedError().message);

    const user = foundUser.toObject();
    delete user.password;

    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '30d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 2592000000,
    }).status(200).json({
      success: true,
      message: 'User logged in successfully',
      user: user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error logging in user',
      error: error.message,
    });
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie('token').status(200).json({
      message: 'User logged out successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error logging out user'
    });
  }
};

// const tokenData = await Token.findOne({ user: userId });
// if (tokenData) {
//   tokenData.refreshToken = refreshToken;
//   return await tokenData.save();
// }



const updateUser = async (req, res) => {
  const { id } = req.params;
  const {name} = req.body;
  const opt= { runValidators: true, new: true };

  let media = null;
  try {
    const user = await User.findById({_id: id });
    if (!user) {
      return res.status(404).json(ErrorHandler.NotFoundError().message);
    }
   console.log(user);
    const { file } = req;
    if(file){
      // const result = await cloudinary.uploader.upload(file.path, {
      //   resource_type: "image",
      //   folder: "adventour_avatars",
      // });
      //  media = new Media({
      //   public_id: result.public_id,
      //   url: result.secure_url,
      //   type: "image",
      // });
     
    }
    
    // await media.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed", error });
  }
};
const activate = async (req, res) => {
  const { link } = req.params;
  try {
    const user = await User.findOne({ activationLink: link });
    if (!user) {
      return res.status(404).json({ error: "Invalid activation link" });
    } 
    user.isActive = true; 
    await user.save();

    res.status(200).json({ message: "User activated successfully" });
  }
  catch (error) {
    console.error("Activation error:", error);
    res.status(500).json({ error: "Error activating user" });
  }
}
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select('-password');
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  }
  catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
}
const refresh = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded._id).select('-password');
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const newToken = jwt.sign(user.toObject(), JWT_SECRET, { expiresIn: '30d' });
    res.cookie('token', newToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 2592000000,
    }).status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      user: user,
    });
  } catch (error) {
    res.status(500).json({ error: "Error refreshing token" });
  }
};

export { registration, login ,logout, updateUser,activate, refresh, getAllUsers, getUserById };




