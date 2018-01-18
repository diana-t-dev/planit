var db = require("../models");

module.exports = function(app) {
  app.get("/friends/:user", function(req, res) {
    db.user.findAll({
      where: {
        username: req.params.user
      },
      include: [db.post]
    }).then(function(results) {
      var friends = results[0].friends;
      if (friends === null) {
        db.user.findAll({})
          .then(function(res2) {
            var data = {
              names: res2
            }
            res.render("userSearch", {
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
          res.render("userSearch", {
            data
          })
        })
    })
  });

}