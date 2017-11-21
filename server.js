const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require("./routes")

// serves up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// configures body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// sets up promises with mongoose
mongoose.Promise = global.Promise;

// connects to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/nytreact",
  {
    useMongoClient: true
  }
);

// adds routes, both API and view
app.use(routes);

// connects to server with PORT
app.listen(PORT, function () {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
