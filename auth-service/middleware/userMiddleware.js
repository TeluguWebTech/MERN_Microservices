const jwt = require("jsonwebtoken")
const User = require("../models/User")

exports.authMiddleware = async(req, res, next)=>{
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(400).json({msg:"token missing"})
        }
        const token = authHeader.split(" ")[1];
        if(!token){
            return res.status(401).json({msg:"Invalid token"})
        }
        const decoded = jwt.verify(
            token, process.env.JWT_SECRET
        )
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({msg:"authentication failed"})
    }
}