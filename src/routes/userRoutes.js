const express = require("express");
const router = express.Router();
const config = require("../config/config");
const {
  decryptPayload,
  checkRequiredParams,
} = require("../controllers/requestHandlers");
const userController = require("../controllers/userController");

router.post("/signup", decryptPayload, async (req, res) => {
  try {
    const missingParam = checkRequiredParams(req.body, [
      "name",
      "email",
      "password",
    ]);
    if (missingParam) return res.json({ status: false, message: missingParam });

    const response = await userController.signup(req.body);
    return res.json(response);
  } catch (er) {
    res.json({ status: false, message: config.response.FAILED + er });
  }
});

router.post("/login", decryptPayload, async (req, res) => {
  try {
    const missingParam = checkRequiredParams(req.body, ["email", "password"]);
    if (missingParam) return res.json({ status: false, message: missingParam });

    const response = await userController.login(req.body);
    return res.json(response);
  } catch (er) {
    res.json({ status: false, message: config.response.FAILED + er });
  }
});

module.exports = router;
