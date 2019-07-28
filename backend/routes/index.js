var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
const mongoURL = process.argv[3] === 'PRODUCTION' ? 'mongodb://chriswales.uk:27017/admin' : "mongodb://localhost:27017/admin";
const jwt = require("jsonwebtoken");
const authOptions = { auth: { user: process.env.DB_USER, password: process.env.DB_PWD } };
const objectID = require('mongodb').ObjectID;

router.get("/posts", function (req, res, next) {
  MongoClient.connect(mongoURL, authOptions, function (err, client) {
    if (err) throw err;
    var db = client.db("express");
    var page = 1;
    var startPosition, endPosition;

    db.collection("posts")
      .find({}, { projection: { content: 0, postedBy: 0 } })
      .toArray(function (err, result) {
        if (err) throw err;
        var totalSize = result.length;

        if (req.query.page) {
          page = req.query.page;
          startPosition = (page - 1) * 16;
          endPosition = startPosition + 16;

          res.json({ result: result.slice(startPosition, endPosition), size: totalSize });
        } else {
          res.json({ result: result, size: totalSize });
        }
      });
  });
});

router.get("/posts/:id", function (req, res, next) {
  var id = req.params["id"];

  MongoClient.connect(mongoURL, authOptions, (err, client) => {
    if (err) next(err);

    var db = client.db("express");

    try {
      db.collection("posts")
        .findOne({ _id: objectID(id) }, (err, result) => {
          if (err) {
            next(err);
          }
          res.json(result);
        })
    } catch (err) {
      next(err);
    }
  });
});

router.post("/new_blog/", verifyUserCanOrDeletePosts, function (req, res, next) {
  MongoClient.connect(mongoURL, authOptions, function (err, client) {
    if (err) throw err;

    var db = client.db("express");
    var now = new Date();
    db.collection("posts").insertOne({
      title: req.body.title,
      content: req.body.content,
      date: now,
      postedBy: req.cookies.username
    });
    res.sendStatus(200);
  });
});

router.delete("/deletePost/", verifyUserCanOrDeletePosts, function (
  req,
  res,
  _next
) {
  MongoClient.connect(mongoURL, authOptions, function (err, client) {
    if (err) throw err;
    var db = client.db("express");
    db.collection("posts").deleteOne(
      { title: req.body.title },
      (err, _item) => {
        if (err) throw err;
        if (!err) res.sendStatus(200);
      }
    );
  });
});

function verifyUserCanOrDeletePosts(req, res, next) {
  var token = req.cookies.token;

  jwt.verify(token, process.env.SECRET_KEY, function (err, _decodedUser) {
    if (err) {
      console.log("Not allowed :(");
      res.sendStatus(403);
    } else {
      next();
    }
  });
}
module.exports = router;
