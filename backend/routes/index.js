var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
const mongoURL = process.argv[3] === 'PRODUCTION' ? 'mongodb://chriswales.uk:27017/admin' : "mongodb://localhost:27017/admin";
const jwt = require("jsonwebtoken");
const authOptions = { auth: { user: process.env.DB_USER, password: process.env.DB_PWD } };

router.get("/posts", function (req, res, next) {
  MongoClient.connect(mongoURL, authOptions, function (err, client) {
    if (err) throw err;
    var db = client.db("express");
    var page = 1;
    var startPosition, endPosition;

    db.collection("posts")
      .find({}, { projection: { _id: 0, content: 0, postedBy: 0 } })
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
  MongoClient.connect(mongoURL, authOptions, function (err, client) {
    if (err) throw err;

    var db = client.db("express");
    var id = parseInt(req.params["id"]);
    db.collection("posts")
      .find()
      .toArray(function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
          res.json(result[id]);
        } else {
          res.status(403);
        }
      });
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
