const config = require("../config/config");
const server = require("../config/db");
const CryptoJS = require("crypto-js");

const { USERS } = config.collection;
const { INVALID_USER } = config.response;

module.exports = {
  ensureAuthorised: (req, res, next) => {
    try {
      let body = CryptoJS.AES.decrypt(req.body.data, config.JWT_SECRET);
      req.body = JSON.parse(body.toString(CryptoJS.enc.Utf8));
      if (req.body.hasOwnProperty("user_token")) {
        if (req.body["user_token"] === "" || req.body["user_token"] === null) {
          res.json({ status: false, message: INVALID_USER });
        } else {
          server
            .collection(USERS)
            .findOne({ user_token: req.body["user_token"] }, (err, doc) => {
              if (err) res.json({ status: false, message: INVALID_USER });
              else {
                if (doc) {
                  req.body.user_details = doc;
                  next();
                } else res.json({ status: false, message: INVALID_USER });
              }
            });
        }
      } else {
        res.json({
          status: false,
          message: "user_token parameter is missing",
        });
      }
    } catch (error) {
      res.json({
        status: false,
        message: config.response.ERROR_VALIDATING_USER + error,
      });
    }
  },

  decryptPayload: (req, res, next) => {
    try {
      let body = CryptoJS.AES.decrypt(req.body.data, config.JWT_SECRET);
      req.body = JSON.parse(body.toString(CryptoJS.enc.Utf8));
      next();
    } catch (error) {
      res.json({ status: false, message: "error decrypting data" + error });
    }
  },

  checkRequiredParams: (body, params = []) => {
    const missingParam = params.find((param) => !body.hasOwnProperty(param));
    if (missingParam) return missingParam + " param is missing";
    else return null;
  },
};
