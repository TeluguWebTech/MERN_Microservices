const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    price:{
        type:Number
    }, 
    image:{
        type:String
    },
    desc:{
        type:String
    }
})
module.exports = mongoose.model("Product", productSchema)