const express = require("express")
const mongoose = require("mongoose")
const dotEnv = require("dotenv")
const orderRoutes = require("./routes/orderRoutes")
const {connectProducer} = require("./kafka/producer")

const app = express()
dotEnv.config()
app.use(express.json())

const PORT = process.env.PORT || 8003;
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("order_db connected")
})
.catch((error)=>{
    console.log(error)
})

connectProducer();
app.use("/", orderRoutes)

app.listen(PORT, ()=>{
    console.log(`order started @${PORT}`)
})
