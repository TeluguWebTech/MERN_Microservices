const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true
    },

    productId: {
        type: String,
        required: true
    },

    productName: {
        type: String,
        required: true
    },

    productPrice: {
        type: Number,
        required: true
    },

    quantity: {
        type: Number,
        required: true,
        min: 1
    },

    totalAmount: {
        type: Number,
        required: true
    },

    orderStatus: {
        type: String,
        enum: [
            "PENDING",
            "PLACED",
            "SHIPPED",
            "DELIVERED",
            "CANCELLED"
        ],
        default: "PENDING"
    },

    paymentStatus: {
        type: String,
        enum: [
            "PENDING",
            "SUCCESS",
            "FAILED"
        ],
        default: "PENDING"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);