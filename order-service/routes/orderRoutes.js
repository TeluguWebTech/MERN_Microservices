const express = require("express")
const middleware = require("../middleware/orderMiddleware")
const controller = require("../controller/orderController")

const router = express.Router()

router.post("/place-order", middleware.verifyToken, controller.placeOrder)


module.exports = router;