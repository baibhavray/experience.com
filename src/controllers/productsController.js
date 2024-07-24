const config = require("../config/config");
const { es } = require("../config/elastic_search");

const { PRODUCTS } = config.index;
const { FAILED, FOUND, NOT_FOUND } = config.response;

module.exports = {
  search_product: async (product_name) => {
    try {
      const query = {
        regexp: {
          "product_name.keyword": {
            value: `.*${product_name}.*`,
            case_insensitive: true,
          },
        },
      };

      let products = await es.es.search({
        index: PRODUCTS,
        _source: true,
        body: {
          track_total_hits: true,
          from: 0,
          size: 10,
          _source: true,
          query,
        },
      });

      if (
        products?.body?.hits?.hits &&
        Array.isArray(products.body.hits.hits)
      ) {
        let result = products.body.hits.hits || [];
        let total = products?.body?.hits?.total?.value || 0;
        return {
          status: true,
          message: FOUND,
          result,
          total,
        };
      }
      return { status: false, message: NOT_FOUND };
    } catch (er) {
      console.log(er);
      return { status: false, message: FAILED };
    }
  },
};
