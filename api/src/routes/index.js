const { Router } = require('express');
const router = Router();

// const getProductsRouter = require("./products");
// const categoryRouter = require("./category");
// const userRouter= require("./user");
// const ordersRouter= require("./orders");


router.use("/products", require("./products"));
router.use("/category", require("./category"));
router.use("/users", require("./user"));
router.use("/orders", require("./orders"));
router.use('/cart', require('./cart.js'));

module.exports = router;