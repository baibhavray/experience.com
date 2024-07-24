const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");
const { ObjectID } = require("mongodb");
const config = require("../config/config");
const {
  ensureAuthorised,
  checkRequiredParams,
} = require("../controllers/requestHandlers");
const reviewsController = require("../controllers/reviewsController");

router.post("/add_rewiew", ensureAuthorised, async (req, res) => {
  try {
    const missingParam = checkRequiredParams(req.body, [
      "user_token",
      "review",
      "rating",
      "product_id",
    ]);
    if (missingParam) return res.json({ status: false, message: missingParam });

    const response = await reviewsController.add_rewiew(req.body);
    return res.json(response);
  } catch (er) {
    res.json({ status: false, message: config.response.FAILED + er });
  }
});

router.post("/get_reviews", ensureAuthorised, async (req, res) => {
  try {
    const missingParam = checkRequiredParams(req.body, [
      "user_token",
      "product_id",
    ]);
    if (missingParam) return res.json({ status: false, message: missingParam });

    const response = await reviewsController.get_reviews(req.body.product_id);
    return res.json(response);
  } catch (er) {
    res.json({ status: false, message: config.response.FAILED + er });
  }
});

module.exports = router;
