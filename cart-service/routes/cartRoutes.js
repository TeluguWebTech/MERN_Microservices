
const express = require("express")
const controller = require("../controllers/cartController")
const middleware = require("../middleware/cartMiddleware")

const router = express.Router()

router.post("/add-to-cart", middleware.verifyToken,controller.addToCart )
router.get("/show-cart-items", middleware.verifyToken, controller.getCartItems)

module.exports = router;