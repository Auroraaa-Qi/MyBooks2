const express = require("express");
const router = express.Router();
const db = require('../db/connect');

router.route("/record").get(function(req, res){
    let db_connect = db.getDb('test');
    db_connect
        .collection('books')
        .find({})
        .toArray(function (err, result){
            res.json(result);
        });
});

router.route("/add").post(function(req, res){
    let db_connect = db.getDb('test');
    let newBook = {
        title: req.body.title,
        author: req.body.author,
        user: req.body.user
    }
    db_connect
        .collection('books')
        .insertOne(newBook, function(err, result){
            res.json(result);
        });
});

module.exports = router;