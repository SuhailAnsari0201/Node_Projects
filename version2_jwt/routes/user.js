const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//user signup-----------------------------------------
router.post('/signup', (req, res, next) => {

    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                })
            } else {
                const user = new User({
                    fullName: req.body.fullName,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    password: req.body.password
                });
                user.save().then(result => {
                    console.log("User Created-->", result);
                    res.status(201).json({
                        message: "New User Created!!!"
                    })
                }).catch(err => {
                    res.status(500).json({
                        error: err
                    })
                })
            }
        })
});
//user login------------------------------
router.post("/login", (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(404).json({
                    message: "Austh failde"
                });
            } if (user[0].password === req.body.password) {
                const token = jwt.sign(
                    {
                        email: user[0].email,
                        id: user[0].id
                    }, "i_am_the_private_key",
                    {
                        expiresIn: "1h"
                    }
                );
                return res.status(200).json({
                    message: "Auth successful",
                    token: token
                });
            }
            res.status(401).json({
                message: "Auth failde"
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});
//user logout--------------------------------------
router.post("/logout", (req, res, next) => {
    req.headers.authorization = "Bearer";
    res.status(200).json({ message: "user logout successfully" });
});
module.exports = router;
