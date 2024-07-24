const express = require("express");
const router = express.Router();

const userRouter = require("./userRoutes");
const reviewRouter = require("./reviewsRoutes");
const productRouter = require("./productsRoutes");

router.use("/users", userRouter);
router.use("/reviews", reviewRouter);
router.use("/procusts", productRouter);

module.exports = router;
