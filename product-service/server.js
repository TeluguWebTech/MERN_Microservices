const express = require("express")
const mongoose = require("mongoose")
const dotEnv = require("dotenv")
const proRoutes = require("./routes/productRoutes")

const app = express();
const PORT = 4000;
const port = process.env.PORT | PORT;

dotEnv.config()
app.use(express.json())
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("product_db connected")
})
.catch((err)=>{
    console.log(err)
})
app.use("/uploads", express.static("uploads"));
app.use("/", proRoutes)

app.listen(PORT, ()=>{
    console.log(`server running @${PORT}`)
})