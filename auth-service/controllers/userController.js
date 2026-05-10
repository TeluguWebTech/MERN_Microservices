const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotEnv= require("dotenv")

dotEnv.config()
exports.userRegister = async(req, res)=>{
    const {username, email, password} = req.body;
    try {
        const userRecord = await User.findOne({email})

        if(userRecord){
           return res.status(400).json({
            msg:"email already exists"
           })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username, email, password:hashedPassword
        });
        res.status(201).json({msg:"user registered successfully"})
    } catch (error) {
        console.log(error)
    }
}

exports.userLogin = async(req, res)=>{
    const {email, password}=req.body;
    try {
        const user = await User.findOne({email})
        if(!user){
           return res.status(400).json({msg:"invalid credentials"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
           return res.status(400).json({msg:"invalid credentials"})
        }
        const token = jwt.sign(
            {userId:user._id}, process.env.JWT_SECRET, {expiresIn:"1d"}
        )
         res.status(201).json({msg:"Login success", username:user.username,token, 
            userId: user._id
         })
    } catch (error) {
        res.status(500).json({msg:"something wrong"})
    }
}
