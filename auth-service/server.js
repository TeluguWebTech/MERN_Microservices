const express = require("express")
const mongoose = require("mongoose")
const dotEnv = require("dotenv")
const userRoutes = require("./routes/userRoutes")

const app = express();
dotEnv.config()
app.use(express.json())

const PORT = 8001;

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("user_db connected")
})
.catch((err)=>{
    console.log(err)
})

app.use("/", userRoutes)

app.get('/home',(req, res)=>{
    res.send("home page test")
})

app.listen(PORT, ()=>
    console.log(`User server running @${PORT}`)
)