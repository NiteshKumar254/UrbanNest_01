

// change 1
import JWT from 'jsonwebtoken';
import User from '../models/User.js';

export const requireSignIn = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res
                .status(401)
                .send({ success: false, message: "Authorization header is missing" });
        }
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;
        if (!token) {
            return res
                .status(401)
                .send({ success: false, message: "No token provided" });
        }
        const decode = JWT.verify(token, process.env.JWT_SECRET);
        
        if (!decode?._id) {
            return res
                .status(401)
                .send({ success: false, message: "Token does not contain user ID" });
        }
        req.user = decode;
        next();
    } catch (error) {
        console.error("JWT verification error:", error.message);
        return res.status(401).send({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

export const isAdmin = async (req, res, next) => {
    try {
        const userId = req.user?._id; 
        if (!userId){
            return res.status(401)
            .send({success:false, message:"No user if found in token"});
        }
        const user=await User.findById(userId);
        if(!user){
            return res.status(404)
            .send({success:false, message:"User not found in databse"});
        }
        if (user?.role !== 'admin') {
            return res.status(401).send( {
                success:false,
                message:"unauthorized access",
            });
        }
        next();
    } catch (error) {
        console.error("Error in admin middleware: " , error);
        res.status(401).send({
            success:false,
            message:"Error in admin middleware",
        });
    }
}