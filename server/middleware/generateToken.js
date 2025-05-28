import jwt from 'jsonwebtoken';
import 'dotenv/config.js';
import Token from '../models/Token.js';
const generateToken = (payload)=> {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn:'30m'});
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn:'30d'});
    return { accessToken, refreshToken };
}

const saveToken = async (userId, refreshToken) => {
    try {
        const tokenData = await Token.findOne({ user: userId });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return await tokenData.save();
        }
        const newToken = new Token({ user: userId, refreshToken });
        return await newToken.save();
    }
    catch (error) {
        console.error("Error saving token:", error);
        throw new Error("Token save failed");
    }
}
export { generateToken, saveToken };