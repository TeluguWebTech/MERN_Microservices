const express = require("express")
const mongoose = require("mongoose")
const dotEnv = require("dotenv")
const cartRoutes = require("./routes/cartRoutes")

const app = express()
dotEnv.config()
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("cart_db connected")
})
.catch((err)=>{
    console.log(err)
})


const PORT = process.env.PORT || 8002;

app.use("/", cartRoutes)

app.listen(PORT, ()=>{
    console.log(`cart running @${PORT}`)
})