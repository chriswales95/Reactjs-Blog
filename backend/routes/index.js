var express = require("express");
var router = express.Router();

var MongoClient = require("mongodb").MongoClient;

/* GET users listing. */
router.get("/posts", function(req, res, next) {
  MongoClient.connect("mongodb://localhost:27017/express", function(
    err,
    client
  ) {
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
  MongoClient.connect("mongodb://localhost:27017/express", function(
    err,
    client
  ) {
    if (err) throw err;

    var db = client.db("express");
    var id = parseInt(req.params["id"]);
    db.collection("posts")
      .find({ id: id })
      .toArray(function(err, result) {
        if (err) throw err;
        if (result.length > 0) {
          res.json(result);
        } else {
          res.status(403);
        }
      });
  });
});

router.post("/new_blog/", function(req, res, next) {
  MongoClient.connect("mongodb://localhost:27017/express", function(
    err,
    client
  ) {
    if (err) throw err;

    var db = client.db("express");

    db.collection("posts").insert({
      title: req.body.title,
      content: req.body.content
    });
    res.sendStatus(200);
  });
});
module.exports = router;
