import User from '../models/User.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config.js';
import ErrorHandler from '../middleware/errorHandlung.js';
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

 

    const newUser=await User.create({
      name: sanitizedName,
      email: sanitizedEmail,
      password: hashedPW,
      role: isAdmin ? 'admin' : 'user',
    });
   
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
export { registration, login ,logout };




