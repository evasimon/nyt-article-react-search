const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3001;
const routes = require("./routes")
const app = require('express')();

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

// integrates socket.io
const http = require('http').Server(app);
// initializes a new instance of socket.io
// by passing the http (the HTTP server) object
const io = require('socket.io')(http);
// listens on the connection event for incoming sockets,
//  and logs it to the console.
io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('articleSaved', function (title) {
    console.log('article title saved: ' + title);
    // sends article title to everyone except for a certain socket
    // uses broadcast flag
    socket.broadcast.emit('article', title);
  });
  // // Each socket also fires a special disconnect event
  // socket.on('disconnect', function () {
  //   console.log('user disconnected');
  // });
});

// connects to server with PORT
http.listen(PORT, function () {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
