if (typeof ReadableStream === "undefined") {
  global.ReadableStream = require("web-streams-polyfill").ReadableStream;
}
const { Client } = require("@elastic/elasticsearch");

const es = new Client({
  node:
    "http://" +
    process.env.ELASTIC_USER +
    ":" +
    process.env.ELASTIC_PASSWORD +
    "@" +
    process.env.ELASTIC_URL +
    ":" +
    process.env.ELASTIC_PORT,
});

module.exports = {
  es,
};
