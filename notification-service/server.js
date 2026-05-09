const express = require("express")
const dotEnv = require("dotenv")

dotEnv.config()
const connectConsumer = require("./kafka/consumer")
const app = express()

const PORT = 8004;

connectConsumer()
app.listen(PORT,()=>{
    console.log(`notification running@${PORT}`)
})
