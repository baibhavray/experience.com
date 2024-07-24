const express = require("express");
const router = express.Router();
const config = require("../config/config");
const productController = require("../controllers/productsController");
const {
  checkRequiredParams,
  ensureAuthorised,
} = require("../controllers/requestHandlers");

router.post("/search_product", ensureAuthorised, async (req, res) => {
  try {
    const missingParam = checkRequiredParams(req.body, [
      "user_token",
      "product_name",
    ]);
    if (missingParam) return res.json({ status: false, message: missingParam });

    const response = await productController.search_product(
      req.body.product_name
    );
    return res.json(response);
  } catch (er) {
    res.json({ status: false, message: config.response.FAILED + er });
  }
});

module.exports = router;
