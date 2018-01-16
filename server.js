var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var fs = require('fs');
var path = require("path");
var PORT = process.env.PORT || 3001;

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var db = require("./models");

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("client/build"));

mongoose.Promise = Promise;

if (process.env.MONGODB_URI){

mongoose.connect(process.env.MONGODB_URI);

} else{

mongoose.connect("mongodb://localhost/clickgamedb", {

});

}

server = app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});

var socket = require('socket.io');
 io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id, "SOCKET CONNECTED!!");

     socket.on('SEND_MESSAGE', function(data){

        io.emit('RECEIVE_MESSAGE', data);

      });

});

app.get("/users", function(req, res) {

  console.log("test");

db.User
    .find({})
    .then(function(user) {
      
      console.log(user);
      console.log("got all users");

      res.json({user});
    })
});

app.post('/user', function(req, res){

console.log("test");
console.log(req.body);

 db.User.create({ 

  user: req.body.user,
  score: req.body.score

 })
    .then(function(user) {
        console.log(user);
        console.log("updated");
        // console.log(dbNote);
      // If we were able to successfully update an Article, send it back to the client
      res.json(user);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});


app.get("/", function(req, res){

  res.render("index.html");
})


