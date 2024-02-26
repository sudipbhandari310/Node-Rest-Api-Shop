const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../model/userModel");
const bcrypt = require("bcrypt");

router.post("/signup", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user) {
        return res.status(409).json({ message: "Email already used" });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({ error: err });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((user) => {
                console.log(user);
                res.status(201).json({ message: "User created ", user: user });
              })
              .catch((err) => {
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
});

router.delete("/:userId", (req, res, next) => {
  User.deleteOne({ _id: req.params.userId })
    .exec()
    .then((result) => {
      res.status(200).json({ message: "User deleted " });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
