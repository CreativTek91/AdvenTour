import jwt from "jsonwebtoken";
import 'dotenv/config.js';

const JWT_SECRET = process.env.JWT_SECRET;
const authenticate = async (req, res, next) => {
try{
    const token = req.cookies.token;
    if (!token) {
        return next({
            status: 401,
            message: "Unauthorized",
        });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
     res.json({ 
        success: true,
        message: "User authenticated successfully!"
    });
}catch(err){
    console.log(err);
    next(err);
}

}
export default authenticate;