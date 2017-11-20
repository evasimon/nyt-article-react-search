const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/nytreact",
  {
    useMongoClient: true
  }
);

const db = require('./models')
// Article.create ({
//   title: "Macko Turelmetlen",
//   url: 'macko nem varja meg hogy cinaljam vegig'
// }).then((x) => console.log(x))
//   .catch(err => console.log(err));

// .then(dbModel => res.json(dbModel))

// routs
app.post("/api/saved", (req, res) => {
  // get the posted object
  var article = req.body;
  // write the obj to the databse
  db.Article
    .create(article)
    .then(() => {
      res.json(article)
    })
    .catch((err) => {
      res.json(err)
    })
})

app.get("/api/saved", (req, res) => {
  var article = req.body;
  db.Article
  .find(article)
  .then((data)=> res.json(data))
})

app.delete("/api/saved/:id", (req, res) => {
  // write the obj to the databse
  db.Article
    .findById({ _id : req.params.id})
    .then(article => article.remove())
    .then(article => res.json(article))
    .catch(err => res.json(err))
})

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function () {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
