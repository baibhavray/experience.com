let config = require("./config");
const { MongoClient } = require("mongodb");

const { DATABASE } = config;
let client = null;

const connect = async (callback) => {
  try {
    client = new MongoClient(DATABASE);
    await client.connect();
    console.log("Connected to database");
    callback(null);
  } catch (err) {
    console.error("Error connecting to database:", err);
    callback(err);
  }
};

function collection(name) {
  return client.db().collection(name);
}

function close() {
  if (client) {
    client.close();
  }
}

module.exports = {
  connect,
  collection,
  close,
};
