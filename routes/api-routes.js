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
            names: nonFriends,
            friendIds: list.map(users => users.id)
          }
            res.json({data})            

        })
      }


        })

    })
  });



  app.get("/notifications/:userId", function (req ,res) {
    console.log(`params:::: ${req.params.userId}`);
    db.notification.findAll({
      where: {
        to: req.params.userId
      }
    }).then(function (results) {
      res.json(results);
    })
  })

   app.post("/notification", function (req ,res) {
     console.log(req.body);

    db.notification.create({
      
      user: req.body.user,
      userId: req.body.ids,
      to: req.body.to,
      type: req.body.type,
      groupId: req.body.groupId

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

  app.post('/groups/new/:userid', function (req, res) {
    
    // create new group with group name and owner
    db.group.create({
      user: req.params.userid,
      name: req.body.groupName,
    }).then(results => {
      res.send(results);
    });
  });

  // creates new user-group association record in joined table
  app.post('/groups/members/:userId/:groupId', function (req, res) {
    console.log(req.params.userId);
    console.log(req.params.groupId);

    db.user.findById(req.params.userId).then(user => {
      user.addGroup(req.params.groupId).then(() => {
        console.log('success');
      })
    });

  })

  app.post('/newgroup/:userId/:groupId', function (req, res) {
    console.log(`&&&&&&&&&&${req.params.userId}`);
    // find user record
    db.user.findAll({
      where: {
        id: req.params.userId
      }
    }).then(results => {
      let data = results[0].groups;
      let newGroup = req.params.groupId.toString();

      // if there are groups, update the string of group ids
      if (data && data !== null) {
        let groups = data.split(', ');
        if (!groups.includes(newGroup)) {
          groups.push(newGroup);
          groups = groups.join(', ');
          db.group.update({
            groups: groups
          }, {
            where: {
              id: req.params.groupId
            }
          }).then(results => {
            res.send('updated groups');
          })
        }
      }
      // else, add first group
      else {
        db.user.update({
          groups: newGroup
        }, {
          where: {
            id: req.params.userId
          }
        }).then(results => {
          res.send('first group added');
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


        app.post("/addevent", function(req, res) {

          console.log(req.body);

    db.event.create({

      name: req.body.data.name,
      type: req.body.data.type,
      person: req.body.data.person,
      groupId: req.body.data.groupId

    }).then(function(results) {

      console.log(results);
      res.json(results);
    }).catch(function(err){

    console.log(err);

  });

  });

  // renders all groups for specified user
  app.get("/mygroups/:userId", function(req, res){
    console.log(`params userid: ${req.params.userId}, type: ${typeof req.params.userId}`)
    db.user.findById(req.params.userId).then(user => {
      user.getGroups().then((results) => {
        console.log('success');
        res.send(results);
      })
    });
  });


        app.get('/groupnames/:groupId', function (req, res) {
          db.group.findAll({
            where: {
              id: req.params.groupId
            }
          }).then(results => {
           // console.log(results[0].dataValues);
            res.send(results[0].dataValues)
          })
        })

      app.get("/events/:group", function(req, res){

          console.log(req.params.group)

          db.group.findAll({

            where:{

              id: req.params.group
            },
            include:[db.event]
          }).then(function(results){

            console.log(results);

            res.json(results)
          })

        });




}