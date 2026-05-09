const express = require("express");
const cors = require("cors");
const dotEnv = require("dotenv");

const {
    createProxyMiddleware
} = require("http-proxy-middleware");

const app = express();

dotEnv.config();

app.use(cors());



const PORT = process.env.PORT || 9000;

// Test Route
app.get("/", (req, res) => {
    res.send("API Gateway Running");
});

// Logger Middleware
app.use((req, res, next) => {

    console.log("================================");
    console.log("METHOD :", req.method);
    console.log("URL :", req.originalUrl);

    next();

});

// Product Service Proxy
app.use(
    "/api/products",
    createProxyMiddleware({
        target: process.env.PRODUCT_SERVICE_URL,
        changeOrigin: true
    })
);

// Auth Service Proxy
app.use(
    "/api/auth",
    createProxyMiddleware({
        target: process.env.AUTH_SERVICE_URL,
        changeOrigin: true
    })
);

// Cart Service Proxy
app.use(
    "/api/cart",
    createProxyMiddleware({
        target: process.env.CART_SERVICE_URL,
        changeOrigin: true
    })
);

// Order Service Proxy
app.use(
    "/api/order",
    createProxyMiddleware({
        target: process.env.ORDER_SERVICE_URL,
        changeOrigin: true
    })
);

app.listen(PORT, () => {

    console.log(`API Gateway running @${PORT}`);

});