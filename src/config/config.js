require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 8000,
  JWT_SECRET: process.env.JWT_SECRET,
  DATABASE: process.env.DATABASE,

  collection: {
    USERS: "users",
    REVIEWS: "reviews",
  },

  index: {
    PRODUCTS: "products",
  },

  response: {
    FOUND: "Data(s) found.",
    NOT_FOUND: "No data found.",
    FAILED: "Error occured. Try again.",
    WARNING: "Something went wrong",
    UPDATED: "Data updated successfully.",
    LOGIN_SUCCESS: "You are successfully logged in",
    LOGIN_FAILED: "Wrong email or password.",
    USER_EXISTS: "Email already exists, please try with another one.",
    ADDED: "Data added successfully.",
    INVALID_USER:"Invalid user"
  },
};
