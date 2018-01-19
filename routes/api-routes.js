var db = require("../models");

module.exports = function(app) {

  app.get("/users/:user", function(req, res) {

    console.log(req.params.user);

    db.user.findAll({
      where:{
        username: req.params.user
      }

    }).then(function(results) {

console.log(results)

      // console.log("found user data");
      // console.log(results);

      res.json(results);
    });

  });

  app.get("/friends/:user", function(req, res) {

    console.log(req.params.user);

    db.user.findAll({
      where: {
        username: req.params.user
      }
    }).then(function(results) {

      console.log(results[0])
      
      var friends = results[0].friends;
      if (friends === null) {
        db.user.findAll({})
          .then(function(res2) {
            var data = {
              names: res2
            }

            res.json({

              data
            })
          });
      }
      var friendsList = friends.split(",");
      var availableFriends = friends.split(",");
      availableFriends.push(results[0].username);
      var friends = friendsList.map(function(names) {
        var rObj = {};
        rObj.name = names;
        return rObj;
      });
      db.user.findAll({
          where: {
            username: {
              $notIn: availableFriends
            }
          }
        })
        .then(function(res2) {
          var data = {
            daty: friends,
            names: res2
          }

          res.json({
            data
          })
        })
    })
  });

  app.get("/notifications/:user", function (req ,res) {
    db.notification.findAll({
      where: {
        to: req.params.user
      }
    }).then(function (results) {
      res.json(results);
    })
  })

   app.post("/notification", function (req ,res) {

    console.log(req.body.data)

    db.notification.create({
      
      user: req.body.data.user,
      to: req.body.data.to,
      type: req.body.data.type

      }).then(function (results) {
      res.json(results);
    })
  })

   app.put("/delfriend", function(req, res) {


    // console.log(req.body);


    db.user.findAll({

      where: {

        username: req.body.data.user
      }

    }).then(function(results) {

      var friends = results[0].friends;

      // console.log(friends);

      var friendsList = friends.split(",");

      // console.log(friendsList);

      // for (var i = 0; i < friendsList.length; i++) {

      // console.log(friendsList[i]);
      // console.log(req.body.friend);

      // if (friendsList[i] === req.body.friend) {


      var number = friendsList.indexOf(req.body.data.friend);
      console.log(number);

      friendsList.splice(number, 1);
      // }

      // }

      var newList = friendsList.toString();

      console.log(newList);

      db.user.update({

        friends: newList

      }, {
        where: {

          username: req.body.data.user

        }
      })

    });

    res.end();
  });

}