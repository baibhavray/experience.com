const express = require("express");
const http = require("http");
const app = express();
const routes = require("./src/routes/index.js");
let config = require("./src/config/config");
let db = require("./src/config/db");
require("dotenv").config();

const server = http.createServer(app);
app.set("port", config.PORT);

db.connect((err) => {
  if (err) {
    console.log("Failed to connect to database. Exiting...");
    process.exit(1); // Exit the process with a failure code
  } else {
    server.listen(app.get("port"), function () {
      console.log("app is running on port " + app.get("port"));
    });
  }
});

app.use("/api", routes);
