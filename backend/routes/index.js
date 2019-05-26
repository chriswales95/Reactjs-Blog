var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
const mongoURL = "mongodb://localhost:27017/express";

router.get("/posts", function(req, res, next) {
  MongoClient.connect(mongoURL, function(err, client) {
    if (err) throw err;

    var db = client.db("express");

    db.collection("posts")
      .find()
      .toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
      });
  });
});

router.get("/posts/:id", function(req, res, next) {
  MongoClient.connect(mongoURL, function(err, client) {
    if (err) throw err;

    var db = client.db("express");
    var id = parseInt(req.params["id"]);
    db.collection("posts")
      .find()
      .toArray(function(err, result) {
        if (err) throw err;
        if (result.length > 0) {
          res.json(result[id]);
        } else {
          res.status(403);
        }
      });
  });
});

router.post("/new_blog/", function(req, res, next) {
  MongoClient.connect(mongoURL, function(err, client) {
    if (err) throw err;

    var db = client.db("express");

    db.collection("posts").insertOne({
      title: req.body.title,
      content: req.body.content
    });
    res.sendStatus(200);
  });
});

router.delete("/deletePost/", function(req, res, next) {
  MongoClient.connect(mongoURL, function(err, client) {
    if (err) throw err;
    var db = client.db("express");
    db.collection("posts").deleteOne({ title: req.body.title }, (err, item) => {
      if (err) throw err;

      if (!err) res.sendStatus(200);
    });
  });
});
module.exports = router;
