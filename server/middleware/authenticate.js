import jwt from 'jsonwebtoken';
import 'dotenv/config.js';
import ErrorHandler from '../exceptions/errorHandlung.js';
import tokenService from '../service/token-service.js';

// const authenticate = (req, res, next) => {
//   const token = req.cookies.refreshToken;

//   if (!token) {
//     return next(ErrorHandler.UnauthorizedError("No refresh token provided"));
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
//     req.user = decoded;
//     console.log("Authenticated user:", req.user);
//     next();
//   } catch (err) {
//     console.log("Token verification failed:", err);
//    next(err);
//   }
// };
const authenticate = (req, res, next) => {
 
  try {
    const authorizedHeader = req.headers.authorization;
    if (!authorizedHeader) {
      return next(ErrorHandler.UnauthorizedError("No authorization header provided"));
    }
   const accessToken = authorizedHeader.split(" ")[1];
    if (!accessToken) {
      return next(ErrorHandler.UnauthorizedError("No access token provided"));
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ErrorHandler.UnauthorizedError("Invalid access token"));
    }
    req.user = userData;
    console.log("Authenticated user:", req.user);
    next();
  } catch (err) {
    next(err);
  }
};

export default authenticate;

