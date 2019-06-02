var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var bcrypt = require("bcrypt");
const mongoURL = "mongodb://localhost:27017/express";

router.post("/login", function(req, res, next) {
  MongoClient.connect(mongoURL, function(err, client) {
    if (err) throw err;

    var db = client.db("express");

    db.collection("users")
      .find({ username: req.body.username })
      .toArray(function(err, result) {
        if (err) throw err;
        var user = result[0];
        bcrypt.compare(req.body.pass, user.pass, function(err, result) {
          if (err) console.log(err);
          if (result) {
            res.cookie("LoggedIn", "yes");
            res.cookie("name", user.firstName);
            res.cookie("username", user.username);
            res.sendStatus(200);
          } else {
            res.sendStatus(401);
          }
        });
      });
  });
});

router.get("/manage", function(req, res, next) {
  MongoClient.connect(mongoURL, function(err, client) {
    var db = client.db("express");

    db.collection("users")
      .find({}, { projection: { pass: 0 } })
      .toArray(function(err, result) {
        res.json(result);
      });
  });
});

router.post("/userIsSU", function(req, res, next) {
  MongoClient.connect(mongoURL, function(err, client) {
    var db = client.db("express");

    db.collection("users").findOne({ username: req.body.username }, function(
      err,
      result
    ) {
      if (err) res.sendStatus(401);
      if (result !== null) {
        if (result.superUser === true) {
          res.sendStatus(200);
        } else {
          res.sendStatus(401);
        }
      } else {
        res.sendStatus(401);
      }
    });
  });
});

module.exports = router;
