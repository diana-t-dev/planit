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

require("./routes/api-routes.js")(app);

require("./routes/html-routes.js")(app);

server = db.sequelize.sync({
}).then(function() {
  app.listen(PORT, function() {
    console.log("Party App listening on PORT " + PORT);
  });
});

var socket = require('socket.io');
 io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id, "SOCKET CONNECTED!!");

     socket.on('SEND_MESSAGE', function(data){

        io.emit('RECEIVE_MESSAGE', data);

      });

});




