var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var bcrypt = require("bcrypt");
const mongoURL = "mongodb://localhost:27017/express";
const jwt = require("jsonwebtoken");

router.post("/login", function(req, res, next) {
  MongoClient.connect(mongoURL, function(err, client) {
    if (err) throw err;

    var db = client.db("express");

    db.collection("users")
      .find({ username: req.body.username })
      .toArray(function(err, result) {
        if (err) {
          res.sendStatus(401);
        }
        var user = result[0];
        if (typeof user !== "undefined") {
          bcrypt.compare(req.body.pass, user.pass, function(err, result) {
            if (err) {
              console.log(err);
              res.sendStatus(500);
            }
            if (result) {
              res.cookie("LoggedIn", "yes");
              res.cookie("name", user.firstName);
              res.cookie("username", user.username);
              var token = jwt.sign(
                {
                  username: user.username,
                  admin: user.superUser,
                  firstName: user.firstName,
                  lastName: user.lastName
                },
                process.env.SECRET_KEY,
                { expiresIn: "1h" }
              );
              res.cookie("token", token);
              res.sendStatus(200);
            }
          });
        } else {
          console.log("error getting user details");
          res.sendStatus(500);
        }
      });
  });
});

router.get("/manage", verifyUserIsAdmin, function(req, res, next) {
  MongoClient.connect(mongoURL, function(err, client) {
    if(err) throw err;

    var db = client.db("express");

    db.collection("users")
      .find({}, { projection: { pass: 0 } })
      .toArray(function(err, result) {
        res.json(result);
      });
  });
});

function verifyUserIsAdmin(req, res, next) {
  var token = req.cookies.token;

  jwt.verify(token, process.env.SECRET_KEY, function(err, decodedUser) {
    if (err) {
      throw new Error("error verifying");
    }
    if (decodedUser.admin === false) {
      res.sendStatus(403);
    } else {
      next();
    }
  });
}

module.exports = router;
