
const jwt = require("jsonwebtoken")

exports.verifyToken = async(req, res,next)=>{
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(400).json({msg:"Token required"})
        }
        const token = authHeader.split(" ")[1];
        if(!token){
            return res.status(401).json({msg:"invalid token"})
        }
        const decoded = jwt.verify(
            token, process.env.JWT_SECRET
        )
        req.user = decoded;
        next()
    } catch (error) {
        res.status(401).json({msg:"authentication failed"})
    }
}