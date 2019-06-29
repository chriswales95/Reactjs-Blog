var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var bcrypt = require("bcrypt");
const mongoURL = "mongodb://localhost:27017/express";
const jwt = require("jsonwebtoken");

router.post("/login", function(req, res, _next) {
  MongoClient.connect(mongoURL, function(err, client) {
    if (err) {
      throw err;
    }

    var db = client.db("express");

    db.collection("users")
      .find({ username: req.body.username })
      .toArray(function(err, result) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        }

        if (result.length > 0) {
          var user = result[0];
          if (typeof user !== "undefined") {
            bcrypt.compare(req.body.pass, user.pass, function(err, result) {
              if (err) {
                console.log(err);
                res.sendStatus(500);
              }
              if (result) {
                res.cookie("LoggedIn", "yes", { maxAge: 3600000 });
                res.cookie("name", user.firstName, { maxAge: 3600000 });
                res.cookie("username", user.username, { maxAge: 3600000 });
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
                res.cookie("token", token, { maxAge: 3600000 });
                res.sendStatus(200);
              } else {
                res.status(403).send("incorrect username or password");
              }
            });
          } else {
            console.log("error getting user details");
            res.status(500).send("error getting user details");
          }
        } else {
          res.status(500).send("details supplied are incorrect");
        }
      });
  });
});

router.get("/manage", verifyUserIsAdmin, function(req, res, next) {
  MongoClient.connect(mongoURL, function(err, client) {
    if (err) {
      res.status(500).send("error connecting");
    }

    var db = client.db("express");

    db.collection("users")
      .find({}, { projection: { pass: 0 } })
      .toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
      });
  });
});

function verifyUserIsAdmin(req, res, next) {
  var token = req.cookies.token;

  jwt.verify(token, process.env.SECRET_KEY, function(err, decodedUser) {
    if (err) {
      res.status(500).send("Error verifying token");
    }
    if (typeof decodedUser !== "undefined") {
      if (decodedUser.admin === false) {
        res.sendStatus(403);
      } else {
        next();
      }
    }
  });
}

module.exports = router;
