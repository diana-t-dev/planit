var db = require("../models");

module.exports = function(app) {

  app.get("/users/:user", function(req, res) {

    console.log(req.params.user);

    db.user.findAll({
      where:{
        username: req.params.user
      }

    }).then(function(results) {


      // console.log("found user data");
      // console.log(results);

      res.json(results);
    });

  });

  app.get("/friends/:user", function(req, res) {


    db.user.findAll({
      where: {
        username: req.params.user
      }
    }).then(function(results) {

      
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

    db.notification.create({
      
      user: req.body.data.user,
      userId: req.body.data.ids,
      to: req.body.data.to,
      type: req.body.data.type

      }).then(function (results) {
      res.json(results);
    })
  })

  app.post('/friends/update/:userId', function (req, res) {
    db.user.findAll({
      where: {
        id: req.params.userId
      }
    }).then((results) => {
      // transform string to array
      let data = results[0].dataValues.friends;
      console.log("friends column***** " + data);
      
      if (data && data !== null) {
        let friends = results[0].dataValues.friends.split(', ');
        // add new friend to array
        let newFriend = req.body.friendId.toString();
        if (friends.includes(newFriend)) {
          res.end();
        }
        else {
          friends.push(newFriend);
          // send data back to db as string
          friends = friends.join(', ');

          db.user.update({
            friends: friends
            },
            {
              where: {
                id: req.params.userId
              }
            }).then((data) => {
              res.send('friends updated');
            })
        }
      }
      else {
        let newFriend = req.body.friendId.toString();
        console.log("new friend: " + newFriend);
        db.user.update({
          friends: newFriend
          },
          {
            where: {
              id: req.params.userId
            }
          }).then((data) => {
            res.send('friends updated');
          })
      }
      
      
      
    })
  })


  app.delete('/notifications/delete/:id', function (req, res) {
    db.notification.destroy({
      where: {
        id: req.params.id
      }
    }).then((results) => {
      res.send('deleted notification');
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

      friendsList.splice(number, 1);
      // }

      // }

      var newList = friendsList.toString();


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

  app.get("/user/:id", function(req, res) {


    db.user.findOne({
      where:{
        usernameId: req.params.id
      }

    }).then(function(results) {

      res.json(results);
    });

  });

  app.post("/newUser", function(req, res) {


    db.user.create({
      username: req.body.newUser.username,
      usernameId: req.body.newUser.usernameId,
      image: req.body.newUser.image

    }).then(function(results) {


      res.json(results);
    });

  });


}