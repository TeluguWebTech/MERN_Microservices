const Cart = require("../models/Cart")

exports.addToCart = async (req, res) => {

    const userId = req.user.userId;

    const {
        productId,
        productName,
        productPrice,
        quantity
    } = req.body;

    try {

        const existingCartItem = await Cart.findOne({
            userId,
            productId
        });

        if (existingCartItem) {

            existingCartItem.quantity += quantity || 1;

            await existingCartItem.save();

            return res.status(200).json({
                msg: "Cart quantity updated"
            });
        }

        await Cart.create({
            userId,
            productId,
            productName,
            productPrice,
            quantity
        });

        res.status(201).json({
            msg: "Product added to cart"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            msg: "Something went wrong"
        });

    }
};

exports.getCartItems = async(req, res)=>{
    try {
        const userId = req.user.userId;
        const cartItems = await Cart.find({userId})
        res.status(200).json({cartItems})
    } catch (error) {
        console.log(error)
          res.status(500).json({
            msg: "Something went wrong"
        });
    }
}
