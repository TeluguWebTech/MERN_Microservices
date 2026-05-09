const Order = require("../models/Order");
const {publishOrderEvent} = require('../kafka/producer')


exports.placeOrder = async (req, res) => {

    try {

        // User From JWT Middleware
        const userId = req.user.userId;

        const {
            productId,
            productName,
            productPrice,
            quantity
        } = req.body;

        // Calculate Total
        const totalAmount = productPrice * quantity;

        // Create Order
        const order = await Order.create({
            userId,
            productId,
            productName,
            productPrice,
            quantity,
            totalAmount,
            orderStatus: "PLACED",
            paymentStatus: "PENDING"
        });
        await publishOrderEvent(order);
        res.status(201).json({

            msg: "Order placed successfully",

            order

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            msg: "Something went wrong"

        });

    }
};

// Get Orders
exports.getOrders = async (req, res) => {

    try {

        const orders = await Order.find();

        res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
    }
