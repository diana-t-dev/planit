var db = require("../models");

module.exports = function(app) {

  app.get("/users/:user", function(req, res) {

    db.user.findAll({
      where:{
        username: req.params.user
      }

    }).then(function(results) {

      res.json(results);
    });

  });

  app.get("/friends/:userid", function(req, res) {

    // find all users that aren't the current user and the current user's friends
    db.user.findAll({
      where: {
        usernameId: {
          $ne: req.params.userid
        }
      }
    }).then(function(results) {

      var userList = results.map( users => users.username );

      // find all friends to render in table
      db.user.findAll({
          where: {
            usernameId: req.params.userid
          }
        })
        .then(function(data) {

      // if user doesn't have any friends, send all user data back
      if (data[0].friends === null) {

        var data = {
          names: userList
        }

            res.json({data})
          
      }
      // else, render user's friends
      else {
        var friendsList = data[0].friends.split(", ");
        var idList = friendsList.map( id => parseInt(id) );

        db.user.findAll({
          where: {
            id: {
              $in: idList
            }
          }
        }).then( function(list){
          var friends = list.map( users => users.username );

          var nonFriends = userList.filter(function (user) {
            return this.indexOf(user) < 0
          }, friends);

          var data = {
            daty: friends,
            names: nonFriends
          }
            res.json({data})            

        })
      }


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

    db.user.findAll({

      where: {

        username: req.body.data.user
      }

    }).then(function(results) {

      var friends = results[0].friends;


      var friendsList = friends.split(",");


      var number = friendsList.indexOf(req.body.data.friend);

      friendsList.splice(number, 1);

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

   app.post("/chat", function(req, res) {


    db.chat.create({
      name: req.body.name,
      text: req.body.chat

    }).then(function(results) {


      res.json(results);
    });

  });


      app.get("/chats", function(req, res) {

    db.chat.findAll({
    }).then(function(results) {

      res.json(results);
    });

  });



}