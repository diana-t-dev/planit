var express = require("express");
var bodyParser = require("body-parser");
var axios = require("axios");
var path = require("path");
var PORT = process.env.PORT || 3001;

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var db = require("./models");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("client/build"));

require("./routes/api-routes.js")(app);

require("./routes/html-routes.js")(app);

var socket = require('socket.io');

 db.sequelize.sync({})

 server = app.listen(PORT, function() {
    console.log("Party App listening on PORT " + PORT);
});

io = socket(server);

io.on('connection', (socket) => {

    console.log(socket.id, "SOCKET CONNECTED!!");
   

     socket.on('SEND_MESSAGE', function(data){

console.log("CHAT DATA ", data);

   db.chat.create({
      name: data.name,
      text: data.chat,
      image: data.image,
      channelId: data.room

     	})

	io.emit('RECEIVE_MESSAGE', data);
  
      });

 });



