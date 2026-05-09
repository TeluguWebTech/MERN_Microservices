const Product = require("../models/Product");


exports.addProduct = async (req, res) => {
    try {
        const {
            name,
            price,
            desc
        } = req.body;
        // Create Product
        const product = await Product.create({
            name,
            price,
            desc,
            image: req.file? req.file.filename: null
        });

        res.status(201).json({
            success: true,
            message: "Product Added Successfully",
            product

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

exports.getProducts = async(req, res)=>{
    try {
        const products = await Product.find()
        res.status(201).json(products)
    } catch (error) {
        console.log(error)
    }
}