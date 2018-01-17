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