const config = require("../config/config");
const server = require("../config/db");

const { REVIEWS } = config.collection;
const { FAILED, ADDED, WARNING, FOUND, NOT_FOUND } = config.response;

module.exports = {
  add_rewiew: async (body) => {
    try {
      const { review = "", rating = 0, product_id, user_details } = body;
      const { _id } = user_details;

      let user_data = await server.collection(REVIEWS).insertOne({
        review,
        rating,
        product_id,
        user_id: _id,
      });

      if (user_data.value) return { status: false, message: WARNING };
      return { status: true, message: ADDED };
    } catch (er) {
      console.log(er);
      return { status: false, message: FAILED };
    }
  },

  get_reviews: async (product_id) => {
    try {
      let reviews = await server
        .collection(REVIEWS)
        .find({ product_id })
        .toArray();

      let total = reviews.length;
      if (total)
        return { status: true, message: FOUND, result: reviews, total };
      return { status: false, message: NOT_FOUND };
    } catch (er) {
      console.log(er);
      return { status: false, message: FAILED };
    }
  },
};
