import 'dotenv/config.js';
import ErrorHandler from '../exceptions/errorHandlung.js';
import tokenService from '../service/token-service.js';


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
  
    next();
  } catch (err) {
    next(err);
  }
};

export default authenticate;

