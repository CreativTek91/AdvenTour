import User from "../models/User.js";
import ErrorHandler from "../exceptions/errorHandlung.js";
import bcrypt from "bcrypt";
import "dotenv/config.js";
import { v4 as uuidv4 } from "uuid";
import mailService from "../service/mail-service.js";
import tokenSevice from "./token-service.js";
import UserDTO from "../dtos//user-dto.js";


class UserService {
  async registration(name, email, password) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw ErrorHandler.RegistrationError("User with this email already exists");
    }
    const isAdmin =
      (email === process.env.ADMIN_EMAIL1 &&
        password === process.env.ADMIN_PASSWORD1) ||
      (email === process.env.ADMIN_EMAIL2 &&
        password === process.env.ADMIN_PASSWORD2)
        ? true
        : false;

    const hashedPW = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    const activationLink = uuidv4(); // Generate a unique activation link
    const newUser = await User.create({
      name,
      email,
      password: hashedPW,
      role: isAdmin ? "admin" : "user",
      activationLink: activationLink
    });

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );

    const userDto = new UserDTO(newUser);
    const tokens = tokenSevice.generateTokens({ ...userDto });
    await tokenSevice.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens,user:userDto };
  }

  async activate(activationLink) {
    const user = await User.findOne({activationLink});
    if (!user) {
      throw ErrorHandler.BadRequestError('Invalid activation link');
    }
    user.isActivated = true;
    user.activationLink = null; // Clear activation link after activation
    await user.save();
  }
 
  async login(email, password) {
    if (!email || !password) {
      throw ErrorHandler.ValidationError("Email and password are required!");
    }
    const foundUser = await User.findOne({ email: email }).populate("avatar");
    if (!foundUser)
      throw ErrorHandler.NotFoundError("User with this email not found!");

    const isMatchPW = await bcrypt.compare(password, foundUser.password);
    if (!isMatchPW)
     { throw ErrorHandler.NotAcceptableError("Invalid credentials!");}

    const userDto = new UserDTO(foundUser);
    const tokens = tokenSevice.generateTokens({ ...userDto });
    await tokenSevice.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
  async logout(refreshToken) {
  const token = await tokenSevice.removeToken(refreshToken);
    return token;
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ErrorHandler.UnauthorizedError("User is not authorized!");
    }
    const userData = tokenSevice.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenSevice.findToken(refreshToken);
    if (!userData || !tokenFromDB) {
      throw ErrorHandler.UnauthorizedError("User is not authorized!");
    }
    // Find user ,because userdata for 30d can be changed
    const user = await User.findById(userData.id).populate("avatar");
    if (!user) {
      throw ErrorHandler.NotFoundError("User not found!");
    }
    const userDto = new UserDTO(user);
    const tokens = tokenSevice.generateTokens({ ...userDto });
    await tokenSevice.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
  async getAllUsers() {
    const users = await User.find().populate("avatar");
    return users.map(user => new UserDTO(user));
  }
 
}
export default new UserService();