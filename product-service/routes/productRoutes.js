const express = require("express")
const proController = require("../controllers/productController")
const upload = require("../middleware/multer")

const router = express.Router()

router.post("/add-product", upload.single("image"), proController.addProduct)
router.get("/show-products", proController.getProducts)
router.get('/single-product/:id', proController.productById)

module.exports = router;