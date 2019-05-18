var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var bcrypt = require("bcrypt");

router.post("/login", function(req, res, next) {
  var username = req.body.username;
  MongoClient.connect("mongodb://localhost:27017/express", function(
    err,
    client
  ) {
    if (err) throw err;

    var db = client.db("express");

    db.collection("users")
      .find()
      .toArray(function(err, result) {
        if (err) throw err;
        var user = result[0];
        if (user["username"] === username) {
          bcrypt.compare(req.body.pass, user["pass"], function(err, result) {
            if (result) {
              res.sendStatus(200);
            } else {
              res.sendStatus(403);
            }
          });
        } else {
          return res.sendStatus(403);
        }
      });
  });
});
module.exports = router;
