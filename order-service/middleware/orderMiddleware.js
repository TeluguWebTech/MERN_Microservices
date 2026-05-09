
const jwt = require("jsonwebtoken")

exports.verifyToken = async(req, res, next)=>{
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json("token required")
        }
        const token = authHeader.split(" ")[1];
        if(!token){
            return res.status(401).json("invalid token")
        }
        const decoded = jwt.verify(
            token, process.env.JWT_SECRET
        )
        req.user = decoded;
        next()
    } catch (error) {
        console.log(error)
    }
}