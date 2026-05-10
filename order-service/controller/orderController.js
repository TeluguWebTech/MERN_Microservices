const Order = require("../models/Order");
const {publishOrderEvent} = require('../kafka/producer')


exports.placeOrder = async (req, res) => {

    try {

        const userId = req.user.userId;

        const {
            email,
            productName,
            productPrice,
            quantity
        } = req.body;

        const totalAmount =
            productPrice * quantity;

        const order = await Order.create({

            userId,
            email,
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
