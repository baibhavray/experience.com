const jwt = require("jsonwebtoken");
const config = require("../config/config");
const server = require("../config/db");

const { JWT_SECRET } = config;
const { USERS } = config.collection;
const { FAILED, ADDED, WARNING, LOGIN_SUCCESS, LOGIN_FAILED } = config.response;

module.exports = {
  signup: async (body) => {
    try {
      const { name, email, password } = body;
      const user_exists = await server.collection(USERS).findOne({ email });

      if (user_exists) return { status: true, message };
      else {
        const user_token = jwt.sign(email, JWT_SECRET, {});
        const hashedPassword = jwt.sign(password, JWT_SECRET);

        let user_data = await server.collection(USERS).insertOne({
          name,
          email,
          password: hashedPassword,
          user_token,
        });
        if (user_data.insertedId)
          return {
            status: true,
            message: ADDED,
            result: { user_id: user_data.insertedId },
          };
        else return { status: false, message: WARNING };
      }
    } catch (er) {
      console.log(er);
      return { status: false, message: FAILED };
    }
  },

  login: async (body) => {
    try {
      const { email, password } = body;
      const hashedPassword = jwt.sign(password, JWT_SECRET);
      const user_token = jwt.sign(email, JWT_SECRET, {});

      let user_data = await server
        .collection(USERS)
        .findOneAndUpdate(
          { email, password: hashedPassword },
          { $set: { user_token } }
        );

      if (user_data.value) return { status: false, message: LOGIN_FAILED };
      return { status: true, message: LOGIN_SUCCESS, result: user_data };
    } catch (er) {
      console.log(er);
    }
  },
};
